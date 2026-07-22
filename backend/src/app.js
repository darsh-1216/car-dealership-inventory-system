const express = require('express');

const app = express();
const registeredEmails = [];

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/auth/register', (req, res) => {
  const { email } = req.body;

  if (registeredEmails.includes(email)) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  registeredEmails.push(email);

  res.status(201).json({ message: 'User registered successfully' });
});

module.exports = app;
