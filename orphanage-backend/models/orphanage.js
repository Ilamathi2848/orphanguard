const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  age: Number,
  shortBio: String,
  photo: String,
  consentForPublishing: { type: Boolean, default: false },
  interests: String
});

const OrphanageSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },   // example: "sunshine-home"

  name: { type: String, required: true },
  tagline: String,

  short: String,          // short about text
  description: String,    // full about text
  mission: String,        // mission statement

  location: String,
  phone: String,
  email: String,
  visitingHours: String,
  established: Number,

  coverImage: String,     // top banner image
  gallery: [String],      // image array
  facilities: [String],   // list of features

  counts: {
    children: { type: Number, default: 0 },
    volunteers: { type: Number, default: 0 },
    staff: { type: Number, default: 0 }
  },

  donationIntro: String,
  donationBreakdown: [String],

  volunteerIntro: String,

  children: [ChildSchema],   // child profiles list

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Orphanage', OrphanageSchema);
