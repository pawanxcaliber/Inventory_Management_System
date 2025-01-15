// Staff_Module/controllers/inventoryController.js
const { Item } = require('../../Admin_Module/models/inventoryModel');

exports.updateStockQuantity = async (req, res) => {
  try {
    const inventoryItemId = req.params.id;
    const quantitySold = req.body.quantitySold;

    const inventoryItem = await Item.findById(inventoryItemId);
    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
    } else {
      const newQuantity = inventoryItem.quantity - quantitySold;
      if (newQuantity < 0) {
        res.status(400).json({ message: 'Insufficient stock' });
      } else {
        inventoryItem.quantity = newQuantity;
        await inventoryItem.save();

        // Flag low-stock items for restocking
        if (inventoryItem.quantity <= inventoryItem.threshold) {
          // Send low-stock notification logic will go here
        }

        res.json(inventoryItem);
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock quantity' });
  }
};

exports.getInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Item.find().select('-__v');
    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving inventory items' });
  }
};