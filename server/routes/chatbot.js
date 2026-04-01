const express = require('express');
const router  = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are the official AI assistant for CareerSync AI — a comprehensive career development platform.

PLATFORM FEATURES:
- Career Assessment (AI-powered aptitude test with personalized recommendations)
- Learning Pathways (curated roadmaps for different careers)
- Career Comparison Tool (compare salaries, growth, skills side-by-side)
- Resources Library (courses, tutorials, certifications)
- AI Roadmap Generator (personalized step-by-step career plans)
- Industry Trends (real-time market data and insights)
- User Dashboard (progress tracking, enrolled courses, subscribed paths)

NAVIGATION: When user asks to go to a page, respond with ONLY valid JSON:
{ "navigation": "/path" }

Valid paths:
/           → home
/about      → about
/pathways   → career pathways
/resources  → learning resources
/comparison-tool-page → career comparison
/roadmap    → roadmap overview
/roadmap-generator → AI roadmap generator
/career-test → career assessment test
/my-dashboard → user dashboard

ANSWER FORMAT: For all other queries respond with ONLY valid JSON:
{ "answer": "your helpful response here" }

RULES:
1. Only answer questions about CareerSync AI or career guidance topics.
2. For off-topic questions: { "answer": "I specialize in career guidance and CareerSync AI. How can I help with your career development?" }
3. Always return valid, parseable JSON — no markdown, no code fences.
4. Be concise, helpful, and encouraging.
`;

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: 'Message required' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser message: ${message}` }] }],
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
    });

    const text    = result.response.text().trim();
    const cleaned = text.replace(/```json|```/g, '').trim();

    let parsed;
    try { parsed = JSON.parse(cleaned); }
    catch { parsed = { answer: cleaned }; }

    res.json(parsed);
  } catch (e) {
    console.error('Chatbot error:', e.message);
    res.status(500).json({ answer: 'I\'m having trouble right now. Please try again shortly.' });
  }
});

module.exports = router;