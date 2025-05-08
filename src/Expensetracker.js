/*global localStorage */
import React, { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("食費");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  const handleAddExpense = () => {
    if (!amount) return;
    const newExpense = { amount, category, date, note };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setAmount("");
    setNote("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">支出記録</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="金額"
        className="border p-2 w-full mb-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option>食費</option>
        <option>交通費</option>
        <option>娯楽</option>
        <option>その他</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="メモ"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleAddExpense}
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        追加
      </button>
      <ul className="mt-4">
        {expenses.map((expense, index) => (
          <li key={index} className="border-b py-2">
            {expense.date} - {expense.category} - ¥{expense.amount} - {expense.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
