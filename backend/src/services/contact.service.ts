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

export interface ContactServiceI {
  getAllContacts: () => Contact[];
  addNewContact: (entity: Omit<Contact, "contactId">) => number | BigInt | null;
  getContactById: (id: number) => Contact | null;
  updateContact: (id: number, entity: Partial<Contact>) => boolean;
  deleteContact: (id: number) => boolean;
}
export class ContactService implements ContactServiceI {
  constructor(private contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  public getAllContacts = (): Contact[] => {
    return this.contactRepository.getAll();
  };

  public addNewContact = (entity: Omit<Contact, "contactId">) => {
    const contact = new ContactModel(entity.firstName, entity.lastName, entity.email || "", entity.phone || "");
    const validationErrors = contact.validate();

    if (validationErrors.length) {
      throw new Error("Invalid data: " + validationErrors.join(", "));
    }

    return this.contactRepository.add(contact);
  };

  public getContactById = (id: number): Contact | null => {
    return this.contactRepository.getById(id);
  };

  public updateContact = (id: number, entity: Partial<Contact>) => {
    const contact = new ContactModel(
      entity.firstName || "",
      entity.lastName || "",
      entity.email || "",
      entity.phone || ""
    );
    const validationErrors = contact.validate();

    if (validationErrors.length) {
      throw new Error("Invalid data: " + validationErrors.join(", "));
    }

    return this.contactRepository.update(id, contact);
  };

  public deleteContact = (id: number) => {
    return this.contactRepository.delete(id);
  };

  public createContactTable = () => {
    this.contactRepository.createContactTable();
  };
}
