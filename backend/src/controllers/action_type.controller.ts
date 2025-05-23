import { ActionTypeService } from "../services/action_type.service";
import { Request, Response } from "express";

export class ActionTypeController {
  constructor(private actionTypeService: ActionTypeService) {}

  getAllActionTypes = (_req: Request, res: Response) => {
    try {
      const actionTypes = this.actionTypeService.getAll();
      res.status(200).json(actionTypes);
    } catch (error) {
      console.error("Error fetching action types:", error);
      res.status(500).json({ error: "Error fetching action types" });
    }
  };

  getActionTypeById = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const actionType = this.actionTypeService?.getById(Number(id));
      if (!actionType) {
        return res.status(404).json({ error: "Action type not found" });
      }
      res.status(200).json(actionType);
    } catch (error) {
      console.error("Error fetching action type:", error);
      res.status(500).json({ error: "Error fetching action type" });
    }
  };

  addActionType = (req: Request, res: Response) => {
    const actionTypeData = req.body;
    try {
      this.actionTypeService?.add(actionTypeData);
      res.status(201).json({ message: "Action type added successfully" });
    } catch (error) {
      console.error("Error adding action type:", error);
      res.status(500).json({ error: "Error adding action type" });
    }
  };

  updateActionType = (req: Request, res: Response) => {
    const { id } = req.params;
    const actionTypeData = req.body;
    try {
      const updated = this.actionTypeService?.update(Number(id), actionTypeData);
      if (!updated) {
        return res.status(404).json({ error: "Action type not found" });
      }
      res.status(200).json({ message: "Action type updated successfully" });
    } catch (error) {
      console.error("Error updating action type:", error);
      res.status(500).json({ error: "Error updating action type" });
    }
  };

  deleteActionType = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = this.actionTypeService?.delete(Number(id));
      if (!deleted) {
        return res.status(404).json({ error: "Action type not found" });
      }
      res.status(200).json({ message: "Action type deleted successfully" });
    } catch (error) {
      console.error("Error deleting action type:", error);
      res.status(500).json({ error: "Error deleting action type" });
    }
  };
}
