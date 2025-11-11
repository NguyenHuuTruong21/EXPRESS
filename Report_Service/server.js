const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const reportRoutes = require('./routers/reportRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(bodyParser.json());

app.use('/reports', reportRoutes);

app.listen(PORT, () => {
  console.log(`📊 Report Service running at http://localhost:${PORT}`);
});
