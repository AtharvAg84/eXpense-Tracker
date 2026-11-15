const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory user storage for demonstration purposes
const users = [];
const JWT_SECRET = 'your_jwt_secret';

// Regex for basic validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const nameRegex = /^[a-zA-Z\s]{2,50}$/; // Name should contain only letters and spaces, and be between 2-50 characters
const phoneRegex = /^[0-9]{10}$/; // 10 digits

app.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body;

  // Validate the email
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate the name
  if (!name || !nameRegex.test(name)) {
    return res.status(400).json({ message: 'Invalid name format. Name should contain only letters and spaces' });
  }

  // Validate the phone number
  if (!phone || !phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number. It should contain 10 digits' });
  }

  // Check if user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user
  users.push({ email, name, phone, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
