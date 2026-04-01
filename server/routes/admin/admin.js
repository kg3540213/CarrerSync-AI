const router = require('express').Router();
const ctrl   = require('../controllers/adminController');
const { protect, requireAdmin } = require('../middleware/auth');

router.use(protect, requireAdmin);

router.get('/stats',             ctrl.getStats);
router.get('/users',             ctrl.getAllUsers);
router.patch('/users/:id/role',  ctrl.updateUserRole);
router.delete('/users/:id',      ctrl.deleteUser);

module.exports = router;