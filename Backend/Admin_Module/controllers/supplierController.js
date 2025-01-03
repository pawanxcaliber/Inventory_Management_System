// controllers/supplierController.js
const Supplier = require('../models/supplierModel');

exports.createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSuppliers = async (req, res) => {
    console.log('Calling getSuppliers function');
    try {
      console.log('Trying to fetch suppliers');
      const suppliers = await Supplier.find();
      console.log('Suppliers fetched successfully');
      res.json(suppliers);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      res.status(500).json({ message: 'Error fetching suppliers', error: err.message });
    }
  };

exports.getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};