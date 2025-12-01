const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const User = require('../models/User');
const Record = require('../models/Record');

// Load mapping JSON
const mappingPath = path.join(__dirname, '..', 'data', 'symptom_to_specialist_mapping.json');
let symptomMappings = [];
try {
  if (fs.existsSync(mappingPath)) {
    symptomMappings = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    console.log('[patient_find_doctor] loaded symptom mappings:', symptomMappings.length);
  } else {
    console.warn('[patient_find_doctor] mapping file not found at', mappingPath);
  }
} catch (err) {
  console.warn('[patient_find_doctor] error loading mappings:', err.message);
}

// POST /api/patient/find-doctor
router.post('/find-doctor', auth, role('patient'), async (req, res) => {
  try {
    const { symptoms = '', disease = '' } = req.body;
    if (!symptoms || typeof symptoms !== 'string') {
      return res.status(400).json({ error: 'Please provide symptoms as text.' });
    }

    const text = `${symptoms} ${disease}`.toLowerCase();
    const tokens = text.split(/[^a-z0-9]+/).filter(Boolean);

    const specScores = {};
    if (Array.isArray(symptomMappings) && symptomMappings.length > 0) {
      for (const m of symptomMappings) {
        let matched = 0;
        const exampleTokens = Array.isArray(m.symptom_tokens) ? m.symptom_tokens :
          (m.example_symptoms ? String(m.example_symptoms).split(/[,;|\/]/).map(t => t.trim().toLowerCase()) : []);
        for (const tk of exampleTokens) {
          if (!tk) continue;
          const tkNorm = tk.toLowerCase();
          if (text.includes(tkNorm)) matched++;
          else {
            const inner = tkNorm.split(/\s+/).filter(Boolean);
            for (const w of inner) if (tokens.includes(w)) { matched++; break; }
          }
        }
        if (m.disease && text.includes(String(m.disease).toLowerCase())) matched += 2;
        if (matched > 0) {
          const specRaw = (m.recommended_specialist || m.recommendedSpecialist || '').trim();
          const specs = specRaw.split(/[,\/|]/).map(s => s.trim()).filter(Boolean);
          for (const s of specs) specScores[s] = (specScores[s] || 0) + matched;
        }
      }
    }

    // fallback
    if (Object.keys(specScores).length === 0) {
      const fallbackMap = [
        { keys: ['cough','cold','sneeze','shortness of breath','wheezing'], specs: ['Pulmonologist'] },
        { keys: ['fever','flu','influenza','covid','infection'], specs: ['General Physician','Internal Medicine'] },
        { keys: ['chest pain','heart','angina','palpitation'], specs: ['Cardiologist'] },
        { keys: ['stomach','abdominal','liver','jaundice','hepatitis'], specs: ['Gastroenterologist','Hepatologist'] },
        { keys: ['kidney','stone','renal','colic'], specs: ['Urologist','Nephrologist'] },
        { keys: ['headache','migraine','seizure','dizziness','stroke'], specs: ['Neurologist'] },
        { keys: ['skin','rash','acne','eczema'], specs: ['Dermatologist'] },
        { keys: ['pregnancy','period','ovary','pcos'], specs: ['Gynecologist'] },
        { keys: ['joint','arthritis','back','bone','fracture'], specs: ['Orthopedic Surgeon'] },
        { keys: ['mental','depression','anxiety','psychiatry'], specs: ['Psychiatrist'] },
        { keys: ['cancer','tumor','oncology'], specs: ['Oncologist'] },
        { keys: ['ear','hearing','vertigo','throat','tonsil','sinus'], specs: ['ENT Specialist'] },
      ];
      for (const map of fallbackMap) {
        for (const k of map.keys) {
          if (text.includes(k)) {
            for (const s of map.specs) specScores[s] = (specScores[s] || 0) + 1;
          }
        }
      }
    }
    if (Object.keys(specScores).length === 0) specScores['General Physician'] = 1;

    const sortedSpecs = Object.entries(specScores).sort((a,b) => b[1] - a[1]).map(([spec]) => spec);
    const topSpecsForRegex = sortedSpecs.slice(0, 6).map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const specRegex = new RegExp(topSpecsForRegex.join('|'), 'i');

    let candidates = await User.find({
      role: 'doctor',
      specialization: { $exists: true, $ne: null, $regex: specRegex }
    }).select('-password -__v').lean();

    if (!candidates || candidates.length === 0) {
      const bioRegex = new RegExp(topSpecsForRegex.join('|'), 'i');
      candidates = await User.find({ role: 'doctor', bio: { $regex: bioRegex } }).select('-password -__v').lean();
    }
    if (!candidates || candidates.length === 0) {
      candidates = await User.find({ role: 'doctor' }).limit(5).select('-password -__v').lean();
    }

    const scoredDoctors = (candidates || []).map(doc => {
      const specText = `${doc.specialization || ''} ${doc.bio || ''}`.toLowerCase();
      let score = 0;
      for (let i = 0; i < sortedSpecs.length; i++) {
        const spec = sortedSpecs[i].toLowerCase();
        if (specText.includes(spec)) score += (sortedSpecs.length - i);
      }
      const confidence = Math.tanh(score / 5);
      return {
        doctor: {
          _id: doc._id,
          name: doc.name,
          specialization: doc.specialization,
          bio: doc.bio,
          email: doc.email
        },
        confidence: Number(confidence.toFixed(2))
      };
    });

    scoredDoctors.sort((a,b) => b.confidence - a.confidence);

    try {
      await Record.create({
        patient: req.user.id,
        doctor: scoredDoctors.length > 0 ? scoredDoctors[0].doctor._id : undefined,
        diagnosis: symptoms,
        solution: `Auto-suggested specializations: ${sortedSpecs.slice(0,3).join(', ')}`
      });
    } catch (err) {
      console.warn('[patient_find_doctor] could not save Record:', err.message);
    }

    res.json({ recommendations: scoredDoctors.slice(0,5), mappedSpecializations: sortedSpecs.slice(0,6) });

  } catch (err) {
    console.error('[patient_find_doctor] error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
