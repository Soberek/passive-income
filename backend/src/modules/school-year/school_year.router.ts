import { Router } from "express";
import { SchoolYearController } from "./school_year.controller";
import { SchoolYearService } from "./school_year.service";
import { SchoolYearRepository } from "./school_year.repository";

import sqliteDbService from "../../database/sqlite_db.service";

const schoolYearRouter = Router();
const dbService = sqliteDbService.getInstance();
const schoolYearRepository = new SchoolYearRepository(dbService);
const schoolYearService = new SchoolYearService(schoolYearRepository);
const schoolYearController = new SchoolYearController(schoolYearService);

schoolYearRouter.get("/school-years", schoolYearController.getAllSchoolYears);
schoolYearRouter.get("/school-years/:id", schoolYearController.getSchoolYearById);
schoolYearRouter.post("/school-years", schoolYearController.createSchoolYear);
schoolYearRouter.put("/school-years/:id", schoolYearController.updateSchoolYear);
schoolYearRouter.delete("/school-years/:id", schoolYearController.deleteSchoolYear);

export { schoolYearRouter };
