const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Inventory Routes
router.get('/categories', inventoryController.getCategories);
router.post('/categories', inventoryController.createCategory);
router.get('/items', inventoryController.getItems);
router.post('/items', inventoryController.createItem);
router.put('/items/:id', inventoryController.updateItem);
router.delete('/items/:id', inventoryController.deleteItem);
router.put('/items/:id/link-supplier', inventoryController.linkSupplierToItem);

module.exports = router;