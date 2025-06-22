import { TaskService } from "./task.service";
import { Request, Response } from "express";

class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  addTask = (req: Request, res: Response): void => {
    try {
      const entity = req.body;
      const result = this.taskService.add(entity);
      if (result) {
        res.status(201).json({ data: result });
      } else {
        res.status(400).json({ error: "Failed to create task" });
      }
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  };

  getAllTasks = (req: Request, res: Response): void => {
    try {
      const tasks = this.taskService.getAll();
      res.status(200).json({ data: tasks });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  };

  getTaskById = (req: Request, res: Response): void => {
    try {
      const taskId = parseInt(req.params.id, 10);
      const task = this.taskService.getById(taskId);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  };

  updateTask = (req: Request, res: Response): void => {
    try {
      const taskId = parseInt(req.params.id, 10);
      const updated = this.taskService.update(taskId, req.body);
      if (updated) {
        res.status(200).json({ message: "Task updated successfully" });
      } else {
        res.status(400).json({ error: "Failed to update task" });
      }
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  };

  deleteTask = (req: Request, res: Response): void => {
    try {
      const taskId = parseInt(req.params.id, 10);
      const deleted = this.taskService.delete(taskId);
      if (deleted) {
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        res.status(400).json({ error: "Failed to delete task" });
      }
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  };
}
export default TaskController;
