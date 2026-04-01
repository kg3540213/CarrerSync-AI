const router = require('express').Router();
const ctrl   = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/dashboard',           ctrl.getDashboard);
router.get('/enrolled',            ctrl.getEnrolled);
router.get('/course/enrolled-ids', ctrl.getEnrolledIds);
router.get('/cart',                ctrl.getCart);
router.get('/course/count',        ctrl.getCartCount);
router.post('/course-toggle',      ctrl.toggleCart);
router.post('/course/finalize-payment', ctrl.finalizePayment);
router.get('/user-pathways',       ctrl.getUserPathways);
router.post('/pathway-subscribe',  ctrl.togglePathway);

module.exports = router;