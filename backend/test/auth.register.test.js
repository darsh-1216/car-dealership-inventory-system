const request = require("supertest");
const app = require("../src/app");

describe("POST /api/auth/register", () => {
  const validUser = {
    name: "John Doe",
    email: "john@example.com",
    password: "Password123",
  };

  it("should register a user successfully with valid details", async () => {
    // Send a valid registration request
    const response = await request(app)
      .post("/api/auth/register")
      .send(validUser);

    // Verify the success response
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "User registered successfully",
    });
  });

  it("should return 409 when registering with an existing email", async () => {
    const duplicateUser = {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "Password123",
    };

    const firstResponse = await request(app)
      .post("/api/auth/register")
      .send(duplicateUser);

    const response = await request(app)
      .post("/api/auth/register")
      .send(duplicateUser);

    expect(firstResponse.status).toBe(201);
    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: "Email already exists",
    });
  });
});
