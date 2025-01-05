const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  inventoryItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory'
  },
  quantity: Number,
  totalPrice: Number,
  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled', 'delivered']
  }
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;