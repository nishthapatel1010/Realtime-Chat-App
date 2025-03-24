import User from "../models/Usermodel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js"; // Import JWT function

// Signup function
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Keeping confirmPassword
    });

    await newUser.save();
    if (newUser) {
      // Generate JWT token
    const token = generateToken(newUser._id, res); // Generate and set token as cookie
      // Send token in response along with the user info
      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        token, // Send the generated token in response
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Signin function
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(existingUser._id, res); // Generate and set token as cookie
    console.log("Generated Token:", token);
    console.log("Cookies Sent:", res.getHeaders()["set-cookie"]); 

    // Send token in response along with the user info
    res.status(200).json({
      message: "User signed in successfully",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token, // Send the generated token in response
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout function
export const logout = (req, res) => {
  try {
    // Clear the JWT cookie from the client's browser
    res.clearCookie("jwt", {
      httpOnly: true, // Ensures the cookie is cleared securely
      secure: process.env.NODE_ENV === "production", // Only clears cookie over HTTPS in production
      sameSite: "Strict", // Matches the cookie's SameSite option for security
    });

    res.status(200).json({
      message: "User logged out successfully. JWT token has been removed.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all user
export const userProfile = async (req, res) => {
  try {
    // Get the logged-in user's ID from the request object (after secure route validation)
    const loggedInUser = req.User._id;

    // Find all users excluding the logged-in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password -confirmPassword"); // Exclude password and confirmPassword from results

    // Send the filtered users as a response
    res.status(200).json(filteredUsers );
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
