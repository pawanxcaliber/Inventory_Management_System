// Staff_Module/controllers/salesController.js
const StaffInventory = require('../models/inventoryModel');
const StaffSale = require('../models/salesModel');

exports.recordSale = async (req, res) => {
  try {
    const inventoryItem = await StaffInventory.findById(req.body.inventoryItemId);
    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
    } else {
      const sale = new StaffSale(req.body);
      await sale.save();
      res.status(201).json(sale);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error recording sale' });
  }
};