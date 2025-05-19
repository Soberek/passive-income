import { Program } from "../../../shared/types";
import ProgramService from "../services/program.service";
import { Request, Response } from "express";

class ProgramController {
  constructor(private programService: ProgramService) {
    this.programService = programService;
  }

  getAllPrograms = (_: Request, res: Response): void => {
    console.log("Fetching all programs");
    try {
      const programs = this.programService.getAll();
      if (!programs) {
        res.status(404).json({ message: "No programs found" });
        return;
      }
      res.status(200).json(programs);
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching programs", error: error instanceof Error ? error.message : error });
      return;
    }
  };
  createProgram = (req: Request, res: Response): void => {
    try {
      const { name, description, programType, referenceNumber } = req.body;

      if (!name || !description || !programType || !referenceNumber) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const newProgramId = this.programService.add({ name, description, programType, referenceNumber });
      if (newProgramId === -1) {
        res.status(500).json({ message: "Error creating program", error: "Failed to create program" });
        return;
      }
      res.status(201).json({ message: "Program created successfully", newProgramId });
      return;
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error creating program", error: error instanceof Error ? error.message : error });
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
      const result = this.programService.delete(Number(id));
      if (!result) {
        res.status(500).json({ message: "Error deleting program", error: "Failed to delete program" });
        return;
      }
      res.status(200).json({ message: "Program deleted successfully" });
      return;
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error deleting program", error: error instanceof Error ? error.message : error });
      return;
    }
  };

  updateProgram = (req: Request, res: Response): void => {
    console.log("Updating program");
    try {
      const { id } = req.params;
      const { name, description, programType, referenceNumber } = req.body;
      if (!id || !name || !description || !programType || !referenceNumber) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const result = this.programService.update(Number(id), { name, description, programType, referenceNumber });
      if (!result) {
        res.status(500).json({ message: "Error updating program" });
        return;
      }
      res.status(200).json({ message: "Program updated successfully" });
      return;
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error updating program", error: error instanceof Error ? error.message : error });
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
      const program = this.programService.getById(Number(id));
      if (!program) {
        res.status(404).json({ message: "Program not found" });
        return;
      }
      res.status(200).json(program);
      return;
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error fetching program", error: error instanceof Error ? error.message : error });
      return;
    }
  };

  bulkCreatePrograms = (req: Request, res: Response): void => {
    console.log("Bulk creating programs");
    try {
      const { programs } = req.body as { programs: Array<Omit<Program, "programId">> };

      if (!Array.isArray(programs) || programs.length === 0) {
        res.status(400).json({ message: "Invalid program data" });
        return;
      }
      // const createdPrograms = this.programService.bulkInsert(programs);

      res.status(201).json({ message: "Programs created successfully" });
      return;
    } catch (error) {
      if (error) {
        res
          .status(500)
          .json({ message: "Error bulk creating programs", error: error instanceof Error ? error.message : error });
        return;
      }
    }
  };
}
export default ProgramController;
