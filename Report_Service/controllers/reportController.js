const axios = require('axios');
const OrderReport = require('../models/OrderReport');
const ProductReport = require('../models/ProductReport');

// Lấy tất cả báo cáo sản phẩm
exports.getAllProductReports = async (req, res) => {
  try {
    const reports = await ProductReport.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product reports' });
  }
};

// Lấy chi tiết báo cáo sản phẩm
exports.getProductReportById = async (req, res) => {
  try {
    const report = await ProductReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product report' });
  }
};

// Lấy tất cả báo cáo đơn hàng
exports.getAllOrderReports = async (req, res) => {
  try {
    const reports = await OrderReport.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order reports' });
  }
};

// Lấy chi tiết báo cáo đơn hàng
exports.getOrderReportById = async (req, res) => {
  try {
    const report = await OrderReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Order report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order report' });
  }
};

// Tạo báo cáo sản phẩm mới
exports.createProductReport = async (req, res) => {
  try {
    const productsRes = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products`);
    const products = productsRes.data;

    const reports = [];
    for (const p of products) {
      const cost = p.price * 0.6; 
      const profit = p.price - cost;
      const report = await ProductReport.create({
        order_report_id: null,
        product_id: p.id,
        total_sold: 0,
        revenue: 0,
        cost,
        profit
      });
      reports.push(report);
    }

    res.json({ message: 'Product reports generated', reports });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error creating product reports' });
  }
};

// Tạo báo cáo đơn hàng
exports.createOrderReport = async (req, res) => {
  try {
    const ordersRes = await axios.get(`${process.env.ORDER_SERVICE_URL}/orders`);
    const orders = ordersRes.data;

    const reports = [];

    for (const order of orders) {
      const totalRevenue = order.total_amount;
      const totalCost = totalRevenue * 0.6; 
      const totalProfit = totalRevenue - totalCost;

      const orderReport = await OrderReport.create({
        order_id: order.id,
        total_revenue: totalRevenue,
        total_cost: totalCost,
        total_profit: totalProfit
      });

      reports.push(orderReport);
    }

    res.json({ message: 'Order reports generated', reports });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error creating order reports' });
  }
};

// Xóa báo cáo sản phẩm
exports.deleteProductReport = async (req, res) => {
  try {
    await ProductReport.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product report deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product report' });
  }
};

// Xóa báo cáo đơn hàng
exports.deleteOrderReport = async (req, res) => {
  try {
    await OrderReport.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order report deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order report' });
  }
};
