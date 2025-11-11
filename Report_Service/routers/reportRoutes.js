const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const verifyToken = require('../middlewares/verifyToken');

// Product Reports
router.get('/products', verifyToken, reportController.getAllProductReports);
router.get('/products/:id', verifyToken, reportController.getProductReportById);
router.post('/products', verifyToken, reportController.createProductReport);
router.delete('/products/:id', verifyToken, reportController.deleteProductReport);

// Order Reports
router.get('/orders', verifyToken, reportController.getAllOrderReports);
router.get('/orders/:id', verifyToken, reportController.getOrderReportById);
router.post('/orders', verifyToken, reportController.createOrderReport);
router.delete('/orders/:id', verifyToken, reportController.deleteOrderReport);

module.exports = router;
