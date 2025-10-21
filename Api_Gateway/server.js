const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auth_Service
app.use('/auth', async (req, res) => {
    try {
        const url = `${process.env.AUTH_SERVICE_URL}${req.url}`;
        const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: req.headers
    });
    res.status(response.status).json(response.data);
    } catch (error) {
        console.error('AUTH SERVICE ERROR:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Auth Service Error' });
    }
});

// Product_Service
app.use('/products', async (req, res) => {
  try {
    const url = `${process.env.PRODUCT_SERVICE_URL}${req.url}`;
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: req.headers
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('PRODUCT SERVICE ERROR:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Product Service Error' });
  }
});

// Order_Service
app.use('/orders', async (req, res) => {
  try {
    const url = `${process.env.ORDER_SERVICE_URL}${req.url}`;
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('ORDER SERVICE ERROR:', error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: 'Order Service Error' });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});