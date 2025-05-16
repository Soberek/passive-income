import { Router } from "express";

import ContactController from "../controllers/contact.controller";
import { ContactRepository } from "../repositories/contact.repository";
import { ContactService } from "../services/contact.service";
import sqliteDbService from "../services/sqliteDbService";

const contactRouter = Router();
const dbService = sqliteDbService.getInstance();
const contactRepository = new ContactRepository(dbService);
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);

contactRouter.get("/contact", contactController.getContacts);
contactRouter.post("/contact", contactController.addContact);
contactRouter.get("/contact/:id", contactController.getContactById);
contactRouter.put("/contact/:id", contactController.updateContact);
contactRouter.delete("/contact/:id", contactController.deleteContact);

// contactRouter.post("/contact/create", contactController.createContactTable);

export default contactRouter;
