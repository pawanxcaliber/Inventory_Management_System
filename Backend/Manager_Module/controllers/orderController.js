const Order = require('../models/orderModel');
const Inventory = require('../models/inventoryModel');

exports.createOrder = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.body.inventoryItemId);
    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
    } else {
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('inventoryItemId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      order.status = req.body.status;
      await order.save();
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      order.status = 'cancelled';
      await order.save();
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order' });
  }
};