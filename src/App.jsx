import { useState } from "react";
import React from "react";
import "./App.css";

function App() {
  let [totalBalance, setTotalBalance] = useState(500);
  let [income, setIncome] = useState(0);
  let [expense, setExpense] = useState(0);
  let [expanseIncomeName, setExpanseIncomeName] = useState("");
  let [expanseIncomeAmount, setExpanseIncomeAmount] = useState("");
  let [transactions, setTransactions] = useState([]);

  function add(e) {
    e.preventDefault();

    if (!expanseIncomeName || !expanseIncomeAmount) {
      alert("Please enter valid name and amount");
      return;
    }

    let amount = parseFloat(expanseIncomeAmount);
    if (isNaN(amount)) {
      alert("Enter a valid number for amount!");
      return;
    }

    let newTransaction = {
      id: Date.now(),
      name: expanseIncomeName,
      amount: amount,
    };

    setTransactions([...transactions, newTransaction]);

    if (amount > 0) {
      setIncome(income + amount);
    } else {
      setExpense(expense + Math.abs(amount));
    }

    setTotalBalance(totalBalance + amount);
    setExpanseIncomeName("");
    setExpanseIncomeAmount("");
  }
  function handleDelete(id) {
    if (id) {
      let deleteItem = transactions.filter((item) => item.id !== id);
      setTransactions(deleteItem);
      alert("Transaction Deleted! ✅");
    }
  }

  return (
    <div>
      <h2>Expense Tracker</h2>
      <div className="container">
        <div>
          <h4>Your Balance</h4>
          <h1 id="balance">${totalBalance.toFixed(2)}</h1>
        </div>
        <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
            <p className="money plus">${income.toFixed(2)}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p className="money minus">${expense.toFixed(2)}</p>
          </div>
        </div>
        <h3>History</h3>
        <ul className="list">
          {transactions.map((item) => (
            <li
              onClick={() => {
                handleDelete(item.id);
              }}
              key={item.id}
              className={item.amount > 0 ? "plus" : "minus"}
            >
              {item.name} <span>${item.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h3>Add new transaction</h3>

        <form onSubmit={add}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              id="text"
              placeholder="Enter text..."
              value={expanseIncomeName}
              onChange={(e) => setExpanseIncomeName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input
              type="text"
              placeholder="Amount"
              value={expanseIncomeAmount}
              onChange={(e) => setExpanseIncomeAmount(e.target.value)}
            />
          </div>
          <button className="btn">Add transaction</button>
        </form>
      </div>
    </div>
  );
}

export default App;
