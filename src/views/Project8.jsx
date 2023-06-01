import React, { useEffect, useState } from "react"
import "../styles/project8.scss"

export default function Project8(){

  const [meals,setMeals]=useState([])
  const [randomMeal,setRandomMeal]=useState([])

  const [search,setSearch]=useState("")
  const [searching,setSearching]=useState(false)

  // Search meal and fetch from API
  function searchMeal(e) {
    e.preventDefault();

    if (search!=="") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => {
          setRandomMeal([])
          setMeals([])
          if(data.meals !== null){
            setMeals(data.meals)
          }
          setSearching(true)
        });
    } else {
      alert('Please enter a search term');
    }
  }
  // Fetch random meal from API
  function getRandomMeal() {
    setSearching(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(res => res.json())
      .then(data => {
        setMeals([])
        setRandomMeal([])
        if(data.meals !== null){
          setRandomMeal(data.meals)
        }
        setSearching(true)
      });
  }

  return(
    <div className="project8">
      <div className="container">
        <h1>Meal Finder</h1>
        <div className="flex">
          <form className="flex" id="submit">
            <input
              type="text"
              id="search"
              placeholder="Search for meals or keywords"
              onChange={(e)=>setSearch(e.target.value.trim())}
            />
            <button className="search-btn" type="submit" onClick={(e)=>searchMeal(e)}>
              <i className="fas fa-search"></i>
            </button>
          </form>
          <button className="random-btn" id="random" onClick={()=>getRandomMeal()}>
            <i className="fas fa-random"></i>
          </button>
        </div>

        <div id="result-heading">
          {meals.length!==0 && searching && <h2>Search results for '{search}':</h2>}
          {meals.length===0 && randomMeal.length===0 && searching && <p>There are no search results. Try again!</p>}
        </div>
        <div id="meals" className="meals">
          {meals.map((obj,i)=>{
            return(
              <div className="meal" key={i}>
                <img src={obj.strMealThumb} alt={obj.strMeal} />
                <div className="meal-info" data-meal={obj.idMeal}>
                  <h3>{obj.strMeal}</h3>
                </div>
              </div>
            )
          })}
        </div>
        <div id="single-meal">
          {randomMeal.map((obj,i)=>{
            return(
              <div className="single-meal" key={i}>
                <h1>{obj.strMeal}</h1>
                <img src={obj.strMealThumb} alt={obj.strMeal} />
                <div className="single-meal-info">
                  {obj.strCategory ? obj.strCategory : ''}
                  {obj.strArea ? obj.strArea : ''}
                </div>
                <div className="main">
                  <p>{obj.strInstructions}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}