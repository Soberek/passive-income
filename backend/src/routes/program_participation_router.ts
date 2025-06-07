import { SchoolProgramParticipation } from "../repositories/school_program_participation.repository";
import { SchoolProgramParticipationService } from "../services/school_program_participation.service";
import { Router } from "express";
import SqliteDbService from "../services/sqlite_db.service";
import { SchoolProgramParticipationController } from "../controllers/school_program_participation.controller";

const dbInstance = SqliteDbService.getInstance();
const schoolProgramParticipationRepository = new SchoolProgramParticipation(dbInstance);
const schoolProgramParticipationService = new SchoolProgramParticipationService(schoolProgramParticipationRepository);
const schoolProgramParticipationController = new SchoolProgramParticipationController(
  schoolProgramParticipationService
);

const programParticipationRouter = Router();
programParticipationRouter.post(
  "/school-program-participation",
  schoolProgramParticipationController.addSchoolProgramParticipation
);

programParticipationRouter.get("/program-participation", (req, res) => {
  res.status(200).send("Program participation endpoint is working");
});

export default programParticipationRouter;
