import React, { useEffect, useState } from "react"
import "../styles/project9.scss"

export default function Project9(){

  const [history,setHistory]=useState([])
  const [total,setTotal]=useState(0)
  const [income,setIncome]=useState(0)
  const [expense,setExpense]=useState(0)

  useEffect(() => {
    if(localStorage.getItem("transactions")!==null){
      setHistory(JSON.parse(localStorage.getItem('transactions')))
    }
  }, []);

  useEffect(() => {
    if(history.length!==0){
      let tot=0
      let inc=0
      let exp=0
      for (let i = 0; i < history.length; i++) {
        tot=tot+history[i].amount
        if(history[i].amount>0){
          inc=inc+history[i].amount
        }else{
          exp=exp+history[i].amount
        }
      }
      setTotal(tot.toFixed(2))
      setIncome(inc.toFixed(2))
      setExpense(exp.toFixed(2))
    }
  }, [history]);

  function addTransaction(e) {
    e.preventDefault();
    const text = document.getElementById('text');
    const amount = document.getElementById('amount');

    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('Please add a text and amount');
    }else{
      const transaction = {
        id: Math.floor(Math.random() * 100000000000),
        text: text.value,
        amount: +amount.value
      }

      setValues([...history,transaction])
    
      text.value = ''
      amount.value = ''
    }
  }

  function removeTransaction(id) {
    let newArray=history.filter(e=>e.id!==id)
    setValues(newArray)
  }

  const setValues=(info)=>{
    localStorage.setItem('transactions', JSON.stringify(info))
    setHistory(info)

  }
  
  return(
    <div className="project9">
      <h2>Expense Tracker</h2>
      <div className="container">
        <h4>Your Balance</h4>
        <h1 id="balance">${total}</h1>

        <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
            <p id="money-plus" className="money plus">+ ${Intl.NumberFormat().format(income)}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p id="money-minus" className="money minus">- ${Intl.NumberFormat().format(expense*-1)}</p>
          </div>
        </div>

        <h3>History</h3>
        <ul id="list" className="list">
          {history.map((obj,i)=>{
            return(
              <li className={`${obj.amount<0?"minus":"plus"}`} key={i}>
                {obj.text} <span>{obj.amount<0?"-":"+"} ${obj.amount<0?obj.amount*-1:obj.amount}</span>
                <button className="delete-btn" onClick={()=>removeTransaction(obj.id)}>x</button>
              </li>
            )
          })}
        </ul>

        <h3>Add new transaction</h3>
        <form id="form" onSubmit={(e)=>addTransaction(e)}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" id="text" placeholder="Enter text..." />
          </div>
          <div className="form-control">
            <label for="amount">Amount <strong>(negative - expense, positive - income)</strong></label>
            <input type="number" step="any" id="amount" placeholder="Enter amount..." />
          </div>
          <button className="btn">Add transaction</button>
        </form>
      </div>
    </div>
  )
}