import { Router } from "express";
import SchoolController from "../controllers/school.controller";
import SchoolService from "../services/school.service";
import { SchoolRepository } from "../repositories/school.repository";
import { InstitutionsService } from "../services/institutionsService";

const schoolRouter = Router();
const schoolRepository = new SchoolRepository();
const schoolService = new SchoolService(schoolRepository);
const institutionsService = new InstitutionsService();
const schoolController = new SchoolController(schoolService, institutionsService);

// Implementing the updateSchool route
schoolRouter.get("/school", schoolController.getAllSchools); // Route: /api/school - GET - Get all schools
schoolRouter.post("/school", schoolController.createSchool); // Route: /api/school - POST - Create a new school
schoolRouter.delete("/school/:id", schoolController.deleteSchool); // Route: /api/school/:id - DELETE - Delete a school by ID
schoolRouter.get("/school/:id", schoolController.getSchoolById); // Route: /api/school/:id - GET - Get a school by ID
schoolRouter.put("/school/:id", schoolController.updateSchool); // Route: /api/school/:id - PUT - Update a school by ID
schoolRouter.get("/school/institution/:institutionId", schoolController.getSchoolByInstitutionId); // Route: /api/school/institution/:institutionId - GET - Get a school by institution ID

export default schoolRouter;
