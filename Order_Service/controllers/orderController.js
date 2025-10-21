const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const axios = require('axios');

const PRODUCT_SERVICE_URL = "http://localhost:4001"; // Gọi sang Product_Service

// Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

// Tạo đơn hàng mới (có kiểm tra tồn kho)
exports.createOrder = async (req, res) => {
  try {
    const { customer_name, customer_email, items } = req.body;

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      // Kiểm tra tồn kho trong Product_Service
      const productRes = await axios.get(`${PRODUCT_SERVICE_URL}/products/${item.product_id}`);
      const product = productRes.data;

      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Sản phẩm '${product.name}' không đủ tồn kho` });
      }

      // Tính toán giá
      const total_price = product.price * item.quantity;
      total += total_price;

      orderItems.push({
        product_id: product._id,
        product_name: product.name,
        quantity: item.quantity,
        unit_price: product.price,
        total_price
      });
    }

    // Lưu đơn hàng
    const newOrder = await Order.create({
      customer_name,
      customer_email,
      total_amount: total
    });

    // Lưu chi tiết đơn hàng
    for (const item of orderItems) {
      await OrderItem.create({ ...item, order_id: newOrder._id });
    }

    res.status(201).json({ message: "Tạo đơn hàng thành công!", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tạo đơn hàng thất bại", error: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status, updated_at: Date.now() }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({ message: "Cập nhật thành công", order });
};

// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  await OrderItem.deleteMany({ order_id: req.params.id });
  res.json({ message: "Đã xóa đơn hàng" });
};
