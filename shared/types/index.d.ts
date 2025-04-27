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

export interface SchoolInstitution extends School, Institution {}
export type schoolParams = Omit<SchoolInstitution, "id">;

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
