// will generate izrz based on data provided by the user
// and generate .docx file
import PizZip from "pizzip";
import docxtemplater from "docxtemplater";

// Model for the Izrz document
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
}

export class Report implements ReportDataModel {
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
  constructor(data: ReportDataModel) {
    this.templateFile = data.templateFile;
    this.caseNumber = data.caseNumber;
    this.reportNumber = data.reportNumber;
    this.programName = data.programName;
    this.taskType = data.taskType;
    this.address = data.address;
    this.dateInput = data.dateInput;
    this.viewerCount = data.viewerCount;
    this.viewerCountDescription = data.viewerCountDescription;
    this.taskDescription = data.taskDescription;
    this.additionalInfo = data.additionalInfo;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.caseNumber.trim()) {
      errors.push("Case number is required.");
    }

    if (!this.reportNumber.trim()) {
      errors.push("Report number is required.");
    }

    if (this.viewerCount < 0) {
      errors.push("Viewer count cannot be negative.");
    }

    return errors;
  }
}

// IzrzRepository class will handle the logic of generating the izrz document
// in service class we will use the repository to generate the document and report model to validate the data
export class IzrzRepository {
  constructor() {}

  // data will be passed from frontend
  // and will be used to generate izrz document
  generateIzrz = async (
    data: ReportDataModel
  ): Promise<{ buffer: Buffer; fileName: string } | void> => {
    const report = new Report(data);
    const validationErrors = report.validate();

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
    } = report;

    if (!templateFile) {
      throw new Error("Szablon nie został wybrany.");
    }

    console.log(templateFile);

    const zip = new PizZip(data.templateFile);
    const doc = new docxtemplater(zip);

    const date = new Date(dateInput).toISOString().split("T")[0];

    console.log(date);
    doc.setData({
      znak_sprawy: caseNumber,
      numer_izrz: reportNumber,
      nazwa_programu: programName,
      typ_zadania: taskType,
      adres: address,
      liczba_osob: viewerCount,
      liczba_osob_opis: viewerCountDescription,
      opis_zadania: taskDescription,
      dodatkowe_informacje: additionalInfo,
      data: date,
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

    let fileName = `${caseNumber} - ${reportNumber} - ${date} - ${taskType} - ${programName} - ${address}`;

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

export class IzrzService {
  private repo: IzrzRepository;
  constructor(izrzRepository: IzrzRepository) {
    this.repo = izrzRepository;
  }

  async generateIzrzDocument(
    data: ReportDataModel
  ): Promise<{ buffer: Buffer; fileName: string } | void> {
    // Validate the data using the Report model

    const report = new Report(data);
    const errors = report.validate();

    if (errors.length) {
      throw new Error("Invalid data: " + errors.join(", "));
    }

    // Call the repository method to generate the document
    // and return the buffer and file name
    try {
      return await this.repo.generateIzrz(data);
    } catch (error: any) {
      throw new Error("Error generating Izrz document: " + error.message);
    }
  }
}
