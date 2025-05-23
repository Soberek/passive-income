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

export interface MediaPlatform {
  mediaPlatformId: number | BigInt;
  name: string;
}

export interface ActionType {
  actionTypeId: number | BigInt;
  name: string;
}

export interface Material {
  materialId: number | BigInt;
  name: string;
  type: "ulotka" | "plakat" | "broszura" | "zakładka" | "inne";
  description: string;
}

export interface SchoolYear {
  schoolYearId: number | BigInt;
  year: "2024/2025" | "2025/2026" | "2026/2027" | "2027/2028";
}

export interface Task {
  taskId: number | BigInt;
  referenceNumber: string;
  taskNumber?: string; // unique task number like "1/2025"
  institutionId: number | BigInt;
  programId: number | BigInt;
  actionTypeId: number | BigInt;
  description?: string;
  date: Date; // YYYY-MM-DD
  actionsCount: number;
  audienceCount: number;
  mediaPlatformId?: number | BigInt; // will be used if the task is a media publication
}
