import React, { useEffect, useState } from "react"
import "../styles/project3.scss"
import "../styles/project3b.scss"
import videoRun from "../asstes/project3/gone.mp4"
import poster from "../asstes/project3/poster.png"


export default function Project3(){

    const [video,setVideo]=useState("")
    const [play,setPlay]=useState("")
    const [progress,setProgress]=useState("")
    const [timestamp,setTimestamp]=useState("")

    useEffect(() => {
        setVideo(document.getElementById('video'))
        setPlay(document.getElementById("play"))
        setProgress(document.getElementById('progress'))
        setTimestamp(document.getElementById('timestamp'))
    }, []);

    // Play & pause video
    function toggleVideoStatus() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        updatePlayIcon()
    }
    
    // update play/pause icon
    function updatePlayIcon() {
        if (video.paused) {
            play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
        } else {
            play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
        }
    }
    
    // Update progress & timestamp
    function updateProgress(e) {
        progress.value = (e.currentTime / e.duration) * 100;

        // Get the minutes
        let mins = Math.floor(e.currentTime / 60);
        if(mins < e.duration){
        mins = '0' + String(mins);
        }

        // Get Seconds
        let secs = Math.floor(e.currentTime % 60);
        if(secs < e.duration){
        secs = '0' + String(secs);
        }

        console.log(`${mins}:${secs}`)
        timestamp.innerHTML = `${mins}:${secs}`;
    }
    
    // Set video time to progress
    function setVideoProgress(e) {
          video.currentTime = (+e.value * video.duration) / 100;
    }
    
    // Stop video
    function stopVideo(e) {
        video.currentTime = 0;
        video.pause(e);
    }
    
    return(
        <div className="project3">
            <h1>Custom Video Player</h1>
            <video
                src={videoRun}
                id="video"
                className="screen"
                poster={poster}
                onClick={()=>toggleVideoStatus()}
                onPause={(e)=>updatePlayIcon(e)}
                onPlay={(e)=>updatePlayIcon(e)}
                onTimeUpdate={(e)=>updateProgress(e.target)}
            ></video>
            <div className="controls">
                <button className="btn" id="play" onClick={()=>toggleVideoStatus()}>
                    <i className="fa fa-play fa-2x"></i>
                </button>
                <button className="btn" id="stop" onClick={(e)=>stopVideo(e)}>
                    <i className="fa fa-stop fa-2x"></i>
                </button>
                <input
                    type="range"
                    id="progress"
                    className="progress"
                    min="0"
                    max="100"
                    step="0.1"
                    value="0"
                    onChange={(e)=>setVideoProgress(e.target)}
                />
                <span className="timestamp" id="timestamp">00:00</span>
            </div>
        </div>
    )
}