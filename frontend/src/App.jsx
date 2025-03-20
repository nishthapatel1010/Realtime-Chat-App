import React from "react";  
import './App.css'
import Left from './left/Left'
import Right from './right/Right'
import Logout from "./left1/Logout";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex h-screen">
      <Logout />
      <Left />
      <Right />
      </div>
    </>
  )
}

export default App
