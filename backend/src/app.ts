import express, { Request, Response } from "express";
import indexRouter from "./routes/index";
import sqliteDbService from "./services/sqliteDbService";

const app = express();
const PORT = 3004;
const dbPath = "./sqliteDb.db"; // Path to your SQLite database file

// Database connection
// Initialize the SQLite database service singleton instance
const dbService = sqliteDbService.getInstance();

// Middlewares
app.use(express.static("public")); // Serve static files from the public directory
app.use(express.json());

// Routes
app.use("/", indexRouter);

// app.get("/api/schools", (req: Request, res: Response) => {
//   const schools = dbService.getAll("schools");
//   res.json(schools);
// });

// app.post("/api/schools", (req: Request, res: Response) => {
//   const { id, name, address, phone } = req.body;
//   const newSchool = { id, name, address, phone };
//   const result = dbService.insertSchool(newSchool);
//   if (result) {
//     res.status(201).json({ message: "School added successfully", id: result });
//   } else {
//     res.status(500).json({ message: "Error adding school" });
//   }
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
