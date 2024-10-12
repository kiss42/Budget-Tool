import React, { useState } from "react";

function ExpensesSection({ expenses, setExpenses }) {
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });
  const [isEditing, setIsEditing] = useState(null); // Track which expense is being edited
  const [editedExpense, setEditedExpense] = useState({ category: "", amount: "" });

  // Function to add a new expense
  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ category: "", amount: "" });
    }
  };

  // Function to initiate editing for a specific expense
  const handleEditExpense = (index) => {
    setIsEditing(index); // Set the editing mode for this expense
    setEditedExpense(expenses[index]); // Set the selected expense to be edited
  };

  // Function to save the edited expense
  const handleSaveExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = editedExpense; // Update the expense at the specific index
    setExpenses(updatedExpenses);
    setIsEditing(null); // Exit editing mode
  };

  // Function to delete an expense
  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index); // Remove the expense
    setExpenses(updatedExpenses);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Expenses</h2>
      <div className="flex space-x-4">
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
        <button
          className="bg-red-500 text-white py-3 px-6 rounded-full shadow-md"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>

      {/* Display expense entries */}
      <ul className="mt-4">
        {expenses.map((exp, index) => (
          <li key={index} className="mt-2 flex justify-between items-center">
            {/* If the current expense is being edited, display input fields */}
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editedExpense.category}
                  className="p-2 border rounded"
                  onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                />
                <input
                  type="number"
                  value={editedExpense.amount}
                  className="p-2 border rounded"
                  onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                />
                <button
                  className="bg-green-500 text-white py-1 px-4 rounded-full shadow-md ml-4"
                  onClick={() => handleSaveExpense(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{exp.category}: ${exp.amount}</span>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded-full shadow-md"
                    onClick={() => handleEditExpense(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-full shadow-md"
                    onClick={() => handleDeleteExpense(index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesSection;
