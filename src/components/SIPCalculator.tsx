import React, { useState } from 'react';

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [rate, setRate] = useState<number>(12);
  const [time, setTime] = useState<number>(10);
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [investedAmount, setInvestedAmount] = useState<number | null>(null);
  const [gains, setGains] = useState<number | null>(null);

  const calculateFV = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (monthlyInvestment <= 0 || rate <= 0 || time <= 0) {
      alert('Please enter valid values');
      return;
    }

    const r = rate / 12 / 100;
    const n = time * 12;
    const fv = monthlyInvestment * (Math.pow(1 + r, n) - 1) / r * (1 + r);
    const invested = monthlyInvestment * n;
    const gain = fv - invested;
    
    setFutureValue(fv);
    setInvestedAmount(invested);
    setGains(gain);
  };

  const handleReset = () => {
    setMonthlyInvestment(5000);
    setRate(12);
    setTime(10);
    setFutureValue(null);
    setInvestedAmount(null);
    setGains(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h3>💹 SIP Calculator</h3>
        <p>Calculate your Systematic Investment Plan returns and projected wealth</p>
        
        <form onSubmit={calculateFV} className="calculator-form">
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="monthlyInvestment">Monthly Investment Amount (₹)</label>
              <input
                id="monthlyInvestment"
                type="number"
                min="0"
                step="1000"
                value={monthlyInvestment || ''}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value) || 0)}
                placeholder="Enter monthly investment"
              />
            </div>

            <div className="input-group">
              <label htmlFor="rate">Expected Annual Return (%)</label>
              <input
                id="rate"
                type="number"
                min="0"
                max="50"
                step="0.1"
                value={rate || ''}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                placeholder="Enter expected return"
              />
            </div>

            <div className="input-group">
              <label htmlFor="time">Investment Duration (Years)</label>
              <input
                id="time"
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={time || ''}
                onChange={(e) => setTime(Number(e.target.value) || 0)}
                placeholder="Enter duration"
              />
            </div>
          </div>

          <div className="calculator-actions">
            <button type="submit" className="btn-primary">
              Calculate SIP Returns
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>
        </form>

        {futureValue !== null && (
          <div className="calculator-result">
            <h4>Your Investment Growth</h4>
            <div className="result-value">₹{futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="result-description">Total Maturity Value</div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Invested</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    ₹{investedAmount?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Investment Gains</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    ₹{gains?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SIPCalculator;