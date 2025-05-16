import { ContactService } from "../services/contact.service";

import { Request, Response } from "express";

import { Contact } from "../../../shared/types";

class ContactController {
  constructor(private contactService: ContactService) {
    this.contactService = contactService;
  }

  public getContacts = (_: Request, res: Response): void => {
    try {
      const contacts = this.contactService.getAllContacts() as Contact[];
      res.status(200).json({ contacts: contacts });
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
      const newContact = this.contactService.addNewContact({
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
      const contact = this.contactService.getContactById(id);
      if (!contact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      res.status(200).json(contact);
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
      const existingContact = this.contactService.getContactById(id);
      if (!existingContact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }
      const updatedContactId = this.contactService.updateContact(id, { firstName, lastName, email, phone });

      res.status(200).json({ message: "Contact updated successfully", contactId: updatedContactId });
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
    const existingContact = this.contactService.getContactById(id);
    if (!existingContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    try {
      this.contactService.deleteContact(id);
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
}

export default ContactController;
