import React from 'react';
import jsPDF from "jspdf"; // Import jsPDF for PDF export
import html2canvas from "html2canvas"; // Import html2canvas for capturing chart as image

// PDFExporter component receives data and chartRef as props
const PDFExporter = ({ income, expenses, debts, savingsGoals, savingsGoalData, chartRef }) => {

  const exportToPDF = async () => {
    const doc = new jsPDF("p", "pt", "a4"); // Create a new PDF in portrait mode

    // Set font styles for headers
    doc.setFontSize(22);
    doc.setTextColor(40);

    // Title
    doc.text("Budget Summary Report", 40, 40);

    // Add some margin space before data starts
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Income Data", 40, 80);

    // Set font style for content data
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let yPosition = 100; // Initial y position for income data

    income.forEach((inc, index) => {
      doc.text(`Source: ${inc.source}, Amount: $${inc.amount}`, 40, yPosition);
      yPosition += 20; // Move to the next line
    });

    // Add space and Expenses section
    yPosition += 20;
    doc.setFont("helvetica", "bold");
    doc.text("Expenses Data", 40, yPosition);

    yPosition += 20;
    doc.setFont("helvetica", "normal");
    expenses.forEach((exp, index) => {
      doc.text(`Category: ${exp.category}, Amount: $${exp.amount}`, 40, yPosition);
      yPosition += 20;
    });

    // Add Debts section
    yPosition += 20;
    doc.setFont("helvetica", "bold");
    doc.text("Debts Data", 40, yPosition);

    yPosition += 20;
    doc.setFont("helvetica", "normal");
    debts.forEach((debt, index) => {
      doc.text(`Debt Type: ${debt.type}, Balance: $${debt.balance}, Monthly Payment: $${debt.monthlyPayment}`, 40, yPosition);
      yPosition += 20;
    });

    // Add Savings Goals section
    yPosition += 20;
    doc.setFont("helvetica", "bold");
    doc.text("Savings Goals", 40, yPosition);

    yPosition += 20;
    doc.setFont("helvetica", "normal");
    savingsGoals.forEach((goal, index) => {
      doc.text(`Goal: ${goal.goal}, Target: $${goal.targetAmount}, Current: $${goal.currentSavings}`, 40, yPosition);
      yPosition += 20;
    });

    // Add Savings Goal Calculator Data
    yPosition += 20;
    doc.setFont("helvetica", "bold");
    doc.text("Savings Goal Calculator", 40, yPosition);

    yPosition += 20;
    doc.setFont("helvetica", "normal");
    doc.text(`Target Amount: $${savingsGoalData.targetAmount}`, 40, yPosition);
    yPosition += 20;
    doc.text(`Current Savings: $${savingsGoalData.currentSavings}`, 40, yPosition);
    yPosition += 20;
    doc.text(`Monthly Contribution: $${savingsGoalData.monthlyContribution}`, 40, yPosition);
    yPosition += 20;
    doc.text(`Goal Date: ${savingsGoalData.goalDate}`, 40, yPosition);

    if (savingsGoalData.monthsNeeded !== null) {
      yPosition += 20;
      doc.text(`Months to Goal: ${savingsGoalData.monthsNeeded}`, 40, yPosition);
    }

    if (savingsGoalData.neededPerMonth !== null) {
      yPosition += 20;
      doc.text(`Needed per Month: $${savingsGoalData.neededPerMonth}`, 40, yPosition);
    }

    if (savingsGoalData.neededPerDay !== null) {
      yPosition += 20;
      doc.text(`Needed per Day: $${savingsGoalData.neededPerDay}`, 40, yPosition);
    }

    // Capture the chart as an image using html2canvas and add it below the data
    const chartElement = chartRef.current;
    const chartCanvas = await html2canvas(chartElement);
    const chartImage = chartCanvas.toDataURL("image/png");

    // Add the chart image at the bottom of the page
    yPosition += 40;
    doc.addImage(chartImage, "PNG", 40, yPosition, 500, 300);

    // Save the PDF
    doc.save("Budget_Data.pdf");
  };

  return (
    <button
      onClick={exportToPDF}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-md"
    >
      Export to PDF
    </button>
  );
};

export default PDFExporter;
