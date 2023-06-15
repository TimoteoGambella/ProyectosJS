import React, { useEffect, useState } from "react"
import "../styles/project13.scss"

export default function Project13(){  
  const [voices,setVoices]=useState([])
  const [toggle,setToggle]=useState(false)
  const [message,setMessage]=useState(new SpeechSynthesisUtterance())

  const data = [
    {
      text: "I'm Thirsty"
    },
    {
      text: "I'm Hungry"
    },
    {
      text: "I'm Tired"
    },
    {
      text: "I'm Hurt"
    },
    {
      text: "I'm Happy"
    },
    {
      text: "I'm Angry"
    },
    {
      text: "I'm Sad"
    },
    {
      text: "I'm Scared"
    },
    {
      text: 'I Want To Go Outside'
    },
    {
      text: 'I Want To Go Home'
    },
    {
      text: 'I Want To Go To School'
    },
    {
      text: 'I Want To Go To Grandmas'
    }
  ];
    
  function getVoices() {
    let x = speechSynthesis.getVoices()
    setVoices(x)
  }
  function speakText(text) {
    message.text=text
    speechSynthesis.speak(message);
  }
  function setNewVoice(newVoice) {
    message.voice = voices.find(voice => voice.name === newVoice)
    console.log(message.voice)
  }

  speechSynthesis.addEventListener('voiceschanged', getVoices);

  return(
    <div className="project13">
      <div className="container">
        <h1>Speech Text Reader</h1>
        <button id="toggle" className="btn btn-toggle" onClick={()=>setToggle(true)}>
          Toggle Text Box
        </button>
        <div id="text-box" className={`text-box ${toggle&&"show"}`}>
          <div id="close" className="close" onClick={()=>setToggle(false)}>X</div>
          <h3>Choose Voice</h3>
          <select id="voices" onChangeCapture={(e)=>setNewVoice(e.target.value)}>
            {voices.map((obj,i)=>{
              return(
                <option value={obj.name} key={i}> {obj.name} </option>
              )
            })}
          </select>
          <textarea id="text" placeholder="Enter text to read..."></textarea>
          <button className="btn" id="read" onClick={()=>{
            speakText(document.getElementById("text").value)
          }}>Read Text</button>
        </div>
        <main>
          {data.map((obj,i)=>{
            return(
              <div className="box" id={`box`+i} key={i} onClick={(e)=>{
                const box = document.getElementById(`box`+i)
                box.classList.add('active')
                speakText(obj.text)
                setTimeout(() => box.classList.remove('active'), 800)
              }}>
                <p className="info">{obj.text}</p>
              </div>
            )
          })}
        </main>
      </div>
      {toggle &&
        <div className="fondo" onClick={()=>setToggle(false)}></div>
      }
    </div>
  )
}