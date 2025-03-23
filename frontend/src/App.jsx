import React from "react";
import "./App.css";
import Left from "./left/Left";
import Right from "./right/Right";
import Logout from "./left1/Logout";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import { useAuth } from "./context/AuthProvider";
import {Routes,Route} from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)
  const { authUser, setAuthUser } = useAuth();
  console.log(authUser);

  return (
    <>
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
              <SigninPage />
            )
          }
        />
      <Route path="/signup" element={<SigninPage />} />
      <Route path="/login" element={<SigninPage />} />
      </Routes>
    </>
  );
}

export default App;
