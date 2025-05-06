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

// Types for creating new entities
export type CreateInstitutionDto = Omit<Institution, "institutionId" | "createdAt">;

// For creating a school when you already have an institutionId
export type CreateSchoolDto = Omit<School, "schoolId">;

// For creating both an institution and school in one operation
export type CreateSchoolWithInstitutionDto = CreateInstitutionDto & Omit<School, "schoolId" | "institutionId">;

// For updating entities (partial updates)
export type UpdateInstitutionDto = Partial<CreateInstitutionDto>;
export type UpdateSchoolDto = Partial<Omit<School, "schoolId" | "institutionId">>;

export interface Contact {
  contactId: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface Program {
  id: number;
  name: string;
  description: string;
  programType: "programowy" | "nieprogramowy";
}
