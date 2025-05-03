import express, { Request, Response } from "express";
import indexRouter from "./routes/index";
import schoolRouter from "./routes/school.router";
import cors from "cors";
import contactRouter from "./routes/contact.router";
import izrzRouter from "./routes/izrz.router";
import multer from "multer";

// JWT installation and usage
// Step 1. Install the jsonwebtoken package
// npm install jsonwebtoken
// Step 2. Import the jsonwebtoken package
// import jwt from "jsonwebtoken";
// Step 3. Create a secret key
// This key will be used to sign the token
// jwt.sign(payload, secretKey, options);
// Step 4. Create a function to generate a token
// this function will take a payload and return a token to a user
// client will store the token in local storage
// and send it in the Authorization header in the request
// the token will be used to authenticate the user
// Step 5. Create a function to verify a token in the middleware
// this function will take a token and verify it
// if the token is valid, it will call the next middleware
// if the token is not valid, it will return an error
// if the token is valid, it will return the decoded payload
// Step 6. Create a function to decode a token
// and use it in your application

export default class ExpressApp {
  private app;
  private PORT: number = 3000;
  private multer: multer.Multer;

  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.multer = multer({
      storage: multer.memoryStorage(),
    });
  }

  // Initialize middlewares
  // This method is responsible for initializing the middlewares used in the application.
  initMiddlewares() {
    // Middleware for parsing JSON requests
    this.app.use(express.json());
    // Middleware for serving static files from the "public" directory
    this.app.use(express.static("public"));
    // Middleware for logging requests
    this.app.use((req: Request, _: Response, next: () => void) => {
      console.log(`${req.method} ${req.url}`);
      console.log(req.body);
      next();
    });
    // Middleware for handling CORS (Cross-Origin Resource Sharing)
    // This middleware allows requests from a specific origin (in this case, http://localhost:5174)
    // It's prevents cross-origin issues when the frontend and backend are running on different ports.
    // CORS is a security feature implemented by web browsers to prevent malicious websites from making requests to other domains.
    // By default, browsers block cross-origin requests unless the server explicitly allows them.
    this.app.use(
      cors({
        allowedHeaders: ["Content-Type", "Content-Disposition"],
        exposedHeaders: ["Content-Disposition"], // Expose Content-Disposition to frontend
        origin: (origin, callback) => {
          if (!origin || origin.startsWith("http://localhost")) {
            callback(null, true); // allow localhost:any
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true, // if you're using cookies or auth headers
      })
    );
  }

  run() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }

  // Initialize routes
  initRoutes() {
    // The indexRouter is imported from the routes directory and is used to handle requests to the root URL ("/").
    this.app.use("/", indexRouter);

    // The schoolRouter is imported from the routes directory and is used to handle requests to the "/api" URL.
    this.app.use("/api", schoolRouter);

    this.app.use("/api", contactRouter);

    this.app.use("/api", this.multer.single("templateFile"), izrzRouter);
  }

  // Initialize error handling
  initErrorHandling() {
    // Middleware for handling errors
    this.app.use((err: Error, _: Request, res: Response, next: () => void) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
  }

  onAppStop() {
    this.app.addListener("SIGINT", () => {
      console.log("Received SIGINT. Shutting down...");

      // Perform any cleanup tasks here
    });
  }

  // Initialize database connection
}
