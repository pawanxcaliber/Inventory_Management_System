const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Supplier Routes
router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getSuppliers);
router.get('/:id', supplierController.getSupplier);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;