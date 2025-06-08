import { Router } from "express";
import SchoolController from "./school.controller";
import SchoolService from "./school.service";
import { SchoolRepository } from "./school.repository";
import { InstitutionRepository } from "../institution/institution.repository";
import SqliteDbService from "../../database/sqlite_db.service";

const schoolRouter = Router();
const dbService = SqliteDbService.getInstance();

const schoolRepository = new SchoolRepository(dbService);
const institutionRepository = new InstitutionRepository(dbService);
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
