const express = require('express');
const router = express.Router();
const controller = require('../controllers/listings');
const { validateListing } = require('../middleware/validate');
const { isLoggedIn, isOwner } = require('../middleware/auth');

// Index & Create
router.route('/')
  .get(controller.index)
  .post(isLoggedIn, validateListing, controller.create);

// New form — must be before /:id to avoid "new" being treated as an id
router.get('/new', isLoggedIn, controller.renderNewForm);

// Show, Update, Delete
router.route('/:id')
  .get(controller.show)
  .put(isLoggedIn, isOwner, validateListing, controller.update)
  .delete(isLoggedIn, isOwner, controller.destroy);

// Edit form
router.get('/:id/edit', isLoggedIn, isOwner, controller.renderEditForm);

module.exports = router;
