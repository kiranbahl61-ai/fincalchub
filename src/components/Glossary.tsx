import React, { useState } from 'react';
import { FaSearch, FaMoneyBillWave, FaChartLine, FaPiggyBank } from 'react-icons/fa';

const terms = [
  { term: 'CAGR', definition: 'Compound Annual Growth Rate - The rate of return that would be required for an investment to grow from its beginning balance to its ending balance.', icon: <FaChartLine /> },
  { term: 'NAV', definition: 'Net Asset Value - The value per share of a mutual fund or ETF.', icon: <FaMoneyBillWave /> },
  { term: 'ROI', definition: 'Return on Investment - A measure of the profitability of an investment.', icon: <FaPiggyBank /> },
  { term: 'Inflation', definition: 'The rate at which the general level of prices for goods and services rises.', icon: <FaMoneyBillWave /> },
  { term: 'Diversification', definition: 'The practice of spreading investments around to reduce risk.', icon: <FaChartLine /> },
  { term: 'Compounding', definition: 'The process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes.', icon: <FaPiggyBank /> },
];

const Glossary: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredTerms = terms.filter(t => t.term.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="card">
      <h2>Financial Terms Glossary</h2>
      <div style={{ position: 'relative' }}>
        <FaSearch style={{ position: 'absolute', left: '10px', top: '10px' }} />
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: '30px' }}
        />
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTerms.map((t, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
            {t.icon} <strong style={{ marginLeft: '10px' }}>{t.term}:</strong> {t.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Glossary;