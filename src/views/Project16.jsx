import React, { useEffect, useState } from "react"
import "../styles/project16.scss"

export default function Project16(){  
  
  const totalTime = 7500;

  const [text,setText]=useState("Breathe In!")
  
  useEffect(() => {
    breathAnimation()

    const timeInterval = setInterval(()=>{
      breathAnimation()
    }, 7500);

    return ()=>clearInterval(timeInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  function breathAnimation() {
    setText("Breathe In!")
    setTimeout(() => {
      setText("Hold")
  
      setTimeout(() => {
        setText("Breathe Out!")
      }, totalTime/5);
    }, (7500/5)*2);
  }
  

  return(
    <div className="project16">
      <h1>Relaxer</h1>

      <div className={`container ${text==="Breathe Out!"?"shrink":"grow"}`} id="container">
        <div className="circle"></div>

        <p id="text">{text}</p>

        <div className="pointer-container">
          <span className="pointer"></span>
        </div>

        <div className="gradient-circle"></div>
      </div>
    </div>
  )}