import { Contact } from "../../../../shared/types";
import { ContactRepository } from "./contact.repository";
import type { CreatableServiceI, DeletableServiceI, UpdatableServiceI, ReadableServiceI } from "../../types/index.type";

import { contactSchema, contactCreateSchema, contactUpdateSchema } from "./contact.schema";

export class ContactService
  implements
    CreatableServiceI<Contact, "contactId">,
    DeletableServiceI<Contact, "contactId">,
    UpdatableServiceI<Contact, "contactId">,
    ReadableServiceI<Contact, "contactId">
{
  constructor(private contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  public getAll = (): Contact[] => {
    return this.contactRepository.getAll();
  };

  public add = (entity: Omit<Contact, "contactId">) => {
    const validate = contactCreateSchema.safeParse(entity);
    if (!validate.success) {
      const errors = validate.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }

    return this.contactRepository.add(entity);
  };

  public getById = (id: number): Contact | null => {
    return this.contactRepository.getById(id);
  };

  public update = (id: number, entity: Partial<Contact>) => {
    const validateEntity = contactUpdateSchema.safeParse(entity);
    const validateId = contactSchema.shape.contactId.safeParse(id);
    if (!validateId.success) {
      throw new Error("Invalid contact ID: " + JSON.stringify(validateId.error.issues));
    }
    if (!validateEntity.success) {
      const errors = validateEntity.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }

    return this.contactRepository.update(id, entity);
  };

  public delete = (id: number) => {
    const validate = contactSchema.shape.contactId.safeParse(id);
    if (!validate.success) {
      throw new Error("Invalid contact ID: " + JSON.stringify(validate.error.issues));
    }

    return this.contactRepository.delete(id);
  };

  public createContactTable = () => {
    this.contactRepository.createContactTable();
  };

  public bulkInsert = (contacts: Omit<Contact, "contactId">[]) => {
    const validate = contactCreateSchema.array().safeParse(contacts);
    if (!validate.success) {
      const errors = validate.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }
    return this.contactRepository.bulkInsert(contacts);
  };
}
