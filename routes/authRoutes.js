import express from 'express';
import bcrypt from 'bcryptjs';  // To hash passwords
import jwt from 'jsonwebtoken';  // For generating JWT tokens
import User from '../models/User.js';  // User model
import dotenv from 'dotenv';
import { userSignUpRules, validationMethod } from '../middleware/validationScript.js';

dotenv.config();

const router = express.Router();

// Signup route
router.post('/signup',userSignUpRules, validationMethod, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

export default router;
