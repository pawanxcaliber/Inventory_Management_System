const { Category, Item } = require('../models/inventoryModel');
const Supplier = require('../models/supplierModel');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      res.json({ message: 'No categories found' });
    } else {
      res.json(categories);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('category').populate('supplier');
    if (items.length === 0) {
      res.json({ message: 'No items found in the inventory' });
    } else {
      res.json(items);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const categoryName = req.body.category;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }
    const supplierName = req.body.supplier;
    const supplier = await Supplier.findOne({ name: supplierName });
    if (!supplier) {
      return res.status(400).json({ message: 'Supplier not found' });
    }
    const item = new Item({ ...req.body, category: category._id, supplier: supplier._id });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.linkSupplierToItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const supplierId = req.body.supplierId;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    item.supplier = supplierId;
    await item.save();

    res.json({ message: 'Supplier linked to item successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};