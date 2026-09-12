const express = require('express');
const Alert = require('../models/Alert');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all alerts for company
router.get('/:companyId', authenticateToken, async (req, res) => {
  try {
    const { status } = req.query;
    const query = { companyId: req.params.companyId };
    
    if (status === 'unread') query.isRead = false;
    if (status === 'unresolved') query.isResolved = false;

    const alerts = await Alert.find(query).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark alert as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(alert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark alert as resolved
router.put('/:id/resolve', authenticateToken, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { isResolved: true }, { new: true });
    res.json(alert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
