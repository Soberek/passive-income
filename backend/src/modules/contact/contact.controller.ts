import { ContactService } from "./contact.service";

import { Request, Response } from "express";

import { Contact } from "../../../../shared/types";

class ContactController {
  constructor(private contactService: ContactService) {
    this.contactService = contactService;
  }

  public getContacts = (_: Request, res: Response): void => {
    try {
      const contacts = this.contactService.getAll() as Contact[];
      res.status(200).json({ data: contacts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching contacts", error: String(error) });
    }
  };

  public addContact = (req: Request, res: Response): void => {
    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || !lastName) {
      res.status(400).json({ message: "First name and last name are required." });
      return;
    }

    try {
      const newContact = this.contactService.add({
        firstName,
        lastName,
        email,
        phone,
      });
      res.status(201).json({ message: "Contact added successfully", contactId: newContact });
    } catch (error) {
      res.status(500).json({ message: "Error adding contact", error: String(error) });
    }
  };

  public getContactById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid contact ID" });
      return;
    }

    try {
      const contact = this.contactService.getById(id);
      if (!contact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      res.status(200).json({ data: contact });
    } catch (error) {
      res.status(500).json({ message: "Error fetching contact", error: String(error) });
    }
  };

  public updateContact = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    const { firstName, lastName, email, phone } = req.body;

    // Validate the ID and ensure required fields are present
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid contact ID" });
      return;
    }

    if (!firstName || !lastName) {
      res.status(400).json({ message: "First name and last name are required." });
      return;
    }

    try {
      // Check if the contact exists before updating
      const existingContact = this.contactService.getById(id);
      if (!existingContact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      const isUpdated = this.contactService.update(id, { firstName, lastName, email, phone });
      if (!isUpdated) {
        res.status(500).json({ message: "Error updating contact" });
        return;
      }

      res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating contact", error: String(error) });
    }
  };

  public deleteContact = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid contact ID" });
      return;
    }

    // Check if the contact exists before deleting
    const existingContact = this.contactService.getById(id);
    if (!existingContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    try {
      this.contactService.delete(id);
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting contact", error: String(error) });
    }
  };

  public createContactTable = (_: Request, res: Response): void => {
    try {
      this.contactService.createContactTable();
      res.status(201).json({ message: "Contact table created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating contact table", error: String(error) });
    }
  };

  public bulkInsert = (req: Request, res: Response): void => {
    const { contacts } = req.body;
    console.log("Received contacts for bulk insert:", req.body);

    if (!Array.isArray(contacts) || contacts.length === 0) {
      res.status(400).json({ message: "Invalid contacts data" });
      return;
    }

    try {
      this.contactService.bulkInsert(contacts);
      res.status(201).json({ message: "Contacts added successfully" });
    } catch (error) {
      console.error("Error in bulkInsert:", error);
      res.status(500).json({ message: "Error adding contacts", error: String(error) });
    }
  };
}

export default ContactController;
