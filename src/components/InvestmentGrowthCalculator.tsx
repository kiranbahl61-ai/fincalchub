import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const InvestmentGrowthCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculateFV = () => {
    const fv = principal * Math.pow(1 + rate / 100, time);
    setFutureValue(fv);
    const data = [];
    for (let i = 0; i <= time; i++) {
      data.push({ year: i, value: principal * Math.pow(1 + rate / 100, i) });
    }
    setChartData(data);
  };

  return (
    <div className="card">
      <h3>Investment Growth Calculator</h3>
      <form onSubmit={(e) => { e.preventDefault(); calculateFV(); }}>
        <label>
          Principal Amount:
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} required />
        </label>
        <label>
          Annual Interest Rate (%):
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} required />
        </label>
        <label>
          Time Period (years):
          <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} required />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {futureValue !== null && <p>Future Value: {futureValue.toFixed(2)}</p>}
      {chartData.length > 0 && (
        <LineChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      )}
    </div>
  );
};

export default InvestmentGrowthCalculator;