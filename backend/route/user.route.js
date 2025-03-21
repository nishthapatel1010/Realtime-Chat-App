// user.routes.js
import express from "express";
import { signup, signin, logout } from "../controller/user.controller.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Signin route
router.post("/signin", signin);

// Logout route (doesn't need to do anything on the backend since the client removes the JWT)
router.post("/logout", logout);

export default router;
