// usage: node scripts/csvImport.js /path/to/patient_symptom_dataset.csv
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const inFile = process.argv[2];
if (!inFile) {
  console.error('Usage: node csvImport.js <csv-path>');
  process.exit(1);
}
const outPath = path.join(__dirname, '..', 'data', 'symptom_to_specialist_mapping.json');

const rows = [];
fs.createReadStream(inFile)
  .pipe(csv())
  .on('data', (data) => rows.push(data))
  .on('end', () => {
    const mappings = [];
    for (const r of rows) {
      mappings.push({
        disease: r.disease || r.predicted_disease || '',
        example_symptoms: r.symptoms || '',
        symptom_tokens: (r.symptoms || '').split(/[,;|\/]/).map(s => s.trim().toLowerCase()).filter(Boolean),
        recommended_specialist: r.recommended_specialist || r.recommendedSpecialist || ''
      });
    }
    fs.writeFileSync(outPath, JSON.stringify(mappings, null, 2), 'utf8');
    console.log('Wrote mapping JSON to', outPath, 'entries:', mappings.length);
  });
