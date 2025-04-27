import ContactService from "../services/contactService";

import { Request, Response } from "express";

import { Contact } from "../../../shared/types";
class ContactController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
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
      res
        .status(400)
        .json({ message: "First name and last name are required." });
      return;
    }

    try {
      const newContact = this.contactService.addNewContact(
        firstName,
        lastName,
        email,
        phone
      );
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ message: "Error adding contact", error });
    }
  };
}

export default ContactController;
