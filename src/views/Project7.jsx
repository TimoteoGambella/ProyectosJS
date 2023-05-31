import React, { useEffect, useState } from "react"
import "../styles/project7.scss"

export default function Project7(){
  const words = ['application', 'programming', 'interface', 'wizard', 'document', 'plane', 'lightblue', 'developer', 'software']

  const [play,setPlay]=useState(true)
  const [win,setWin]=useState(false)

  const [activeWord,setActiveWord]=useState("")

  const [corrects,setCorrects]=useState([])
  const [wrongs,setWrongs]=useState([])

  useEffect(() => {
    if(activeWord===""){
      setActiveWord(words[Math.floor(Math.random() * words.length)])
    }
  }, []);

  // const wordEl = document.getElementById('word');
  // const wrongLettersEl = document.getElementById('wrong-letters');
  // const playAgainBtn = document.getElementById('play-button');
  // const popup = document.getElementById('popup-container');
  // const notification = document.getElementById('notification-container');
  // const finalMessage = document.getElementById('final-message');
  // const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
  
  // const figureParts = document.querySelectorAll('.figure-part');
  
    
  // let playable = true;
  
  // const correctLetters = [];
  // const wrongLetters = [];
  
  // // Show hidden word
  // function displayWord() {
  
  //   const innerWord = wordEl.innerText.replace(/[ \n]/g, '');
    
  //   if (innerWord === activeWord) {
  //     finalMessage.innerText = 'Congratulations! You won! 😃';
  //     finalMessageRevealWord.innerText = '';
  //     popup.style.display = 'flex';
  
  //     playable = false;
  //   }
  // }
  
  // // Update the wrong letters
  // function updateWrongLettersEl() {
  //   // Display wrong letters
  //   wrongLettersEl.innerHTML = `
  //     ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  //     ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  //   `;
  
  //   // Display parts
  //   figureParts.forEach((part, index) => {
  //     const errors = wrongLetters.length;
  
  //     if (index < errors) {
  //       part.style.display = 'block';
  //     } else {
  //       part.style.display = 'none';
  //     }
  //   });
  
  //   // Check if lost
  //   if (wrongLetters.length === figureParts.length) {
  //     finalMessage.innerText = 'Unfortunately you lost. 😕';
  //     finalMessageRevealWord.innerText = `...the word was: ${activeWord}`;
  //     popup.style.display = 'flex';
  
  //     playable = false;
  //   }
  // }
  
  // // Show notification
  function showNotification() {
    const notification = document.getElementById('notification-container')
    notification.classList.add('show');
  
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }
  
  // // Keydown letter press
  window.addEventListener('keydown', e => {
    if (play) {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();
  
        if (activeWord.includes(letter)) {
          if (!corrects.includes(letter)) {
            setCorrects([...corrects, e.key])
            } else {
            showNotification();
          }
        } else {
          if (!wrongs.includes(letter)) {
            setWrongs([...wrongs, e.key])
            } else {
            showNotification();
          }
        }
      }
    }
  });

  // // Restart game and play again
  // playAgainBtn.addEventListener('click', () => {
  //   playable = true;
  
  //   //  Empty arrays
  //   correctLetters.splice(0);
  //   wrongLetters.splice(0);
  
  //   // selectedWord = words[Math.floor(Math.random() * words.length)];
  
  //   displayWord();
  
  //   updateWrongLettersEl();
  
  //   popup.style.display = 'none';
  // });
  
  // displayWord();



  return(
    <div className="project7">
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
            <circle cx="140" cy="70" r="20" className="figure-part" />
            {/* <!-- Body --> */}
            <line x1="140" y1="90" x2="140" y2="150" className="figure-part" />
            {/* <!-- Arms --> */}
            <line x1="140" y1="120" x2="120" y2="100" className="figure-part" />
            <line x1="140" y1="120" x2="160" y2="100" className="figure-part" />
            {/* <!-- Legs --> */}
            <line x1="140" y1="150" x2="120" y2="180" className="figure-part" />
            <line x1="140" y1="150" x2="160" y2="180" className="figure-part" />
          </svg>

          <div className="wrong-letters-container">
            <div id="wrong-letters"></div>
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
        <div className="popup-container" id="popup-container">
          <div className="popup">
            <h2 id="final-message"></h2>
            <h3 id="final-message-reveal-word"></h3>
            <button id="play-button">Play Again</button>
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