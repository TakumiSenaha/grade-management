import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import * as path from 'path';

/**
 * Opens a connection to the SQLite database.
 *
 * @returns {Promise<Database<sqlite3.Database, sqlite3.Statement>>} 
 * A promise that resolves to a Database object for SQLite interactions.
 */
export const getDatabase = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  const dbPath = path.resolve(process.cwd(), 'db/database.sqlite');
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};

/**
 * Retrieves a specific class by its class number from the database.
 *
 * @param {Database} db - The database connection object.
 * @param {string} classNumber - The class number to search for.
 * @returns {Promise<any>} A promise that resolves to the class data, or `undefined` if not found.
 */
export const getClassByNumber = async (db: Database, classNumber: string): Promise<any> => {
  return db.get('SELECT * FROM classes WHERE code = ?', [classNumber]);
};

/**
 * Retrieves all classes from the database.
 *
 * @param {Database} db - The database connection object.
 * @returns {Promise<any[]>} A promise that resolves to an array of all class data.
 */
export const getAllClasses = async (db: Database): Promise<any[]> => {
  return db.all('SELECT * FROM classes');
};
