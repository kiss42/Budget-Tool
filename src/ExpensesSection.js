import React, { useState } from "react";

function ExpensesSection({ expenses, setExpenses }) {
  const [newExpense, setNewExpense] = useState({ category: "Food", customCategory: "", amount: "", frequency: "monthly" });

  // Function to add a new expense
  const handleAddExpense = () => {
    let expenseCategory = newExpense.category;
    if (newExpense.category === "Custom") {
      expenseCategory = newExpense.customCategory || "Uncategorized"; // If custom, use the input value
    }
    if (expenseCategory && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, category: expenseCategory }]);
      setNewExpense({ category: "Food", customCategory: "", amount: "", frequency: "monthly" }); // Reset form
    }
  };

  // Helper function to calculate monthly equivalent based on frequency
  const calculateExpense = (amount, frequency) => {
    switch (frequency) {
      case "yearly":
        return (amount / 12).toFixed(2); // Convert yearly to monthly
      case "biweekly":
        return (amount * 2.17).toFixed(2); // Convert biweekly to monthly
      case "weekly":
        return (amount * 4.33).toFixed(2); // Convert weekly to monthly
      case "monthly":
      default:
        return amount;
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Expenses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        {/* Dropdown for predefined categories */}
        <select
          className="p-3 border rounded w-full"
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
        >
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Custom">Custom</option>
        </select>

        {/* Input for custom category (appears only if "Custom" is selected) */}
        {newExpense.category === "Custom" && (
          <input
            type="text"
            placeholder="Custom Category"
            className="p-3 border rounded w-full"
            value={newExpense.customCategory}
            onChange={(e) => setNewExpense({ ...newExpense, customCategory: e.target.value })}
          />
        )}

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
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <button
          className="bg-red-500 text-white py-3 px-6 rounded-full shadow-md w-full sm:w-auto"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>

      {/* Display expense entries */}
      <ul className="mt-4">
        {expenses.map((exp, index) => (
          <li key={index} className="mt-2 flex justify-between items-center flex-wrap">
            <span>
              {exp.category}: ${exp.amount} ({exp.frequency}) - Monthly Equivalent: $
              {calculateExpense(exp.amount, exp.frequency)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesSection;
