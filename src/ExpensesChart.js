// src/ExpensesChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Colors for pie chart slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function ExpensesChart({ expenses }) {
  // Convert expenses into data format for the chart
  const data = expenses.map(exp => ({
    name: exp.category,
    value: Number(exp.amount),
  }));

  // Return the Pie Chart component
  return (
    <div className="chart-container">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default ExpensesChart;
