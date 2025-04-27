import { Router } from "express";
import SchoolController from "../controllers/schoolController";

const schoolRouter = Router();
const schoolController = new SchoolController();

// TODO schoolRouter.put("/:id", schoolController.updateSchool);

schoolRouter.get("/school", schoolController.getAllSchools); // Route: /api/school - GET - Get all schools
schoolRouter.post("/school", schoolController.createSchool); // Route: /api/school - POST - Create a new school
schoolRouter.delete("/:id", schoolController.deleteSchool); // Route: /api/school/:id - DELETE - Delete a school by ID
schoolRouter.get("/:id", schoolController.getSchoolById); // Route: /api/school/:id - GET - Get a school by ID

export default schoolRouter;
