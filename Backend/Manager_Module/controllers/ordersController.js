const Order = require('../models/ordersModel');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

exports.approveOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndUpdate(orderId, { status: 'approved' }, { new: true });
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error approving order' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndUpdate(orderId, { status: 'cancelled' }, { new: true });
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items').exec();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('items').exec();
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving order' });
  }
};