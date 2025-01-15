// Staff_Module/controllers/salesController.js
const { Item } = require('../../Admin_Module/models/inventoryModel');
const Sale = require('../../Manager_Module/models/salesModel');

exports.recordSale = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const item = await Item.findById(itemId);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      const sale = new Sale(req.body);
      await sale.save();
      res.status(201).json(sale);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error recording sale' });
  }
};