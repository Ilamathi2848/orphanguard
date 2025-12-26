const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

router.post('/', async (req, res) => {
  try {
    const saved = await Volunteer.create(req.body);
    res.status(201).json({ message: 'Volunteer registered', saved });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
