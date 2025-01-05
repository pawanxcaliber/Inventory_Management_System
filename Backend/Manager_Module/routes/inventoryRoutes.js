const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/add', inventoryController.addInventoryItem);
router.put('/update/:id', inventoryController.updateInventoryItem);

module.exports = router;