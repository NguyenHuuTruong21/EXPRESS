const OrderItem = require('../models/OrderItem');

// CRUD cơ bản cho order_items
exports.getAllItems = async (req, res) => {
  res.json(await OrderItem.find());
};

exports.getItemById = async (req, res) => {
  const item = await OrderItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Không tìm thấy" });
  res.json(item);
};

exports.createItem = async (req, res) => {
  const item = await OrderItem.create(req.body);
  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {
  const item = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  await OrderItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Đã xóa chi tiết đơn hàng" });
};
