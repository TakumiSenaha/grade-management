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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClasses = exports.getClassByNumber = exports.getDatabase = void 0;
const sqlite3 = __importStar(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path = __importStar(require("path"));
/**
 * Opens a connection to the SQLite database.
 *
 * @returns {Promise<Database<sqlite3.Database, sqlite3.Statement>>}
 * A promise that resolves to a Database object for SQLite interactions.
 */
const getDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbPath = path.resolve(process.cwd(), 'db/database.sqlite');
    return (0, sqlite_1.open)({
        filename: dbPath,
        driver: sqlite3.Database,
    });
});
exports.getDatabase = getDatabase;
/**
 * Retrieves a specific class by its class number from the database.
 *
 * @param {Database} db - The database connection object.
 * @param {string} classNumber - The class number to search for.
 * @returns {Promise<any>} A promise that resolves to the class data, or `undefined` if not found.
 */
const getClassByNumber = (db, classNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return db.get('SELECT * FROM classes WHERE code = ?', [classNumber]);
});
exports.getClassByNumber = getClassByNumber;
/**
 * Retrieves all classes from the database.
 *
 * @param {Database} db - The database connection object.
 * @returns {Promise<any[]>} A promise that resolves to an array of all class data.
 */
const getAllClasses = (db) => __awaiter(void 0, void 0, void 0, function* () {
    return db.all('SELECT * FROM classes');
});
exports.getAllClasses = getAllClasses;
