const Listing = require('../models/Listing');
const { AppError } = require('../utils/AppError');

// Check if user is logged in
exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  req.flash('error', 'You must be logged in to do that');
  res.redirect('/login');
};

// Check if user is the owner of the listing
exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    return next(new AppError('Listing not found', 404));
  }

  if (!listing.owner.equals(req.session.userId)) {
    return next(new AppError('You do not have permission to do that', 403));
  }

  next();
};
