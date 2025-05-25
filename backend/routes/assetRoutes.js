const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Dashboard
router.get('/dashboard', roleMiddleware(['Admin', 'BaseCommander', 'LogisticsOfficer']), assetController.getDashboardMetrics);
router.get('/:id/net-movement', roleMiddleware(['Admin', 'BaseCommander', 'LogisticsOfficer']), assetController.getNetMovementDetails);

// Purchases
router.post('/purchases', roleMiddleware(['Admin', 'LogisticsOfficer']), assetController.recordPurchase);
router.get('/purchases', roleMiddleware(['Admin', 'BaseCommander', 'LogisticsOfficer']), assetController.getPurchaseHistory);

// Transfers
router.post('/transfers', roleMiddleware(['Admin', 'LogisticsOfficer']), assetController.transferAsset);
router.get('/transfers', roleMiddleware(['Admin', 'BaseCommander', 'LogisticsOfficer']), assetController.getTransferHistory);

// Assignments & Expenditures
router.post('/assignments', roleMiddleware(['Admin', 'BaseCommander']), assetController.assignAsset);
router.post('/expenditures', roleMiddleware(['Admin', 'BaseCommander']), assetController.recordExpenditure);

module.exports = router;
