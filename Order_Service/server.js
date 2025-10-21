const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const orderRoutes = require('./routers/orderRoutes');
const orderItemRoutes = require('./routers/orderItemRoutes');

const app = express();
const PORT = 4002;

app.use(cors());
app.use(bodyParser.json());
connectDB();

// Routes
app.use('/orders', orderRoutes);
app.use('/order_items', orderItemRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Order Service running at http://localhost:${PORT}`);
});
