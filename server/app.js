require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const multer  = require('multer');
const nodemailer = require('nodemailer');

const connectDB = require('./config/db');

// Routes
const authRoutes    = require('./routes/auth');
const userRoutes    = require('./routes/user');
const adminRoutes   = require('./routes/admin');
const roadmapRoutes = require('./routes/roadmap/roadmap');
const chatbotRoutes = require('./routes/chatbot');

const app  = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001', process.env.CLIENT_URL].filter(Boolean), credentials: true }));
app.use(express.json());

// Health
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// API
app.use('/api/auth',    authRoutes);
app.use('/api',         userRoutes);
app.use('/api/admin',   adminRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Email comparison image (kept for backward compat)
const upload = multer({ storage: multer.memoryStorage() });
app.post('/api/send-comparison-image', upload.single('image'), async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !req.file) return res.status(400).json({ error: 'Missing email or image' });
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject: 'Career Comparison', attachments: [{ filename: 'comparison.png', content: req.file.buffer, contentType: 'image/png' }] });
    res.json({ message: 'Sent' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));