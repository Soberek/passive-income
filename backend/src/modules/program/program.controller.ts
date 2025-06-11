import { Program } from "../../../../shared/types";
import ProgramService from "./program.service";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../handlers/error.handler";

class ProgramController {
  constructor(private programService: ProgramService) {
    this.programService = programService;
  }

  getAllPrograms = (_: Request, res: Response, next: NextFunction): void => {
    console.log("Fetching all programs");
    try {
      const programs = this.programService.getAll();
      if (!programs) {
        res.status(404).json({ message: "No programs found" });
        return;
      }
      res.status(200).json({ data: programs });
      return;
    } catch (error) {
      next(new AppError("Error fetching programs", 500));
      return;
    }
  };
  createProgram = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { name, description, programType, referenceNumber } = req.body;

      if (!name || !description || !programType || !referenceNumber) {
        next(new AppError("Missing required fields", 400));
        return;
      }

      const newProgramId = this.programService.add({ name, description, programType, referenceNumber });
      if (newProgramId === -1) {
        next(new AppError("Error creating program", 500));
        return;
      }
      res.status(201).json({ message: "Program created successfully", data: newProgramId });
      return;
    } catch (error) {
      next(new AppError("Error creating program", 500));
      return;
    }
  };

  deleteProgram = (req: Request, res: Response, next: NextFunction): void => {
    console.log("Deleting program");
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const result = this.programService.delete(Number(id));
      if (!result) {
        next(new AppError("Error deleting program", 500));
        return;
      }
      res.status(200).json({ message: "Program deleted successfully" });
      return;
    } catch (error) {
      console.error(error);
      next(new AppError("Error deleting program", 500));
      return;
    }
  };

  updateProgram = (req: Request, res: Response, next: NextFunction): void => {
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
      next(new AppError("Error updating program", 500));
      return;
    }
  };

  getProgramById = (req: Request, res: Response, next: NextFunction): void => {
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
      next(new AppError("Error fetching program", 500));
      return;
    }
  };

  bulkCreatePrograms = (req: Request, res: Response, next: NextFunction): void => {
    console.log("Bulk creating programs");

    try {
      console.log("BULK CREATE PROGRAMS");
      const { programs } = req.body as { programs: Array<Omit<Program, "programId">> };
      // console.log("Received req.body:", req.body);
      console.log("Received programs:", req.body.programs);

      if (!Array.isArray(programs) || programs.length === 0) {
        res.status(400).json({ message: "Invalid program data" });
        return;
      }
      const createdPrograms = this.programService.bulkInsert(programs);

      res.status(201).json({ message: "Programs created successfully" });
      return;
    } catch (error) {
      console.error("Error in bulkCreatePrograms:", error);
      next(new AppError("Error bulk creating programs", 500));
      return;
    }
  };
}
export default ProgramController;
