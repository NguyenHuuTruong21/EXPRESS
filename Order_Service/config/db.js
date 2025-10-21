const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/OrderServiceDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB (OrderServiceDB)");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

module.exports = connectDB;
