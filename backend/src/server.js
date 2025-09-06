require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/vaccine", require("./routes/vaccine"));
app.use("/api/appointment", require("./routes/appointment"));

app.listen(4000, () => console.log("Backend running on 4000"));
