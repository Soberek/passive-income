import { ProgramCoordinatorRepository } from "./program_coordinator.repository";
import { ProgramCoordinatorService } from "./program_coordinator.service";
import { ProgramCoordinatorController } from "./program_coordinator.controller";
import SqliteDbService from "../../database/sqlite_db.service";
import { Router } from "express";

const router = Router();
const programCoordinatorRepository = new ProgramCoordinatorRepository(SqliteDbService.getInstance());
const programCoordinatorService = new ProgramCoordinatorService(programCoordinatorRepository);
const programCoordinatorController = new ProgramCoordinatorController(programCoordinatorService);

router.get("/program-coordinators", programCoordinatorController.getAll);
router.get("/program-coordinators/:id", programCoordinatorController.getById);
router.post("/program-coordinators", programCoordinatorController.add);

export default router;
