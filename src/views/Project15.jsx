import React, { useEffect, useState } from "react"
import "../styles/project15.scss"

export default function Project15(){  

  const [data,setData]=useState([])
  // const [dataNext,setDataNext]=useState("")
  // const [dataPrev,setDataPrev]=useState("")

  const [dataFail,setDataFail]=useState(false)

  const apiURL = 'https://api.lyrics.ovh';

  async function searchSongs(term) {
    setDataFail(false)
    
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const info = await res.json()
    
    if(info.data.length!==0){
      setData(info.data)
      // if(info.next!==undefined){setDataNext(info.next)}
      // if(info.prev!==undefined){setDataPrev(info.prev)}
    }else{
      setDataFail(true)
    }
  }

  return(
    <div className="project15">
      <header>
        <h1>LyricsSearch</h1>

        <form id="form">
          <input
            type="text"
            id="search"
            placeholder="Enter artist or song name..."
          />
          <button onClick={(e)=>{
            e.preventDefault()
            setData([])
            if (!document.getElementById("search").value) {
              alert('Please type in a search term');
            } else {
              searchSongs(document.getElementById("search").value.trim());
            }
          }}>Search</button>
        </form>
      </header>

      <div id="result" className="container">
        {dataFail ? <p>Don´t find songs with this name</p> : data.length===0 ?
          <p>Results will be displayed here</p>
        :
          <ul className="songs">
            {data.map((obj,i)=>{
              return(
                <li key={i}>
                  <span><strong>{obj.artist.name}</strong> - {obj.title}</span>
                  <button className="btn" data-artist={obj.artist.name} data-songtitle={obj.title}>Get Lyrics</button>
                </li>
              )
            })}
          </ul>
        }
      </div>

      {/* <div id="more" className="container centered">
        {dataPrev!=="" && <button className="btn" onClick={()=>searchSongs(dataPrev)}>Prev</button>}
        {dataNext!=="" && <button className="btn" onClick={()=>searchSongs(dataNext)}>Next</button>}
      </div> */}
    </div>
  )
}