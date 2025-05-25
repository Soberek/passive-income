import { Router } from "express";
import sqliteDbService from "../services/sqlite_db.service";
import { InstitutionRepository } from "../repositories/institution.repository";
import { InstitutionsService } from "../services/institutions.service";
import { InstitutionController } from "../controllers/institution.controller";
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
