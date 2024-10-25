/** @format */

// Import the required modules
const smtpConfig = require("../config/smtp.config"); // Import SMTP configuration file
const nodemailer = require("nodemailer"); // Import Nodemailer module for email handling

// Load environment variables for BCC, REPLY_TO, and FROM email addresses
const BCC = process.env.BCC; // Blind carbon copy (BCC) recipients
const REPLY_TO = process.env.REPLY_TO; // Reply-to address for emails
const FROM = process.env.FROM; // From address for emails

// SMTP configuration setup with authentication
const smtpConfigOptions = {
  service: smtpConfig.service, // Define email service (e.g., Gmail, SES, etc.)
  auth: {
    user: smtpConfig.auth.user, // SMTP username from configuration
    pass: smtpConfig.auth.pass, // SMTP password from configuration
  },
};

// Create a Nodemailer transporter instance for sending emails
const transporter = nodemailer.createTransport(smtpConfigOptions);

// Function to send an email with specified mail options
const send = async (mailOptions) => {
  try {
    // Send email with provided mail options
    const info = await transporter.sendMail(mailOptions);
    return info; // Return information about sent email
  } catch (error) {
    throw error; // Throw error if email fails to send
  }
};

// sendEmail function to define email details and call send function
const sendEmail = async (
  to = "", // Recipient email address
  subject = "", // Email subject line
  body = "", // HTML body content for the email
  attachments = [], // Array of attachments for the email
  cc = "" // Optional CC (carbon copy) recipients
) => {
  try {
    // Define mail options with various fields
    const mailOptions = {
      from: FROM, // Sender's email address
      to, // Recipient(s) email address(es)
      subject, // Email subject
      text: "", // Plain text content (optional, empty here)
      html: `<html><body>${body}</html></body>`, // HTML formatted email content
      cc: cc, // CC email addresses
      bcc: BCC, // BCC email addresses
      attachments, // Attachments (if any) to be included in the email
      replyTo: REPLY_TO, // Address to reply to
    };
    // Call send function with mail options to send the email
    await send(mailOptions);
  } catch (error) {
    throw error; // Throw error if send fails
  }
};

// Export sendEmail function for use in other modules
module.exports = {
  sendEmail,
};