const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Routes
router.post('/add', userController.addUser);
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;