const { verifyAccessToken } = require('../utils/jwt');

const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });

  const decoded = verifyAccessToken(auth.split(' ')[1]);
  if (!decoded) return res.status(401).json({ error: 'Invalid or expired token' });

  req.user = decoded;
  next();
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
  if (!roles.includes(req.user.role))
    return res.status(403).json({ error: 'Insufficient permissions' });
  next();
};

const requireAdmin = requireRole('admin');
const requireUser  = requireRole('user', 'admin');

module.exports = { protect, requireRole, requireAdmin, requireUser };