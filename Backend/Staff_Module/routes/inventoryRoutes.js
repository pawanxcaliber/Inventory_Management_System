// Staff_Module/routes/inventoryRoutes.js remains the same
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.put('/:id/update-stock-quantity', inventoryController.updateStockQuantity);
router.get('/', inventoryController.getInventoryItems);

module.exports = router