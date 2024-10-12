import React, { useState, useRef } from "react";
import IncomeSection from "./IncomeSection";
import ExpensesSection from "./ExpensesSection";
import DebtTracker from "./DebtTracker";
import SavingsGoals from "./SavingsGoals";
import SavingsGoalCalculator from "./SavingsGoalCalculator";
import PDFExporter from "./PDFExporter"; // Import PDFExporter
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import * as XLSX from "xlsx"; // Import xlsx library

function App() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [savingsGoalData, setSavingsGoalData] = useState({});
  
  const chartRef = useRef(); // Reference for the chart section

  // Calculate Totals
  const totalIncome = income.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalDebts = debts.reduce((acc, curr) => acc + Number(curr.monthlyPayment), 0);
  const netIncome = totalIncome - totalExpenses;

  // Prepare data for the chart
  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses }
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  // Function to export data to Excel
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new(); // Create a new workbook

    // Convert Income data to a sheet
    const incomeSheet = XLSX.utils.json_to_sheet(income);
    XLSX.utils.book_append_sheet(workbook, incomeSheet, "Income");

    // Convert Expenses data to a sheet
    const expensesSheet = XLSX.utils.json_to_sheet(expenses);
    XLSX.utils.book_append_sheet(workbook, expensesSheet, "Expenses");

    // Convert Debts data to a sheet
    const debtsSheet = XLSX.utils.json_to_sheet(debts);
    XLSX.utils.book_append_sheet(workbook, debtsSheet, "Debts");

    // Convert Savings Goals data to a sheet
    const savingsGoalsSheet = XLSX.utils.json_to_sheet(savingsGoals);
    XLSX.utils.book_append_sheet(workbook, savingsGoalsSheet, "Savings Goals");

    // Add Savings Goal Calculator data to the Excel file
    const savingsGoalSheet = XLSX.utils.json_to_sheet([savingsGoalData]);
    XLSX.utils.book_append_sheet(workbook, savingsGoalSheet, "Savings Goal Calculator");

    // Export the workbook as Excel file
    XLSX.writeFile(workbook, "Budget_Data.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Budget Tool</h1>
        
        {/* Totals section */}
        <div className="grid grid-cols-3 gap-6 text-center mb-10">
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Total Income</h2>
            <p className="text-3xl text-green-600">${totalIncome}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Total Expenses</h2>
            <p className="text-3xl text-red-600">${totalExpenses}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Net Income</h2>
            <p className={`text-3xl ${netIncome < 0 ? "text-red-600" : "text-green-600"}`}>
              ${netIncome}
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-8">
          <IncomeSection income={income} setIncome={setIncome} />
          <ExpensesSection expenses={expenses} setExpenses={setExpenses} />
          <DebtTracker debts={debts} setDebts={setDebts} />
          <SavingsGoals savingsGoals={savingsGoals} setSavingsGoals={setSavingsGoals} />
        </div>

        {/* Pie Chart Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-10" ref={chartRef}>
          <h2 className="text-2xl font-semibold text-center mb-6">Income vs Expenses</h2>
          <PieChart width={400} height={400} className="mx-auto">
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Export Buttons */}
        <div className="flex justify-center mt-10 space-x-6">
          <button
            onClick={exportToExcel}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-md"
          >
            Export to Excel
          </button>

          {/* Use PDFExporter component to handle PDF export */}
          <PDFExporter
            income={income}
            expenses={expenses}
            debts={debts}
            savingsGoals={savingsGoals}
            savingsGoalData={savingsGoalData}
            chartRef={chartRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
