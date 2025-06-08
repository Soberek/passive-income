import { NextFunction, Request, Response } from "express";
import { SchoolYearService } from "./school_year.service";

export class SchoolYearController {
  private schoolYearService: SchoolYearService;

  constructor(schoolYearService: SchoolYearService) {
    this.schoolYearService = schoolYearService;
  }

  getAllSchoolYears = (req: Request, res: Response) => {
    try {
      const schoolYears = this.schoolYearService.getAll();
      res.status(200).json(schoolYears);
    } catch (error) {
      console.error("Error fetching school years:", error instanceof Error ? error.message : error);
      res.status(500).json({ error: "Error fetching school years" });
    }
  };

  getSchoolYearById = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const schoolYear = this.schoolYearService.getById(Number(id));
      if (!schoolYear) {
        res.status(404).json({ error: "School year not found" });
        return;
      }
      res.status(200).json(schoolYear);
    } catch (error) {
      console.error("Error fetching school year:", error instanceof Error ? error.message : error);
      res.status(500).json({ error: "Error fetching school year" });
    }
  };

  createSchoolYear = (req: Request, res: Response) => {
    try {
      const schoolYearId = this.schoolYearService.add(req.body);
      res.status(201).json({ id: schoolYearId });
      return;
    } catch (error) {
      console.error("Error creating school year:", error instanceof Error ? error.message : error);
      res.status(500).json({ error: "Error creating school year" });
      return;
    }
  };

  updateSchoolYear = (req: Request, res: Response) => {
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
      console.error("Error updating school year:", error instanceof Error ? error.message : error);
      res.status(500).json({ error: "Error updating school year" });
    }
  };
  deleteSchoolYear = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = this.schoolYearService.delete(Number(id));
      if (!result) {
        res.status(404).json({ error: "School year not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting school year:", error instanceof Error ? error.message : error);
      res.status(500).json({ error: "Error deleting school year" });
    }
  };
}
