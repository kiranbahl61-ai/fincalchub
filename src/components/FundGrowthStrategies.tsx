import React from 'react';
import { FaBalanceScale, FaShieldAlt, FaSnowflake, FaClock } from 'react-icons/fa';

const FundGrowthStrategies: React.FC = () => {
  return (
    <div>
      <h2>Fund Growth Strategies</h2>
      <div className="card">
        <h3><FaBalanceScale /> Asset Allocation</h3>
        <p>Diversify across stocks, bonds, etc. Visual: Pie chart representation.</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'conic-gradient(var(--primary-color) 60%, var(--secondary-color) 40%)' }}></div>
        </div>
      </div>
      <div className="card">
        <h3><FaShieldAlt /> Risk Management</h3>
        <p>Assess risk tolerance. Strategies: stop-loss orders.</p>
      </div>
      <div className="card">
        <h3><FaSnowflake /> Compounding</h3>
        <p>Reinvest returns. Visual: Growth curve.</p>
        <div style={{ textAlign: 'center' }}>📈 Compounding Effect</div>
      </div>
      <div className="card">
        <h3><FaClock /> Long-term Investing</h3>
        <p>Patience pays. Strategies: dollar-cost averaging.</p>
      </div>
    </div>
  );
};

export default FundGrowthStrategies;