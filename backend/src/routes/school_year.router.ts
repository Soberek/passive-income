import { Router } from "express";
import { SchoolYearController } from "../controllers/school_year.controller";
import { SchoolYearService } from "../services/school_year.service";
import { SchoolYearRepository } from "../repositories/school_year.repository";

import sqliteDbService from "../services/sqliteDbService";

const schoolYearRouter = Router();
const dbService = sqliteDbService.getInstance();
const schoolYearRepository = new SchoolYearRepository(dbService);
const schoolYearService = new SchoolYearService(schoolYearRepository);
const schoolYearController = new SchoolYearController(schoolYearService);

schoolYearRouter.get("/schoolYears", schoolYearController.getAllSchoolYears);
schoolYearRouter.get("/schoolYears/:id", schoolYearController.getSchoolYearById);
schoolYearRouter.post("/schoolYears", schoolYearController.createSchoolYear);
schoolYearRouter.put("/schoolYears/:id", schoolYearController.updateSchoolYear);
schoolYearRouter.delete("/schoolYears/:id", schoolYearController.deleteSchoolYear);

export { schoolYearRouter };
