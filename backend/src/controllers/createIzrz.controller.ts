import { Request, Response } from "express";
import { IzrzService } from "../services/temp/createIzrz.service";

class createIzrzController {
  private izrzService: IzrzService;

  constructor() {
    this.izrzService = new IzrzService();
  }

  // Function to handle the izrz document generation
  public generateIzrz = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "File not found" });
      }

      const blob = await this.izrzService.generateIzrz({
        ...data,
        templateFile: file,
      });

      if (!blob) {
        return res.status(500).json({ message: "Failed to generate document" });
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
