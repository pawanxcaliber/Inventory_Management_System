const Sale = require('../models/salesModel');
const Inventory = require('../models/inventoryModel');

exports.recordSale = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.body.inventoryItemId);
    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
    } else {
      const sale = new Sale(req.body);
      await sale.save();
      res.status(201).json(sale);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error recording sale' });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('inventoryItemId');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sales' });
  }
};

exports.getSalesByDate = async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const sales = await Sale.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('inventoryItemId');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sales by date' });
  }
};