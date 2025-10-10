const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routers/authRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
connectDB();

// Routes
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running at http://localhost:${PORT}`);
});
