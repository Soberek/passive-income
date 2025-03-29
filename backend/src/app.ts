import express, { Request, Response } from "express";
import indexRouter from "./routes/index.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.static("public")); // Serve static files from the public directory
app.use(express.json());

// Routes
app.use("/", indexRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
