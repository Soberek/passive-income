import ProgramService from "../services/programService";
import { Request, Response } from "express";

class ProgramController {
  private programService: ProgramService;
  constructor() {
    this.programService = new ProgramService();
  }
  public getPrograms = (_: Request, res: Response): void => {
    try {
      const programs = this.programService.getPrograms();
      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching programs", error });
    }
  };

  public addProgram = (req: Request, res: Response): void => {
    const { name, description, programType } = req.body;

    if (!name || !programType) {
      res.status(400).json({ message: "Name and program type are required." });
      return;
    }

    try {
      const newProgram = this.programService.addProgram(
        name,
        description,
        programType
      );
      res.status(201).json(newProgram);
    } catch (error) {
      res.status(500).json({ message: "Error adding program", error });
    }
  };
}

export default ProgramController;
