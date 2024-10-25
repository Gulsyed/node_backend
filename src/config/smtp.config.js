// Define the smtpConfig object for SMTP (Simple Mail Transfer Protocol) configuration
let smtpConfig = {
  // Set the email service provider (e.g., Gmail, SES, etc.) from environment variable
  service: process.env.SMTP_SERVICE,

  // Authentication details for the SMTP server
  auth: {
    user: process.env.SMTP_USER, // SMTP username from environment variable
    pass: process.env.SMTP_PASS, // SMTP password from environment variable
  },
};

// Export the smtpConfig object so it can be used in other parts of the application
module.exports = smtpConfig;
