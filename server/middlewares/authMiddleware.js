const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate requests
exports.authMiddleware = (req, res, next) => {
  try {
    // Extract token from the request headers
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    // If token is missing, return a response with 401 status
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    
    // If token verification succeeds, proceed to the next middleware
    next();
  } catch (error) {
    // If any error occurs during token verification or middleware execution, return a response with 401 status
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token is invalid or missing",
    });
  }
};
