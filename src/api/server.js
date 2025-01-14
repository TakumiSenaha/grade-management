"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite3 = __importStar(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path = __importStar(require("path"));
const PORT = 3000;
/**
 * Opens a connection to the SQLite database.
 *
 * @returns {Promise<Database>} A promise that resolves to the database connection.
 */
const getDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sqlite_1.open)({
        filename: path.join(__dirname, '../../db/database.sqlite'),
        driver: sqlite3.Database,
    });
});
/**
 * Starts the Express server and sets up the API endpoints.
 *
 * @returns {Promise<void>} A promise that resolves when the server has started.
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const db = yield getDatabase();
    /**
     * Handles GET requests to `/api/classes`.
     * - If `classNumber` is provided in the query, returns the class data for the given number.
     * - Otherwise, returns all classes in the database.
     *
     * @param {express.Request} req The request object.
     * @param {express.Response} res The response object.
     */
    app.get('/api/classes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { classNumber } = req.query;
        try {
            if (classNumber) {
                const classData = yield db.get('SELECT * FROM classes WHERE classNumber = ?', [classNumber]);
                if (classData) {
                    res.json(classData);
                }
                else {
                    res.status(404).json({ error: 'Class not found' });
                }
            }
            else {
                const classes = yield db.all('SELECT * FROM classes');
                res.json(classes);
            }
        }
        catch (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    app.listen(PORT, () => {
        console.log(`API server running on http://localhost:${PORT}`);
    });
});
// Start the server
startServer().catch((err) => {
    console.error('Failed to start the server:', err);
});
