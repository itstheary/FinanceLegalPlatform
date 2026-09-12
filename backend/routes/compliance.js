const express = require('express');
const Compliance = require('../models/Compliance');
const Alert = require('../models/Alert');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all compliance items
router.get('/:companyId', authenticateToken, async (req, res) => {
  try {
    const compliance = await Compliance.find({ companyId: req.params.companyId })
      .populate('relatedContracts')
      .populate('relatedFinancials');
    res.json(compliance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create compliance record
router.post('/', authenticateToken, async (req, res) => {
  try {
    const compliance = new Compliance(req.body);
    await compliance.save();

    if (compliance.impact === 'high' && compliance.status !== 'compliant') {
      const alert = new Alert({
        companyId: compliance.companyId,
        type: 'compliance',
        severity: 'high',
        title: `High-Impact Compliance Issue: ${compliance.regulationType}`,
        description: compliance.description,
        relatedId: compliance._id,
        dueDate: compliance.deadline,
      });
      await alert.save();
    }

    res.status(201).json(compliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update compliance status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const compliance = await Compliance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(compliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
