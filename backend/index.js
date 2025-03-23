import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";  // Import the cors package
import userRoutes from "./route/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());  // Allow all cross-origin requests (you can customize it further if needed)
app.use(express.json());

// Database Connection
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("Database connection error:", error));

// Routes
app.use("/api/users", userRoutes);

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
