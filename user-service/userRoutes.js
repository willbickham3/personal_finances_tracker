const express = require('express');
const router = express.Router();
const userController = require('./userController');

// POST /api/users - Create a new user (register)
router.post('/', userController.createUser);

// POST /api/users/login - Authenticate a user (login)
router.post('/login', userController.userLogin);

module.exports = router;
