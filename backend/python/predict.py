# python/predict.py
import sys
import json
import os
import joblib

MODEL_PATH = os.path.join("models", "symptom_specialist_model.pkl")

if not os.path.exists(MODEL_PATH):
    # If script runs from a different CWD we also try relative to this file
    base = os.path.dirname(__file__)
    alt = os.path.join(base, "..", MODEL_PATH)
    if os.path.exists(alt):
        MODEL_PATH = alt

try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(json.dumps({"error": f"model load error: {str(e)}"}))
    sys.exit(1)

# read stdin
raw = sys.stdin.read()
try:
    data = json.loads(raw)
    symptom = data.get("symptom", "")
except Exception as e:
    print(json.dumps({"error": "invalid input json"}))
    sys.exit(1)

if not symptom:
    print(json.dumps({"error": "symptom required"}))
    sys.exit(1)

try:
    pred = model.predict([symptom])[0]
    # normalise a slug-friendly version if needed
    print(json.dumps({"specialist": str(pred)}))
except Exception as e:
    print(json.dumps({"error": f"prediction failed: {str(e)}"}))
    sys.exit(1)
