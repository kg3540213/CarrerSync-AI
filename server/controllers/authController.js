const User = require('../models/User');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

const safeUser = (u) => ({
  id: u._id, email: u.email, firstName: u.firstName,
  lastName: u.lastName, role: u.role, profileImageUrl: u.profileImageUrl,
  // Clerk-compatible shape
  primaryEmailAddress: { emailAddress: u.email },
  imageUrl: u.profileImageUrl,
});

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    if (await User.findOne({ email })) return res.status(409).json({ error: 'Email already in use' });

    const user = await User.create({ email, password, firstName, lastName });
    const accessToken  = generateAccessToken(user._id, user.email, user.role);
    const refreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken });

    res.status(201).json({ token: accessToken, refreshToken, user: safeUser(user) });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken  = generateAccessToken(user._id, user.email, user.role);
    const refreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken });

    res.json({ token: accessToken, refreshToken, user: safeUser(user) });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) return res.status(401).json({ error: 'Invalid refresh token' });

    const user = await User.findById(decoded.userId).select('+refreshToken');
    if (!user || user.refreshToken !== refreshToken)
      return res.status(401).json({ error: 'Refresh token mismatch' });

    const accessToken = generateAccessToken(user._id, user.email, user.role);
    res.json({ token: accessToken });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: safeUser(user) });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { refreshToken: null });
    res.json({ message: 'Logged out' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};