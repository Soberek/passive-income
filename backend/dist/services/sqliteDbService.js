"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
// import { v4 as uuidv4 } from "uuid";
class sqliteDbService {
    db;
    static instance;
    // The constructor takes an object with a dbPath property, which is the path to the SQLite database file.
    // constructor is a special method for creating and initializing an object created with a class.
    constructor(params) {
        this.db = (0, better_sqlite3_1.default)(params.dbPath, {
            timeout: 5000,
        });
        this.init();
    }
    // zwraca instancję sqliteDbService
    // singleton pattern zeby nie tworzyc nowej instancji za kazdym razem
    // bede przekazywal do kazdego service czy kontrolera
    static getInstance() {
        if (!sqliteDbService.instance) {
            sqliteDbService.instance = new sqliteDbService({
                dbPath: "./sqliteDb.db",
            });
        }
        return sqliteDbService.instance;
    }
    // tworzenie tabeli w bazie danych, jezeli nie istnieje
    init() { }
    prepare(sql) {
        try {
            const stmt = this.db.prepare(sql);
            return stmt;
        }
        catch (error) {
            console.error("Error preparing SQL statement:", error);
            return null;
        }
    }
    // zwraca wszystkie rekordy z tabeli o podanej nazwie
    // getTable
    getTable(tableName) {
        try {
            const stmt = this.db.prepare(`SELECT * FROM ${tableName}`);
            return stmt.all();
        }
        catch (error) {
            console.error(`Error fetching all records from ${tableName}:`, error);
            return [];
        }
    }
}
exports.default = sqliteDbService;
