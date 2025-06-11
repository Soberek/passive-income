import { NextFunction, Request, Response } from "express";
import { ProgramCoordinatorService } from "./program_coordinator.service";
import { AppError } from "../../handlers/error.handler";

export class ProgramCoordinatorController {
  constructor(private programCoordinatorService: ProgramCoordinatorService) {}

  getAll = (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.programCoordinatorService.getAll();
      res.status(200).json({ data: result });
    } catch (error) {
      console.error("Error fetching program coordinators:", error);
      next(new AppError("Failed to fetch program coordinators.", 500));
    }
  };

  getById = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      next(new AppError("Invalid coordinator ID.", 400));
      return;
    }

    try {
      const result = this.programCoordinatorService.getById(id);
      if (!result) {
        next(new AppError("Program coordinator not found.", 404));
        return;
      }
      res.status(200).json({ data: result });
    } catch (error) {
      console.error("Error fetching program coordinator by ID:", error);
      next(new AppError("Failed to fetch program coordinator.", 500));
    }
  };

  add = (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = req.body;
      const result = this.programCoordinatorService.add(item);

      if (!result) {
        next(new AppError("Failed to add program coordinator.", 400));
        return;
      }

      res.status(201).json({ data: result });
    } catch (error) {
      console.error("Error adding program coordinator:", error);
      next(new AppError("Failed to add program coordinator.", 500));
    }
  };
}
