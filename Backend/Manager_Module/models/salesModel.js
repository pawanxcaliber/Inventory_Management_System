const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  inventoryItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory'
  },
  quantity: Number,
  totalPrice: Number,
  date: Date
});

const Sale = mongoose.model('Sale', salesSchema, 'sales');

module.exports = Sale;