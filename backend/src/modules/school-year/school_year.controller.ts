import { NextFunction, Request, Response } from "express";
import { SchoolYearService } from "./school_year.service";
import { AppError } from "../../handlers/error.handler";

export class SchoolYearController {
  private schoolYearService: SchoolYearService;

  constructor(schoolYearService: SchoolYearService) {
    this.schoolYearService = schoolYearService;
  }

  getAllSchoolYears = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schoolYears = this.schoolYearService.getAll();
      res.status(200).json({ data: schoolYears });
    } catch (error) {
      console.error("Error fetching school years:", error instanceof Error ? error.message : error);
      next(new AppError("Error fetching school years", 500));
    }
  };

  getSchoolYearById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const schoolYear = this.schoolYearService.getById(Number(id));
      if (!schoolYear) {
        next(new AppError("School year not found", 404));
        return;
      }
      res.status(200).json({ data: schoolYear });
    } catch (error) {
      console.error("Error fetching school year:", error instanceof Error ? error.message : error);
      next(new AppError("Error fetching school year", 500));
    }
  };

  createSchoolYear = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schoolYearId = this.schoolYearService.add(req.body);
      res.status(201).json({ id: schoolYearId });
      return;
    } catch (error) {
      console.error("Error creating school year:", error instanceof Error ? error.message : error);
      next(new AppError("Error creating school year", 500));
      return;
    }
  };

  updateSchoolYear = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const updatedSchoolYear = this.schoolYearService.update(Number(id), req.body);
      if (!updatedSchoolYear) {
        res.status(204).json({ error: "School year not found" });
        return;
      }
      res.status(200).json({ message: "School year updated successfully" });
      return;
    } catch (error) {
      next(new AppError("Error updating school year", 500));
    }
  };
  deleteSchoolYear = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = this.schoolYearService.delete(Number(id));
      if (!result) {
        next(new AppError("School year not found", 404));
        return;
      }
      res.status(204).send();
    } catch (error) {
      next(new AppError("Error deleting school year", 500));
    }
  };
}
