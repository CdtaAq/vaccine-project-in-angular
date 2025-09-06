const router = require("express").Router();
const Appointment = require("../models/Appointment");
const QRCode = require("qrcode");
const auth = require("../middleware/auth");

// Book appointment
router.post("/", auth(["user"]), async (req, res) => {
  const appointment = new Appointment({ ...req.body, userId: req.user.id });
  const qrData = JSON.stringify({ user: req.user.id, date: req.body.date });
  appointment.qrCode = await QRCode.toDataURL(qrData);
  await appointment.save();
  res.json(appointment);
});

// Admin approve
router.put("/:id/approve", auth(["admin"]), async (req, res) => {
  const appt = await Appointment.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
  res.json(appt);
});

// Get user’s appointments
router.get("/my", auth(["user"]), async (req, res) => {
  const appts = await Appointment.find({ userId: req.user.id }).populate("hospitalId vaccineId");
  res.json(appts);
});

module.exports = router;
