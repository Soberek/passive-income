import { Router } from "express";
import SchoolController from "../controllers/school.controller";
import SchoolService from "../services/school.service";
import { SchoolRepository } from "../repositories/school.repository";
import { InstitutionRepository } from "../repositories/institution.repository";

const schoolRouter = Router();
const schoolRepository = new SchoolRepository();
const institutionRepository = new InstitutionRepository(); // Assuming you have a repository for institutions
const schoolService = new SchoolService(schoolRepository, institutionRepository);
const schoolController = new SchoolController(schoolService);

// Implementing the updateSchool route
schoolRouter.post("/school", schoolController.createSchool); // Route: /api/school - POST - Create a new school
schoolRouter.get("/school", schoolController.getAllSchools); // Route: /api/school - GET - Get all schools
schoolRouter.delete("/school/:id", schoolController.deleteSchool); // Route: /api/school/:id - DELETE - Delete a school by ID
schoolRouter.get("/school/:id", schoolController.getSchoolById); // Route: /api/school/:id - GET - Get a school by ID
schoolRouter.put("/school/:id", schoolController.updateSchool); // Route: /api/school/:id - PUT - Update a school by ID

schoolRouter.get("/school/institution/:institutionId", schoolController.getSchoolByInstitutionId); // Route: /api/school/institution/:institutionId - GET - Get a school by institution ID

export default schoolRouter;
