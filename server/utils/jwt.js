const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_SECRET  = process.env.JWT_SECRET         || 'access-secret-change-in-prod';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-in-prod';

const generateAccessToken = (userId, email, role = 'user') =>
  jwt.sign({ userId, email, role }, ACCESS_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });

const verifyAccessToken = (token) => {
  try { return jwt.verify(token, ACCESS_SECRET); }
  catch { return null; }
};

const verifyRefreshToken = (token) => {
  try { return jwt.verify(token, REFRESH_SECRET); }
  catch { return null; }
};

// Legacy alias — old routes/auth.js used generateToken
const generateToken = (userId, email, role = 'user') =>
  generateAccessToken(userId, email, role);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateToken, // backward compat
};