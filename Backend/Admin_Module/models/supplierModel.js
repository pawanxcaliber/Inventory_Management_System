// models/supplierModel.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema, 'suppliers');

module.exports = Supplier;