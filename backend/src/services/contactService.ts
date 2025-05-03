import { Contact } from "../../../shared/types";
import { ContactModel } from "../models/contact.model";
import { ContactRepository } from "../repositories/contact.repository";

// Model is a class that represents the structure of a contact. Used to create a new contact and validate the data.
// It implements the Contact interface, which defines the properties of a contact.

// Repository is a class that handles the database operations related to contacts.
// It uses the sqliteDbService to interact with the SQLite database.

// Service is a class that provides higher-level operations related to contacts.
// It uses the ContactRepository to perform CRUD operations on contacts.
// It can also include business logic related to contacts like validation, formatting, etc. So it use the ContactModel class to create a new contact and validate the data and repository to perform CRUD operations on contacts.

// Controller is a class that handles the HTTP requests related to contacts.
// It uses the ContactService to perform operations on contacts.
// It can also include request validation, response formatting, etc. Joi

export class ContactService {
  constructor(private contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  public getAllContacts = (): Contact[] => {
    return this.contactRepository.getAllContacts();
  };

  public addNewContact = (firstName: string, lastName: string, email?: string, phone?: string) => {
    const contact = new ContactModel(0, firstName, lastName, email, phone);
    const validationErrors = contact.validate();

    if (validationErrors.length) {
      throw new Error("Invalid data: " + validationErrors.join(", "));
    }

    return this.contactRepository.addNewContact(firstName, lastName, email, phone);
  };

  public getContactById = (id: number): Contact | null => {
    return this.contactRepository.getContactById(id);
  };

  public updateContact = (id: number, firstName: string, lastName: string, email?: string, phone?: string) => {
    const contact = new ContactModel(id, firstName, lastName, email, phone);
    const validationErrors = contact.validate();

    if (validationErrors.length) {
      throw new Error("Invalid data: " + validationErrors.join(", "));
    }

    return this.contactRepository.updateContact(id, firstName, lastName, email, phone);
  };

  public deleteContact = (id: number) => {
    return this.contactRepository.deleteContact(id);
  };

  public createContactTable = () => {
    this.contactRepository.createContactTable();

    console.log("Contact table created successfully");
  };
}

// Usage example
// const contactsService = new ContactsService();
// const contacts = contactsService.getAllContacts();
