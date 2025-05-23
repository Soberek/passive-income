import { ProgramRepository } from "../repositories/program.repository";
import ProgramService from "../services/program.service";
import ProgramController from "../controllers/program.controller";

import { Router } from "express";

const programRouter = Router();
const programRepository = new ProgramRepository();
const programService = new ProgramService(programRepository);
const programController = new ProgramController(programService);

// Implementing the updateProgram route
programRouter.post("/programs", programController.createProgram); // Route: /api/programs - POST - Create a new program
programRouter.get("/programs", programController.getAllPrograms); // Route: /api/programs - GET - Get all programs
programRouter.delete("/programs/:id", programController.deleteProgram); // Route: /api/programs/:id - DELETE - Delete a program by ID
programRouter.get("/programs/:id", programController.getProgramById); // Route: /api/programs/:id - GET - Get a program by ID
programRouter.put("/programs/:id", programController.updateProgram); // Route: /api/programs/:id - PUT - Update a program by ID
programRouter.post("/programs/bulk", programController.bulkCreatePrograms); // Route: /api/programs/bulk - POST - Create multiple programs

export default programRouter;
