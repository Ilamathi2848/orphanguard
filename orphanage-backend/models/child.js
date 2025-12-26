const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  firstName: String,
  age: Number,
  shortBio: String,
  photo: String,
  consentForPublishing: { type: Boolean, default: false },
  interests: String
}, { _id: false });

module.exports = childSchema;
