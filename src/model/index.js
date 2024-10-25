// Importing configuration and Mongoose library
const config = require("../config/config"); // Load configuration settings (e.g., database URI)
const mongoose = require("mongoose"); // MongoDB library for managing connections and models

// Connecting to MongoDB using Mongoose with specified options for compatibility
mongoose
  .connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to database URI with options
  .then(() => {
    console.log("Connected successfully to database:", config.db); // Log successful connection
  })
  .catch((error) => {
    console.error("Error connecting to database:", config.db, error); // Log error if connection fails
    // Throw error to optionally handle it in a higher-level context or terminate the application
    throw error;
  });

// Accessing the Mongoose connection object
const db = mongoose.connection;

// Event listener for MongoDB connection errors
db.on("error", (error) => {
  console.error("MongoDB connection error:", error); // Log errors in case of connectivity issues
  // Additional error handling or cleanup can be done here if necessary
});
