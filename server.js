const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for frontend (Vite dev server on port 5173)
app.use(
  cors({
    origin: "*", // allow your React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

// Non-SRV fallback for ISPs (like Reliance Jio) that block _mongodb._tcp SRV DNS lookups
const FALLBACK_URI = "mongodb://nazifakhan58_db_user:wf3im5xOe2FgrAiI@ac-zonwq9c-shard-00-00.oshavnb.mongodb.net:27017,ac-zonwq9c-shard-00-01.oshavnb.mongodb.net:27017,ac-zonwq9c-shard-00-02.oshavnb.mongodb.net:27017/CarInfo?ssl=true&replicaSet=atlas-stlk3a-shard-0&authSource=admin&retryWrites=true&w=majority";

// Try primary URI first; if it fails due to SRV DNS lookup issue, fallback to direct connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ Primary MongoDB connection failed:", err.message);
    console.log("🔄 Trying fallback connection (non-SRV)...");
    mongoose
      .connect(FALLBACK_URI)
      .then(() => console.log("✅ MongoDB connected via fallback"))
      .catch((fallbackErr) =>
        console.error("❌ Fallback MongoDB connection error:", fallbackErr.message)
      );
  });

const categoryRoutes = require("./routes/categoryRoutes");
const carRoutes = require("./routes/carRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const infoRoutes = require("./routes/infoRoutes");
const contactRoutes = require("./routes/contactRoutes");
const counterRoutes = require("./routes/counterRoutes");
const reachUsRoutes = require("./routes/reachUsRoutes");

app.use("/api/reachus", reachUsRoutes);
app.use("/api/counters", counterRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/info", infoRoutes);
app.use("/api/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
