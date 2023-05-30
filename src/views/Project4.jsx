import React, { useEffect, useState } from "react"
import "../styles/project4.scss"

export default function Project4(){
    const currencies=[
        "AED","ARS","AUD","BGN","BRL","BSD","CAD","CHF","CLP","CNY","COP","CZK","DKK","DOP","EGP","EUR","FJD","GBP","GTQ","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","KZT",
        "MXN","MYR","NOK","NZD","PAB","PEN","PHP","PKR","PLN","PYG","RON","RUB","SAR","SEK","SGD","THB","TRY","TWD","UAH","USD","UYU","VND","ZAR"
    ]

    const [money1,setMoney1]=useState("USD")
    const [money2,setMoney2]=useState("ARS")
    
    useEffect(() => {
        calculate();
    }, []);
    
    useEffect(() => {
        calculate();
    }, [money1,money2]);

    function calculate() {
        fetch("https://open.exchangerate-api.com/v6/latest")
            .then(res => res.json())
            .then(data => {
                const rate = data.rates[money2] / data.rates[money1];
                document.getElementById('rate').innerText = `1 ${money1} = ${rate.toFixed(4)} ${money2}`;
                document.getElementById('amount-two').value = (document.getElementById('amount-one').value * (rate)).toFixed(2);
            });
    }

    return(
        <div className="project4">
            <div className="container">
                <h1>Exchange Rate Calculator</h1>
                <p>Choose the currency and the amounts to get the exchange rate</p>

                <div className="container">
                    <div className="currency">
                        <select id="currency-one" value={money1} onChange={(e)=>{
                                setMoney1(e.target.value)
                            }}>
                            {currencies.map((obj,i)=>{
                                return(
                                    <option key={i} value={obj} selected={money1===obj}>{obj}</option>
                                )
                            })}
                        </select>
                        <input type="number" id="amount-one" defaultValue="1" onChange={()=>calculate()}/>
                    </div>

                    <div className="swap-rate-container">
                        <button className="btn" id="swap" onClick={async()=>{
                            setMoney1(money2)
                            setMoney2(money1)

                            const temp = document.getElementById('currency-one').value;
                            document.getElementById('currency-one').value = document.getElementById('currency-two').value;
                            document.getElementById('currency-two').value = temp;
                            
                            const div1 = document.getElementsByClassName("currency")[0].childNodes[0]
                            const div2 = document.getElementsByClassName("currency")[1].childNodes[0]

                            if(document.querySelectorAll(".animation").length===0){
                                div1.className="animation"
                                div2.className="animation"
                            }else{
                                await div1.classList.remove("animation")
                                await div2.classList.remove("animation")
                                div1.className="animation"
                                div2.className="animation"
                            }
                        }}>
                            Swap
                        </button>
                        <div className="rate" id="rate"></div>
                    </div>

                    <div className="currency">
                        <select id="currency-two" value={money2} onChange={(e)=>{
                                setMoney2(e.target.value)
                            }}
                        >
                            {currencies.map((obj,i)=>{
                                return(
                                    <option key={i} value={obj} selected={money2===obj}>{obj}</option>
                                )
                            })}
                        </select>
                        <input type="number" id="amount-two" onChange={()=>calculate()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}