// user.routes.js
import express from "express";
import { signup, signin, logout, userProfile } from "../controller/user.controller.js";
import { secureRoute } from "../middleware/secureRoute.js";
import User from '../models/Usermodel.js'

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Signin route
router.post("/signin", signin);

// Logout route (doesn't need to do anything on the backend since the client removes the JWT)
router.post("/logout", logout);

// get all user
router.get("/getuserdata",secureRoute,userProfile);
export default router;
