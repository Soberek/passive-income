import { Router } from "express";

import ContactController from "../controllers/contactController";
import { Request, Response } from "express";

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.get("/", (req: Request, res: Response) =>
  contactController.getContacts(req, res)
);
contactRouter.post("/", (req: Request, res: Response) =>
  contactController.addContact(req, res)
);

export default contactRouter;
