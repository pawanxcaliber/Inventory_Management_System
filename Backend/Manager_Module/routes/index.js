const express = require('express');
const router = express.Router();
const inventoryRoutes = require('./inventoryRoutes');
const orderRoutes = require('./orderRoutes');
const salesRoutes = require('./salesRoutes');
const notificationRoutes = require('./notificationRoutes');

router.use('/inventory', inventoryRoutes);
router.use('/orders', orderRoutes);
router.use('/sales', salesRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;