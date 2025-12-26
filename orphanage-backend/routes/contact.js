const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/', async (req, res) => {
  try {
    const saved = await Contact.create(req.body);
    res.status(201).json({ message: 'Contact saved', saved });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
