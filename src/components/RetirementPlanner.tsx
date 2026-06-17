import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RetirementPlanner: React.FC = () => {
  const [currentSavings, setCurrentSavings] = useState<number>(500000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(25000);
  const [rate, setRate] = useState<number>(8);
  const [time, setTime] = useState<number>(25);
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [totalContributed, setTotalContributed] = useState<number | null>(null);

  const calculateFV = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (rate < 0 || time <= 0) {
      alert('Please enter valid values');
      return;
    }

    const r = rate / 12 / 100;
    const n = time * 12;
    let fv = currentSavings;
    const data = [];
    
    for (let i = 0; i <= n; i++) {
      data.push({ 
        year: (i / 12).toFixed(1), 
        value: Math.floor(fv),
        month: i
      });
      fv = fv * (1 + r) + monthlyContribution;
    }
    
    setFutureValue(fv);
    setTotalContributed(currentSavings + monthlyContribution * n);
    setChartData(data);
  };

  const handleReset = () => {
    setCurrentSavings(500000);
    setMonthlyContribution(25000);
    setRate(8);
    setTime(25);
    setFutureValue(null);
    setChartData([]);
    setTotalContributed(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h3>🎯 Retirement Planner</h3>
        <p>Plan your retirement by projecting future savings based on current and monthly contributions</p>
        
        <form onSubmit={calculateFV} className="calculator-form">
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="currentSavings">Current Savings (₹)</label>
              <input
                id="currentSavings"
                type="number"
                min="0"
                step="50000"
                value={currentSavings || ''}
                onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
                placeholder="Enter current savings"
              />
            </div>

            <div className="input-group">
              <label htmlFor="monthlyContribution">Monthly Contribution (₹)</label>
              <input
                id="monthlyContribution"
                type="number"
                min="0"
                step="5000"
                value={monthlyContribution || ''}
                onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                placeholder="Enter monthly contribution"
              />
            </div>

            <div className="input-group">
              <label htmlFor="rate">Expected Annual Return (%)</label>
              <input
                id="rate"
                type="number"
                min="0"
                max="30"
                step="0.1"
                value={rate || ''}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                placeholder="Enter expected return"
              />
            </div>

            <div className="input-group">
              <label htmlFor="time">Years Until Retirement</label>
              <input
                id="time"
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={time || ''}
                onChange={(e) => setTime(Number(e.target.value) || 0)}
                placeholder="Enter years"
              />
            </div>
          </div>

          <div className="calculator-actions">
            <button type="submit" className="btn-primary">
              Project Retirement Corpus
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>
        </form>

        {futureValue !== null && (
          <>
            <div className="calculator-result">
              <h4>Your Projected Retirement Corpus</h4>
              <div className="result-value">₹{futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              <div className="result-description">Total Amount at Retirement</div>
              
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Contributed</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                      ₹{totalContributed?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Investment Gains</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                      ₹{Math.floor((futureValue - (totalContributed || 0))).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {chartData.length > 0 && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ marginTop: 0, color: 'var(--gray-900)' }}>Retirement Corpus Growth Over Time</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}` } />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" name="Corpus Value" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RetirementPlanner;