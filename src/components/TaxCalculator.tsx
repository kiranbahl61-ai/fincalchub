import React, { useState } from 'react';

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(500000);
  const [deductions, setDeductions] = useState<number>(50000);
  const [tax, setTax] = useState<number | null>(null);
  const [taxableIncome, setTaxableIncome] = useState<number | null>(null);
  const [effectiveRate, setEffectiveRate] = useState<number | null>(null);

  const calculateTax = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (income <= 0 || deductions < 0) {
      alert('Please enter valid values');
      return;
    }

    const taxable = Math.max(0, income - deductions);
    let taxAmount = 0;
    
    // FY 2024-25 Tax Slabs for Individuals (India)
    if (taxable > 1500000) {
      taxAmount = (taxable - 1500000) * 0.30 + (1500000 - 1000000) * 0.20 + (1000000 - 500000) * 0.10 + (500000 - 250000) * 0.05;
    } else if (taxable > 1000000) {
      taxAmount = (taxable - 1000000) * 0.20 + (1000000 - 500000) * 0.10 + (500000 - 250000) * 0.05;
    } else if (taxable > 500000) {
      taxAmount = (taxable - 500000) * 0.10 + (500000 - 250000) * 0.05;
    } else if (taxable > 250000) {
      taxAmount = (taxable - 250000) * 0.05;
    }
    
    const effective = income > 0 ? (taxAmount / income) * 100 : 0;
    setTax(taxAmount);
    setTaxableIncome(taxable);
    setEffectiveRate(effective);
  };

  const handleReset = () => {
    setIncome(500000);
    setDeductions(50000);
    setTax(null);
    setTaxableIncome(null);
    setEffectiveRate(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h3>📋 Tax Calculator</h3>
        <p>Calculate your tax liability for FY 2024-25 (India Income Tax)</p>
        
        <form onSubmit={calculateTax} className="calculator-form">
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="income">Annual Gross Income (₹)</label>
              <input
                id="income"
                type="number"
                min="0"
                step="50000"
                value={income || ''}
                onChange={(e) => setIncome(Number(e.target.value) || 0)}
                placeholder="Enter annual income"
              />
            </div>

            <div className="input-group">
              <label htmlFor="deductions">Total Deductions & Exemptions (₹)</label>
              <input
                id="deductions"
                type="number"
                min="0"
                step="10000"
                value={deductions || ''}
                onChange={(e) => setDeductions(Number(e.target.value) || 0)}
                placeholder="Enter deductions (80C, 80D, etc.)"
              />
            </div>
          </div>

          <div className="calculator-actions">
            <button type="submit" className="btn-primary">
              Calculate Tax
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>
        </form>

        {tax !== null && (
          <div className="calculator-result">
            <h4>Your Tax Summary</h4>
            <div className="result-value">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="result-description">Total Tax Liability</div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Taxable Income</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    ₹{taxableIncome?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Effective Tax Rate</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    {effectiveRate?.toFixed(2)}%
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

export default TaxCalculator;