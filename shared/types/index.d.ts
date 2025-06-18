/* Institution */
export interface Institution {
  institutionId: number;
  name: string;
  address?: string;
  postalCode?: string;
  municipality?: string;
  city?: string;
  createdAt?: Date;
  email?: string;
  phone?: string;
}

export interface InstitutionCreateDTO {
  name: string;
  address?: string;
  postalCode?: string;
  municipality?: string;
  city?: string;
  email?: string;
  phone?: string;
}

export interface InstitutionUpdateDTO {
  institutionId?: number;
  name?: string;
  address?: string;
  postalCode?: string;
  municipality?: string;
  city?: string;
  email?: string;
  phone?: string;
}

/* School */
export interface School {
  schoolId: number;
  institutionId: number;
  director?: string;
}

export interface SchoolCreateDTO {
  institutionId: number;
  director?: string;
}

export interface SchoolUpdateDTO {
  schoolId?: number;
  institutionId?: number;
  director?: string;
}

/* Contact */
export interface Contact {
  contactId: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface ContactCreateDTO {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface ContactUpdateDTO {
  contactId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

/* Program */
export interface Program {
  programId: number;
  name: string;
  description: string;
  programType: "programowy" | "nieprogramowy";
  referenceNumber: string;
}

export interface ProgramCreateDTO {
  name: string;
  description: string;
  programType: "programowy" | "nieprogramowy";
  referenceNumber: string;
}

export interface ProgramUpdateDTO {
  programId?: number;
  name?: string;
  description?: string;
  programType?: "programowy" | "nieprogramowy";
  referenceNumber?: string;
}

/* MediaPlatform */
export interface MediaPlatform {
  mediaPlatformId: number;
  name: string;
}

export interface MediaPlatformCreateDTO {
  name: string;
}

export interface MediaPlatformUpdateDTO {
  mediaPlatformId?: number;
  name?: string;
}

/* ActionType */
export interface ActionType {
  actionTypeId: number;
  name: string;
}

export interface ActionTypeCreateDTO {
  name: string;
}

export interface ActionTypeUpdateDTO {
  actionTypeId?: number;
  name?: string;
}

/* Material */
export interface Material {
  materialId: number;
  name: string;
  type: "ulotka" | "plakat" | "broszura" | "zakładka" | "inne";
  description: string;
}

export interface MaterialCreateDTO {
  name: string;
  type: "ulotka" | "plakat" | "broszura" | "zakładka" | "inne";
  description: string;
}

export interface MaterialUpdateDTO {
  materialId?: number;
  name?: string;
  type?: "ulotka" | "plakat" | "broszura" | "zakładka" | "inne";
  description?: string;
}

/* SchoolYear */
export interface SchoolYear {
  schoolYearId: number;
  year: "2024/2025" | "2025/2026" | "2026/2027" | "2027/2028";
}

export interface SchoolYearCreateDTO {
  year: "2024/2025" | "2025/2026" | "2026/2027" | "2027/2028";
}

export interface SchoolYearUpdateDTO {
  schoolYearId?: number;
  year?: "2024/2025" | "2025/2026" | "2026/2027" | "2027/2028";
}

/* Task */
export interface Task {
  taskId: number;
  referenceNumber: string;
  taskNumber?: string;
  institutionId: number;
  programId: number;
  actionTypeId: number;
  description?: string;
  date: Date;
  actionsCount: number;
  audienceCount: number;
  mediaPlatformId?: number;
  createdAt?: Date;
}

export interface TaskCreateDTO {
  referenceNumber: string;
  taskNumber?: string;
  institutionId: number;
  programId: number;
  actionTypeId: number;
  description?: string;
  date: Date;
  actionsCount: number;
  audienceCount: number;
  mediaPlatformId?: number;
}

export interface TaskUpdateDTO {
  taskId?: number;
  referenceNumber?: string;
  taskNumber?: string;
  institutionId?: number;
  programId?: number;
  actionTypeId?: number;
  description?: string;
  date?: Date;
  actionsCount?: number;
  audienceCount?: number;
  mediaPlatformId?: number;
}

/* SchoolProgramParticipationType */
export interface SchoolProgramParticipationType {
  participationId: number;
  schoolId: number;
  programId: number;
  schoolYearId: number;
  createdAt?: Date;
}

export interface SchoolProgramParticipationCreateDTO {
  schoolId: number;
  programId: number;
  schoolYearId: number;
}

export interface SchoolProgramParticipationUpdateDTO {
  participationId?: number;
  schoolId?: number;
  programId?: number;
  schoolYearId?: number;
}
