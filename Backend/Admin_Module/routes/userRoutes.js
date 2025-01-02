// routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const inventoryController = require('../controllers/inventoryController');

// User Routes
router.post('/add', userController.addUser);
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Inventory Routes
router.get('/inventory/categories', inventoryController.getCategories);
router.post('/inventory/categories', inventoryController.createCategory);
router.get('/inventory/items', inventoryController.getItems);
router.post('/inventory/items', inventoryController.createItem);
router.put('/inventory/items/:id', inventoryController.updateItem);
router.delete('/inventory/items/:id', inventoryController.deleteItem);

module.exports = router;