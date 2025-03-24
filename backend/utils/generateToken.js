import jwt from "jsonwebtoken";

// This function generates a JWT token a  nd sends it as a secure, httpOnly cookie
const generateToken = (userId, res) => {
  const token = jwt.sign({ id:userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 30 days
  });
  // console.log("Generated Token:", token);

  // Send the JWT token as a cookie in the response
  res.cookie('jwt', token, {
    httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
    secure:  process.env.NODE_ENV === "production",  // Ensures cookies are sent only over HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // Expiry of the cookie (7 days) // Cookie expires after 30 days
    sameSite: "strict",  // Prevents the cookie from being sent with cross-site requests
  });

  return token;
};

export default generateToken;
