const { Category, Item } = require('../../Admin_Module/models/inventoryModel');
const Supplier = require('../../Admin_Module/models/supplierModel');

exports.addInventoryItem = async (req, res) => {
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
    const inventoryItem = new Item({ ...req.body, category: category._id, supplier: supplier._id });
    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error adding inventory item' });
  }
};

exports.updateInventoryItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedInventoryItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
    } else {
      res.json(updatedInventoryItem);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating inventory item' });
  }
};