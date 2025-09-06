const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  vaccineId: { type: mongoose.Schema.Types.ObjectId, ref: "Vaccine" },
  date: Date,
  status: { type: String, enum: ["pending", "approved", "completed"], default: "pending" },
  qrCode: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
