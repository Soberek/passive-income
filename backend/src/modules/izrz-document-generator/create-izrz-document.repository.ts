// will generate izrz based on data provided by the user
// and generate .docx file
import PizZip from "pizzip";
import docxtemplater from "docxtemplater";

import { CreateIzrzDocumentT, createIzrzDocumentCreateSchema } from "./create-izrz-document.schema";

// IzrzRepository class will handle the logic of generating the izrz document
// in service class we will use the repository to generate the document and report model to validate the data
export class IzrzRepository {
  constructor() {}

  // data will be passed from frontend
  // and will be used to generate izrz document
  generateIzrz = async (data: CreateIzrzDocumentT): Promise<{ buffer: Buffer; fileName: string } | void> => {
    const validationErrors =
      createIzrzDocumentCreateSchema
        .safeParse(data)
        .error?.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`) || [];

    if (validationErrors.length) {
      throw new Error("Niepoprawne dane: " + validationErrors.join(", "));
    }
    const {
      templateFile,
      caseNumber,
      reportNumber,
      programName,
      taskType,
      address,
      dateInput,
      viewerCount,
      viewerCountDescription,
      taskDescription,
      additionalInfo,
    } = data;

    if (!templateFile) {
      throw new Error("Szablon nie został wybrany.");
    }

    console.log(templateFile);

    const zip = new PizZip(data.templateFile);
    const doc = new docxtemplater(zip);

    const date = new Date(dateInput).toISOString().split("T")[0];
    // change date format dd.mm.yyyy
    const formattedDate = date.split("-").reverse().join(".");

    console.log(date);
    doc.setData({
      znak_sprawy: caseNumber,
      numer_izrz: reportNumber,
      nazwa_programu: programName,
      typ_zadania: taskType,
      miasto: address.split(" ")[address.split(" ").length - 1],
      adres: address,
      liczba_osob: viewerCount,
      liczba_osob_opis: viewerCountDescription,
      opis_zadania: taskDescription,
      dodatkowe_informacje: additionalInfo,
      data: formattedDate,
    });

    // This is the line that renders the document
    // It will replace the variables in the template with the data provided
    try {
      doc.render();
    } catch (error) {
      console.error("Error during document rendering:", error);
      // Handle the error appropriately
    }

    // This is the line that generates the document
    // It will create a blob object that can be saved as a file
    // blob is a binary large objectary data
    const blob = doc.getZip().generate({ type: "blob" });

    // Return the output as Buffer to the frontend

    const arrayBuffer = await blob.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    let fileName = `${reportNumber} - ${caseNumber} - ${date} - ${taskType} - ${programName} - ${
      address.split(",")[0]
    } - ${address.split(" ")[address.split(" ").length - 1]}`;

    fileName = sanitizeFileName(fileName);

    return { buffer, fileName: fileName };

    // Process the document using docxtemplate
  };
}
function sanitizeFileName(fileName: string) {
  // Allow alphanumeric characters, dots, hyphens, and spaces
  return fileName
    .replace(/[\/\\]/g, "-")
    .replace(/[\/:*?"<>|\\]/g, "") // Remove invalid characters (slashes, etc.)
    .replace(/[^a-zA-Z0-9._\- ]/g, "") // Allow alphanumeric, dots, hyphens, and spaces
    .trim(); // Remove leading/trailing spaces
}
