import { Contact } from "../../../shared/types";

export class ContactModel implements Contact {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;

  constructor(id: number, firstName: string, lastName: string, email?: string, phone?: string) {
    this.id = id;
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
