const { verifyAccessToken } = require('../utils/jwt');

/**
 * protect — verifies Bearer token and attaches req.user = { userId, email, role }
 * Also exported as `authMiddleware` for backward compatibility with old routes/auth.js
 */
const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });

  const decoded = verifyAccessToken(auth.split(' ')[1]);
  if (!decoded) return res.status(401).json({ error: 'Invalid or expired token' });

  req.user = decoded;
  next();
};

// Alias for legacy routes/auth.js that imports { authMiddleware }
const authMiddleware = protect;

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
  if (!roles.includes(req.user.role))
    return res.status(403).json({ error: 'Insufficient permissions' });
  next();
};

const requireAdmin = requireRole('admin');
const requireUser  = requireRole('user', 'admin');

module.exports = { protect, authMiddleware, requireRole, requireAdmin, requireUser };