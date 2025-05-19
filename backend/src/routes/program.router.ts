import { ProgramRepository } from "../repositories/program.repository";
import ProgramService from "../services/program.service";
import ProgramController from "../controllers/program.controller";

import { Router } from "express";

const programRouter = Router();
const programRepository = new ProgramRepository();
const programService = new ProgramService(programRepository);
const programController = new ProgramController(programService);

// Implementing the updateProgram route
programRouter.post("/program", programController.createProgram); // Route: /api/program - POST - Create a new program
programRouter.get("/program", programController.getAllPrograms); // Route: /api/program - GET - Get all programs
programRouter.delete("/program/:id", programController.deleteProgram); // Route: /api/program/:id - DELETE - Delete a program by ID
programRouter.get("/program/:id", programController.getProgramById); // Route: /api/program/:id - GET - Get a program by ID
programRouter.put("/program/:id", programController.updateProgram); // Route: /api/program/:id - PUT - Update a program by ID
programRouter.post("/program/bulk", programController.bulkCreatePrograms); // Route: /api/program/bulk - POST - Create multiple programs

export default programRouter;
