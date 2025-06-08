interface ReportDataModel {
  templateFile: Buffer;
  caseNumber: string;
  reportNumber: string;
  programName: string;
  taskType: string;
  address: string;
  dateInput: Date;
  viewerCount: number;
  viewerCountDescription: string;
  taskDescription: string;
  additionalInfo: string;
  attendanceList?: boolean;
  rozdzielnik?: boolean;
}

import { z } from "zod";
export const createIzrzDocumentSchema = z.object({
  templateFile: z.instanceof(Buffer),
  caseNumber: z.string().min(1, "Case number is required."),
  reportNumber: z.string().min(1, "Report number is required."),
  programName: z.string().min(1, "Program name is required."),
  taskType: z.string().min(1, "Task type is required."),
  address: z.string().min(1, "Address is required."),
  dateInput: z.string().refine((value: string) => !isNaN(Date.parse(value)), {
    message: "Invalid date format. Please use a valid date.",
  }),
  viewerCount: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().int().nonnegative("Viewer count cannot be negative.")
  ),
  viewerCountDescription: z.string().optional(),
  taskDescription: z.string().optional(),
  additionalInfo: z.string().optional(),
  attendanceList: z.string().optional(),
  rozdzielnik: z.string().optional(),
});
export type CreateIzrzDocumentT = z.infer<typeof createIzrzDocumentSchema>;
export const createIzrzDocumentCreateSchema = createIzrzDocumentSchema.omit({
  templateFile: true,
});
export const createIzrzDocumentUpdateSchema = createIzrzDocumentCreateSchema.partial();
