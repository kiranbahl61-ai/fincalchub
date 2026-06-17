import React from 'react';
import { FaChartBar, FaShieldAlt, FaCoins, FaExchangeAlt } from 'react-icons/fa';

const InvestmentInstruments: React.FC = () => {
  return (
    <div>
      <h2>Investment Instruments</h2>
      <div className="card">
        <h3><FaChartBar /> Stock Market Basics</h3>
        <p>Stocks represent ownership in a company. Benefits: potential high returns. Risks: volatility. Strategies: long-term holding.</p>
      </div>
      <div className="card">
        <h3><FaCoins /> Mutual Funds</h3>
        <p>Mutual funds pool money from investors to invest in diversified portfolios. Benefits: diversification. Risks: market risk.</p>
      </div>
      <div className="card">
        <h3><FaShieldAlt /> Insurance</h3>
        <p>Life, health, general insurance protect against risks. Benefits: security. Strategies: term vs whole life.</p>
      </div>
      <div className="card">
        <h3><FaExchangeAlt /> Bonds</h3>
        <p>Bonds are debt securities. Benefits: steady income. Risks: interest rate risk.</p>
      </div>
      {/* Add more */}
    </div>
  );
};

export default InvestmentInstruments;