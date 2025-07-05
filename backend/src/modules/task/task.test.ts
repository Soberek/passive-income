import request from "supertest";

describe("Task Module Tests", () => {
  let taskId: number;
  it("should create a task", async () => {
    const response = await request("http://localhost:3000").post("/api/task").send({
      referenceNumber: "OZiPZ.966.5.12.2025",
      taskNumber: "24/2025",
      institutionId: 2,
      programId: 1,
      actionTypeId: 1,
      description: "Test Task",
      date: "2023-10-01",
      actionsCount: 5,
      audienceCount: 100,
      audienceDescription: "Dnia 17.06.2025 r. w Warszawie odbyło się spotkanie z przedstawicielami mediów.",
      mediaPlatformId: 1,
    });
    taskId = response.body.data;

    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual(expect.any(Number));
  });

  it("should get all tasks", async () => {
    const response = await request("http://localhost:3000").get("/api/task");
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get a task by ID", async () => {
    console.log("Task ID:", taskId); // Log the task ID for debugging

    const response = await request("http://localhost:3000").get(`/api/task/${taskId}`);
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("taskId", taskId);
  });

  it("should update a task", async () => {
    const response = await request("http://localhost:3000").put(`/api/task/${taskId}`).send({
      description: "Updated Test Task",
    });
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Task updated successfully");
  });

  it("should delete a task", async () => {
    console.log("Task ID:", taskId); // Log the task ID for debugging

    const response = await request("http://localhost:3000").delete(`/api/task/${taskId}`);
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Task deleted successfully");
  });

  it("should return 404 for non-existing task", async () => {
    const response = await request("http://localhost:3000").get("/api/task/999999");
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Task not found");
  });

  it("should return 400 for invalid task creation", async () => {
    const response = await request("http://localhost:3000").post("/api/task").send({
      referenceNumber: "InvalidTask",
      taskNumber: "InvalidTask",
      institutionId: -1, // Assuming this ID does not exist
      programId: -1, // Assuming this ID does not exist
      actionTypeId: -1, // Assuming this ID does not exist
      description: "Invalid Task",
      date: "2023-10-01",
      actionsCount: -1, // Invalid count
      audienceCount: -1, // Invalid count
      mediaPlatformId: -1, // Assuming this ID does not exist
    });
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Failed to create task");
  });

  it("should return 400 for invalid task update", async () => {
    const response = await request("http://localhost:3000").put(`/api/task/${taskId}`).send({
      description: "", // Invalid description
    });
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Failed to update task");
  });

  it("should return 400 for invalid task ID", async () => {
    const response = await request("http://localhost:3000").get("/api/task/invalid-id");
    console.log(response.body); // Log the response body for debugging
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid task ID");
  });
});

import { TaskRepository } from "./task.repository";
import SqliteDbService from "../../database/sqlite_db.service";
import bettersqlite from "better-sqlite3";
import { DatabaseI } from "../../types/database.type";
import Migration from "../../database/migrate";
import { insertActionType, insertInstitution, insertMediaPlatform, insertProgram } from "../../test/helpers";

// INSERT INTO tasks (
//   reference_number, task_number, institution_id, program_id, action_type_id, description, date, actions_count, audience_count, media_platform_id, audience_description
// )
// VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
const taskData = {
  referenceNumber: "OZiPZ.966.5.12.2025",
  taskNumber: "24/2025",
  institutionId: 2,
  programId: 1,
  actionTypeId: 1,
  description: "Test Task",
  date: "2023-10-01",
  actionsCount: 5,
  audienceCount: 100,
  mediaPlatformId: 1,
  audienceDescription: "Dnia 17.06.2025 r. w Warszawie odbyło się spotkanie z przedstawicielami mediów.",
};

describe.only("Testowanie repozytoriów", () => {
  let taskRepository: TaskRepository;
  let db: DatabaseI<bettersqlite.Database>;
  let migration: Migration;
  beforeEach(async () => {
    db = new SqliteDbService(":memory:"); // Use in-memory database for testing
    migration = new Migration();
    await migration.migrate(db);

    taskRepository = new TaskRepository(db);
    if (!db || !db.prepare) {
      throw new Error("Database not initialized");
    }

    insertInstitution(db, 2);
    insertProgram(db, 1);
    insertActionType(db, 1);
    insertMediaPlatform(db, 1);
  });

  // task_id INTEGER PRIMARY KEY AUTOINCREMENT,
  // reference_number TEXT NOT NULL UNIQUE, -- OZiPZ.966.4.2.2025
  // task_number TEXT UNIQUE, -- 69/2025
  // institution_id INTEGER NOT NULL,
  // program_id INTEGER NOT NULL,
  // action_type_id INTEGER NOT NULL,
  // description TEXT,
  // date DATE,
  // actions_count INTEGER,
  // audience_description TEXT,
  // audience_count INTEGER,
  // media_platform_id INTEGER, -- will be used if the task is a media publication

  it("should create a task", async () => {
    const result = taskRepository.add(taskData);
    expect(result).toBeDefined();
    expect(typeof result).toBe("number");
  });

  it("should get all tasks", async () => {
    const tasks = taskRepository.getAll();
    expect(tasks).toBeDefined();
    expect(Array.isArray(tasks)).toBe(true);
  });

  it("should get a task by ID", async () => {
    // First, create a task to ensure we have a task to retrieve
    taskRepository.add(taskData);
    const task = taskRepository.getById(1);
    console.log(task); // Log the task for debugging
    expect(task).toBeDefined();
    expect(task).toHaveProperty("taskId", 1);
    expect(task).toHaveProperty("referenceNumber", "OZiPZ.966.5.12.2025");
    expect(task).toHaveProperty("taskNumber", "24/2025");
    expect(task).toHaveProperty("institutionId", 2);
    expect(task).toHaveProperty("programId", 1);
    expect(task).toHaveProperty("actionTypeId", 1);
    expect(task).toHaveProperty("description", "Test Task");
    expect(task).toHaveProperty("date", "2023-10-01");
    expect(task).toHaveProperty("actionsCount", 5);
    expect(task).toHaveProperty("audienceCount", 100);
    expect(task).toHaveProperty(
      "audienceDescription",
      "Dnia 17.06.2025 r. w Warszawie odbyło się spotkanie z przedstawicielami mediów."
    );
    expect(task).toHaveProperty("mediaPlatformId", 1);

    expect(task?.taskId).toBe(1);
  });
});
