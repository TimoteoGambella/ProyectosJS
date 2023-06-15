import React, { useEffect, useState } from "react"
import "../styles/project17.scss"

export default function Project17(){  
  
  return(
    <div className="project17">
      <h1>Breakout!</h1>
      <button id="rules-btn" className="btn rules-btn">Show Rules</button>
      <div id="rules" className="rules">
        <h2>How To Play:</h2>
        <p>
          Use your right and left keys to move the paddle to bounce the ball up
          and break the blocks.
        </p>
        <p>If you miss the ball, your score and the blocks will reset.</p>
        <button id="close-btn" className="btn">Close</button>
      </div>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
  )}