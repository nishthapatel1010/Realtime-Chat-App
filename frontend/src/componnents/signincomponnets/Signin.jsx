import React, { useState } from "react";
import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setErrors({
        ...errors,
        email: !/\S+@\S+\.\S+/.test(value), // Validate email format
      });
    }

    if (name === "password") {
      setErrors({
        ...errors,
        password: value.length < 8, // Password length validation
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.email || errors.password || !formData.email || !formData.password) {
      setMessage("Please fix the errors before submitting!");
      return;
    }

    try {
      console.log("Submitting data:", formData); // Debugging

      const { data } = await axios.post("http://localhost:5002/api/users/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("userData", JSON.stringify(data));
      setMessage("Sign-in successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Sign-in Error:", error);
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md px-10 py-6 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600">Messenger</h1>
        <h2 className="text-gray-600 text-center mb-4">Sign in to your account</h2>

        {message && <p className="text-center text-red-500 text-sm">{message}</p>}

        <div className="space-y-4">
          {/* Email */}
          <label className="flex items-center border rounded-md px-3 py-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="ml-2 w-full outline-none"
            />
          </label>
          {errors.email && <span className="text-red-500 text-xs">Invalid email format</span>}

          {/* Password */}
          <label className="flex items-center border rounded-md px-3 py-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="ml-2 w-full outline-none"
            />
          </label>
          {errors.password && <span className="text-red-500 text-xs">Password must be at least 8 characters</span>}

          {/* Sign Up Link & Button */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
