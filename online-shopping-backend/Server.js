// Server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./UserModel');

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/onlineShoppingDB');

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in MongoDB
    const newUser = await User.create({ username, password: hashedPassword, email });
    
    // Send a confirmation email (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email76@gmail.com',
        pass: '111991',
      },
    });

    const mailOptions = {
      from: 'email76@gmail.com',
      to: email,
      subject: 'Registration Confirmation',
      text: `Thank you for registering with our online shopping app, ${username}!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending confirmation email:', error);
      } else {
        console.log('Confirmation email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username or email already taken' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user in MongoDB
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Check if the password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a JWT token
const token = jwt.sign({ username: user.username }, 'my-super-secret-key-123!@#', { expiresIn: '1h' });

  res.json({ token });
});

const resetTokens = {};

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email in MongoDB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Generate a unique reset token (in a real-world scenario, you might use a library like crypto)
    const resetToken = Math.random().toString(36).slice(2);

    // Store the reset token in memory (for demonstration purposes, consider using a database for storing reset tokens in production)
    resetTokens[user.id] = resetToken;

    // Send a reset email (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email76@gmail.com',
        pass: '111991',
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: 'email76@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending reset email:', error);
        return res.status(500).json({ message: 'Internal server error.' });
      }

      console.log('Reset email sent:', info.response);
      res.status(200).json({ message: 'Reset email sent successfully.' });
    });
  } catch (error) {
    console.error('Error during forgot password:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});