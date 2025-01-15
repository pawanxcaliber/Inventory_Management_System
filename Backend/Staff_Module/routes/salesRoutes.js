// Staff_Module/routes/salesRoutes.js remains the same
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/record-sale', salesController.recordSale);

module.exports = router;