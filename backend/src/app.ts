import express, { Request, Response } from "express";
import indexRouter from "./routes/index";

class ExpressApp {
  private app;
  private PORT: number = 3005;
  constructor() {
    this.app = express();
    this.initMiddlewares();
  }

  // Initialize middlewares
  // This method is responsible for initializing the middlewares used in the application.
  initMiddlewares() {
    // Middleware for parsing JSON requests
    this.app.use(express.json());
    // Middleware for serving static files from the "public" directory
    this.app.use(express.static("public"));
    // Middleware for logging requests
    this.app.use((req: Request, res: Response, next: () => void) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
  }

  run() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }

  // Initialize routes
  initRoutes() {
    // Define the routes for the application
    // The indexRouter is imported from the routes directory and is used to handle requests to the root URL ("/").
    this.app.use("/", indexRouter);
  }

  // Initialize error handling
  initErrorHandling() {
    // Middleware for handling errors
    this.app.use(
      (err: Error, req: Request, res: Response, next: () => void) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
      }
    );
  }
  // Initialize database connection
}

// Initialize the Express application
const expressApp = new ExpressApp();
expressApp.run();
expressApp.initRoutes();
expressApp.initErrorHandling();
