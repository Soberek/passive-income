"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const sqliteDbService_1 = __importDefault(require("./services/sqliteDbService"));
const app = (0, express_1.default)();
const PORT = 3003;
const dbPath = "../sqliteDb.db"; // Path to your SQLite database file
// Database connection
const dbService = new sqliteDbService_1.default({ dbPath });
// dbService.insertSchool({ name: "Test School", address: "123 Test St", phone: "123-456-7890" }); // Example usage of the database service
console.log(dbService.getAll("schools")); // Example usage of the database service
// Middlewares
app.use(express_1.default.static("public")); // Serve static files from the public directory
app.use(express_1.default.json());
// Routes
app.use("/", index_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
