import React, { useEffect, useState } from "react"
import "../styles/project19.scss"

export default function Project19(){  

  const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ];

  const [list,setList]=useState([])
  const [checked,setChecked]=useState(false)

  const [reload,setReload]=useState(true)

  const [dragStart,setDragStart]=useState({})

  useEffect(() => {
    if(list.length===0){
      setList(richestPeople.sort(()=>{ return Math.random() - 0.5 }))
    }
  }, [])

  useEffect(() => {
    if(!reload){setReload(true)}
  }, [reload])

  useEffect(() => {
    if(checked){
      const array = document.getElementById("draggable-list").childNodes
      for (let i = 0; i < array.length; i++) {
        if(list[array[i].getAttribute('data-index')]===richestPeople[array[i].getAttribute('data-index')]){
          array[i].classList.add("right")
        }else{
          array[i].classList.add("wrong")
        }
      }
      setChecked(false)
    }
  }, [checked])

  return(
    <div className="project19">
      <h1>10 Richest People</h1>
      <p>Drag and drop the items into their corresponding spots</p>
      <ul className="draggable-list" id="draggable-list">
        {reload && list.map((obj,i)=>{
          return(
            <li data-index={i} key={i} 
              onDragStart={()=>setDragStart({key:i,name:obj})}
              onDragOver={(e)=>e.preventDefault()}
              onDragEnter={(e)=>e.target.parentNode.classList.add('over')}
              onDragLeave={(e)=>e.target.parentNode.classList.remove('over')}
              onDrop={()=>{
                let newArray=list
                newArray[dragStart.key]=obj
                newArray[i]=dragStart.name
                setList(newArray)
                setReload(false)
              }}
            >
              <span className="number">{i}</span>
              <div className="draggable" draggable="true">
                <p className="person-name">{obj}</p>
                <i className="fas fa-grip-lines"></i>
              </div>
            </li>
          )
        })}
      </ul>
      <button className="check-btn" id="check" onClick={()=>{
        setChecked(true)
      }}>
        Check Order
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  )}