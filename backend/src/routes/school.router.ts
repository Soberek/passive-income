import { Router } from "express";
import SchoolController from "../controllers/school.controller";
import SchoolService from "../services/school.service";
import { SchoolRepository } from "../repositories/school.repository";
import { InstitutionRepository } from "../repositories/institution.repository";
import sqliteDbService from "../services/sqliteDbService";

const schoolRouter = Router();
const schoolRepository = new SchoolRepository();
const dbService = sqliteDbService.getInstance();
const institutionRepository = new InstitutionRepository(dbService); // Assuming you have a repository for institutions
const schoolService = new SchoolService(schoolRepository, institutionRepository);
const schoolController = new SchoolController(schoolService);

// Implementing the updateSchool route
schoolRouter.post("/schools", schoolController.createSchool); // Route: /api/schools - POST - Create a new school
schoolRouter.get("/schools", schoolController.getAllSchools); // Route: /api/schools - GET - Get all schools
schoolRouter.delete("/schools/:id", schoolController.deleteSchool); // Route: /api/schools/:id - DELETE - Delete a school by ID
schoolRouter.get("/schools/:id", schoolController.getSchoolById); // Route: /api/schools/:id - GET - Get a school by ID
schoolRouter.patch("/schools/:id", schoolController.updateSchool); // Route: /api/schools/:id - PATCH - Update a school by ID

schoolRouter.get("/schools/institution/:institutionId", schoolController.getSchoolByInstitutionId); // Route: /api/schools/institution/:institutionId - GET - Get a school by institution ID

export default schoolRouter;
