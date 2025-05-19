import { Contact } from "../../../shared/types";
import { ContactModel } from "../models/contact.model";
import { ContactRepository } from "../repositories/contact.repository";
import { ServiceI } from "../types/index.type";

export class ContactService implements ServiceI<Contact, "contactId", number | BigInt> {
  constructor(private contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  public getAll = (): Contact[] => {
    return this.contactRepository.getAll();
  };

  public add = (entity: Omit<Contact, "contactId">) => {
    const validationErrors = ContactModel.validate(entity);

    if (validationErrors.length) {
      throw new Error("Invalid data: " + validationErrors.join(", "));
    }

    return this.contactRepository.add(entity);
  };

  public getById = (id: number | BigInt): Contact | null => {
    return this.contactRepository.getById(id);
  };

  public update = (id: number | BigInt, entity: Partial<Contact>) => {
    const validationErrors = ContactModel.validate(entity);

    if (validationErrors.length) {
      throw new Error("Invalid data: " + validationErrors.join(", "));
    }

    return this.contactRepository.update(id, entity);
  };

  public delete = (id: number | BigInt) => {
    return this.contactRepository.delete(id);
  };

  public createContactTable = () => {
    this.contactRepository.createContactTable();
  };

  public bulkInsert = (contacts: Omit<Contact, "contactId">[]) => {
    return this.contactRepository.bulkInsert(contacts);
  };
}
