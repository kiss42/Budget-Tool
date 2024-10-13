import React, { useState, useEffect } from "react";

function SavingsGoalCalculator({ totalIncome, totalExpenses, totalDebts, onSaveGoalData }) {
  const [targetAmount, setTargetAmount] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [monthsNeeded, setMonthsNeeded] = useState(null);
  const [neededPerMonth, setNeededPerMonth] = useState(null);
  const [neededPerDay, setNeededPerDay] = useState(null); // New state for per day calculation
  const [averageMonthlySavings, setAverageMonthlySavings] = useState(null);

  useEffect(() => {
    if (totalIncome && totalExpenses && totalDebts) {
      const remainingIncome = totalIncome - totalExpenses - totalDebts;
      setAverageMonthlySavings(remainingIncome > 0 ? remainingIncome : 0);
    }
  }, [totalIncome, totalExpenses, totalDebts]);

  // Function to calculate how many months it will take to reach the goal
  const calculateMonthsToGoal = () => {
    const remainingAmount = targetAmount - currentSavings;
    const months = remainingAmount / monthlyContribution;
    setMonthsNeeded(Math.ceil(months));
    setNeededPerMonth(null);
    setNeededPerDay(null);  // Reset the other calculations
  };

  // Function to calculate how much you need to save per month to reach the goal by a certain date
  const calculateNeededPerMonth = () => {
    const today = new Date();
    const goalDateObj = new Date(goalDate);
    const timeDiff = goalDateObj - today;
    const monthsDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 30));  // Convert to months
    const remainingAmount = targetAmount - currentSavings;
    const perMonth = remainingAmount / monthsDiff;
    setNeededPerMonth(perMonth.toFixed(2));
    setMonthsNeeded(null);  // Reset the other calculations
    setNeededPerDay(null);
  };

  // Function to calculate how much you need to save per day to reach the goal by the target date
  const calculateNeededPerDay = () => {
    const today = new Date();
    const goalDateObj = new Date(goalDate);
    const timeDiff = goalDateObj - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
    const remainingAmount = targetAmount - currentSavings;
    const perDay = remainingAmount / daysDiff;
    setNeededPerDay(perDay.toFixed(2));
    setMonthsNeeded(null);  // Reset other calculations
    setNeededPerMonth(null);
  };

  // Update the parent component with savings goal data
  useEffect(() => {
    onSaveGoalData({
      targetAmount,
      currentSavings,
      monthlyContribution,
      goalDate,
      monthsNeeded,
      neededPerMonth,
      neededPerDay,
    });
  }, [targetAmount, currentSavings, monthlyContribution, goalDate, monthsNeeded, neededPerMonth, neededPerDay, onSaveGoalData]);

  return (
    <div className="bg-white p-6 rounded shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Savings Goal Calculator</h2>

      <div className="mb-4 text-center">
        <p>You can save <strong>${averageMonthlySavings}</strong> per month based on your current income and expenses.</p>
      </div>

      {/* Inputs for target amount, current savings, and monthly contribution */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Goal Amount</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="How much do you want to save?"
            className="p-3 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Savings</label>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            placeholder="What do you have saved already?"
            className="p-3 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Contribution</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="How much can you save monthly?"
            className="p-3 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Goal Date</label>
          <input
            type="date"
            value={goalDate}
            onChange={(e) => setGoalDate(e.target.value)}
            className="p-3 border rounded w-full"
          />
        </div>
      </div>

      {/* Buttons to calculate the results */}
      <div className="flex flex-col space-y-4">
        <button
          className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg"
          onClick={calculateMonthsToGoal}
        >
          How Many Months to Reach Goal?
        </button>
        <button
          className="bg-green-500 text-white py-3 px-6 rounded-full text-lg"
          onClick={calculateNeededPerMonth}
        >
          How Much to Save Each Month?
        </button>
        <button
          className="bg-purple-500 text-white py-3 px-6 rounded-full text-lg"
          onClick={calculateNeededPerDay} // Button to calculate the per day savings
        >
          How Much to Save Per Day?
        </button>
      </div>

      {/* Display the result */}
      <div className="mt-6 text-center">
        {monthsNeeded !== null && (
          <p>
            You will need <strong>{monthsNeeded}</strong> months to reach your goal.
          </p>
        )}
        {neededPerMonth !== null && (
          <p>
            You need to save <strong>${neededPerMonth}</strong> per month to reach your goal by{" "}
            <strong>{goalDate}</strong>.
          </p>
        )}
        {neededPerDay !== null && (
          <p>
            You need to save <strong>${neededPerDay}</strong> per day to reach your goal by{" "}
            <strong>{goalDate}</strong>.
          </p>
        )}
      </div>
    </div>
  );
}

export default SavingsGoalCalculator;
