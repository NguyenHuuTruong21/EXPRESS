const mongoose = require('mongoose');

const productReportSchema = new mongoose.Schema({
  order_report_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderReport', required: true },
  product_id: { type: Number, required: true },
  total_sold: { type: Number, required: true },
  revenue: { type: Number, required: true },
  cost: { type: Number, required: true },
  profit: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ProductReport', productReportSchema);
