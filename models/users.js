const {Schema, model} = require('mongoose');

const userSchema = {
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: false,
  },
}

module.exports = model('User', userSchema);