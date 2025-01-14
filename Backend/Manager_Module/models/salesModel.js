const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  quantity: Number,
  totalPrice: Number,
  date: Date
});

const Sale = mongoose.model('Sale', salesSchema, 'sales');

module.exports = Sale;