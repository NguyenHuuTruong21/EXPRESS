const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/userModel');
const router = express.Router();

const SECRET_KEY = "MY_SECRET_KEY";

//
router.post('/login', (req, res) => {
  const { userName, password } = req.body;

  const user = users.find(u => u.userName === userName);
  if (!user) {
    return res.status(401).json({ message: "User không tồn tại" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Sai mật khẩu" });
  }

  const token = jwt.sign({ idUser: user.idUser, userName: user.userName }, SECRET_KEY, { expiresIn: "1h" });

  user.token = token; 

  res.json({ message: "Đăng nhập thành công", token });
});

// API xác thực token
router.get('/auth', (req, res) => {
  const token = req.headers['authorization']?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token không được cung cấp" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token không hợp lệ" });
    res.json({ message: "Token hợp lệ", decoded });
  });
});

module.exports = router;
