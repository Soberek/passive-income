import { Router } from "express";
import { ActionTypeController } from "../controllers/action_type.controller";
import { ActionTypeService } from "../services/action_type.service";
import { ActionTypeRepository } from "../repositories/action_type.repository";
import sqliteDbService from "../services/sqliteDbService";

const actionTypeRouter = Router();
const dbService = sqliteDbService.getInstance();
const actionTypeRepository = new ActionTypeRepository(dbService);
const actionTypeService = new ActionTypeService(actionTypeRepository);
const actionTypeController = new ActionTypeController(actionTypeService);

actionTypeRouter.get("/action-types", actionTypeController.getAllActionTypes);
actionTypeRouter.get("/action-types/:id", actionTypeController.getActionTypeById);
actionTypeRouter.post("/action-types", actionTypeController.addActionType);
actionTypeRouter.put("/action-types/:id", actionTypeController.updateActionType);
actionTypeRouter.delete("/action-types/:id", actionTypeController.deleteActionType);
export { actionTypeRouter };
