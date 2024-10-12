import React, { useState } from "react";

function SavingsGoals({ savingsGoals, setSavingsGoals }) {
  const [newGoal, setNewGoal] = useState({ goal: "", targetAmount: "", currentSavings: "" });

  const handleAddGoal = () => {
    if (newGoal.goal && newGoal.targetAmount && newGoal.currentSavings) {
      setSavingsGoals([...savingsGoals, newGoal]);
      setNewGoal({ goal: "", targetAmount: "", currentSavings: "" });
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Savings Goals</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Goal"
          className="p-3 border rounded w-full"
          value={newGoal.goal}
          onChange={(e) => setNewGoal({ ...newGoal, goal: e.target.value })}
        />
        <input
          type="number"
          placeholder="Target Amount"
          className="p-3 border rounded w-full"
          value={newGoal.targetAmount}
          onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
        />
        <input
          type="number"
          placeholder="Current Savings"
          className="p-3 border rounded w-full"
          value={newGoal.currentSavings}
          onChange={(e) => setNewGoal({ ...newGoal, currentSavings: e.target.value })}
        />
        <button
          className="bg-teal-500 text-white py-3 px-6 rounded-full shadow-md"
          onClick={handleAddGoal}
        >
          Add Goal
        </button>
      </div>

      {/* Display savings goals entries */}
      <ul className="mt-4">
        {savingsGoals.map((goal, index) => (
          <li key={index} className="mt-2">
            {goal.goal}: Target ${goal.targetAmount}, Current: ${goal.currentSavings}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavingsGoals;
