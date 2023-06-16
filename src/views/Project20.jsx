import React, { useEffect, useState } from "react"
import "../styles/project20.scss"
import mic from "../asstes/project20/mic.png"

export default function Project20(){  

  const [numb,setNumb]=useState(Math.floor(Math.random() * 100) + 1)

  window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

  const [recog,setRecog]=useState(new window.SpeechRecognition())
  const [speakAudio,setSpeakAudio]=useState("")

  const [newSpeak,setNewSpeak]=useState(false)

  useEffect(() => {
    recog.start()

    recog.addEventListener('result', (e)=>onSpeak(e))
    recog.addEventListener('end',()=>recog.start())
  }, [recog]);

  useEffect(() => {
    setNewSpeak(false)
  }, [newSpeak]);
        
  // Capture user speak
  function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    setNewSpeak(true)
    setSpeakAudio(msg)
  }

  return(
    <div className="project20">
      <img src={mic} alt="Speak" />

      <h1>Guess a Number Between 1 - 100</h1>

      <h3>Speak the number into your microphone</h3>

      <h2>Your Speek: {speakAudio}</h2>
      {!newSpeak && 
        <div id="msg" className="msg">
          {
            speakAudio==="" ? <div>Say a number</div> :
            !Number(speakAudio) ?
              <div>That is not a valid number</div>
            :
              (speakAudio > 100 || speakAudio < 1) ?
                <div>Number must be between 1 and 100</div>
              : Number(speakAudio) === numb ?
                <>
                  <h2>Congrats! You have guessed the number! It was {speakAudio}</h2>
                  <button className="play-again" id="play-again" onClick={()=>{
                    setNumb(Math.floor(Math.random() * 100) + 1)
                    setSpeakAudio("")
                  }}>Play Again</button>
                </>
                : speakAudio > numb ?
                  <div>GO LOWER</div> :
                  <div>GO HIGHER</div>
          }
        </div>
      }
    </div>
  )}