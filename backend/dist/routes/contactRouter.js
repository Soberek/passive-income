"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = __importDefault(require("../controllers/contactController"));
const contactRouter = (0, express_1.Router)();
const contactController = new contactController_1.default();
contactRouter.get("/contact", contactController.getContacts);
contactRouter.post("/contact", contactController.addContact);
exports.default = contactRouter;
