import React, { useState } from "react";

function IncomeSection({ income, setIncome }) {
  const [newIncome, setNewIncome] = useState({ source: "", amount: "", frequency: "monthly" });

  const handleAddIncome = () => {
    if (newIncome.source && newIncome.amount) {
      setIncome([...income, newIncome]);
      setNewIncome({ source: "", amount: "", frequency: "monthly" });
    }
  };

  // Helper function to calculate monthly equivalent based on frequency
  const calculateIncome = (amount, frequency) => {
    switch (frequency) {
      case "yearly":
        return (amount / 12).toFixed(2); // Convert yearly to monthly
      case "biweekly":
        return (amount * 2.17).toFixed(2); // Convert biweekly to monthly (26 pay periods in a year)
      case "weekly":
        return (amount * 4.33).toFixed(2); // Convert weekly to monthly (52 weeks / 12 months)
      case "monthly":
      default:
        return amount;
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Income</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        <input
          type="text"
          placeholder="Source"
          className="p-3 border rounded w-full"
          value={newIncome.source}
          onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          className="p-3 border rounded w-full"
          value={newIncome.amount}
          onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
        />
        <select
          className="p-3 border rounded w-full"
          value={newIncome.frequency}
          onChange={(e) => setNewIncome({ ...newIncome, frequency: e.target.value })}
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button
          className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-md w-full sm:w-auto"
          onClick={handleAddIncome}
        >
          Add Income
        </button>
      </div>

      <ul className="mt-4">
        {income.map((inc, index) => (
          <li key={index} className="mt-2">
            {inc.source}: ${inc.amount} ({inc.frequency}) - Monthly Equivalent: $
            {calculateIncome(inc.amount, inc.frequency)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeSection;
