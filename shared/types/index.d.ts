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

// For updating entities (partial updates)
export type CreateInstitutionDto = Omit<Institution, "institutionId" | "createdAt">;
export type UpdateInstitutionDto = Partial<CreateInstitutionDto>;

export interface School {
  schoolId: number | BigInt;
  institutionId: number | BigInt;
  director?: string;
  // foreign key to institution
}

// For creating a school when you already have an institutionId
export type CreateSchoolDto = Omit<School, "schoolId">;
export type UpdateSchoolDto = Partial<Omit<School, "schoolId">>; //

// For creating both an institution and school in one operation
export type CreateSchoolWithInstitutionDto = CreateInstitutionDto & Omit<School, "schoolId" | "institutionId">;

// Types for contacts
export interface Contact {
  contactId: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export type CreateContactDto = Omit<Contact, "contactId">;
export type UpdateContactDto = Partial<CreateContactDto>;

// Types for programs
export interface Program {
  programId: number | BigInt;
  name: string;
  description: string;
  programType: "programowy" | "nieprogramowy";
}

export type CreateProgramDto = Omit<Program, "programId">;
export type UpdateProgramDto = Partial<CreateProgramDto>;
