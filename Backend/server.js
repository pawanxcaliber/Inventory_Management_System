// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./Admin_Module/routes/userRoutes.js');
const inventoryRoutes = require('./Admin_Module/routes/inventoryRoutes.js');
const supplierRoutes = require('./Admin_Module/routes/supplierRoutes.js');
const managerRoutes = require('./Manager_Module/routes/index.js');

dotenv.config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/manager', managerRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});