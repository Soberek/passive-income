import { Router } from "express";
import { MediaPlatformController } from "./media_platform.controller";
import { MediaPlatformService } from "./media_platform.service";
import { MediaPlatformRepository } from "./media_platform.repository";
import sqliteDbService from "../../database/sqlite_db.service";

const mediaPlatformRouter = Router();
const dbService = sqliteDbService.getInstance();
const mediaPlatformRepository = new MediaPlatformRepository(dbService);
const mediaPlatformService = new MediaPlatformService(mediaPlatformRepository);
const mediaPlatformController = new MediaPlatformController(mediaPlatformService);

mediaPlatformRouter.get("/media-platforms", mediaPlatformController.getAllMediaPlatforms);
mediaPlatformRouter.get("/media-platforms/:id", mediaPlatformController.getMediaPlatformById);
mediaPlatformRouter.post("/media-platforms", mediaPlatformController.addMediaPlatform);
mediaPlatformRouter.put("/media-platforms/:id", mediaPlatformController.updateMediaPlatform);
mediaPlatformRouter.delete("/media-platforms/:id", mediaPlatformController.deleteMediaPlatform);

export default mediaPlatformRouter;
