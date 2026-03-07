require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const setupRoutes = require('./routes/mainRoutes');
const adminMainRoutes = require('./routes/admin/adminMainRoute');
const roadmapRoute = require("./routes/roadmap/roadmap");
const chatbotRoutes = require("./routes/chatbot");

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.send({ status: "Server is running ✅" });
});

// API Routes
setupRoutes(app);
app.use('/api/admin', adminMainRoutes);
app.use("/api/roadmap", roadmapRoute);
app.use("/api/chatbot", chatbotRoutes);

// Serve frontend
app.use(express.static(path.join(path.resolve(), 'client/dist')));

app.use((req, res) => {
  res.sendFile(path.join(path.resolve(), 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});