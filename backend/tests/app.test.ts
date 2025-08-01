import request from "supertest";
import ExpressApp from "../src/app";
import { describe, it, expect, beforeEach, beforeAll } from "@jest/globals";
const expressAppInstance = new ExpressApp();
const app = expressAppInstance.app;
expressAppInstance.initMiddlewares();
expressAppInstance.initRoutes();

/*  
Cheatsheet:
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "John Doe");
    expect(res.body).toHaveProperty("email", "test@example.com");
    expect(res.body).toHaveProperty("password", "password");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    expect(res.body).toHaveProperty("id");
*/

describe("Contact API", () => {
  let contactId: number;

  it("should create a new contact", async () => {
    const newContact = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    };
    const res = await request(app).post("/api/contacts").send(newContact);

    console.log(JSON.stringify(res.body, null, 2));

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Contact added successfully");
    expect(res.body).toHaveProperty("contactId");

    contactId = res.body.contactId;
  });

  it("should return a list of contacts", async () => {
    const res = await request(app).get("/api/contacts");
    console.log(res);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("contacts");
    expect(res.body.contacts).toBeInstanceOf(Array);
  });

  it("should update a contact by id", async () => {
    const updatedContact = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      phone: "987-654-3210",
    };
    const res = await request(app)
      .put("/api/contacts/" + contactId)
      .send(updatedContact);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Contact updated successfully");
  });

  it("should return a contact by ID", async () => {
    const res = await request(app).get("/api/contacts/" + contactId);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("contactId", contactId);
    expect(res.body).toHaveProperty("firstName", "Jane");
    expect(res.body).toHaveProperty("lastName", "Doe");
    expect(res.body).toHaveProperty("email", "jane.doe@example.com");
    expect(res.body).toHaveProperty("phone", "987-654-3210");
  });

  it("should delete a contact by ID", async () => {
    const res = await request(app).delete(`/api/contacts/${contactId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Contact deleted successfully");
  });

  // Test for invalid contact ID

  it("should return 404 for invalid contact ID", async () => {
    const res = await request(app).get("/api/contacts/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Contact not found");
  });

  it("should return 400 for invalid contact ID format", async () => {
    const res = await request(app).get("/api/contacts/invalid-id");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid contact ID");
  });

  it("should return 400 for missing required fields", async () => {
    const res = await request(app).post("/api/contacts").send({
      firstName: "Jane",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "First name and last name are required.");
  });

  it("should return 400 for invalid contact ID format on update", async () => {
    const res = await request(app).put("/api/contacts/invalid-id").send({
      firstName: "Jane",
      lastName: "Doe",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid contact ID");
  });

  it("should return 400 for invalid contact ID format on delete", async () => {
    const res = await request(app).delete("/api/contacts/invalid-id");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid contact ID");
  });

  it("should return 404 for non-existent contact on update", async () => {
    const res = await request(app).put("/api/contacts/99999").send({
      firstName: "Jane",
      lastName: "Doe",
    });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Contact not found");
  });
});

describe("School API", () => {
  let schoolId: number;
  let institutionId: number;

  it("should return a list of schools", async () => {
    const res = await request(app).get("/api/schools");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("schools");
    expect(res.body.schools).toBeInstanceOf(Array);
  });

  it("should create a new institution school", async () => {
    const newSchool = {
      name: "Test School",
      address: "123 Test St",
      city: "Test City",
      postalCode: "12345",
      phone: "123-456-7890",
      email: "test@example.com",
      municipality: "Test Municipality",
      director: "Test Director",
    };

    const res = await request(app).post("/api/schools").send(newSchool);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "School created successfully");
    expect(res.body).toHaveProperty("institutionId");
    expect(res.body).toHaveProperty("schoolId");

    schoolId = res.body.schoolId;
    institutionId = res.body.institutionId;
  });

  it("should return a school by ID", async () => {
    const res = await request(app).get(`/api/schools/${schoolId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("schoolId", schoolId);
    expect(res.body).toHaveProperty("director");
  });

  it("should update a school by ID", async () => {
    const updatedSchool = {
      director: "Updated Director",
    };

    const res = await request(app).put(`/api/schools/${schoolId}`).send(updatedSchool);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "School updated successfully");
  });

  it("should delete a school by ID", async () => {
    const res = await request(app).delete(`/api/schools/${schoolId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "School deleted successfully");
  });

  it("should return 404 for non-existent school ID", async () => {
    const res = await request(app).get("/api/schools/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "School not found");
  });
});
