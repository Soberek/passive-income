import { Contact } from "../../../shared/types";
import { ContactRepository } from "../repositories/contact.repository";
import { ServiceI } from "../types/index.type";
import { z } from "zod";

const contactSchema = z.object({
  contactId: z.number().min(1).optional(),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
});

const contactCreateSchema = contactSchema.omit({ contactId: true });
const contactUpdateSchema = contactCreateSchema.partial();

export class ContactService implements ServiceI<Contact, "contactId", number> {
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
    const validateId = z.number().min(1).safeParse(id);
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
    const validate = z.number().min(1).safeParse(id);
    if (!validate.success) {
      throw new Error("Invalid contact ID: " + JSON.stringify(validate.error.issues));
    }

    return this.contactRepository.delete(id);
  };

  public createContactTable = () => {
    this.contactRepository.createContactTable();
  };

  public bulkInsert = (contacts: Omit<Contact, "contactId">[]) => {
    const validate = z.array(contactCreateSchema).safeParse(contacts);
    if (!validate.success) {
      const errors = validate.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }
    return this.contactRepository.bulkInsert(contacts);
  };
}
