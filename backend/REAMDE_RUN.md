# Quick start

1) Install Python deps:
   pip install -r requirements.txt

2) Train the model (reads CSV at /mnt/data/Patient_symptom_dataset__preview_1.csv):
   npm run train
   (or: python python/train_model.py)

   This produces: models/symptom_specialist_model.pkl

3) Install node deps:
   npm install

4) Start server:
   npm start
   (or for dev: npm run dev)

5) Client:
   - allIf using the included client, run `npm inst` inside client/ and `npm start` (dev)
   - When you build the client (`npm run build` in client), the server will serve the build at /.

6) API usage:
   POST /api/patient/predict
   Body: { "symptom": "I have chest pain and shortness of breath" }

   Response: { specialty, slug, redirectUrl }
