// how to test a nodejs express app with supertest
import request from "supertest";
import ExpressApp from "../src/app";

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

describe("GET /api/contact", () => {
  let contactId: number;

  it("should create a new contact", async () => {
    const newContact = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    };
    const res = await request(app).post("/api/contact").send(newContact);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Contact added successfully");
    expect(res.body).toHaveProperty("contactId");

    contactId = res.body.contactId;
  });

  it("should return a list of contacts", async () => {
    const res = await request(app).get("/api/contact");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("contacts");
    expect(res.body.contacts).toBeInstanceOf(Array);
  });

  it("should return a contact by ID", async () => {
    const res = await request(app).get("/api/contact/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("firstName", "John");
    expect(res.body).toHaveProperty("lastName", "Doe");
    expect(res.body).toHaveProperty("email", "john.doe@example.com");
    expect(res.body).toHaveProperty("phone", "123-456-7890");
  });

  it("should delete a contact by ID", async () => {
    const res = await request(app).delete(`/api/contact/${contactId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Contact deleted successfully");
  });
});
