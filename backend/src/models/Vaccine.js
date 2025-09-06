const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  dosesRequired: Number,
  origin: String,
  sideEffects: String,
  strainsCovered: String,
});

module.exports = mongoose.model("Vaccine", vaccineSchema);
