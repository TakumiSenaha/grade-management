'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const db_1 = require('../utils/db');
const errorHandler_1 = require('../utils/errorHandler');
const PORT = 3000;
/**
 * Starts the Express server and sets up the API endpoints.
 *
 * Endpoints:
 * - **GET** `/api/classes`: Retrieves all classes.
 * - **GET** `/api/classes?classNumber=<code>`: Retrieves a specific class by its code.
 */
const startServer = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const db = yield (0, db_1.getDatabase)();
    /**
     * Handles requests to `/api/classes`.
     *
     * - If `classNumber` is provided, retrieves the class with the specified code.
     * - Otherwise, retrieves all classes.
     */
    app.get('/api/classes', (req, res) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const { classNumber } = req.query;
        try {
          if (classNumber) {
            const classData = yield (0, db_1.getClassByNumber)(db, classNumber);
            if (classData) {
              res.json(classData);
            } else {
              res.status(404).json({ error: 'Class not found' });
            }
          } else {
            const classes = yield (0, db_1.getAllClasses)(db);
            res.json(classes);
          }
        } catch (error) {
          (0, errorHandler_1.handleApiError)(res, error);
        }
      }),
    );
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  });
startServer().catch((err) => {
  console.error('Failed to start the server:', err);
});
