const express = require('express');
const router = express.Router();
const inventoryRoutes = require('./inventoryRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/inventory', inventoryRoutes);
router.use('/orders', orderRoutes);

module.exports = router;