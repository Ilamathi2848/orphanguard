const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

router.post('/', async (req, res) => {
  try {
    const saved = await Donation.create(req.body);
    res.status(201).json({ message: 'Donation recorded', saved });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
