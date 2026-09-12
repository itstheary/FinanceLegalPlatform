const express = require('express');
const Contract = require('../models/Contract');
const Alert = require('../models/Alert');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all contracts
router.get('/:companyId', authenticateToken, async (req, res) => {
  try {
    const contracts = await Contract.find({ companyId: req.params.companyId })
      .sort({ endDate: 1 });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create contract
router.post('/', authenticateToken, async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    res.status(201).json(contract);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update contract
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contract);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Check contract deadlines
router.post('/check-deadlines/:companyId', authenticateToken, async (req, res) => {
  try {
    const contracts = await Contract.find({ companyId: req.params.companyId, status: 'active' });
    const today = new Date();
    const alerts = [];

    for (const contract of contracts) {
      const daysUntilExpiry = Math.ceil((contract.endDate - today) / (1000 * 60 * 60 * 24));
      if (daysUntilExpiry <= contract.reminderDaysBefore && !contract.alertSent) {
        const alert = new Alert({
          companyId: contract.companyId,
          type: 'contract',
          severity: daysUntilExpiry <= 7 ? 'high' : 'medium',
          title: `Contract Expiring Soon: ${contract.title}`,
          description: `Contract with ${contract.counterparty} expires in ${daysUntilExpiry} days`,
          relatedId: contract._id,
          actionUrl: `/contracts/${contract._id}`,
          dueDate: contract.endDate,
        });
        await alert.save();
        contract.alertSent = true;
        await contract.save();
        alerts.push(alert);
      }
    }

    res.json({ alertsCreated: alerts.length, alerts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
