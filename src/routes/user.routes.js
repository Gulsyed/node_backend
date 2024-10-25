// Import user controller functions for handling requests
const {
  registerUser,  // Handles user registration
  logInUser,     // Handles user login
  getUserDetails // Retrieves user profile details
} = require("../controller/user.controller");

// Import middleware to verify authentication token
const { verifyToken } = require("../middlewares/auth.middlewares");

// Create an instance of Express router
const router = require("express").Router();

// Route for user signup (registration)
router.post("/signup", registerUser); // Calls registerUser function on POST /signup

// Route for user login
router.post("/login", logInUser); // Calls logInUser function on POST /login

// Route for retrieving user profile (protected route)
router.get("/profile", verifyToken, getUserDetails); // Calls verifyToken middleware before getUserDetails function on GET /profile

// Export the router to make these routes accessible in the application
module.exports = router;
