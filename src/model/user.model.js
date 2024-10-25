// Import Mongoose for MongoDB interactions and Schema for defining models
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User schema with its fields and validation rules
const userSchema = new Schema(
  {
    // Username field: a required string
    username: { type: String, required: true },

    // Email field: a required, unique string
    email: { type: String, required: true, unique: true },

    // Password field: a required string
    password: { type: String, required: true }
  },
  {
    // Enable automatic timestamps to add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create a User model from the schema, linking it to the "users" collection in MongoDB
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
