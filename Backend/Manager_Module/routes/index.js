const express = require('express');
const router = express.Router();
const inventoryRoutes = require('./inventoryRoutes');
const orderRoutes = require('./ordersRoutes');
const salesRoutes = require('./salesRoutes');

router.use('/inventory', inventoryRoutes);
router.use('/orders', orderRoutes);
router.use('/sales', salesRoutes); 

module.exports = router;