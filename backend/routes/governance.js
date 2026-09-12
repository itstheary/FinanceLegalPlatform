const express = require('express');
const Governance = require('../models/Governance');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all governance records
router.get('/:companyId', authenticateToken, async (req, res) => {
  try {
    const records = await Governance.find({ companyId: req.params.companyId })
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create governance record
router.post('/', authenticateToken, async (req, res) => {
  try {
    const record = new Governance(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update governance record
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const record = await Governance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
