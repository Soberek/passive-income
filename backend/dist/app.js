"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
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
class ExpressApp {
    app;
    PORT = 3005;
    constructor() {
        this.app = (0, express_1.default)();
        this.initMiddlewares();
    }
    // Initialize middlewares
    // This method is responsible for initializing the middlewares used in the application.
    initMiddlewares() {
        // Middleware for parsing JSON requests
        this.app.use(express_1.default.json());
        // Middleware for serving static files from the "public" directory
        this.app.use(express_1.default.static("public"));
        // Middleware for logging requests
        this.app.use((req, res, next) => {
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
        this.app.use("/", index_1.default);
    }
    // Initialize error handling
    initErrorHandling() {
        // Middleware for handling errors
        this.app.use((err, req, res, next) => {
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
}
exports.default = ExpressApp;
