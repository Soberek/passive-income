"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
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
}
// Initialize the Express application
const expressApp = new ExpressApp();
expressApp.run();
expressApp.initRoutes();
expressApp.initErrorHandling();
