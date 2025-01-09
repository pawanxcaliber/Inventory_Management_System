// Admin_Module/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/sales-report', reportController.getSalesReport);
router.get('/stock-report', reportController.getStockReport);

module.exports = router;