import React, { useEffect, useState } from "react"
import "../styles/project10.scss"

import heyF from "../asstes/project10/hey.jpg"
import heyM from "../asstes/project10/music-player_music_hey.mp3"
import summerF from "../asstes/project10/summer.jpg"
import summerM from "../asstes/project10/music-player_music_summer.mp3"
import ukeleleF from "../asstes/project10/ukulele.jpg"
import ukeleleM from "../asstes/project10/music-player_music_ukulele.mp3"

export default function Project10(){
  const musics = [
    {
      id:1,
      name:"hey",
      img:heyF,
      aud:heyM
    },
    {
      id:2,
      name:"summer",
      img:summerF,
      aud:summerM
    },
    {
      id:3,
      name:"ukelele",
      img:ukeleleF,
      aud:ukeleleM
    },
  ]

  const [audioElement,setAudioElement]=useState("")

  const [select,setSelect]=useState(1)
  const [song,setSong]=useState(musics[select])

  const [play,setPlay]=useState(false)

  useEffect(() => {
    if(audioElement===""){
      setAudioElement(document.getElementById('audio'))
    }else{
      audioElement.pause()
      setTimeout(() => {
        audioElement.play()
      }, 500);
    }
    setSong(musics[select-1])
  }, [select]);
  

  const currTime = document.querySelector('#currTime');
  const durTime = document.querySelector('#durTime');

  // Update progress bar
  function updateProgress(e) {
    const progress = document.getElementById('progress');

    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  // Set progress bar
  function setProgress(e) {

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;

    audioElement.currentTime = (clickX / width) * duration;
  }

  //get duration & currentTime for Time of song
  function DurTime (e) {
    const {duration,currentTime} = e.srcElement;
    var sec;
    var sec_d;

    // define minutes currentTime
    let min = (currentTime==null)? 0:
    Math.floor(currentTime/60);
    min = min <10 ? '0'+min:min;

    // define seconds currentTime
    function get_sec (x) {
      if(Math.floor(x) >= 60){
        
        for (var i = 1; i<=60; i++){
          if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
            sec = Math.floor(x) - (60*i);
            sec = sec <10 ? '0'+sec:sec;
          }
        }
      }else{
        sec = Math.floor(x);
        sec = sec <10 ? '0'+sec:sec;
      }
    } 

    get_sec (currentTime,sec);

    // change currentTime DOM
    currTime.innerHTML = min +':'+ sec;

    // define minutes duration
    let min_d = (isNaN(duration) === true)? '0':
      Math.floor(duration/60);
    min_d = min_d <10 ? '0'+min_d:min_d;


    function get_sec_d (x) {
      if(Math.floor(x) >= 60){
        
        for (var i = 1; i<=60; i++){
          if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
            sec_d = Math.floor(x) - (60*i);
            sec_d = sec_d <10 ? '0'+sec_d:sec_d;
          }
        }
      }else{
        sec_d = (isNaN(duration) === true)? '0':
        Math.floor(x);
        sec_d = sec_d <10 ? '0'+sec_d:sec_d;
      }
    } 

    // define seconds duration
    
    get_sec_d (duration);

    // change duration DOM
    durTime.innerHTML = min_d +':'+ sec_d;
      
  };
  return(
    <div className="project10">
      <h1>Music Player</h1>

      <div className={`music-container ${play&&"play"}`} id="music-container">
        <div className="music-info">
          <h4 id="title">{song.name}</h4>
          <div className="progress-container" id="progress-container" onClick={(e)=>setProgress(e)}>
            <div className="progress" id="progress"></div>
          </div>
        </div>

        <audio src={song.aud} id="audio" 
          onEnded={()=>{
            if(select!==3){
              setSelect(select+1)
            }else{setSelect(1)}
          }}
          onTimeUpdate={(e)=>{
            // updateProgress(e)
            // DurTime(e)
          }}
        ></audio>

        <div className="img-container">
          <img src={song.img} alt="music-cover" id="cover" />
        </div>
        <div className="navigation">
          <button id="prev" className="action-btn" onClick={()=>{
            if(select!==1){
              setSelect(select-1)
            }else{setSelect(3)}
          }}>
            <i className="fas fa-backward"></i>
          </button>
          <button id="play" className="action-btn action-btn-big" onClick={()=>{
              if(!play){
                setPlay(true)
                audioElement.play()
              }else{
                setPlay(false)
                audioElement.pause()
              }
            }}>
            <i className={`fas ${!play?"fa-play":"fa-pause"}`}></i>
          </button>
          <button id="next" className="action-btn" onClick={()=>{
            if(select!==3){
              setSelect(select+1)
            }else{setSelect(1)}
          }}>
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </div>
    </div>
  )
}