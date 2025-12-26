const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorName: String,
  donorEmail: String,
  amount: Number,
  orphanage: { type: mongoose.Schema.Types.ObjectId, ref: 'Orphanage' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);
