const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Username is required'] },
  email: { type: String, unique: [true, 'This Email is already in use'], required: [true, 'Email is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  role: {
    type: String,
    enum: ['candidate', 'voter'],
    required: [true, 'Role is required'],
    default: "voter"
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
