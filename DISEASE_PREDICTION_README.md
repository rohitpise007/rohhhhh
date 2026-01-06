# AI Disease Prediction Module

This healthcare website now includes an advanced AI-powered disease prediction system that helps users identify potential diseases based on their symptoms.

## 🚀 Features

- **Comprehensive Symptom Database**: 377+ symptoms organized into 10 medical categories
- **AI-Powered Predictions**: PyTorch neural network trained on medical data
- **Confidence Scoring**: Each prediction includes probability scores and confidence levels
- **User-Friendly Interface**: Intuitive symptom selection with categorized display
- **Customizable Settings**: Adjustable prediction count and confidence thresholds

## 📊 How It Works

1. **Symptom Selection**: Users select symptoms from organized categories:
   - Neurological Symptoms
   - Psychiatric/Behavioral Symptoms
   - Cardiovascular Symptoms
   - Respiratory Symptoms
   - ENT (Ear, Nose, Throat) Symptoms
   - Gastrointestinal Symptoms
   - Genitourinary & Reproductive Symptoms
   - Musculoskeletal Symptoms
   - Dermatological Symptoms
   - General/Systemic Symptoms

2. **AI Prediction**: The system processes selected symptoms through a neural network model

3. **Results Display**: Shows top disease predictions with confidence scores

## 🛠️ Technical Implementation

### Backend (Python/Node.js Integration)

- **Model**: PyTorch neural network with 377 input features and 773 disease outputs
- **API Endpoint**: `POST /api/disease/predict`
- **Dependencies**: torch, numpy, scikit-learn, pandas

### Frontend (React)

- **Component**: `DiseasePrediction.jsx`
- **Route**: `/disease-prediction`
- **Features**: Real-time symptom selection, prediction display, confidence visualization

## 📋 API Usage

### Get Symptoms Data
```http
GET /api/disease/symptoms
```

### Make Prediction
```http
POST /api/disease/predict
Content-Type: application/json

{
  "symptoms": ["fever", "headache", "fatigue"],
  "top_k": 5,
  "confidence_threshold": 0.5
}
```

Response:
```json
{
  "predictions": [
    {
      "disease": "Common Cold",
      "probability": 0.87,
      "confidence_level": "High"
    }
  ],
  "selected_symptoms_count": 3,
  "top_k": 5,
  "confidence_threshold": 0.5
}
```

## ⚠️ Medical Disclaimer

**IMPORTANT**: This AI prediction tool is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for proper medical evaluation.

## 🔧 Setup Instructions

1. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Model Files**: Ensure these files are in `backend/python/`:
   - `disease_final_model.pt` (PyTorch model)
   - `model_meta.json` (model configuration)
   - `symptoms.json` (symptom categories)
   - `feature_names.json` (feature mapping)
   - `label_encoder.pkl` (disease label encoder)

3. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

4. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access Feature**: Navigate to `/disease-prediction` in your browser

## 🎯 Usage Guidelines

- Select symptoms that best describe your current condition
- Choose appropriate confidence threshold (default 50%)
- Review predictions as supplementary information only
- Consult healthcare professionals for accurate diagnosis
- Use the tool responsibly and ethically

## 🔍 Model Performance

- **Input Features**: 377 symptoms
- **Output Classes**: 773 diseases
- **Architecture**: 3-layer neural network (377 → 256 → 128 → 773)
- **Training Data**: Medical symptom-disease associations
- **Accuracy**: Varies by symptom combination and medical condition

## 🤝 Contributing

When adding new symptoms or diseases:
1. Update `symptoms.json` with new symptom categories
2. Update `feature_names.json` with new features
3. Retrain the model with updated datasets
4. Test predictions with various symptom combinations

## 📞 Support

For technical issues or feature requests related to the AI disease prediction module, please contact the development team.