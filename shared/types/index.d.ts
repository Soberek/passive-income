export interface Institution {
  institutionId: number | BigInt;
  name: string;
  address?: string;
  postalCode?: string;
  municipality?: string;
  city?: string;
  createdAt?: Date; // current timestamp from sqlite db
  email?: string;
  phone?: string;
}

export interface School {
  schoolId: number | BigInt;
  institutionId: number | BigInt;
  director?: string;
  // foreign key to institution
}

// Types for contacts
export interface Contact {
  contactId: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

// Types for programs
export interface Program {
  programId: number | BigInt;
  name: string;
  description: string;
  programType: "programowy" | "nieprogramowy";
  referenceNumber: string;
}
