import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routers/authRoute.js';
import complaintRoute from './routers/complaintRoute.js';
import getcomplaint from './routers/getcomplaint.js';
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://smart-complaint-management-system-a.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', authRoute);
app.use('/api/complaints', complaintRoute);
app.use('/api/complaints', getcomplaint);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});