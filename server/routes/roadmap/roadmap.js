const router = require('express').Router();
const ctrl   = require('../../controllers/roadmapController');
const { protect } = require('../../middleware/auth');

router.use(protect);

router.post('/',             ctrl.generate);
router.get('/history',       ctrl.getHistory);
router.delete('/history/:id', ctrl.deleteOne);

module.exports = router;