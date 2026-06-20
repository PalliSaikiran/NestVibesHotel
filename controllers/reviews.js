const Review = require('../models/Review');
const Listing = require('../models/Listing');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

// ─── CREATE REVIEW ─────────────────────────────────────────────────────────
// POST /listings/:id/reviews
const create = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(new AppError('Listing not found', 404));

  const review = new Review(req.body.review);
  await review.save();

  listing.reviews.push(review._id);
  await listing.save();

  req.flash('success', 'Your review has been posted!');
  res.redirect(`/listings/${listing._id}`);
});

// ─── DELETE REVIEW ─────────────────────────────────────────────────────────
// DELETE /listings/:id/reviews/:reviewId
const destroy = catchAsync(async (req, res, next) => {
  const { id, reviewId } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) return next(new AppError('Listing not found', 404));

  // Pull the review reference out of the listing's array
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete the actual review document
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) return next(new AppError('Review not found', 404));

  req.flash('success', 'Review deleted successfully.');
  res.redirect(`/listings/${id}`);
});

module.exports = { create, destroy };
