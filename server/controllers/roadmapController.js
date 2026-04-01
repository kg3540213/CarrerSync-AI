const Roadmap = require('../models/Roadmap');
require('dotenv').config();

exports.generate = async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: `Generate a detailed career roadmap to: ${prompt}` }] }] }),
      }
    );
    const data = await response.json();
    const roadmap = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No roadmap generated.';
    const saved = await Roadmap.create({ userId: req.user.userId, prompt, roadmap });
    res.json({ success: true, roadmap: saved.roadmap, id: saved._id });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Roadmap.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (e) { res.status(500).json({ success: false }); }
};

exports.deleteOne = async (req, res) => {
  try {
    const doc = await Roadmap.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    await doc.deleteOne();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false }); }
};