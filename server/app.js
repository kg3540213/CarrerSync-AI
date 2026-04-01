require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const path       = require('path');

const connectDB = require('./config/db');

// ── Routes ──────────────────────────────────────────────────────────────────
const authRoutes         = require('./routes/auth');
const userRoutes         = require('./routes/User');
const courseRoute        = require('./routes/course');
const adminRoutes        = require('./routes/admin/adminMainRoute');
const roadmapRoutes      = require('./routes/roadmap/roadmap');
const chatbotRoutes      = require('./routes/chatbot');
const cartRoute          = require('./routes/cart');
const subscribeRoute     = require('./routes/subscribe');
const subscribePathwayRoute = require('./routes/subscribePathway');
const sendComparisonImage = require('./routes/sendComparisonImage');

const app  = express();
const PORT = process.env.PORT || 3001;

connectDB();

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── API Routes ───────────────────────────────────────────────────────────────
// Note: Register more specific routes first, then general routes
console.log('🔹 Registering API routes...');
try {
  console.log('  Loading /api/auth');
  app.use('/api/auth',              authRoutes);
  console.log('  ✅ /api/auth');

  console.log('  Loading /api/admin');
  app.use('/api/admin',             adminRoutes);
  console.log('  ✅ /api/admin');

  console.log('  Loading /api/roadmap');
  app.use('/api/roadmap',           roadmapRoutes);
  console.log('  ✅ /api/roadmap');

  console.log('  Loading /api/chatbot');
  app.use('/api/chatbot',           chatbotRoutes);
  console.log('  ✅ /api/chatbot');

  console.log('  Loading /api/cart');
  app.use('/api/cart',              cartRoute);
  console.log('  ✅ /api/cart');

  console.log('  Loading /api/send-comparison-image');
  app.use('/api/send-comparison-image', sendComparisonImage);
  console.log('  ✅ /api/send-comparison-image');

  // General API routes (these use root /api prefix)
  console.log('  Loading /api (user routes)');
  app.use('/api',                   userRoutes);
  console.log('  ✅ /api (user routes)');

  console.log('  Loading /api (subscribe)');
  app.use('/api',                   subscribeRoute);
  console.log('  ✅ /api (subscribe)');

  console.log('  Loading /api (subscribePathway)');
  app.use('/api',                   subscribePathwayRoute);
  console.log('  ✅ /api (subscribePathway)');

  console.log('  Loading /api (course)');
  app.use('/api',                   courseRoute);
  console.log('  ✅ /api (course)');
  
  console.log('✅ All routes registered successfully!\n');
} catch (e) {
  console.error('❌ Error registering routes:', e.message);
  console.error(e.stack);
  process.exit(1);
}

// ── Serve Frontend (production) ───────────────────────────────────────────────
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// SPA fallback - serve index.html for any unmatched routes
app.get('/', (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(404).json({ error: 'Frontend not found' });
    }
  });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('❌ Unhandled error:', err.message);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
});