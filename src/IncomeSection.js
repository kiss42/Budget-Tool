import React, { useState } from "react";

function IncomeSection({ income, setIncome }) {
  const [newIncome, setNewIncome] = useState({ source: "", amount: "" });

  const handleAddIncome = () => {
    if (newIncome.source && newIncome.amount) {
      setIncome([...income, newIncome]);
      setNewIncome({ source: "", amount: "" });
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Income</h2>
      <div className="flex space-x-4">
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
        <button
          className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-md"
          onClick={handleAddIncome}
        >
          Add Income
        </button>
      </div>

      {/* Display income entries */}
      <ul className="mt-4">
        {income.map((inc, index) => (
          <li key={index} className="mt-2">
            {inc.source}: ${inc.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeSection;
