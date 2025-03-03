import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js'; // Assuming you have a User model
import dotenv from 'dotenv';

dotenv.config();

const forgetPassword = express.Router();

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Forgot Password Route
forgetPassword.post('/forget_password', async (req, res) => {
  const { email } = req.body;

 
  try {
    const user = await User.findOne({ email });
   
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email.' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log(resetToken)
    
    // Hash the reset token and save it to the database
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
   
    await user.save();
    console.log("upto here",user)


    // Create the password reset URL
    const resetUrl = `http://localhost:4000/reset_password/${resetToken}`;
    console.log(resetUrl)

    // Send password reset email
    const mailOptions = {
      from: process.env.EMAIL_USER,

      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending email.' });
      }
      res.status(200).json({ message: 'Password reset link has been sent to your email.' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

// Reset Password Route (token validation)
forgetPassword.post('/reset_password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful. You can now log in with your new password.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

export default forgetPassword;
