import { NextApiResponse } from 'next';
import { Response } from 'express';

/**
 * Handles API errors by logging the error and sending a standardized response.
 *
 * @param {NextApiResponse | Response} res - The response object to send the error message.
 * @param {any} error - The error object or message to handle.
 */
export const handleApiError = (
  res: NextApiResponse | Response,
  error: any,
): void => {
  console.error('Error:', error);
  res
    .status(500)
    .json({ error: 'Internal Server Error', details: error.message });
};
