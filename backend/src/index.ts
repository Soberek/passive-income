import ExpressApp from "./app";

// Initialize the Express application
const expressApp = new ExpressApp();
expressApp.run();
expressApp.initRoutes();
expressApp.initErrorHandling();
