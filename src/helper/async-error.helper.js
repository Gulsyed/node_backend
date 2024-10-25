/**
 * Handles asynchronous operations by wrapping them in a try-catch block.
 *
 * @param {Function} asyncOperation - The asynchronous operation to be executed.
 * @returns {Promise<any>} - Resolves with the result of the operation or rejects with an error.
 */
const asyncHandler = async (asyncOperation) => {
  try {
    return await asyncOperation();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * Handles asynchronous operations and logs errors.
 *
 * @param {Function} asyncOperation - The asynchronous operation to execute.
 * @param {Object} response - The response object for handling HTTP responses.
 * @returns {Promise} A Promise that resolves the result of the asyncOperation or an error response.
 */
const asyncErrorHandler = async (asyncOperation, response) => {
  try {
    return await asyncOperation();
  } catch (error) {
    console.error(error);
    // await logErrorToFile(error);
    return response
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

module.exports = { asyncErrorHandler, asyncHandler };
