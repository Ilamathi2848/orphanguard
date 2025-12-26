const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const saved = await Feedback.create(req.body);
    res.status(201).json({ message: 'Feedback saved', saved });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
