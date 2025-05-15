import ProgramService from "../services/program.service";
import { Request, Response } from "express";

class ProgramController {
  constructor(private programService: ProgramService) {
    this.programService = programService;
  }

  getAllPrograms = (_: Request, res: Response): void => {
    console.log("Fetching all programs");
    try {
      const programs = this.programService.getAllPrograms();
      if (!programs) {
        res.status(404).json({ message: "No programs found" });
        return;
      }
      res.status(200).json(programs);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching programs", error });
      return;
    }
  };
  createProgram = (req: Request, res: Response): void => {
    console.log("Creating program");
    try {
      const { name, description, programType } = req.body;
      if (!name || !description || !programType) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const newProgramId = this.programService.addProgram({ name, description, programType });
      if (newProgramId === -1) {
        res.status(500).json({ message: "Error creating program" });
        return;
      }
      res.status(201).json({ message: "Program created successfully", newProgramId });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating program", error });
      return;
    }
  };

  deleteProgram = (req: Request, res: Response): void => {
    console.log("Deleting program");
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const result = this.programService.deleteProgram(Number(id));
      if (!result) {
        res.status(500).json({ message: "Error deleting program" });
        return;
      }
      res.status(200).json({ message: "Program deleted successfully" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting program", error });
      return;
    }
  };

  updateProgram = (req: Request, res: Response): void => {
    console.log("Updating program");
    try {
      const { id } = req.params;
      const { name, description, programType } = req.body;
      if (!id || !name || !description || !programType) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const result = this.programService.updateProgram(Number(id), name, description, programType);
      if (!result) {
        res.status(500).json({ message: "Error updating program" });
        return;
      }
      res.status(200).json({ message: "Program updated successfully" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating program", error });
      return;
    }
  };

  getProgramById = (req: Request, res: Response): void => {
    console.log("Fetching program by ID");
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const program = this.programService.getProgramById(Number(id));
      if (!program) {
        res.status(404).json({ message: "Program not found" });
        return;
      }
      res.status(200).json(program);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching program", error });
      return;
    }
  };
}

export default ProgramController;
