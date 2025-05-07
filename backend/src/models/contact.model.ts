import { Contact } from "../../../shared/types";

/**
 * ContactModel class implements the Contact interface but without the id property.
 * It represents a contact with properties such as id, firstName, lastName, email, and phone.
 * It also includes a validate method to check the validity of the contact's data.
 */

export class ContactModel implements Omit<Contact, "contactId"> {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;

  constructor(firstName: string, lastName: string, email?: string, phone?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.firstName.trim()) {
      errors.push("First name is required.");
    }

    if (!this.lastName.trim()) {
      errors.push("Last name is required.");
    }

    if (this.email && !this.email.includes("@")) {
      errors.push("Email is invalid.");
    }

    if (this.phone && this.phone.length < 10) {
      errors.push("Phone number is too short.");
    }

    return errors;
  }
}
