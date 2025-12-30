// routes/patient_find_doctor.js
const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const path = require("path");

router.post("/predict", (req, res) => {
  const { symptom } = req.body;
  if (!symptom || typeof symptom !== "string") {
    return res.status(400).json({ error: "symptom (string) is required" });
  }

  // Path to python script
  const scriptPath = path.join(__dirname, "..", "python", "predict.py");

  // spawn python
  const py = spawn("python", [scriptPath], {
    env: process.env,
    stdio: ["pipe", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";

  py.stdout.on("data", (data) => {
    stdout += data.toString();
  });

  py.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  py.on("error", (err) => {
    console.error("python spawn error:", err);
    res.status(500).json({ error: "Failed to start python process" });
  });

  py.on("close", (code) => {
    if (stderr) console.error("python stderr:", stderr);
    if (!stdout) {
      return res.status(500).json({ error: "No output from python" });
    }
    try {
      const parsed = JSON.parse(stdout);
      if (parsed.error) {
        return res.status(500).json({ error: parsed.error });
      }
      const specialist = parsed.specialist || parsed.speciality || parsed.specialty;
      const slug = String(specialist).toLowerCase().replace(/\s+/g, "-");
      const redirectUrl = `/doctors?specialty=${encodeURIComponent(slug)}`;
      return res.json({ specialty: specialist, slug, redirectUrl });
    } catch (e) {
      console.error("parse error:", e, "stdout:", stdout);
      return res.status(500).json({ error: "Failed to parse python output" });
    }
  });

  // send input
  py.stdin.write(JSON.stringify({ symptom }));
  py.stdin.end();
});

module.exports = router;
