const express = require('express');
const router = express.Router();
const Orphanage = require('../models/orphanage');   // <-- using MongoDB model

// --------------------------------------------------
// GET all orphanages
// --------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const orphanages = await Orphanage.find().lean();
    res.json(orphanages);
  } catch (error) {
    console.error("Error loading orphanages:", error);
    res.status(500).json({ error: "Failed to load orphanages" });
  }
});

// --------------------------------------------------
// GET orphanage by ID (example: /api/orphanages/sunshine-home)
// --------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const orphanageId = req.params.id;
    const orphanage = await Orphanage.findOne({ id: orphanageId }).lean();

    if (!orphanage) {
      return res.status(404).json({ error: "Orphanage not found" });
    }

    res.json(orphanage);
  } catch (error) {
    console.error("Error fetching orphanage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
