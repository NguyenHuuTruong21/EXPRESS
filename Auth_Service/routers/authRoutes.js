const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

// API đăng ký
router.post('/register', authController.register);

// API đăng nhập
router.post('/login', authController.login);

// API xác thực token
router.get('/auth', verifyToken, authController.verify);

module.exports = router;
