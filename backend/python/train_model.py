# python/train_model.py
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
import joblib

CSV_PATH = "/mnt/data/Patient_symptom_dataset__preview_1.csv"
OUTPUT_MODEL_PATH = os.path.join("models", "symptom_specialist_model.pkl")

os.makedirs("models", exist_ok=True)

print("Loading data from:", CSV_PATH)
df = pd.read_csv(CSV_PATH)

# Try to detect likely columns
cols_lower = [c.lower() for c in df.columns]
# candidates
symptom_candidates = ["symptom", "symptoms", "description", "chief complaint", "complaint", "text"]
specialist_candidates = ["specialist", "speciality", "specialty", "doctor", "label", "specialisation"]

symptom_col = None
specialist_col = None

for cand in symptom_candidates:
    for c in df.columns:
        if cand in c.lower():
            symptom_col = c
            break
    if symptom_col:
        break

for cand in specialist_candidates:
    for c in df.columns:
        if cand in c.lower():
            specialist_col = c
            break
    if specialist_col:
        break

if not symptom_col or not specialist_col:
    print("Could not auto-detect symptom/specialist columns.")
    print("Columns available:", df.columns.tolist())
    raise SystemExit("Please open train_model.py and set symptom_col and specialist_col manually.")

print("Using symptom column:", symptom_col)
print("Using specialist column:", specialist_col)

# Drop NaNs
df = df[[symptom_col, specialist_col]].dropna()
X = df[symptom_col].astype(str)
y = df[specialist_col].astype(str)

# keep labels clean
y = y.str.strip()

# simple train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42, stratify=y)

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(stop_words="english", max_features=20000)),
    ("clf", LogisticRegression(max_iter=2000))
])

print("Training model on", len(X_train), "samples...")
pipeline.fit(X_train, y_train)

print("Predicting on test set:", len(X_test), "samples")
pred = pipeline.predict(X_test)
print("\nClassification report:\n")
print(classification_report(y_test, pred))

print("Saving model to:", OUTPUT_MODEL_PATH)
joblib.dump(pipeline, OUTPUT_MODEL_PATH)
print("Done.")
