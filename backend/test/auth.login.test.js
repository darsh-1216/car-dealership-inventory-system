const request = require("supertest");
const app = require("../src/app");

describe("POST /api/auth/login", () => {
  // Verify that a registered user can log in successfully.
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

  // Verify that login fails for an email that hasn't been registered.
  it("should return 401 when the email is not registered", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "unknown@gmail.com",
        password: "Password123",
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid email or password",
    });
  });
});