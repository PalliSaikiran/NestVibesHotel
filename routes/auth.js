const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { AppError } = require('../utils/AppError');

// Show register form
router.get('/register', (req, res) => {
  res.render('register');
});

// Show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Register new user
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return next(new AppError('User with this email or username already exists', 400));
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

    // Set user in session
    req.session.userId = user._id;
    req.session.username = user.username;

    req.flash('success', 'Registration successful! Welcome to NestVibes');
    res.redirect('/listings');
  } catch (error) {
    next(error);
  }
});

// Login user
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Set user in session
    req.session.userId = user._id;
    req.session.username = user.username;

    req.flash('success', 'Welcome back!');
    res.redirect('/listings');
  } catch (error) {
    next(error);
  }
});

// Logout user
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    req.flash('success', 'You have been logged out');
    res.redirect('/listings');
  });
});

module.exports = router;
