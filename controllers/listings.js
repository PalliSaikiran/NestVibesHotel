const Listing = require('../models/Listing');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800';

// ─── INDEX ─────────────────────────────────────────────────────────────────
// GET /listings
const index = catchAsync(async (req, res) => {
  const { category, search, sort } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title:    { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { country:  { $regex: search, $options: 'i' } }
    ];
  }

  let query = Listing.find(filter);
  if (sort === 'price_asc')  query = query.sort({ price: 1 });
  if (sort === 'price_desc') query = query.sort({ price: -1 });
  if (sort === 'newest')     query = query.sort({ createdAt: -1 });

  const listings = await query.lean();

  const categories = ['Apartment', 'House', 'Villa', 'Cabin', 'Studio', 'Condo', 'Other'];

  res.render('listings/index', {
    listings,
    categories,
    currentCategory: category || '',
    currentSearch: search || '',
    currentSort: sort || ''
  });
});

// ─── NEW FORM ──────────────────────────────────────────────────────────────
// GET /listings/new
const renderNewForm = (req, res) => {
  if (!req.session.userId) {
    req.flash('error', 'You must be logged in to create a listing');
    return res.redirect('/login');
  }
  const categories = ['Apartment', 'House', 'Villa', 'Cabin', 'Studio', 'Condo', 'Other'];
  res.render('listings/new', { categories });
};

// ─── CREATE ────────────────────────────────────────────────────────────────
// POST /listings
const create = catchAsync(async (req, res) => {
  if (!req.session.userId) {
    req.flash('error', 'You must be logged in to create a listing');
    return res.redirect('/login');
  }

  const data = req.body.listing;
  if (!data.image || data.image.trim() === '') {
    data.image = DEFAULT_IMAGE;
  }
  data.owner = req.session.userId;
  const listing = new Listing(data);
  await listing.save();
  req.flash('success', `"${listing.title}" has been listed successfully!`);
  res.redirect(`/listings/${listing._id}`);
});

// ─── SHOW ──────────────────────────────────────────────────────────────────
// GET /listings/:id
const show = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
    .populate({
      path: 'reviews',
      options: { sort: { createdAt: -1 } }
    })
    .populate('owner');

  if (!listing) {
    return next(new AppError('Listing not found', 404));
  }

  const avgRating = listing.reviews.length
    ? (listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviews.length).toFixed(1)
    : null;

  const isOwner = req.session.userId && listing.owner && listing.owner._id.toString() === req.session.userId;

  res.render('listings/show', { listing, avgRating, isOwner });
});

// ─── EDIT FORM ─────────────────────────────────────────────────────────────
// GET /listings/:id/edit
const renderEditForm = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(new AppError('Listing not found', 404));

  const categories = ['Apartment', 'House', 'Villa', 'Cabin', 'Studio', 'Condo', 'Other'];
  res.render('listings/edit', { listing, categories });
});

// ─── UPDATE ────────────────────────────────────────────────────────────────
// PUT /listings/:id
const update = catchAsync(async (req, res, next) => {
  const data = req.body.listing;
  if (!data.image || data.image.trim() === '') {
    data.image = DEFAULT_IMAGE;
  }
  const listing = await Listing.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true, runValidators: true }
  );
  if (!listing) return next(new AppError('Listing not found', 404));

  req.flash('success', `"${listing.title}" has been updated!`);
  res.redirect(`/listings/${listing._id}`);
});

// ─── DELETE ────────────────────────────────────────────────────────────────
// DELETE /listings/:id
const destroy = catchAsync(async (req, res, next) => {
  const listing = await Listing.findByIdAndDelete(req.params.id);
  if (!listing) return next(new AppError('Listing not found', 404));

  req.flash('success', `"${listing.title}" has been removed.`);
  res.redirect('/listings');
});

module.exports = { index, renderNewForm, create, show, renderEditForm, update, destroy };
