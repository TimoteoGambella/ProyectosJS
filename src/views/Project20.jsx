import React, { useEffect, useState } from "react"
import "../styles/project20.scss"
import mic from "../asstes/project20/mic.png"

export default function Project20(){  

  const [numb,setNumb]=useState(Math.floor(Math.random() * 100) + 1)
  const [recog,setRecog]=useState("")

  useEffect(() => {
    if(recog===""){
      setRecog(new window.SpeechRecognition())
    }else{
      recognition.addEventListener('result', ()=>console.log("HOLA"));
      recognition.addEventListener('end', () => console.log("HOLA"));

    }
    console.log(recog)
  }, [recog]);

  const msgEl = document.getElementById('msg');

  const randomNum = getRandomNumber();
    
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  
  let recognition = new window.SpeechRecognition();
  
  // Start recognition and game
  recognition.start();
  
  // Capture user speak
  function onSpeak(e) {
    const msg = e.results[0][0].transcript;
  
    writeMessage(msg);
    checkNumber(msg);
  }
  
  // Write what user speaks
  function writeMessage(msg) {
    msgEl.innerHTML = `
      <div>You said: </div>
      <span class="box">${msg}</span>
    `;
  }
  
  // Check msg against number
  function checkNumber(msg) {
    const num = +msg;
  
    // Check if valid number
    if (Number.isNaN(num)) {
      msgEl.innerHTML += '<div>That is not a valid number</div>';
      return;
    }
  
    // Check in range
    if (num > 100 || num < 1) {
      msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
      return;
    }
  
    // Check number
    if (num === randomNum) {
      document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
      `;
    } else if (num > randomNum) {
      msgEl.innerHTML += '<div>GO LOWER</div>';
    } else {
      msgEl.innerHTML += '<div>GO HIGHER</div>';
    }
  }
  
  // Generate random number
  function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  // Speak result
  recognition.addEventListener('result', ()=>console.log("HOLA"));
  
  // End SR service
  recognition.addEventListener('end', () => console.log("HOLA"));
  
  document.body.addEventListener('click', e => {
    if (e.target.id === 'play-again') {
      window.location.reload();
    }
  });
  return(
    <div className="project20">
      <img src={mic} alt="Speak" />

      <h1>Guess a Number Between 1 - 100</h1>

      <h3>Speak the number into your microphone</h3>

      <div id="msg" className="msg"></div>
    </div>
  )}