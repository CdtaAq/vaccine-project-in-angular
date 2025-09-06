const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  type: { type: String, enum: ["govt", "private"] },
  charges: Number,
});

module.exports = mongoose.model("Hospital", hospitalSchema);
