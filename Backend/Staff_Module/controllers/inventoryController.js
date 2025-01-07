// Staff_Module/controllers/inventoryController.js
const StaffInventory = require('../models/inventoryModel');

exports.updateStockQuantity = async (req, res) => {
  try {
    const inventoryItemId = req.params.id;
    const quantitySold = req.body.quantitySold;

    const inventoryItem = await StaffInventory.findById(inventoryItemId);
    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
    } else {
      inventoryItem.stockQuantity -= quantitySold;
      await inventoryItem.save();

      // Flag low-stock items for restocking
      if (inventoryItem.stockQuantity <= inventoryItem.threshold) {
        // Send low-stock notification logic will go here
      }

      res.json(inventoryItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock quantity' });
  }
};

exports.getInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await StaffInventory.find().select('-__v');
    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving inventory items' });
  }
};