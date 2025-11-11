const mongoose = require('mongoose');

const orderReportSchema = new mongoose.Schema({
  order_id: { type: Number, required: true },
  total_revenue: { type: Number, required: true },
  total_cost: { type: Number, required: true },
  total_profit: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('OrderReport', orderReportSchema);
