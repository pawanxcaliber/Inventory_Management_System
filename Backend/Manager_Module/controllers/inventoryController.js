const Inventory = require('../models/inventoryModel');

exports.addInventoryItem = async (req, res) => {
  try {
    const inventoryItem = new Inventory(req.body);
    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding inventory item' });
  }
};

exports.updateInventoryItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedInventoryItem = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
    } else {
      res.json(updatedInventoryItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory item' });
  }
};