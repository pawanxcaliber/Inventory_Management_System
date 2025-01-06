const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/record', salesController.recordSale);
router.get('/get', salesController.getSales);
router.get('/get-by-date', salesController.getSalesByDate);

module.exports = router;