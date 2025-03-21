import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // console.log("Generated JWT Token:", token); // This will log the token in the terminal

    return token;
};

export default generateToken;
