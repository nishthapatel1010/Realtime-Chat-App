import express from "express";
import { signup, signin } from "../controller/user.controller.js"; // Import both functions

const router = express.Router();

// Route for user signup
router.post("/signup", signup);

// Route for user signin
router.post("/signin", signin);

export default router;
