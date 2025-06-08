import express, { NextFunction, Request, Response, Express } from "express";

import cors from "cors";

import multer from "multer";
import helmet from "helmet";

// ROUTERS
import { institutionRouter } from "./modules/institution/institution.router";
import programRouter from "./modules/program/program.router";
import { schoolYearRouter } from "./modules/school-year/school_year.router";
import { actionTypeRouter } from "./modules/action-type/action_type.router";
import { mediaPlatformRouter } from "./modules/media-platform/media_platform.router";
import programParticipationRouter from "./modules/school-program-participation/school_program_participation_router";
import contactRouter from "./modules/contact/contact.router";
import izrzRouter from "./modules/izrz-document-generator/izrz.router";
import indexRouter from "./modules/main/index";
import schoolRouter from "./modules/school/school.router";

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
  public app: Express;
  private PORT: number = 3000;
  private multer: multer.Multer;

  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.multer = multer({
      storage: multer.memoryStorage(),
    });

    this.onAppStop();
  }

  // Initialize middlewares
  // This method is responsible for initializing the middlewares used in the application.
  initMiddlewares() {
    // Middleware for parsing JSON requests
    this.app.use(express.json());
    // Middleware for serving static files from the "public" directory
    this.app.use(express.static("public"));

    this.app.use(helmet());
    // Middleware for logging requests
    this.app.use((req: Request, _: Response, next: () => void) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
    // Middleware for handling CORS (Cross-Origin Resource Sharing)
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
    this.app.use("/", indexRouter);

    this.app.use("/api", schoolRouter);

    this.app.use("/api", contactRouter);

    this.app.use("/api", this.multer.single("templateFile"), izrzRouter);

    this.app.use("/api", institutionRouter);

    this.app.use("/api", programRouter);

    this.app.use("/api", schoolYearRouter);

    this.app.use("/api", actionTypeRouter);

    this.app.use("/api", mediaPlatformRouter);

    this.app.use("/api", programParticipationRouter);
  }

  // Initialize error handling
  initErrorHandling() {
    this.app.use((err: Error, _: Request, res: Response, next: () => void) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
  }

  onAppStop() {
    this.app.addListener("SIGINT", () => {
      console.log("Received SIGINT. Shutting down...");

      // stop the server
    });
  }

  // Initialize database connection
}
