import { Contact } from "../../../shared/types";

/**
 * ContactModel class implements the Contact interface but without the id property.
 * It represents a contact with properties such as id, firstName, lastName, email, and phone.
 * It also includes a validate method to check the validity of the contact's data.
 */

export class ContactModel {
  static validate(entity: Omit<Contact, "contactId"> | Partial<Contact>): string[] {
    const errors: string[] = [];

    if (!entity.firstName?.trim()) {
      errors.push("First name is required.");
    }

    if (!entity.lastName?.trim()) {
      errors.push("Last name is required.");
    }

    if (entity.email && !entity.email.includes("@")) {
      errors.push("Email is invalid.");
    }

    if (entity.phone && entity.phone.length < 9) {
      errors.push("Phone number is too short.");
    }

    return errors;
  }
}
