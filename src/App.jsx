import { useState } from "react";
import React from "react";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Expense Tracker</h2>

        <div>
          <h4 className="text-lg font-medium">Your Balance</h4>
          <h1 className="text-3xl font-bold text-gray-700">${totalBalance.toFixed(2)}</h1>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1 bg-green-100 text-green-700 p-4 rounded shadow">
            <h4 className="text-sm font-semibold">Income</h4>
            <p className="text-xl font-bold">${income.toFixed(2)}</p>
          </div>
          <div className="flex-1 bg-red-100 text-red-700 p-4 rounded shadow">
            <h4 className="text-sm font-semibold">Expense</h4>
            <p className="text-xl font-bold">${expense.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">History</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {transactions.map((item) => (
              <li
                onClick={() => handleDelete(item.id)}
                key={item.id}
                className={`flex justify-between items-center p-3 rounded cursor-pointer ${
                  item.amount > 0
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                } hover:bg-opacity-80`}
              >
                {item.name} <span>${item.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Add new transaction</h3>
          <form onSubmit={add} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="text">
                Text
              </label>
              <input
                type="text"
                id="text"
                placeholder="Enter text..."
                value={expanseIncomeName}
                onChange={(e) => setExpanseIncomeName(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="amount">
                Amount <span className="text-xs text-gray-500">(negative - expense, positive - income)</span>
              </label>
              <input
                type="text"
                id="amount"
                placeholder="Enter amount..."
                value={expanseIncomeAmount}
                onChange={(e) => setExpanseIncomeAmount(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700"
            >
              Add transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
