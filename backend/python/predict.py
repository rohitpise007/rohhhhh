import sys
import json
import torch
import numpy as np
import pickle
from model import DiseasePrediction

def load_model_meta():
    with open("model_meta.json", "r") as f:
        return json.load(f)

def load_model():
    meta = load_model_meta()
    model = DiseasePrediction(input_size=meta['input_size'], output_size=meta['output_size'])
    model.load_state_dict(torch.load("disease_final_model.pt", map_location='cpu'))
    model.eval()
    return model

def load_label_encoder():
    path = "label_encoder.pkl"
    with open(path, "rb") as f:
        return pickle.load(f)

def load_feature_names():
    with open("feature_names.json", "r") as f:
        return json.load(f)

def predict_and_top_k(k, model, X_input, encoder):
    with torch.no_grad():
        logits = model(X_input)
        probs = torch.softmax(logits, dim=1).cpu().numpy()
    top_index = probs.argsort(axis=1)[:, -k:][:, ::-1]
    top_index = top_index.squeeze()
    top_probs = probs[0, top_index]
    top_labels = encoder.inverse_transform(top_index)
    return top_labels, top_probs

def main():
    if len(sys.argv) != 4:
        print(json.dumps({"error": "Invalid number of arguments"}))
        sys.exit(1)

    try:
        # Parse arguments
        symptoms_json = sys.argv[1]
        top_k = int(sys.argv[2])
        confidence_threshold = float(sys.argv[3])

        # Parse symptoms
        selected_symptoms = json.loads(symptoms_json)

        # Load model and data
        model = load_model()
        le = load_label_encoder()
        feature_names = load_feature_names()
        feature_index = {name: i for i, name in enumerate(feature_names)}

        # Create input vector
        x_np = np.zeros((1, len(feature_names)), dtype=np.float32)

        # Set selected symptoms to 1
        for symptom in selected_symptoms:
            if symptom in feature_index:
                x_np[0, feature_index[symptom]] = 1.0

        # Convert to tensor
        x_inputs = torch.from_numpy(x_np).float()

        # Make prediction
        labels, probs = predict_and_top_k(top_k, model, x_inputs, le)

        # Format results
        result = {
            "predictions": [],
            "selected_symptoms_count": len(selected_symptoms),
            "top_k": top_k,
            "confidence_threshold": confidence_threshold
        }

        for i, (label, prob) in enumerate(zip(labels, probs)):
            result["predictions"].append({
                "disease": label,
                "probability": float(prob),
                "confidence_level": "High" if prob >= confidence_threshold else "Low"
            })

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()