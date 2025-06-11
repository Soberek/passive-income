import { ActionTypeService } from "./action_type.service";
import { Request, Response } from "express";

export class ActionTypeController {
  constructor(private actionTypeService: ActionTypeService) {}

  getAllActionTypes = (_req: Request, res: Response): void => {
    try {
      const result = this.actionTypeService.getAll();
      res.status(200).json({ data: result });
    } catch (error) {
      console.error("Error fetching action types:", error);
      res.status(500).json({ error: "Error fetching action types" });
    }
  };

  getActionTypeById = (req: Request, res: Response): void => {
    const { id } = req.params;
    try {
      const result = this.actionTypeService?.getById(Number(id));
      if (!result) {
        res.status(404).json({ error: "Action type not found" });
        return;
      }
      res.status(200).json({ data: result });
      return;
    } catch (error) {
      console.error("Error fetching action type:", error);
      res.status(500).json({ error: "Error fetching action type" });
      return;
    }
  };

  addActionType = (req: Request, res: Response): void => {
    const actionTypeData = req.body;
    try {
      this.actionTypeService?.add(actionTypeData);
      res.status(201).json({ message: "Action type added successfully" });
      return;
    } catch (error) {
      console.error("Error adding action type:", error);
      res.status(500).json({ error: "Error adding action type" });
      return;
    }
  };

  updateActionType = (req: Request, res: Response): void => {
    const { id } = req.params;
    const actionTypeData = req.body;
    try {
      const updated = this.actionTypeService?.update(Number(id), actionTypeData);
      if (!updated) {
        res.status(404).json({ error: "Action type not found" });
        return;
      }
      res.status(200).json({ message: "Action type updated successfully" });
      return;
    } catch (error) {
      console.error("Error updating action type:", error);
      res.status(500).json({ error: "Error updating action type" });
      return;
    }
  };

  deleteActionType = (req: Request, res: Response): void => {
    const { id } = req.params;
    try {
      const deleted = this.actionTypeService?.delete(Number(id));
      if (!deleted) {
        res.status(404).json({ error: "Action type not found" });
        return;
      }
      res.status(200).json({ message: "Action type deleted successfully" });
      return;
    } catch (error) {
      console.error("Error deleting action type:", error);
      res.status(500).json({ error: "Error deleting action type" });
      return;
    }
  };
}
