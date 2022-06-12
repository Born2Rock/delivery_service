const {Schema, model} = require('mongoose');

const advertisementSchema = {
  shortText: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  images: {
    type: Array,
    of: String,
    required: false
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'Users',
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: Array,
    of: String,
    required: false
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
}

module.exports = model('Advertisement', advertisementSchema);