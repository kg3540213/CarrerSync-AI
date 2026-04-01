const User = require('../models/User');
const Roadmap = require('../models/Roadmap');

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalRoadmaps] = await Promise.all([
      User.countDocuments(),
      Roadmap.countDocuments(),
    ]);
    res.json({ totalUsers, totalRoadmaps });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken').sort({ createdAt: -1 });
    res.json({ users, count: users.length });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role))
      return res.status(400).json({ error: 'Invalid role' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};