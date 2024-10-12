import React, { useState } from "react";

function DebtTracker({ debts, setDebts }) {
  const [newDebt, setNewDebt] = useState({ type: "", balance: "", monthlyPayment: "" });

  const handleAddDebt = () => {
    if (newDebt.type && newDebt.balance && newDebt.monthlyPayment) {
      setDebts([...debts, newDebt]);
      setNewDebt({ type: "", balance: "", monthlyPayment: "" });
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Debt Tracker</h2>
      <div className="flex space-x-4">
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
        <button
          className="bg-yellow-500 text-white py-3 px-6 rounded-full shadow-md"
          onClick={handleAddDebt}
        >
          Add Debt
        </button>
      </div>

      {/* Display debt entries */}
      <ul className="mt-4">
        {debts.map((debt, index) => (
          <li key={index} className="mt-2">
            {debt.type}: ${debt.balance} (Monthly: ${debt.monthlyPayment})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DebtTracker;
