import React, { useEffect, useState } from "react"
import "../styles/project7.scss"

export default function Project7(){
  const words = ['application', 'programming', 'interface', 'wizard', 'document', 'plane', 'lightblue', 'developer', 'software']

  const [play,setPlay]=useState(true)

  const [key,setKey]=useState("")

  const [activeWord,setActiveWord]=useState(words[Math.floor(Math.random() * words.length)])
  const [preWord,setPreWord]=useState("")

  const [corrects,setCorrects]=useState([])
  const [wrongs,setWrongs]=useState([])

  useEffect(() => {
    window.addEventListener('keydown', e => handleKey(e));
    return ()=>window.removeEventListener('keydown', e => handleKey(e));    
  }, []);

  useEffect(() => {
    if(key!==""){
      if (play && window.location.pathname==="/project7" && activeWord!=="") {
        if (key.keyCode >= 65 && key.keyCode <= 90) {
          const letter = key.key.toLowerCase();
    
          if (activeWord.indexOf(letter)!==-1) {
            if (!corrects.includes(letter)) {
              setCorrects([...corrects,key.key])
              } else {
              showNotification();
            }
          } else {
            if (!wrongs.includes(letter)) {
              setWrongs([...wrongs,key.key])
              } else {
              showNotification();
            }
          }
        }
      }
    }
  }, [key]);

  useEffect(() => {
    if(wrongs.length===6){
      setPlay(false)
    }

    if(corrects.length!==0){
      setPreWord(document.getElementById('word').innerText.replace(/[ \n]/g, ''))
    }
  }, [wrongs,corrects]);

  useEffect(() => {
    if(preWord===activeWord){
      setPlay(false)
    }
  }, [preWord]);

  function handleKey(e) {
    setKey(e)
  }
  
  // Show notification
  function showNotification() {
    const notification = document.getElementById('notification-container')
    notification.classList.add('show');
  
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }

  return(
    <div className="project7" onKeyDown={(e)=>console.log(e)}>
      <div className="container">
        <h1>Hangman</h1>
        <p>Find the hidden word - Enter a letter</p>
        <div className="game-container">
          <svg height="250" width="200" className="figure-container">
            {/* <!-- Rod --> */}
            <line x1="60" y1="20" x2="140" y2="20" />
            <line x1="140" y1="20" x2="140" y2="50" />
            <line x1="60" y1="20" x2="60" y2="230" />
            <line x1="20" y1="230" x2="100" y2="230" />

            {/* <!-- Head --> */}
            <circle cx="140" cy="70" r="20" className="figure-part" style={{display:wrongs.length>=1&&"block"}}/>
            {/* <!-- Body --> */}
            <line x1="140" y1="90" x2="140" y2="150" className="figure-part" style={{display:wrongs.length>=2&&"block"}}/>
            {/* <!-- Arms --> */}
            <line x1="140" y1="120" x2="120" y2="100" className="figure-part" style={{display:wrongs.length>=3&&"block"}}/>
            <line x1="140" y1="120" x2="160" y2="100" className="figure-part" style={{display:wrongs.length>=4&&"block"}}/>
            {/* <!-- Legs --> */}
            <line x1="140" y1="150" x2="120" y2="180" className="figure-part" style={{display:wrongs.length>=5&&"block"}}/>
            <line x1="140" y1="150" x2="160" y2="180" className="figure-part" style={{display:wrongs.length>=6&&"block"}}/>
          </svg>

          <div className="wrong-letters-container">
            <div id="wrong-letters">
              {wrongs.length!==0 && <p>Wrong</p>}
              {wrongs.map((obj,i)=>{
                return(
                  <span key={i}>{i>0&&","}{obj}</span>
                )
              })}
            </div>
          </div>

          <div className="word" id="word">
            {activeWord!=="" && activeWord.split("").map((obj,i)=>{
              return(
                <span className="letter" key={i}>{corrects.includes(obj)?obj:""}</span>
              )
            })}
          </div>
        </div>

        {/* <!-- Container for final message --> */}
        <div className="popup-container" id="popup-container" style={{display:(wrongs.length===6 || preWord===activeWord)&&"flex"}}>
          <div className="popup">
            <h2 id="final-message">
              {wrongs.length===6 && "Unfortunately you lost. 😕"}
              {preWord===activeWord && "Congratulations! You won! 😃"}
            </h2>
            <h3 id="final-message-reveal-word">
              {(wrongs.length===6 || preWord===activeWord) && `...the word was: ${activeWord}`}
            </h3>
            <button id="play-button" onClick={()=>{
              setActiveWord(words[Math.floor(Math.random() * words.length)])
              setCorrects([])
              setWrongs([])
              setKey("")
              setPlay(true)
            }}>Play Again</button>
          </div>
        </div>

        {/* <!-- Notification --> */}
        <div className="notification-container" id="notification-container">
          <p>You have already entered this letter</p>
        </div>
      </div>
    </div>
  )
}