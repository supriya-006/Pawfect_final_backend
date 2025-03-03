// import express from 'express'
// import {connectToDatabase} from '../lib/db.js'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

// const logrouter = express.Router()

// logrouter.post('/login',async (req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const db = await connectToDatabase()
//         const [rows] = await db.query('SELECT * FROM user WHERE email =?',[email])
//         if(rows.length=== 0){
//             return res.status(404).json({message :"user not existed"})
//         }
//         const isMatch = await bcrypt.compare(password,rows[0].password)
//         if(!isMatch){
//             return res.status(401).json({message :"wrong password"})
//         }
//         const token = jwt.sign({id:rows[0].id},process.env.JWT_KEY,{expiresIn:'3h'})

//         return res.status(201).json({token:token})


//     }
//     catch(err){
//         console.log("error")
//          res.status(500).json(err)
//     }


// })
// const verifyToken = async(req,res,next)=>{
//     try{
//         const token = req.headers['authorization'].split('')[1];
//         if(!token){
//             return res.status(403).json({message:"No token Provided"})
//         }
//         const decoded = jwt.verify(token,process.env.JWT_KEY)
//          req.userId = decoded.id;
//          next()

//     }catch(err){
//         return res.status(500).json({message:"server error"})
//     }
// }

// logrouter.get('/home',verifyToken,async(req,res)=>{
//     try{
//         const db = await connectToDatabase()
//         const [rows] = await db.query('SELECT * FROM user WHERE id =?',[req.userId])
//         if(rows.length=== 0){
//             return res.status(404).json({message :"user not existed"})
//         }
//         return res.status(201).json({user:rows[0]})
//     }catch(err){
//             return res.status(500).json({message:"server error"})
//         }
// })
// export default logrouter;
// routes/authRoutes_login.js
import express from 'express';
import bcrypt from 'bcryptjs';  // For comparing hashed passwords
import jwt from 'jsonwebtoken';  // For generating JWT tokens
import User from '../models/User.js';  // User model
import dotenv from 'dotenv';

dotenv.config();

const logrouter = express.Router();

// Login route
logrouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default logrouter;
