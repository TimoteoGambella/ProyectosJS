import React, { useEffect, useState } from "react"
import "../styles/project12.scss"

export default function Project12(){
  const words = ['sigh','tense','airplane','ball','pies','juice','warlike','bad','north','dependent','steer','silver','highfalutin','superficial','quince','eight','feeble','admit','drag','loving'];

  const [score,setScore]=useState(0)
  const [time,setTime]=useState(10)

  const [difficulty,setDificulty]=useState("easy")

  const [selectWord,setSelectWord]=useState(words[Math.floor(Math.random() * words.length)])

  useEffect(() => {
    const timeInterval = setInterval(()=>{
      if(time!==0){
        setTime(time=>time-1)
      }else{
        clearInterval(timeInterval)
      }
    }, 1000);
    return ()=>clearInterval(timeInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update time
// function updateTime() {
//   if (time === 0) {
//     setInterval(false)
//     // setTime(10)
//     // end game
//     // gameOver();
//   }
// }

// // Game over, show end screen
// function gameOver() {
//   endgameEl.innerHTML = `
//     <h1>Time ran out</h1>
//     <p>Your final score is ${score}</p>
//     <button onclick="location.reload()">Reload</button>
//   `;

//   endgameEl.style.display = 'flex';
// }


  return(
    <div className="project12">
      <div id="settings" className="settings">
        <form id="settings-form">
          <div>
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" defaultValue={difficulty} onChangeCapture={(e)=>setDificulty(e.target.value)}>
              <option value="easy" >Easy</option>
              <option value="medium" >Medium</option>
              <option value="hard" >Hard</option>
            </select>
          </div>
        </form>
      </div>

      <div className="container">
        <h2>👩‍💻 Speed Typer 👨‍💻</h2>
        <small>Type the following:</small>

        <h1 id="word">{selectWord}</h1>

        <input
          type="text"
          id="text"
          autoComplete="off"
          placeholder="Type the word here..."
          autoFocus
          onChangeCapture={(e)=>{
            if(e.target.value.toUpperCase()===selectWord.toUpperCase()){
              setScore(score+1)
              if (difficulty === 'hard') {
                setTime(time+2)
              } else if (difficulty === 'medium') {
                setTime(time+3)
              } else {
                setTime(time+5)
              }
              e.target.value=""
              setSelectWord(words[Math.floor(Math.random() * words.length)])
            }
          }}
        />
        <p className="time-container">Time left: <span id="time">{time}s</span></p>
        <p className="score-container">Score: <span id="score">{score}</span></p>
        <div id="end-game-container" className="end-game-container"></div>
      </div>
    </div>
  )
}