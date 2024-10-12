import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PDFExporter({ income, expenses, debts, savingsGoals, savingsGoalData, chartRef }) {
  const exportToPDF = async () => {
    const doc = new jsPDF('portrait', 'pt', 'a4');
    
    // Capture chart using html2canvas
    const chartCanvas = await html2canvas(chartRef.current);
    const chartDataURL = chartCanvas.toDataURL('image/png');

    doc.setFontSize(18);
    doc.text('Budget Summary', 40, 40);
    
    doc.setFontSize(12);
    doc.text(`Income: $${income.reduce((acc, curr) => acc + Number(curr.amount), 0)}`, 40, 80);
    doc.text(`Expenses: $${expenses.reduce((acc, curr) => acc + Number(curr.amount), 0)}`, 40, 100);
    doc.text(`Debts: $${debts.reduce((acc, curr) => acc + Number(curr.monthlyPayment), 0)}`, 40, 120);
    doc.text(`Net Income: $${income.reduce((acc, curr) => acc + Number(curr.amount), 0) - expenses.reduce((acc, curr) => acc + Number(curr.amount), 0) - debts.reduce((acc, curr) => acc + Number(curr.monthlyPayment), 0)}`, 40, 140);

    // Insert the chart into PDF
    doc.addImage(chartDataURL, 'PNG', 40, 160, 500, 300);

    // Add savings goal data
    doc.text(`Savings Goal Target: $${savingsGoalData.targetAmount}`, 40, 480);
    doc.text(`Current Savings: $${savingsGoalData.currentSavings}`, 40, 500);
    doc.text(`Monthly Contribution: $${savingsGoalData.monthlyContribution}`, 40, 520);
    doc.text(`Goal Date: ${savingsGoalData.goalDate}`, 40, 540);
    if (savingsGoalData.neededPerMonth) {
      doc.text(`Needed Per Month: $${savingsGoalData.neededPerMonth}`, 40, 560);
    }
    if (savingsGoalData.neededPerDay) {
      doc.text(`Needed Per Day: $${savingsGoalData.neededPerDay}`, 40, 580);
    }

    doc.save('Budget_Summary.pdf');
  };

  return (
    <button
      onClick={exportToPDF}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-md"
    >
      Export to PDF
    </button>
  );
}

export default PDFExporter;
