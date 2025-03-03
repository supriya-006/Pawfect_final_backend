// import mysql from 'mysql2/promise'
// let connection;
//  export const connectToDatabase = async() =>{
//     if(!connection){
//         connection=await mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME
            

            

//         })
//     }
//     // return connection
// }


import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
