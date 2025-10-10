const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = "your_secret_key";

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra trùng username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });
    }

    // Tạo user mới
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi đăng ký", error: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra có user trong DB
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: "Sai username hoặc password!" });
  }

  // Tạo JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  user.token = token;
  await user.save();

  res.status(200).json({
    message: "Đăng nhập thành công!",
    token
  });
};

// Xác thực token
exports.verify = async (req, res) => {
  res.json({ message: "Token hợp lệ - Hello World!" });
};
