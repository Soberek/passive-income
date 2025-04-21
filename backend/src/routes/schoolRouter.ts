import { Router } from "express";
import SchoolController from "../controllers/schoolController";

const schoolRouter = Router();
const schoolController = new SchoolController();

schoolRouter.get("/school", schoolController.getAllSchools);
schoolRouter.post("/school", schoolController.createSchool);
// TODO schoolRouter.delete("/:id", schoolController.deleteSchool);
// TODO schoolRouter.put("/:id", schoolController.updateSchool);

export default schoolRouter;
