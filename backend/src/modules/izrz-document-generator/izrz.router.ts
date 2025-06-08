import { Router } from "express";

import { createIzrzController } from "./create-izrz-document.controller";
import { IzrzRepository } from "./create-izrz-document.repository";
import { IzrzService } from "./create-izrz-document.service";

const izrzRouter = Router();

const izrzRepository = new IzrzRepository();
const izrzService = new IzrzService(izrzRepository);
const izrzController = new createIzrzController(izrzService);

izrzRouter.post("/offline_izrz", izrzController.generateIzrz);

export default izrzRouter;
