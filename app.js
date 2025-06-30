const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const PORT = 3000;

mongoose
  .connect(
    "mongodb+srv://Destiny:clubworldcup@cluster0.hqlinuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Atlas connection error:", err));
