"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middlewares
app.use(express_1.default.static("public")); // Serve static files from the public directory
app.use(express_1.default.json());
// Routes
app.use("/", index_js_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
