const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ msg: "User registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

module.exports = router;
