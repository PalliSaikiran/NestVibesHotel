const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const listingRoutes = require('./routes/listings');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const { AppError } = require('./utils/AppError');

const app = express();

// ─── Database Connection ───────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/NestVibes';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ─── View Engine ───────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'nestvibes_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

// Make flash messages, current URL, and user available in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentPath = req.path;
  res.locals.currentUser = req.session.userId ? { id: req.session.userId, username: req.session.username } : null;
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.redirect('/listings'));

app.use('/listings', listingRoutes);
app.use('/listings/:id/reviews', reviewRoutes);
app.use(authRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────
app.all(/.*/, (req, res, next) => {
  next(new AppError('Page Not Found', 404));
});

// ─── Global Error Handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).render('error', { status, message });
});

// ─── Server ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏠 NestVibes running at http://localhost:${PORT}`);
});

module.exports = app;
