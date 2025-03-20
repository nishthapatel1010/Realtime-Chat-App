import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI=process.env.MONGODB_URI; 

try {
    mongoose.connect(URI);
    console.log("mongodb connected")
} catch (error) {
    console.log(error)
}

// app.get("/", (req, res) => {
//     res.send("Hello, World!");
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
