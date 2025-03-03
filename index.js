

// import express from 'express';
// import dotenv from 'dotenv';  // Make sure to import dotenv
// import cors from 'cors';
// import router from './routes/authRoutes.js';
// import logrouter from './routes/authRoutes_login.js';
// import { connectToDatabase } from './lib/db.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT;


// connectToDatabase().then(() => {

//     app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//     });
// }).catch((error) => {
//     console.error('Error connecting to the database:', error);
//     process.exit(1); // Exit the process if DB connection fails
// });

// app.use(cors());
// app.use(express.json());
// app.use('/auth/log', router);
// app.use('/auth/sign', logrouter);

// app.js
import express from 'express';
import dotenv from 'dotenv';  // Make sure to import dotenv
import cors from 'cors';
import router from './routes/authRoutes.js';
import logrouter from './routes/authRoutes_login.js';
import { connectToDatabase } from './lib/db.js';
import forgetPassword from './routes/forgetPassword.js';


dotenv.config();

const app = express();
const port = process.env.PORT;
// const nodemailer = require("nodemailer");

connectToDatabase().then(() => {
  // Start the server only after the database connection is established
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error);
  process.exit(1); // Exit the process if DB connection fails
});

app.use(cors());
app.use(express.json());

// Routes for authentication
app.use('/auth/log', logrouter);
app.use('/auth/sign', router);
app.use('/auth', forgetPassword);
