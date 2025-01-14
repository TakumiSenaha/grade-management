import { getDatabase, getClassByNumber, getAllClasses } from '../utils/db';
import { handleApiError } from '../utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler for retrieving class data.
 * 
 * Supported methods:
 * - **GET** `/api/classes`: Retrieves all classes.
 * - **GET** `/api/classes?classNumber=<code>`: Retrieves a specific class by its code.
 * 
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const db = await getDatabase();

    if (req.method === 'GET') {
      const { classNumber } = req.query;

      if (classNumber) {
        const classData = await getClassByNumber(db, classNumber as string);
        if (classData) {
          res.status(200).json(classData);
        } else {
          res.status(404).json({ error: 'Class not found' });
        }
      } else {
        const classes = await getAllClasses(db);
        res.status(200).json(classes);
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    handleApiError(res, error);
  }
}
