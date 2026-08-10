const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
});

userSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(32).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function validPassword(password) {
  const candidate = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512');
  const stored = Buffer.from(this.hash, 'hex');
  return candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored);
};

userSchema.methods.generateJWT = function generateJWT() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = mongoose.model('User', userSchema);
