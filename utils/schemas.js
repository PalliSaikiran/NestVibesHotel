const Joi = require('joi');

// ─── Listing Schema ────────────────────────────────────────────────────────
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.min': 'Title must be at least 3 characters.',
      'string.max': 'Title cannot exceed 100 characters.',
      'any.required': 'Title is required.'
    }),
    description: Joi.string().min(10).max(1000).required().messages({
      'string.min': 'Description must be at least 10 characters.',
      'any.required': 'Description is required.'
    }),
    price: Joi.number().min(0).required().messages({
      'number.min': 'Price cannot be negative.',
      'any.required': 'Price is required.'
    }),
    location: Joi.string().min(2).required().messages({
      'any.required': 'Location is required.'
    }),
    country: Joi.string().min(2).required().messages({
      'any.required': 'Country is required.'
    }),
    image: Joi.string().uri().allow('', null).messages({
      'string.uri': 'Image must be a valid URL.'
    }),
    category: Joi.string()
      .valid('Apartment', 'House', 'Villa', 'Cabin', 'Studio', 'Condo', 'Other')
      .required()
  }).required()
});

// ─── Review Schema ─────────────────────────────────────────────────────────
const reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().min(5).max(500).required().messages({
      'string.min': 'Review must be at least 5 characters.',
      'any.required': 'Review body is required.'
    }),
    rating: Joi.number().min(1).max(5).required().messages({
      'number.min': 'Rating must be between 1 and 5.',
      'number.max': 'Rating must be between 1 and 5.',
      'any.required': 'Rating is required.'
    })
  }).required()
});

module.exports = { listingSchema, reviewSchema };
