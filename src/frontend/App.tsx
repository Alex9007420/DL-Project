// import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from "./home/Home.tsx"
import NotFound from "./NotFound.tsx"
import NavBar from "./navbar/NavBar.tsx"
import Data from "./data/Data.tsx"
import Footer from "./footer/Footer.tsx"
import Login from "./login/Login.tsx"
import Submit from "./submit/Submit.tsx"
import Register from "./register/Register.tsx"
import Profile from "./profile/Profile.tsx";
import Leaderboard from "./leaderboard/Leaderboard.tsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <NavBar/>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer/>
    </div>
  )
}

export default App
