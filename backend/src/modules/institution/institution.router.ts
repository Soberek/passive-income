import { Router } from "express";
import sqliteDbService from "../../database/sqlite_db.service";
import { InstitutionRepository } from "./institution.repository";
import { InstitutionsService } from "./institutions.service";
import { InstitutionController } from "./institution.controller";
const router = Router();
const dbService = sqliteDbService.getInstance();
const institutionRepository = new InstitutionRepository(dbService);
const institutionsService = new InstitutionsService(institutionRepository);
const institutionController = new InstitutionController(institutionsService);

router.get("/institutions", institutionController.getAllInstitutions);
router.get("/institutions/:id", institutionController.getInstitutionById);
router.post("/institutions", institutionController.createInstitution);
router.put("/institutions/:id", institutionController.updateInstitution);
router.delete("/institutions/:id", institutionController.deleteInstitution);

export { router as institutionRouter };
