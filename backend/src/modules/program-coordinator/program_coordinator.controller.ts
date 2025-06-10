import { Request, Response } from "express";
import { ProgramCoordinatorService } from "./program_coordinator.service";

export class ProgramCoordinatorController {
  constructor(private programCoordinatorService: ProgramCoordinatorService) {}

  getAll = (req: Request, res: Response) => {
    try {
      const result = this.programCoordinatorService.getAll();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching program coordinators:", error);
      res.status(500).json({ error: "Failed to fetch program coordinators." });
    }
  };

  getById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid coordinator ID." });
      return;
    }

    try {
      const result = this.programCoordinatorService.getById(id);
      if (!result) {
        res.status(404).json({ error: "Program coordinator not found." });
        return;
      }
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching program coordinator by ID:", error);
      res.status(500).json({ error: "Failed to fetch program coordinator." });
    }
  };

  add = (req: Request, res: Response) => {
    try {
      const item = req.body;
      const result = this.programCoordinatorService.add(item);

      if (!result) {
        res.status(400).json({ error: "Failed to add program coordinator." });
        return;
      }

      res.status(201).json(result);
    } catch (error) {
      console.error("Error adding program coordinator:", error);
      res.status(500).json({ error: "Failed to add program coordinator." });
    }
  };
}
