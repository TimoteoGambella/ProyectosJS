import React, { useEffect, useState } from "react"
import "../styles/project5.scss"

export default function Project5(){

    const [array,setArray]=useState([])
    const [reload,setReload]=useState(true)

    useEffect(() => {
        if(array.length===0 && reload){
            getRandomUser(4)
        }
        if(!reload){
            setReload(true)
        }
    }, [array]);

    // Fetch random user and add money
    async function getRandomUser(param) {
        let newArray=[]
        for (let i = 0; i < param; i++) {
            const res = await fetch('https://randomuser.me/api');
            const data = await res.json();
    
            const user = data.results[0];

            const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
            };
            newArray.push(newUser)
        }
        setArray(array.concat(newArray));
    }
    
    function doubleMoney() {
      const newArray = array.map(user => {
        return { ...user, money: user.money * 2 };
      });
      setArray(newArray)
    }
    
    // Sort users by richest
    function sortByRichest() {
      const newArray = array.sort((a, b) => b.money - a.money);
      setReload(false)
      setArray(newArray)
    }
    
    // Filter only millionaires
    function showMillionaires() {
      const newArray = array.filter(user => user.money > 1000000);
      setReload(false)
      setArray(newArray)
    }
    
    // Calculate the total wealth
    function calculateWealth() {
      const wealth = array.reduce((acc, user) => (acc += user.money), 0);
    
      const wealthEl = document.createElement('div');
      wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
        wealth
      )}</strong></h3>`;
      document.getElementById('main').appendChild(wealthEl);
    }
    
    // Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    function formatMoney(number) {
      return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    return(
        <div className="project5">
            <h1>DOM Array Methods</h1>
            <div className="container">
                <aside>
                    <button id="add-user" onClick={()=>getRandomUser(1)}>Add User 👱‍♂️</button>
                    <button id="double" onClick={()=>doubleMoney()}>Double Money 💰</button>
                    <button id="show-millionaires" onClick={()=>showMillionaires()}>Show Only Millionaires 💵</button>
                    <button id="sort" onClick={()=>sortByRichest()}>Sort by Richest ↓</button>
                    <button id="calculate-wealth" onClick={()=>calculateWealth()}>Calculate entire Wealth 🧮</button>
                </aside>

                <main id="main">
                    <h2><strong>Person</strong> Wealth</h2>
                    {array.length!==0 && array.map((obj,i)=>{
                        return(
                            <div className="person" key={i}>
                                <strong>{obj.name}</strong>
                                {formatMoney(obj.money)}
                            </div>
                        )
                    })}
                </main>
            </div>
        </div>
    )
}