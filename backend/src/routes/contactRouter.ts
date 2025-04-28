import { Router } from "express";

import ContactController from "../controllers/contactController";

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.get("/contact", contactController.getContacts);
contactRouter.post("/contact", contactController.addContact);

export default contactRouter;
