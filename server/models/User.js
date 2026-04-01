const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  firstName: { type: String, default: '' },
  lastName:  { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profileImageUrl: { type: String, default: '' },
  refreshToken: { type: String, select: false },
  enrolledCourses:  [{ type: String }],
  subscribedPaths:  [{ type: String }],
  cartItems:        [{ type: String }],
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', UserSchema);