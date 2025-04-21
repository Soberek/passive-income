import { Router } from "express";
import SchoolController from "../controllers/schoolController";

const schoolRouter = Router();
const schoolController = new SchoolController();

schoolRouter.get("/", schoolController.getAllSchools);
