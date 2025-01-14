import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Initializes and returns a SQLite database connection.
 *
 * @returns {Promise<sqlite3.Database>} The database connection object.
 */
const getDatabase = async () => {
  return open({
    filename: './db/database.sqlite',
    driver: sqlite3.Database,
  });
};

/**
 * API handler for fetching class data from the database.
 *
 * - **GET** `/api/classes`: Returns all class data.
 * - **GET** `/api/classes?classNumber=<number>`: Returns data for a specific class based on `classNumber`.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDatabase();

    if (req.method === 'GET') {
      const { classNumber } = req.query;

      if (classNumber) {
        // Fetch specific class data
        const classData = await db.get('SELECT * FROM classes WHERE classNumber = ?', [classNumber]);
        if (classData) {
          res.status(200).json(classData);
        } else {
          res.status(404).json({ error: 'Class not found' });
        }
      } else {
        // Fetch all class data
        const classes = await db.all('SELECT * FROM classes');
        res.status(200).json(classes);
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
