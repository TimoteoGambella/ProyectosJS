import React,{ useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Project1 from "./views/Project1";
import Project2 from "./views/Project2";
import Project3 from "./views/Project3";
import Project4 from "./views/Project4";
import Project5 from "./views/Project5";
import Project6 from "./views/Project6";
import Project7 from "./views/Project7";
import Project8 from "./views/Project8";
import Project9 from "./views/Project9";
import Project10 from "./views/Project10";
import Project11 from "./views/Project11";
import Project12 from "./views/Project12";
import Project13 from "./views/Project13";
import Project14 from "./views/Project14";
import Project15 from "./views/Project15";
import Project16 from "./views/Project16";
import Project17 from "./views/Project17";
import Project18 from "./views/Project18";
import Project19 from "./views/Project19";
import Project20 from "./views/Project20";

function App() {
  const [dirUrl,setDirUrl]=useState("home")

  return (
    <Router>
      {dirUrl==="home"&&<Navbar/>}
      <Routes>
        <Route path="/" element={<Home setDirUrl={setDirUrl}/>} />
        <Route path="/Project1" element={<Project1/>} />
        <Route path="/Project2" element={<Project2/>} />
        <Route path="/Project3" element={<Project3/>} />
        <Route path="/Project4" element={<Project4/>} />
        <Route path="/Project5" element={<Project5/>} />
        <Route path="/Project6" element={<Project6/>} />
        <Route path="/Project7" element={<Project7/>} />
        <Route path="/Project8" element={<Project8/>} />
        <Route path="/Project9" element={<Project9/>} />
        <Route path="/Project10" element={<Project10/>} />
        <Route path="/Project11" element={<Project11/>} />
        <Route path="/Project12" element={<Project12/>} />
        <Route path="/Project13" element={<Project13/>} />
        <Route path="/Project14" element={<Project14/>} />
        <Route path="/Project15" element={<Project15/>} />
        <Route path="/Project16" element={<Project16/>} />
        <Route path="/Project17" element={<Project17/>} />
        <Route path="/Project18" element={<Project18/>} />
        <Route path="/Project19" element={<Project19/>} />
        <Route path="/Project20" element={<Project20/>} />
      </Routes>
    </Router>
  );
}

export default App;
