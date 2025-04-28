export interface School {
  id: number | BigInt;
  director?: string;
  // foreign key to institution
}

export interface Institution {
  id: number | BigInt;
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  municipality?: string;
}

export interface SchoolWithInstitutionData {
  schoolId: number;
  institutionId: number;
  director?: string;
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  municipality?: string;
}
export type schoolParams = Omit<SchoolWithInstitutionData, "schoolId" | "institutionId">;

export interface Contact {
  id: number;
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
