import express from 'express';
import { getDatabase, getClassByNumber, getAllClasses } from '../utils/db';
import { handleApiError } from '../utils/errorHandler';

const PORT = 3000;

/**
 * Starts the Express server and sets up the API endpoints.
 *
 * Endpoints:
 * - **GET** `/api/classes`: Retrieves all classes.
 * - **GET** `/api/classes?classNumber=<code>`: Retrieves a specific class by its code.
 */
const startServer = async (): Promise<void> => {
  const app = express();
  const db = await getDatabase();

  /**
   * Handles requests to `/api/classes`.
   *
   * - If `classNumber` is provided, retrieves the class with the specified code.
   * - Otherwise, retrieves all classes.
   */
  app.get('/api/classes', async (req, res) => {
    const { classNumber } = req.query;

    try {
      if (classNumber) {
        const classData = await getClassByNumber(db, classNumber as string);
        if (classData) {
          res.json(classData);
        } else {
          res.status(404).json({ error: 'Class not found' });
        }
      } else {
        const classes = await getAllClasses(db);
        res.json(classes);
      }
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start the server:', err);
});
