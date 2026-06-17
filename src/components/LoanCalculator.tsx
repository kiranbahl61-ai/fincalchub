import React, { useState } from 'react';

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(7);
  const [time, setTime] = useState<number>(5);
  const [emi, setEmi] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateEMI = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (principal <= 0 || rate <= 0 || time <= 0) {
      alert('Please enter valid values');
      return;
    }

    const monthlyRate = rate / 12 / 100;
    const numPayments = time * 12;
    
    if (monthlyRate === 0) {
      const emiValue = principal / numPayments;
      setEmi(emiValue);
      setTotalAmount(principal);
      setTotalInterest(0);
    } else {
      const emiValue = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      const total = emiValue * numPayments;
      const interest = total - principal;
      
      setEmi(emiValue);
      setTotalAmount(total);
      setTotalInterest(interest);
    }
  };

  const handleReset = () => {
    setPrincipal(0);
    setRate(7);
    setTime(5);
    setEmi(null);
    setTotalAmount(null);
    setTotalInterest(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h3>📊 Loan Calculator</h3>
        <p>Calculate your monthly EMI, total interest, and repayment schedule</p>
        
        <form onSubmit={calculateEMI} className="calculator-form">
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="principal">Principal Loan Amount (₹)</label>
              <input
                id="principal"
                type="number"
                min="0"
                step="10000"
                value={principal || ''}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                placeholder="Enter loan amount"
              />
            </div>

            <div className="input-group">
              <label htmlFor="rate">Annual Interest Rate (%)</label>
              <input
                id="rate"
                type="number"
                min="0"
                max="30"
                step="0.1"
                value={rate || ''}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                placeholder="Enter interest rate"
              />
            </div>

            <div className="input-group">
              <label htmlFor="time">Loan Tenure (Years)</label>
              <input
                id="time"
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={time || ''}
                onChange={(e) => setTime(Number(e.target.value) || 0)}
                placeholder="Enter loan tenure"
              />
            </div>
          </div>

          <div className="calculator-actions">
            <button type="submit" className="btn-primary">
              Calculate EMI
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>
        </form>

        {emi !== null && (
          <div className="calculator-result">
            <h4>Your EMI Breakdown</h4>
            <div className="result-value">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="result-description">Monthly EMI</div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Amount Payable</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    ₹{totalAmount?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Interest Payable</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    ₹{totalInterest?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
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

export default LoanCalculator;