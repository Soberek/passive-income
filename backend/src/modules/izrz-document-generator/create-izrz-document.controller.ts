import { Request, Response } from "express";

import { IzrzService } from "./create-izrz-document.service";

export class createIzrzController {
  private izrzService: IzrzService;
  constructor(izrzService: IzrzService) {
    this.izrzService = izrzService;
  }

  // Function to handle the izrz document generation
  generateIzrz = async (req: Request, res: Response) => {
    try {
      const file = req.file?.buffer;
      const data = req.body;

      if (!file) {
        res.status(400).json({ message: "Brak szablonu w żądaniu." });
        return;
      }

      const fileBuffer = await this.izrzService.generateIzrzDocumenService({
        ...data,
        templateFile: file,
      });

      if (!fileBuffer || !fileBuffer.buffer) {
        res.status(500).json({ message: "Failed to generate document" });
        return;
      }

      // Set the headers for the response
      // Set the headers for the response
      // For example, if the file is a Word document:
      res.setHeader("Content-Length", fileBuffer.buffer.length); // this is important for the client to know how much data to expect
      res.setHeader("Content-Disposition", `attachment; filename=${fileBuffer.fileName}.docx`);

      // this is the MIME type for Word documents
      // MIME stands for Multipurpose Internet Mail Extensions, and it is a standard way of classifying file type s on the Internet.
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

      console.log(fileBuffer.buffer);
      res.send(fileBuffer.buffer); // Send the blob as is, don't modify it here
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
