const router = require("express").Router();
const Vaccine = require("../models/Vaccine");
const auth = require("../middleware/auth");

// Create vaccine (Admin)
router.post("/", auth(["admin"]), async (req, res) => {
  const v = new Vaccine(req.body);
  await v.save();
  res.json(v);
});

// List all vaccines
router.get("/", async (req, res) => {
  res.json(await Vaccine.find());
});

module.exports = router;
