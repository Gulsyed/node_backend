// Importing required helper functions and modules
const { verifyToken: verifyJWTToken } = require("../helper/jwt.helpers"); // Function to verify JWT tokens
const { sendResponse } = require("../helper/local.helpers"); // Standardized response handling function

// Middleware function to verify token
const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization; // Extract authorization header
  if (auth && auth.startsWith("Bearer")) { // Check if authorization header exists and starts with "Bearer"
    const token = auth.split(" ")[1]; // Extract the token part from "Bearer <token>"
    const tokenData = verifyJWTToken(token); // Verify the token

    if (tokenData === false) {
      // If token verification fails, send 403 Forbidden response
      res.status(403).json({ ok: false, message: "Token is not valid!" });
    } else {
      // If token is valid, add token data to the request object
      req.tokenData = tokenData;
      next(); // Proceed to the next middleware or route handler
    }
  } else {
    // If authorization header is missing or doesn't start with "Bearer"
    return sendResponse(res, 401, false, "You are not authenticated!");
  }
};

module.exports = {
  verifyToken,
};
