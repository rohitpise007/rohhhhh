const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  password :{type: String, required:true},
  // specialty: { type: String, required: true },
  experience: { type: Number, default: 1 },
  
  phone: { type: String },
  image: { type: String }
});

module.exports = mongoose.model("Doctor", doctorSchema);
