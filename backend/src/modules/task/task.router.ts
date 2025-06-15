import { Router } from "express";
import { TaskRepository } from "./task.repository";
import { TaskService } from "./task.service";
import TaskController from "./task.controller";
import SqliteDbService from "../../database/sqlite_db.service";

const taskRouter = Router();
const dbService = SqliteDbService.getInstance();
const taskRepository = new TaskRepository(dbService);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

taskRouter.post("/task", taskController.addTask);
taskRouter.get("/task", taskController.getAllTasks);
taskRouter.get("/task/:id", taskController.getTaskById);
taskRouter.put("/task/:id", taskController.updateTask);
taskRouter.delete("/task/:id", taskController.deleteTask);

export default taskRouter;
