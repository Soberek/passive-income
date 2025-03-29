"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello from Express + TypeScript!");
});
router.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});
exports.default = router;
