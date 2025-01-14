const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');

router.post('/', orderController.createOrder);
router.put('/:id/approve', orderController.approveOrder);
router.put('/:id/cancel', orderController.cancelOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router;