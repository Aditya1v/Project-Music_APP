const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router();

// APIs for authentication
router.post('/register', authController.registerUser) //for new user 
router.post('/login', authController.loginUser) //for login user
router.post('/logout', authController.logoutUser) //for logout user

module.exports = router;