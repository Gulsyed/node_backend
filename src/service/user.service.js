// Importing async error handler and User model
const { asyncHandler } = require("../helper/async-error.helper"); // Error handler for async functions
const User = require("../model/user.model"); // Mongoose model for User collection

// Function to find a user based on provided information (e.g., email or ID)
const FindUser = async (info) => {
  return asyncHandler(async () => {
    const user = await User.findOne(info).exec(); // Find user matching the info, executes the query
    return user ? user.toJSON() : false; // Return user data as JSON if found, otherwise return false
  });
};

// Function to create a new user with the provided information
const CreateUser = async (info) => {
  return asyncHandler(async () => {
    const user = new User(info); // Create a new User instance with provided data

    const savedUser = await user.save(); // Save user to database
    return savedUser instanceof User ? savedUser.toJSON() : false; // Return saved user data as JSON if saved successfully, otherwise return false
  });
};

// Export the FindUser and CreateUser functions for use in other parts of the application
module.exports = {
  FindUser,
  CreateUser,
};
