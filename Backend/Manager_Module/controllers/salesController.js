const Sale = require('../models/salesModel');
const { Item } = require('../../Admin_Module/models/inventoryModel');

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

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('itemId');
    res.json(sales);
  } catch (error) {
    console.log(error);
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
    }).populate('itemId');
    res.json(sales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving sales by date' });
  }
};