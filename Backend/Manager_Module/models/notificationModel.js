const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['low-stock', 'order-status']
  },
  message: String,
  date: Date
});

const Notification = mongoose.model('Notification', notificationSchema, 'notifications');

module.exports = Notification;