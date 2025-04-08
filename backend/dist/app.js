"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const sqliteDbService_1 = __importDefault(require("./services/sqliteDbService"));
const app = (0, express_1.default)();
const PORT = 3004;
const dbPath = "./sqliteDb.db"; // Path to your SQLite database file
// Database connection
try {
    const dbService = new sqliteDbService_1.default({ dbPath });
    console.log(dbService.getAll("schools")); // Example usage of the database service
}
catch (error) {
    console.error("Error initializing database service:", error);
}
// Middlewares
app.use(express_1.default.static("public")); // Serve static files from the public directory
app.use(express_1.default.json());
// Routes
app.use("/", index_1.default);
app.get("/api/schools", (req, res) => {
    const dbService = new sqliteDbService_1.default({ dbPath });
    const schools = dbService.getAll("schools");
    res.json(schools);
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
