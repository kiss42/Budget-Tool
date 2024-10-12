import React, { useState } from "react";

function ExpensesSection({ expenses, setExpenses }) {
  const [newExpense, setNewExpense] = useState({ category: "", amount: "", frequency: "monthly" });

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ category: "", amount: "", frequency: "monthly" });
    }
  };

  const calculateExpense = (amount, frequency) => {
    switch (frequency) {
      case "yearly":
        return (amount / 12).toFixed(2); // Convert yearly to monthly
      case "weekly":
        return (amount * 4.33).toFixed(2); // Convert weekly to monthly
      case "monthly":
      default:
        return amount;
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Expenses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        <input
          type="text"
          placeholder="Category"
          className="p-3 border rounded w-full"
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          className="p-3 border rounded w-full"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <select
          className="p-3 border rounded w-full"
          value={newExpense.frequency}
          onChange={(e) => setNewExpense({ ...newExpense, frequency: e.target.value })}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button
          className="bg-red-500 text-white py-3 px-6 rounded-full shadow-md w-full sm:w-auto"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>

      <ul className="mt-4">
        {expenses.map((exp, index) => (
          <li key={index} className="mt-2">
            {exp.category}: ${exp.amount} ({exp.frequency}) - Monthly Equivalent: $
            {calculateExpense(exp.amount, exp.frequency)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesSection;
