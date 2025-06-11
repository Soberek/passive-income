import { NextFunction, Request, Response } from "express";
import { InstitutionsService } from "./institutions.service";

import { AppError } from "../../handlers/error.handler";

export class InstitutionController {
  constructor(private institutionService: InstitutionsService) {
    this.institutionService = institutionService;
  }

  getAllInstitutions = (_: Request, res: Response, next: NextFunction) => {
    try {
      const institutions = this.institutionService.getAll();
      res.status(200).json({ data: institutions });
      return;
    } catch (error) {
      next(new AppError("Error fetching institutions", 500, true));
      return;
    }
  };

  getInstitutionById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const institution = this.institutionService.getById(Number(id));
      if (!institution) {
        res.status(404).json({ error: "Institution not found" });
        return;
      }
      res.status(200).json(institution);
      return;
    } catch (error) {
      res.status(500).json({ error: "Error fetching institution", message: String(error) });
      return;
    }
  };

  createInstitution = (req: Request, res: Response) => {
    try {
      const institutionId = this.institutionService.add(req.body);
      res.status(201).json({ id: institutionId });
      return;
    } catch (error) {
      res.status(500).json({ error: "Error creating institution", message: String(error) });
      return;
    }
  };

  updateInstitution = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedInstitution = this.institutionService.update(Number(id), req.body);
      if (!updatedInstitution) {
        res.status(404).json({ error: "Institution not found" });
        return;
      }
      res.status(200).json(updatedInstitution);
      return;
    } catch (error) {
      res.status(500).json({ error: "Error updating institution", message: String(error) });
      return;
    }
  };

  deleteInstitution = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      this.institutionService.delete(Number(id));
      res.status(204).send({ message: "Institution deleted successfully" });
      return;
    } catch (error) {
      res.status(500).json({ error: "Error deleting institution", message: String(error) });
      return;
    }
  };
}
