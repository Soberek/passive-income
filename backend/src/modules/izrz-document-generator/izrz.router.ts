import { Router } from "express";

import { createIzrzController } from "./create-izrz-document.controller";
import { IzrzRepository, IzrzService } from "./create-izrz-document.repository";

const izrzRouter = Router();

const izrzRepository = new IzrzRepository();
const izrzService = new IzrzService(izrzRepository);
const izrzController = new createIzrzController(izrzService);

izrzRouter.post("/offline_izrz", izrzController.generateIzrz);

export default izrzRouter;
