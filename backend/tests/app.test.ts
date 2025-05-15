// how to test a nodejs express app with supertest
import request from "supertest";
import ExpressApp from "../src/app";

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
describe("POST /api/users", () => {
  const expressAppInstance = new ExpressApp();
  const app = expressAppInstance.app;

  it("should return error 500 fetching contacts", async () => {
    const res = await request(app).get("/api/contact");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Error fetching contacts");
    expect(res.body).toHaveProperty("error");
  });
});
