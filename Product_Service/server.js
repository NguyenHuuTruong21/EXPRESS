const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối DB
connectDB();

// Routes
const productRoutes = require('./routers/productRoutes');
app.use('/products', productRoutes);

// Chạy service riêng (VD: port 4001)
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🚀 Product_Service running on port ${PORT}`));
