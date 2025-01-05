const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/create', orderController.createOrder);
router.get('/get', orderController.getOrders);
router.put('/update-status/:id', orderController.updateOrderStatus);
router.put('/cancel/:id', orderController.cancelOrder);

module.exports = router;