import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";  // Import the cors package
import userRoutes from "./route/user.route.js";
import MessageRoute from './route/message.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const URI = process.env.MONGODB_URI;

// Middleware
app.use(
    cors({
      origin: 'http://localhost:5173',  // Replace with your frontend URL
      credentials: true,  // This is the crucial part to allow cookies
    })
  ); // Allow all cross-origin requests (you can customize it further if needed)
app.use(express.json());
app.use(cookieParser())

// Database Connection
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("Database connection error:", error));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/message", MessageRoute);

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
