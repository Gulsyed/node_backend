// Load environment variables from .env file
require("dotenv").config();

// Importing required modules
const express = require("express"); // Framework for creating the server and handling routes
const app = express(); // Creating an instance of express
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing
require("./model/index"); // Import database connection setup

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS for all routes, allowing all origins (*)
app.use(cors("*"));

// Setting the port from environment variables or using default 4001
const PORT = process.env.PORT || 4001;

// Import user-related routes
const userRoutes = require("./routes/user.routes");

// Mount the user routes under /api path
app.use("/api", userRoutes);

// Handle all undefined routes, responding with a 404 error
app.all("*", function (req, res) {
    return sendResponse(res, 404, false, "Page Not Found"); // Send custom 404 response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log server start and port
});
