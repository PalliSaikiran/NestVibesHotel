const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Review body is required'],
    trim: true,
    minlength: [5, 'Review must be at least 5 characters'],
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
