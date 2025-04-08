import express, { Request, Response } from "express";
import indexRouter from "./routes/index";
import sqliteDbService from "./services/sqliteDbService";

const app = express();
const PORT = 3003;
const dbPath = "../sqliteDb.db"; // Path to your SQLite database file

// Database connection
const dbService = new sqliteDbService({ dbPath });
// dbService.insertSchool({ name: "Test School", address: "123 Test St", phone: "123-456-7890" }); // Example usage of the database service
console.log(dbService.getAll("schools")); // Example usage of the database service

// Middlewares
app.use(express.static("public")); // Serve static files from the public directory
app.use(express.json());

// Routes
app.use("/", indexRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
