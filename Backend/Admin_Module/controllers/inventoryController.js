// controllers/inventoryController.js
const { Category, Item } = require('../models/inventoryModel');

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
      const items = await Item.find().populate('category');
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
      const item = new Item({ ...req.body, category: category._id });
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