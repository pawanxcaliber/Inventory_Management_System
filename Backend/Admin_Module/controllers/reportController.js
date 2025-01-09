// Admin_Module/controllers/reportController.js
const Sales = require('../../Manager_Module/models/salesModel');
const { Item } = require('../models/inventoryModel');

exports.getSalesReport = async (req, res) => {
  try {
    const salesReport = await Sales.find().populate('inventoryItemId');
    res.status(200).json(salesReport);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales report' });
  }
};

exports.getStockReport = async (req, res) => {
  try {
    const stockReport = await Item.find().populate('category').populate('supplier');
    res.status(200).json(stockReport);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stock report' });
  }
};