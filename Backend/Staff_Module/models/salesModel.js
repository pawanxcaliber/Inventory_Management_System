// Staff_Module/models/salesModel.js
const mongoose = require('mongoose');

const staffSalesSchema = new mongoose.Schema({
  inventoryItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StaffInventory'
  },
  quantity: Number,
  totalPrice: Number,
  date: Date
});

const StaffSale = mongoose.model('StaffSale', staffSalesSchema, 'staff_sales');

module.exports = StaffSale;