import React, { useEffect, useState } from "react"
import "../styles/project18.scss"
import loader from "../asstes/project18/spinner.gif"

export default function Project18(){  

  const currentYear = new Date().getFullYear();

  const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

  const [load,setLoad]=useState(true)
  const [date,setDate]=useState({
    year:currentYear+1,
    day:0,
    hour:0,
    minute:0,
    second:0
  })

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 1000);

    const int = setInterval(updateCountdown, 1000)

    return ()=>clearInterval(int)
  }, []);

  // Update countdown time
  function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    // Add values to DOM
    setDate({...date,
      day:d,
      hour:h < 10 ? '0' + h : h,
      minute:m < 10 ? '0' + m : m,
      second:s < 10 ? '0' + s : s
    })
  }

  return(
    <div className="project18">
      <div id="year" className="year" style={{zIndex:!load&&"0"}}>{date.year}</div>
      <h1>New Year Countdown</h1>
      <div id="countdown" className="countdown" style={{display:!load&&"flex"}}>
        <div className="time">
          <h2 id="days">{date.day}</h2>
          <small>days</small>
        </div>
        <div className="time">
          <h2 id="hours">{date.hour}</h2>
          <small>hours</small>
        </div>
        <div className="time">
          <h2 id="minutes">{date.minute}</h2>
          <small>minutes</small>
        </div>
        <div className="time">
          <h2 id="seconds">{date.second}</h2>
          <small>seconds</small>
        </div>
      </div>

      {load &&
        <img
        src={loader}
        alt="Loading..."
        id="loading"
        className="loading"
        />
      }
    </div>
  )}