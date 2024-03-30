
// Package Imports
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// FileImports or Routes
import authRoutes from './Routes/auth.routes.js'
import messageRoutes from './Routes/message.routes.js'
import userRouters from './Routes/user.routes.js';
import { app,io,server } from './Socket/Socket.js';       //importing Socket from Socket.js

// importing database connection 
import connectToMongoDB from './DB/ConnectionMongoDB.js';

// Variables
const PORT = process.env.PORT || 3001;


// MiddleWares
dotenv.config();
app.use(express.json());// to parse incoming requests with JSON payloads (from req.body)
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('Hello World')
})


// used for routing SignUp, Login pages for the user 
app.use("/api/auth", authRoutes)

// used for routing messages pages for the user
app.use('/api/messages', messageRoutes)

// used to get users 
app.use("/api/users", userRouters)
server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server is running on port ${PORT}`)
})