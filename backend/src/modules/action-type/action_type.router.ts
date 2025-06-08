import { Router } from "express";
// Make sure the file exists at the correct path and the filename matches (case-sensitive on some systems)
import { ActionTypeController } from "./action_type.controller";
import { ActionTypeService } from "./action_type.service";
import { ActionTypeRepository } from "./action_type.repository";
import SqliteDbService from "../../services/sqlite_db.service";

const actionTypeRouter = Router();
const dbService = SqliteDbService.getInstance();
const actionTypeRepository = new ActionTypeRepository(dbService);
const actionTypeService = new ActionTypeService(actionTypeRepository);
const actionTypeController = new ActionTypeController(actionTypeService);

actionTypeRouter.get("/action-types", actionTypeController.getAllActionTypes);
actionTypeRouter.get("/action-types/:id", actionTypeController.getActionTypeById);
actionTypeRouter.post("/action-types", actionTypeController.addActionType);
actionTypeRouter.put("/action-types/:id", actionTypeController.updateActionType);
actionTypeRouter.delete("/action-types/:id", actionTypeController.deleteActionType);
export { actionTypeRouter };
