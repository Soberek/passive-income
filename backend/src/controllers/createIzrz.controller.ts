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
      const file = req.file;
      const data = req.body;

      if (!file) {
        res.status(400).json({ message: "Brak szablonu w żądaniu." });
        return;
      }

      const blob = await this.izrzService.generateIzrzDocument(data);

      if (!blob) {
        res.status(500).json({ message: "Failed to generate document" });
        return;
      }

      res.setHeader("Content-Disposition", `attachment; filename=report.docx`);
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      res.send(blob);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
