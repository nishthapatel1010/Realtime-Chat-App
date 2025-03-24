import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

function SignUp() {
  const { authUser, setAuthUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordMatch: true,
    passwordStrength: true,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      validatePasswords(name, value);
    }
  };

  const validatePasswords = (field, value) => {
    let password = field === "password" ? value : formData.password;
    let confirmPassword = field === "confirmPassword" ? value : formData.confirmPassword;

    setErrors({
      passwordMatch: password === confirmPassword,
      passwordStrength: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!errors.passwordMatch || !errors.passwordStrength) {
      setMessage("Please fix errors before submitting!");
      return;
    }
  
    try {
      const { data } = await axios.post("http://localhost:5002/api/users/signup", formData);
      localStorage.setItem("userData", JSON.stringify(data));
      setAuthUser(data);
      setMessage("Sign-up successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md px-10 py-6 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600">Messenger</h1>
        <h2 className="text-gray-600 text-center mb-4">Create a New Account</h2>
        {message && <p className="text-center text-red-500 text-sm">{message}</p>}
        <div className="space-y-4">
          <label className="flex items-center border rounded-md px-3 py-2">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="ml-2 w-full outline-none" autoComplete="email" />
          </label>
          <label className="flex items-center border rounded-md px-3 py-2">
            <input type="text" name="name" placeholder="Username" value={formData.username} onChange={handleChange} required pattern="[A-Za-z][A-Za-z0-9\-]*" className="ml-2 w-full outline-none" autoComplete="username" />
          </label>
          <label className="flex flex-col border rounded-md px-3 py-2">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="ml-2 w-full outline-none" autoComplete="new-password" />
            {!errors.passwordStrength && <span className="text-red-500 text-xs">Password must be at least 8 characters long and include a number & special character.</span>}
          </label>
          <label className="flex flex-col border rounded-md px-3 py-2">
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="ml-2 w-full outline-none" autoComplete="new-password" />
            {!errors.passwordMatch && <span className="text-red-500 text-xs">Passwords do not match!</span>}
          </label>
          <p className="text-center text-gray-600 text-sm">
            Have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
