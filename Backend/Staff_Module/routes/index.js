// Staff_Module/routes/index.js
const express = require('express');
const router = express.Router();
const inventoryRoutes = require('./inventoryRoutes');
const salesRoutes = require('./salesRoutes');

router.use('/inventory', inventoryRoutes);
router.use('/sales', salesRoutes);

module.exports = router;