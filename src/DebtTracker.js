import React, { useState } from "react";

function DebtTracker({ debts, setDebts }) {
  const [newDebt, setNewDebt] = useState({ type: "", balance: "", monthlyPayment: "" });

  // Function to add a new debt
  const handleAddDebt = () => {
    if (newDebt.type && newDebt.balance && newDebt.monthlyPayment) {
      setDebts([...debts, newDebt]);
      setNewDebt({ type: "", balance: "", monthlyPayment: "" });
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Debt Tracker</h2>

      {/* Debt Input Form */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Debt Type"
          className="p-3 border rounded w-full"
          value={newDebt.type}
          onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Balance"
          className="p-3 border rounded w-full"
          value={newDebt.balance}
          onChange={(e) => setNewDebt({ ...newDebt, balance: e.target.value })}
        />
        <input
          type="number"
          placeholder="Monthly Payment"
          className="p-3 border rounded w-full"
          value={newDebt.monthlyPayment}
          onChange={(e) => setNewDebt({ ...newDebt, monthlyPayment: e.target.value })}
        />
      </div>

      {/* Add Debt Button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-full shadow-md"
          onClick={handleAddDebt}
        >
          Add Debt
        </button>
      </div>

      {/* Display Debt Entries */}
      <ul className="mt-4">
        {debts.map((debt, index) => (
          <li key={index} className="flex justify-between items-center mt-2 bg-gray-50 p-3 rounded-md shadow-sm">
            <div>
              <span className="font-semibold">{debt.type}</span>: ${debt.balance} (Monthly: ${debt.monthlyPayment})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DebtTracker;
