import React, { useEffect, useState } from "react"
import "../styles/project14.scss"

export default function Project14(){  

  const [data,setData]=useState([])
  const [activeCard,setActiveData]=useState(0)
  const [answer,setAnswer]=useState(false)
  const [add,setAdd]=useState(false)
  
  useEffect(() => {
    getCardsData()
  }, []);

  function getCardsData() {
    if(JSON.parse(localStorage.getItem('cards'))!==null){
      setData(JSON.parse(localStorage.getItem('cards')))
    }  
  }
    

  return(
    <div className="project14">
        <button id="clear" className="clear btn" onClick={()=>{
          localStorage.clear()
          window.location.reload()    
        }}>
          <i className="fas fa-trash"></i> Clear Cards
        </button>

        <h1>
          Memory Cards
          <button id="show" className="btn btn-small" onClick={()=>setAdd(true)}>
            <i className="fas fa-plus"></i> Add New Card
          </button>
        </h1>

        <div id="cards-container" className="cards">
          {data.map((obj,i)=>{
            return(
              <div key={i} className={`card ${activeCard===i&&"active"} ${answer&&"show-answer"}`} onClick={()=>setAnswer(!answer)}>
                <div className="inner-card">
                  <div className="inner-card-front">
                    <p>
                      {obj.question}
                    </p>
                  </div>
                  <div className="inner-card-back">
                    <p>
                      {obj.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="navigation">
          <button id="prev" className="nav-button" onClick={()=>{
            if(activeCard!==0){
              setAnswer(false)
              setActiveData(activeCard-1)
            }
          }}>
            <i className="fas fa-arrow-left"></i>
          </button>

          <p id="current">{data.length===0?activeCard:activeCard+1}/{data.length}</p>

          <button id="next" className="nav-button" onClick={()=>{
            if(activeCard!==data.length-1 && data.length!==0){
              setAnswer(false)
              setActiveData(activeCard+1)
            }
          }}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div id="add-container" className={`add-container ${add&&"show"}`}>
          <h1>
            Add New Card
            <button id="hide" className="btn btn-small btn-ghost" onClick={()=>setAdd(false)}>
              <i className="fas fa-times"></i>
            </button>
          </h1>

          <div className="form-group">
            <label htmlFor="question">Question</label>
            <textarea id="question" placeholder="Enter question..."></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="answer">Answer</label>
            <textarea id="answer" placeholder="Enter Answer..."></textarea>
          </div>

          <button id="add-card" className="btn" onClick={()=>{
            let q = document.getElementById("question")
            let a = document.getElementById("answer")

            if(q!==""&&a!==""){
              console.log(a,q)
              const obj = {
                question: q.value.trim(),
                answer: a.value.trim()
              }
              localStorage.setItem('cards', JSON.stringify([...data,obj]))
              getCardsData()

              q.value=""
              a.value=""
              setAdd(false)
            }
          }}>
            <i className="fas fa-plus"></i> Add Card
          </button>
        </div>
        {add &&
          <div className="fondo" onClick={()=>setAdd(false)}></div>
        }
    </div>
  )
}