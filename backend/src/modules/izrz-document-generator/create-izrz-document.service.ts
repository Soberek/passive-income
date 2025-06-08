import { IzrzRepository } from "./create-izrz-document.repository";
import { createIzrzDocumentCreateSchema, CreateIzrzDocumentT } from "./create-izrz-document.schema";

export class IzrzService {
  constructor(private createIzrzDocumentRepository: IzrzRepository) {}

  async generateIzrzDocumenService(data: CreateIzrzDocumentT): Promise<{ buffer: Buffer; fileName: string } | void> {
    // Validate the data using the Report model

    const validationErrors =
      createIzrzDocumentCreateSchema
        .safeParse(data)
        .error?.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`) || [];
    if (validationErrors.length) {
      throw new Error("Invalid data: " + validationErrors.join(", "));
    }

    // Call the repository method to generate the document
    // and return the buffer and file name
    try {
      return await this.createIzrzDocumentRepository.generateIzrz(data);
    } catch (error: any) {
      throw new Error("Error generating Izrz document: " + error.message);
    }
  }
}
