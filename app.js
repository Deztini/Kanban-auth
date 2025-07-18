const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(`${DB_URL}`)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Atlas connection error:", err));
