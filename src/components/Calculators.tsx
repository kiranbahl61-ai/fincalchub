import React from 'react';
import { Link } from 'react-router-dom';
import Seo from './Seo';

const Calculators: React.FC = () => {
  return (
    <div className="calculators-page">
      <Seo
        title="Financial Calculators"
        description="Access 15+ advanced financial calculators including loan EMI, SIP returns, retirement planning, income tax, PPF, EPF, CAGR, inflation, and investment growth calculators. India-focused tools with real-time calculations."
        url="https://fincalchub.com/calculators"
        keywords="loan calculator, SIP calculator, retirement planner, tax calculator, PPF calculator, EPF calculator, CAGR calculator, inflation calculator, investment calculator, financial tools"
      />
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Financial Calculators & Planning Tools</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '1rem auto', lineHeight: '1.6' }}>
          Choose from 15+ powerful financial calculators designed for Indian users. Each tool uses verified formulas, accounts for current tax rules, and provides actionable insights for your financial planning.
        </p>
      </div>

      <div className="calculators-container">
        <div className="calculator-section">
          <h3>⚡ Advanced Tools</h3>
          <p className="section-description">Comprehensive financial analysis and decision-making tools</p>
          <div className="calculator-grid">
            <Link to="/gps" className="calculator-card-link" title="Get your financial health score and recommendations">
              <div className="calculator-card-item">
                <span className="card-emoji">🗺️</span>
                <span>Financial Health GPS</span>
                <span className="card-hint">Comprehensive analysis</span>
              </div>
            </Link>
            <Link to="/calculators/loan-advisor" className="calculator-card-link" title="Compare loan options and make informed decisions">
              <div className="calculator-card-item">
                <span className="card-emoji">🤔</span>
                <span>Loan Decision Guide</span>
                <span className="card-hint">Smart loan comparison</span>
              </div>
            </Link>
            <Link to="/market" className="calculator-card-link" title="Track market trends and economic indicators">
              <div className="calculator-card-item">
                <span className="card-emoji">📊</span>
                <span>Market Dashboard</span>
                <span className="card-hint">Economic insights</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="calculator-section">
          <h3>🧮 Core Calculators</h3>
          <p className="section-description">Essential tools for everyday financial decisions</p>
          <div className="calculator-grid">
            <Link to="/calculators/loan" className="calculator-card-link" title="Calculate EMI, total interest and monthly payments">
              <div className="calculator-card-item">
                <span className="card-emoji">📊</span>
                <span>Loan EMI Calculator</span>
                <span className="card-hint">Instant EMI calculation</span>
              </div>
            </Link>
            <Link to="/calculators/sip" className="calculator-card-link" title="Calculate SIP returns and wealth creation">
              <div className="calculator-card-item">
                <span className="card-emoji">💹</span>
                <span>SIP Calculator</span>
                <span className="card-hint">Systematic Investment Plan</span>
              </div>
            </Link>
            <Link to="/calculators/retirement" className="calculator-card-link" title="Plan your retirement corpus and savings">
              <div className="calculator-card-item">
                <span className="card-emoji">🎯</span>
                <span>Retirement Planner</span>
                <span className="card-hint">Long-term goal planning</span>
              </div>
            </Link>
            <Link to="/calculators/tax" className="calculator-card-link" title="Calculate income tax for FY 2024-25">
              <div className="calculator-card-item">
                <span className="card-emoji">📋</span>
                <span>Tax Calculator</span>
                <span className="card-hint">Income tax calculation</span>
              </div>
            </Link>
            <Link to="/calculators/growth" className="calculator-card-link" title="Calculate lump-sum investment returns">
              <div className="calculator-card-item">
                <span className="card-emoji">📈</span>
                <span>Investment Growth</span>
                <span className="card-hint">Lump-sum returns</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="calculator-section">
          <h3>🎯 Goal Planning & Schemes</h3>
          <p className="section-description">Dedicated calculators for popular Indian investment schemes</p>
          <div className="calculator-grid">
            <Link to="/calculators/goal-planner" className="calculator-card-link" title="Plan financial goals systematically">
              <div className="calculator-card-item">
                <span className="card-emoji">🎪</span>
                <span>Goal Planner</span>
                <span className="card-hint">Multi-goal planning</span>
              </div>
            </Link>
            <Link to="/calculators/inflation" className="calculator-card-link" title="See impact of inflation on your corpus">
              <div className="calculator-card-item">
                <span className="card-emoji">📉</span>
                <span>Inflation Calculator</span>
                <span className="card-hint">Real value analysis</span>
              </div>
            </Link>
            <Link to="/calculators/cagr" className="calculator-card-link" title="Calculate compound annual growth rate">
              <div className="calculator-card-item">
                <span className="card-emoji">📊</span>
                <span>CAGR Calculator</span>
                <span className="card-hint">Growth rate analysis</span>
              </div>
            </Link>
            <Link to="/calculators/ppf" className="calculator-card-link" title="Calculate PPF returns and maturity amount">
              <div className="calculator-card-item">
                <span className="card-emoji">🏦</span>
                <span>PPF Calculator</span>
                <span className="card-hint">Public Provident Fund</span>
              </div>
            </Link>
            <Link to="/calculators/epf" className="calculator-card-link" title="Calculate EPF accumulation and benefits">
              <div className="calculator-card-item">
                <span className="card-emoji">💼</span>
                <span>EPF Calculator</span>
                <span className="card-hint">Employee Provident Fund</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <section className="calculator-help-section">
        <h2>How to Use Our Calculators</h2>
        <div className="help-grid">
          <div className="help-card">
            <span className="help-step">1</span>
            <h4>Select a Tool</h4>
            <p>Choose the calculator that matches your financial question—whether it's about loans, investments, retirement, or tax planning.</p>
          </div>
          <div className="help-card">
            <span className="help-step">2</span>
            <h4>Enter Your Details</h4>
            <p>Fill in your financial parameters. We provide helpful hints and realistic defaults to guide you through the process.</p>
          </div>
          <div className="help-card">
            <span className="help-step">3</span>
            <h4>Get Instant Results</h4>
            <p>See detailed calculations with breakdowns, comparisons, and graphical representations of your financial scenario.</p>
          </div>
          <div className="help-card">
            <span className="help-step">4</span>
            <h4>Take Action</h4>
            <p>Use the actionable insights and next steps to make informed financial decisions for your future.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculators;
