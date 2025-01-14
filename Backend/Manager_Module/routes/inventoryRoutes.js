const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/items', inventoryController.addInventoryItem);
router.put('/items/:id', inventoryController.updateInventoryItem);

module.exports = router;