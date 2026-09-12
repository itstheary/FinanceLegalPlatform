const express = require('express');
const FinancialRecord = require('../models/FinancialRecord');
const Alert = require('../models/Alert');
const Company = require('../models/Company');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get financial dashboard
router.get('/dashboard/:companyId', authenticateToken, async (req, res) => {
  try {
    const { companyId } = req.params;
    const { startDate, endDate } = req.query;

    const query = { companyId };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const records = await FinancialRecord.find(query);
    
    const income = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const expenses = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
    
    const netProfit = income - expenses;
    const profitMargin = income > 0 ? ((netProfit / income) * 100).toFixed(2) : 0;

    const company = await Company.findById(companyId);
    if (profitMargin < company.financialThresholds.minProfitMargin) {
      const existingAlert = await Alert.findOne({
        companyId,
        type: 'financial',
        title: 'Low Profit Margin Alert',
        isResolved: false,
      });
      if (!existingAlert) {
        const alert = new Alert({
          companyId,
          type: 'financial',
          severity: 'high',
          title: 'Low Profit Margin Alert',
          description: `Profit margin dropped below ${company.financialThresholds.minProfitMargin}%`,
        });
        await alert.save();
      }
    }

    res.json({
      income,
      expenses,
      netProfit,
      profitMargin,
      recordCount: records.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add financial record
router.post('/record', authenticateToken, async (req, res) => {
  try {
    const record = new FinancialRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all records for company
router.get('/records/:companyId', authenticateToken, async (req, res) => {
  try {
    const records = await FinancialRecord.find({ companyId: req.params.companyId })
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
