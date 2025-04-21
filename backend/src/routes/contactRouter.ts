import { Router } from "express";

import ContactController from "../controllers/contactController";

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.get("/", contactController.getContacts);
contactRouter.post("/", contactController.addContact);

export default contactRouter;
