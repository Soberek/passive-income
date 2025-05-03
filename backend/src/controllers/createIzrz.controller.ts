import { Request, Response } from "express";
import { IzrzService } from "../services/temp/createIzrz.repository";

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

      const fileBuffer = await this.izrzService.generateIzrzDocument({
        ...data,
        templateFile: file,
      });

      if (!fileBuffer || !fileBuffer.buffer) {
        res.status(500).json({ message: "Failed to generate document" });
        return;
      }

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${fileBuffer.fileName}.docx`
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ); // Ensure this is correct

      console.log(fileBuffer.buffer);
      res.send(fileBuffer.buffer); // Send the blob as is, don't modify it here
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
