const express = require("express");

const app = express();

// Temporary in-memory storage.
// This will be replaced with a database later.
const registeredEmails = [];

app.use(express.json());

// Health check endpoint.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Register a new user if the email hasn't been used before.
app.post("/api/auth/register", (req, res) => {
  const { email } = req.body;

  if (registeredEmails.includes(email)) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  registeredEmails.push(email);

  res.status(201).json({
    message: "User registered successfully",
  });
});

// Basic login endpoint.
// Authentication logic will be expanded in the next TDD steps.
app.post("/api/auth/login", (req, res) => {
  res.status(200).json({
    message: "Login successful",
  });
});

module.exports = app;