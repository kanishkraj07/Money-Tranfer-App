const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config");

function AuthMiddleware(req, res, next) {
    const BearerToken = req.headers.authorization;

    if(!BearerToken || !BearerToken.startsWith("Bearer ")) {
        res.status(403).json({
            messaage: "Request unauthorized"
        })
    }

    const token = BearerToken.split(" ")[1];

    try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = decodedToken.userId;
    next();
    } catch(e) {
        res.status(403).json({
            message: "Request unauthorized"
        })
    }
}

module.exports = {
    AuthMiddleware
}