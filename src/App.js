import React,{ useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Project1 from "./views/Project1";

function App() {
  const [dirUrl,setDirUrl]=useState("home")

  return (
    <Router>
      {dirUrl==="home"&&<Navbar/>}
      <Routes>
        <Route path="/" element={<Home setDirUrl={setDirUrl}/>} />
        <Route path="/Project1" element={<Project1 setDirUrl={setDirUrl}/>} />
      </Routes>
    </Router>
  );
}

export default App;
