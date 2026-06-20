const { listingSchema, reviewSchema } = require('../utils/schemas');
const { AppError } = require('../utils/AppError');

/**
 * Validates req.body against the Joi listing schema.
 * Throws a 400 AppError with Joi's message if validation fails.
 */
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map(d => d.message).join(', ');
    return next(new AppError(msg, 400));
  }
  next();
};

/**
 * Validates req.body against the Joi review schema.
 */
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map(d => d.message).join(', ');
    return next(new AppError(msg, 400));
  }
  next();
};

module.exports = { validateListing, validateReview };
