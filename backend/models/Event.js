const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  speaker: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Event', eventSchema);
