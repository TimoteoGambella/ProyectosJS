import React, { useEffect, useState } from "react"
import "../styles/project2.scss"

export default function Project2(){

    const [price,setPrice]=useState(0)
    const [seats,setSeats]=useState(0)

    useEffect(() => {
        setPrice(Number(document.getElementById('movie').value))

        if(document.getElementById("asientos").childNodes.length===1){
            for (let i = 0; i < 6; i++) {
                const container = document.createElement('div')
                container.classList.add('row')
                for (let ii = 0; ii < 20; ii++) {
                    const docAsiento = document.createElement('div')
                    docAsiento.classList.add('seat')
                    if((Math.random() < 0.3) === true){
                        docAsiento.classList.add('occupied')
                    }
                    docAsiento.addEventListener('click', e => {console.log(seats)
                        if (
                            e.target.classList.contains('seat') &&
                            !e.target.classList.contains('occupied')
                        ){
                            e.target.classList.toggle('selected');
                            setSeats(document.querySelectorAll(".selected").length-1)
                        }
                    })
                    container.appendChild(docAsiento)
                }
                document.getElementById('asientos').appendChild(container)
            }
        }
    }, []);

    return(
        <div className="project2">
            <div className="container">
                <div className="movie-container">
                    <label>Pick a movie:</label>
                    <select id="movie" onChange={(e)=>{
                        setPrice(e.target.value)
                    }}>
                        <option value="10">Avengers: Endgame ($10)</option>
                        <option value="12">Joker ($12)</option>
                        <option value="8">Toy Story 4 ($8)</option>
                        <option value="9">The Lion King ($9)</option>
                    </select>
                </div>
                <ul className="showcase">
                    <li>
                        <div className="seat"></div>
                        <small>N/A</small>
                    </li>
                    <li>
                        <div className="seat selected"></div>
                        <small>Selected</small>
                    </li>
                    <li>
                        <div className="seat occupied"></div>
                        <small>Occupied</small>
                    </li>
                </ul>
                <div className="container" id="asientos">
                    <div className="screen"></div>
                </div>

                <p className="text">
                    You have selected <span id="count">{seats}</span> seats for a price of $<span id="total">{price*seats}</span>
                </p>
            </div>
        </div>
    )
}