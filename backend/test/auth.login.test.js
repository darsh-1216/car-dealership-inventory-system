const request = require("supertest");
const app = require("../src/app");

describe("POST /api/auth/login", () => {
  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "darsh@gmail.com",
        password: "Password123",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Login successful",
    });
  });
});
