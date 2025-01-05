const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stockQuantity: Number
});

const Inventory = mongoose.model('Inventory', inventorySchema, 'inventories');

module.exports = Inventory;