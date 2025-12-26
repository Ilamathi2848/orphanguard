const Orphanage = require('../models/orphanage');

// GET /api/orphanages/:id
exports.getOrphanageById = async (req, res) => {
  try {
    const id = req.params.id;
    const orphanage = await Orphanage.findOne({ id }).lean();
    if (!orphanage) return res.status(404).json({ message: 'Orphanage not found' });
    res.json(orphanage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET all orphanages (optional)
exports.getAll = async (req, res) => {
  try {
    const list = await Orphanage.find({}, 'id name tagline counts.coverImage').lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
