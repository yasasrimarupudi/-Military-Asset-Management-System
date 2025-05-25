const AssetModel = require('../models/assetModel');

// Dashboard
exports.getDashboardMetrics = async (req, res) => {
  try {
    const filters = {
      startDate: req.query.startDate || null,
      endDate: req.query.endDate || null,
      baseId: req.query.baseId ? parseInt(req.query.baseId) : null,
      equipmentType: req.query.equipmentType || null,
    };
    const metrics = await AssetModel.getDashboardMetrics(filters);
    res.json(metrics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNetMovementDetails = async (req, res) => {
  try {
    const assetId = parseInt(req.params.id);
    const details = await AssetModel.getNetMovementDetails(assetId);
    res.json(details);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Purchases
exports.recordPurchase = async (req, res) => {
  try {
    const purchase = req.body;
    const newPurchase = await AssetModel.recordPurchase(purchase);
    res.status(201).json(newPurchase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPurchaseHistory = async (req, res) => {
  try {
    const filters = {
      startDate: req.query.startDate || null,
      endDate: req.query.endDate || null,
      equipmentType: req.query.equipmentType || null,
    };
    const history = await AssetModel.getPurchaseHistory(filters);
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Transfers
exports.transferAsset = async (req, res) => {
  try {
    const transfer = req.body;
    const newTransfer = await AssetModel.transferAsset(transfer);
    res.status(201).json(newTransfer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTransferHistory = async (req, res) => {
  try {
    const filters = {
      startDate: req.query.startDate || null,
      endDate: req.query.endDate || null,
    };
    const history = await AssetModel.getTransferHistory(filters);
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Assignments & Expenditures
exports.assignAsset = async (req, res) => {
  try {
    const assignment = req.body;
    const newAssignment = await AssetModel.assignAsset(assignment);
    res.status(201).json(newAssignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.recordExpenditure = async (req, res) => {
  try {
    const expenditure = req.body;
    const newExpenditure = await AssetModel.recordExpenditure(expenditure);
    res.status(201).json(newExpenditure);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
