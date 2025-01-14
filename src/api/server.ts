import express from 'express';
import * as sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { open } from 'sqlite';
import * as path from 'path';

const PORT = 3000;


/**
 * Opens a connection to the SQLite database.
 *
 * @returns {Promise<Database>} A promise that resolves to the database connection.
 */
const getDatabase = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  return open({
    filename: path.join(__dirname, '../../db/database.sqlite'),
    driver: sqlite3.Database,
  });
};

/**
 * Starts the Express server and sets up the API endpoints.
 *
 * @returns {Promise<void>} A promise that resolves when the server has started.
 */
const startServer = async (): Promise<void> => {
  const app = express();
  const db = await getDatabase();

  /**
   * Handles GET requests to `/api/classes`.
   * - If `classNumber` is provided in the query, returns the class data for the given number.
   * - Otherwise, returns all classes in the database.
   *
   * @param {express.Request} req The request object.
   * @param {express.Response} res The response object.
   */
  app.get('/api/classes', async (req: express.Request, res: express.Response) => {
    const { classNumber } = req.query;

    try {
      if (classNumber) {
        const classData = await db.get(
          'SELECT * FROM classes WHERE classNumber = ?',
          [classNumber]
        );

        if (classData) {
          res.json(classData);
        } else {
          res.status(404).json({ error: 'Class not found' });
        }
      } else {
        const classes = await db.all('SELECT * FROM classes');
        res.json(classes);
      }
    } catch (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
};

// Start the server
startServer().catch((err) => {
  console.error('Failed to start the server:', err);
});
