const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const register = async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.toLowerCase().trim() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();
    return res.status(201).json({ token: user.generateJWT() });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: 'An account with that email already exists' });
    }
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Registration failed:', error.message);
    return res.status(500).json({ message: 'Unable to register user' });
  }
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  return passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ message: info?.message || 'Authentication failed' });
    try {
      return res.status(200).json({ token: user.generateJWT() });
    } catch (tokenError) {
      return next(tokenError);
    }
  })(req, res, next);
};

module.exports = { register, login };
