const router = require('express').Router();
const ctrl   = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect);

// ── Cart Operations ────────────────────────────────────────────────────────
router.get('/',                  ctrl.getCart);
router.post('/toggle',           ctrl.toggleCart);
router.get('/count',             ctrl.getCartCount);
router.post('/finalize-payment', ctrl.finalizePayment);
router.get('/clear',             async (req, res) => {
  try {
    const user = await (require('../models/User')).findById(req.user.userId);
    user.cartItems = [];
    await user.save();
    res.json({ message: 'Cart cleared', cartItems: [] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;