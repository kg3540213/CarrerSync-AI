
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// GET /api/admin/active-users
router.get('/active-users', async (req, res) => {
  try {
    const users = await User.find({}).select('email firstName lastName createdAt');
    res.json({ count: users.length, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;