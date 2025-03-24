import React from "react";
import "./App.css";
import Left from "./left/Left";
import Right from "./right/Right";
import Logout from "./left1/Logout";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import { useAuth } from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom"; // Ensure Navigate is imported

function App() {
  const { authUser } = useAuth(); // No need to destructure setAuthUser if not used
  console.log(authUser);

  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex h-screen">
              <Logout />
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" replace /> // Corrected syntax
          )
        }
      />
      <Route path="/signup" element={authUser ? <Navigate to="/" replace /> : <SignupPage />} />
      <Route path="/login" element={authUser ? <Navigate to="/" replace /> : <SigninPage />} />
    </Routes>
  );
}

export default App;
