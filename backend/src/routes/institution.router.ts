import { Router } from "express";
import sqliteDbService from "../services/sqliteDbService";
import { InstitutionRepository } from "../repositories/institution.repository";
import { InstitutionsService } from "../services/institutions.service";
import { InstitutionController } from "../controllers/institution.controller";
const router = Router();
const dbService = sqliteDbService.getInstance();
const institutionRepository = new InstitutionRepository(dbService);
const institutionsService = new InstitutionsService(institutionRepository);
const institutionController = new InstitutionController(institutionsService);

router.get("/institution", institutionController.getAllInstitutions);
router.get("/institutions/:id", institutionController.getInstitutionById);
router.post("/institution", institutionController.createInstitution);
router.put("/institution/:id", institutionController.updateInstitution);
router.delete("/institutions/:id", institutionController.deleteInstitution);

export { router as institutionRouter };
