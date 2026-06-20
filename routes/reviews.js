const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/reviews');
const { validateReview } = require('../middleware/validate');

router.post('/', validateReview, controller.create);
router.delete('/:reviewId', controller.destroy);

module.exports = router;
