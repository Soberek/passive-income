import { Router, Request, Response } from "express";

import ContactController from "./contact.controller";
import { ContactRepository } from "./contact.repository";
import { ContactService } from "./contact.service";
import sqliteDbService from "../../database/sqlite_db.service";

const contactRouter = Router();
const dbService = sqliteDbService.getInstance();
const contactRepository = new ContactRepository(dbService);
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);

contactRouter.get("/contacts", contactController.getContacts);
contactRouter.post("/contacts", contactController.addContact);
contactRouter.get("/contacts/:id", contactController.getContactById);
contactRouter.put("/contacts/:id", contactController.updateContact);
contactRouter.delete("/contacts/:id", contactController.deleteContact);
contactRouter.post("/contacts/bulk", contactController.bulkInsert);

// contactRouter.post("/contact/create", contactController.createContactTable);

export default contactRouter;
