import { Router } from "express";
import SchoolController from "../controllers/schoolController";

const schoolRouter = Router();
const schoolController = new SchoolController();

// TODO schoolRouter.get("/:id", schoolController.getSchoolById);
// TODO schoolRouter.delete("/:id", schoolController.deleteSchool);
// TODO schoolRouter.put("/:id", schoolController.updateSchool);

// Route: /api/school - GET - Get all schools
schoolRouter.get("/school", schoolController.getAllSchools);
// Route: /api/school - POST - Create a new school
schoolRouter.post("/school", schoolController.createSchool);

export default schoolRouter;
