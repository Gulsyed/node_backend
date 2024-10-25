// Importing required helper functions and modules
const { asyncErrorHandler } = require("../helper/async-error.helper"); // Handles errors for async functions
const Joi = require('joi'); // Validates request data based on a defined schema
const { hashPassword, comparePassword } = require("../helper/bcrypt.helpers"); // For encrypting and comparing passwords
const { sendResponse } = require("../helper/local.helpers"); // Formats and sends responses in a consistent way
const { FindUser, CreateUser } = require("../service/user.service"); // Functions for database operations related to users
const { createToken } = require("../helper/jwt.helpers"); // Creates JWT tokens for authentication
const { sendEmail } = require("../helper/nodemailer.helper"); // Sends emails
const { getRegistrationBody } = require("../views/email.views"); // Builds the email body for registration

// Controller function to register a new user
const registerUser = async (req, res) => {
  return asyncErrorHandler(async () => { // Wrap the function to catch errors in async functions

    // Define the validation rules for registration request
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(), // Username must be 3-30 characters
      email: Joi.string().email().required(), // Must be a valid email
      password: Joi.string().min(6).required(), // Password must be at least 6 characters
      confirmPwd: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords must match' // Custom message if passwords do not match
      })
    });

    // Validate the request data based on the schema rules
    const { error } = schema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, false, error.details[0].message); // Send an error response if validation fails
    } else {
      const { username, email, password } = req.body;

      // Check if the email already exists in the database
      let existingEmail = await FindUser({ email });
      if (existingEmail) {
        return sendResponse(
          res,
          400,
          false,
          "This email already exists, try using another one or signing in." // Error message if email is already registered
        );
      }

      // Encrypt the password before storing it
      let hashPwd = hashPassword(password);
      let info = {
        username,
        email,
        password: hashPwd,
      };

      // Create a new user in the database
      let user = await CreateUser(info);
      if (!user) {
        return sendResponse(res, 400, false, "Unable to signup."); // Error message if user creation fails
      } else {
        let to = email; // Recipient email
        let subjectHead = `Assignment: Thank you for registering with us!`;
        let body = getRegistrationBody({ username, email, password }); // Create the email body content
        await sendEmail(to, subjectHead, body); // Send welcome email to user

        return sendResponse(res, 200, "User registered successfully."); // Send success message if user is created
      }
    }
  }, res);
};

// Controller function to log in a user
const logInUser = async (req, res) => {
  return asyncErrorHandler(async () => { // Error handling for async function

    // Define validation rules for login
    const schema = Joi.object({
      email: Joi.string().email().required(), // Must be a valid email
      password: Joi.string().min(6).required(), // Password must be at least 6 characters
    });

    // Validate the login request data
    const { error } = schema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, false, error.details[0].message); // Send error if validation fails
    }

    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await FindUser({ email });
    if (!user || !comparePassword(password, user.password)) {
      return sendResponse(res, 401, false, "Invalid credentials."); // Send error if credentials are incorrect
    }

    // Exclude the password field for security before responding
    const { password: hashPassword, ...userWithoutPassword } = user;

    // Generate a JWT token for the user
    const token = createToken({
      ...userWithoutPassword,
    });

    // Send a success response with the token and user data (without the password)
    return sendResponse(res, 200, true, "Login successful.", {
      token,
      user: userWithoutPassword,
    });
  }, res);
};

// Controller function to get user details
const getUserDetails = async (req, res) => {
  return asyncErrorHandler(async () => { // Wrap in asyncErrorHandler to handle async errors
    const { _id } = req.tokenData; // Extract user ID from decoded JWT token data

    // Find the user in the database by ID
    let user = await FindUser({ _id });
    if (!user) {
      return sendResponse(res, 404, false, "User not found."); // Error if user does not exist
    } else {
      // Exclude password for security before responding
      const { password, ...userWithoutPassword } = user;

      // Send a success response with the user data (without password)
      return sendResponse(res, 200, true, "User found successfully.", userWithoutPassword);
    }
  }, res)
}

// Export controller functions to be used in route handlers
module.exports = { registerUser, logInUser, getUserDetails };
