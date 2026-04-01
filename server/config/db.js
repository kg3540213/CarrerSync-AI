const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      console.warn("⚠️  Warning: MONGODB_URI not configured. Skipping database connection for now.");
      return;
    }
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    // Don't exit - allow app to run without DB for development
    console.log("⚠️  Continuing without database connection");
  }
};

module.exports = connectDB;
