const express = require('express');
const app = express();

const authRouter = require('./routers/auth');
const authenticateToken = require('./middlewares/authMiddleware');

app.use(express.json());

// Route test JWT
app.get('/hello', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}` });
});

// Route cho login
app.use('/', authRouter);


app.listen(3000, () => {
  console.log('Server chạy ở http://localhost:3000');
});
