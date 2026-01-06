const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

// Disease prediction endpoint
router.post('/predict', async (req, res) => {
    try {
        const { symptoms, top_k = 5, confidence_threshold = 0.5 } = req.body;

        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({
                error: 'Symptoms array is required and must not be empty'
            });
        }

        // Call Python script for disease prediction
        const pythonProcess = spawn('python', [
            path.join(__dirname, '../python/predict.py'),
            JSON.stringify(symptoms),
            top_k.toString(),
            confidence_threshold.toString()
        ]);

        let result = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error('Python script error:', errorOutput);
                return res.status(500).json({
                    error: 'Prediction failed',
                    details: errorOutput
                });
            }

            try {
                const predictionResult = JSON.parse(result);
                res.json(predictionResult);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                res.status(500).json({
                    error: 'Failed to parse prediction result'
                });
            }
        });

        pythonProcess.on('error', (error) => {
            console.error('Failed to start Python process:', error);
            res.status(500).json({
                error: 'Failed to start prediction process'
            });
        });

    } catch (error) {
        console.error('Disease prediction error:', error);
        res.status(500).json({
            error: 'Internal server error during prediction'
        });
    }
});

// Get available symptoms
router.get('/symptoms', (req, res) => {
    try {
        const fs = require('fs');
        const symptomsPath = path.join(__dirname, '../python/symptoms.json');

        if (!fs.existsSync(symptomsPath)) {
            return res.status(404).json({
                error: 'Symptoms data not found'
            });
        }

        const symptomsData = fs.readFileSync(symptomsPath, 'utf8');
        const symptoms = JSON.parse(symptomsData);

        res.json(symptoms);
    } catch (error) {
        console.error('Error loading symptoms:', error);
        res.status(500).json({
            error: 'Failed to load symptoms data'
        });
    }
});

module.exports = router;