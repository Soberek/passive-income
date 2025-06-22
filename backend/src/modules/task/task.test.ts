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
});
