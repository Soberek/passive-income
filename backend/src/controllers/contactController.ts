import { ContactService } from "../services/contactService";

import { Request, Response } from "express";

import { Contact } from "../../../shared/types";
class ContactController {
  constructor(private contactService: ContactService) {
    this.contactService = contactService;
  }

  public getContacts = (_: Request, res: Response): void => {
    try {
      const contacts = this.contactService.getAllContacts() as Contact[];
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching contacts", error });
    }
  };

  public addContact = (req: Request, res: Response): void => {
    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || !lastName) {
      res.status(400).json({ message: "First name and last name are required." });
      return;
    }

    try {
      const newContact = this.contactService.addNewContact(firstName, lastName, email, phone);
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ message: "Error adding contact", error });
    }
  };

  public getContactById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid contact ID" });
      return;
    }

    try {
      const contact = this.contactService.getContactById(id);
      if (!contact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: "Error fetching contact", error });
    }
  };

  public updateContact = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    const { firstName, lastName, email, phone } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid contact ID" });
      return;
    }

    if (!firstName || !lastName) {
      res.status(400).json({ message: "First name and last name are required." });
      return;
    }

    try {
      const updatedContact = this.contactService.updateContact(id, firstName, lastName, email, phone);
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(500).json({ message: "Error updating contact", error });
    }
  };

  public deleteContact = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid contact ID" });
      return;
    }

    try {
      this.contactService.deleteContact(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting contact", error });
    }
  };

  public createContactTable = (_: Request, res: Response): void => {
    try {
      this.contactService.createContactTable();
      res.status(201).json({ message: "Contact table created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating contact table", error });
    }
  };
}

export default ContactController;
