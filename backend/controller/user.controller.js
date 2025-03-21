import User from "../models/Usermodel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js"; // Import JWT function

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
            confirmPassword: hashedPassword // Keeping confirmPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token: generateToken(newUser._id) // Generate JWT token
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// signin function 
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(existingUser._id);

        res.status(200).json({
            message: "User signed in successfully",
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
            token, // Send the generated token
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};