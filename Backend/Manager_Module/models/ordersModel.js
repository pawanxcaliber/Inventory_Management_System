const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderDate: Date,
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: Number
    }
  ],
  status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;