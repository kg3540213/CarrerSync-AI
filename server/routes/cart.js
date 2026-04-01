const router = require('express').Router();
const ctrl   = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', ctrl.register);
router.post('/login',    ctrl.login);
router.post('/refresh',  ctrl.refresh);
router.get('/me',        protect, ctrl.me);
router.post('/logout',   protect, ctrl.logout);

module.exports = router;