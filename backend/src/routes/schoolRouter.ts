import { Router } from "express";
import SchoolController from "../controllers/schoolController";

const schoolRouter = Router();
const schoolController = new SchoolController();

schoolRouter.get("/", schoolController.getAllSchools);
schoolRouter.post("/", schoolController.createSchool);
// TODO schoolRouter.delete("/:id", schoolController.deleteSchool);
// TODO schoolRouter.put("/:id", schoolController.updateSchool);
