import React, { useEffect, useState } from "react"
import "../styles/project11.scss"

export default function Project11(){

  const [load,setLoad]=useState(false)
  const [scroll,setScroll]=useState(false)

  const [search,setSearch]=useState(true)

  const [info,setInfo]=useState([])
  const [infoFilter,setInfoFilter]=useState([])

  useEffect(() => {
    if(info.length===0){
      getPosts()
    }

    window.addEventListener('scroll',()=>scrolling())
    return ()=>window.removeEventListener('scroll',()=>scrolling())
  }, [])
  
  useEffect(() => {
    if(scroll){
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollHeight - scrollTop < clientHeight) {
        if(infoFilter.length===0){
          showLoading();
        }
      }else{
        setScroll(false)
      }
    }
  }, [scroll])

  const scrolling=()=>{setScroll(true)}

  async function getPosts() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${info.length+5}&_page=1`
    );
    const data = await res.json();
    setInfo(data)
  }

  function showLoading() {
    setLoad(true)

    setTimeout(() => {
      setLoad(false)
      setScroll(false)

      setTimeout(() => {
        getPosts();
      }, 500);
    }, 1000);
  }

  function filterPosts(e) {
    setSearch(true)

    let newArray=[]
    for (let i = 0; i < info.length; i++) {
      if(info[i].title.toUpperCase().indexOf(e)!==-1){
        newArray.push(info[i])
      }
    }
    if(newArray.length===0){
      setInfoFilter([])
      setSearch(false)
    }else{
      if(e!==""){
        setInfoFilter(newArray)
      }else{
        setInfoFilter([])
      }
    }
  }

  return(
    <div className="project11">
      <h1>My Blog</h1>
      <div className="filter-container">
        <input
          type="text"
          id="filter"
          className="filter"
          placeholder="Filter posts..."
          onChangeCapture={(e)=>filterPosts(e.target.value.toUpperCase())}
        />
      </div>

      <div id="posts-container">
        {(search && infoFilter.length===0?info:infoFilter).map((obj,i)=>{
            return(
              <div className="post" key={i}>
                <div className="number">{obj.id}</div>
                <div className="post-info">
                  <h2 className="post-title">{obj.title}</h2>
                  <p className="post-body">{obj.body}</p>
                </div>
              </div>
            )
          })
        }
        {!search && <p>No se encontraron resultados</p>}
      </div>

      <div className={`loader ${load&&"show"}`}>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  )
}