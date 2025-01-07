// Staff_Module/models/inventoryModel.js
const mongoose = require('mongoose');

const staffInventorySchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stockQuantity: Number,
  threshold: Number // Add a threshold field to flag low-stock items
});

const StaffInventory = mongoose.model('StaffInventory', staffInventorySchema, 'inventories');

module.exports = StaffInventory;