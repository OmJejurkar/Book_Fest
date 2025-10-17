const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['social', 'website', 'location', 'other'],
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Link', linkSchema);
