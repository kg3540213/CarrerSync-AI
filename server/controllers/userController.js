const User = require('../models/User');
const Roadmap = require('../models/Roadmap');

// ─── Dashboard Stats ───────────────────────────────────────────────
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const roadmapCount = await Roadmap.countDocuments({ userId: req.user.userId });

    res.json({
      stats: {
        enrolledCourses: user.enrolledCourses.length,
        subscribedPaths: user.subscribedPaths.length,
        cartItems:        user.cartItems.length,
        roadmaps:         roadmapCount,
      },
      enrolledCourses: user.enrolledCourses,
      subscribedPaths: user.subscribedPaths,
      cartItems:        user.cartItems,
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

// ─── Cart ──────────────────────────────────────────────────────────
exports.getCart = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ cartItems: user.cartItems });
};

exports.toggleCart = async (req, res) => {
  try {
    const { resourceId, addedToCart } = req.body;
    const user = await User.findById(req.user.userId);
    if (addedToCart) {
      if (!user.cartItems.includes(resourceId)) user.cartItems.push(resourceId);
    } else {
      user.cartItems = user.cartItems.filter(id => id !== resourceId);
    }
    await user.save();
    res.json({ cartItems: user.cartItems });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getCartCount = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ count: user.cartItems.length });
};

// ─── Pathways ─────────────────────────────────────────────────────
exports.getUserPathways = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ pathwayIds: user.subscribedPaths });
};

exports.togglePathway = async (req, res) => {
  try {
    const { pathwayId, subscribed } = req.body;
    const user = await User.findById(req.user.userId);
    if (subscribed) {
      if (!user.subscribedPaths.includes(pathwayId)) user.subscribedPaths.push(pathwayId);
    } else {
      user.subscribedPaths = user.subscribedPaths.filter(id => id !== pathwayId);
    }
    await user.save();
    res.json({ pathwayIds: user.subscribedPaths });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

// ─── Courses (enrolled after payment) ────────────────────────────
exports.getEnrolledIds = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ enrolledIds: user.enrolledCourses });
};

exports.getEnrolled = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ resourceIds: user.enrolledCourses });
};

exports.finalizePayment = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    // Move all cart items to enrolled
    for (const id of user.cartItems) {
      if (!user.enrolledCourses.includes(id)) user.enrolledCourses.push(id);
    }
    user.cartItems = [];
    await user.save();
    res.json({ message: 'Payment finalized', enrolledCourses: user.enrolledCourses });
  } catch (e) { res.status(500).json({ error: e.message }); }
};