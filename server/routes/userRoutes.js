const express = require('express');
const userController = require('../controllers/userController');
const { signup, login } = userController;
const userAuth = require('../middleware/userAuth');
const router = express.Router();

// Signup endpoint 
// Passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup);

// Login endpoint
router.post('/login', login);

module.exports = router;
