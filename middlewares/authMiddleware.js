const jwt = require('jsonwebtoken');
const JWT_SECRET = "mysecret123";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // Header phải gửi dạng: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Thiếu token" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token không hợp lệ" });
        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken;
