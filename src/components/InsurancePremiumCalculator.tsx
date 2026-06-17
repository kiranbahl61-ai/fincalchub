import React, { useState } from 'react';

const InsurancePremiumCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [coverage, setCoverage] = useState<number>(1000000);
  const [premium, setPremium] = useState<number | null>(null);

  const calculatePremium = () => {
    // Simple calculation: premium = coverage * 0.001 * (1 + age / 100)
    const prem = coverage * 0.001 * (1 + age / 100);
    setPremium(prem);
  };

  return (
    <div className="card">
      <h3>Insurance Premium Calculator</h3>
      <form onSubmit={(e) => { e.preventDefault(); calculatePremium(); }}>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} required />
        </label>
        <label>
          Coverage Amount:
          <input type="number" value={coverage} onChange={(e) => setCoverage(Number(e.target.value))} required />
        </label>
        <button type="submit">Calculate Premium</button>
      </form>
      {premium !== null && <p>Annual Premium: {premium.toFixed(2)}</p>}
    </div>
  );
};

export default InsurancePremiumCalculator;