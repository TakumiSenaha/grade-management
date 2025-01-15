'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.handleApiError = void 0;
/**
 * Handles API errors by logging the error and sending a standardized response.
 *
 * @param {NextApiResponse | Response} res - The response object to send the error message.
 * @param {any} error - The error object or message to handle.
 */
const handleApiError = (res, error) => {
  console.error('Error:', error);
  res
    .status(500)
    .json({ error: 'Internal Server Error', details: error.message });
};
exports.handleApiError = handleApiError;
