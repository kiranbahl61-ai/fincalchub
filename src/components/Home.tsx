import React from 'react';
import { Link } from 'react-router-dom';
import { FaCoins, FaArrowUp, FaChartLine, FaUsers, FaShieldAlt, FaTrophy, FaLightbulb } from 'react-icons/fa';
import Seo from './Seo';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Seo
        title="Home"
        description="FinCalcHub is India's most trusted personal finance platform with 15+ free financial calculators, retirement planning tools, and expert guidance. Start your financial planning journey today."
        url="https://fincalchub.com/"
        keywords="financial calculator, personal finance India, retirement planning, investment calculator, loan calculator, SIP calculator, tax planning, financial goals"
        type="website"
      />
      
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-tag">🎯 Your practical finance companion</p>
          <h1>Smart Financial Planning for Every Stage of Life</h1>
          <p className="hero-description">
            FinCalcHub brings India-first financial calculators, advanced planning tools, and personalized guidance together so you can move from confusion to confidence in your financial journey.
          </p>
          <div className="hero-actions">
            <Link to="/calculators" className="hero-button">Explore 15+ Calculators</Link>
            <Link to="/gps" className="hero-button-secondary">Get Financial Health Check</Link>
          </div>
          <div className="trust-row">
            <span>✓ Trusted by 25,000+ users</span>
            <span>✓ 100% free & secure</span>
            <span>✓ Updated for FY 2024-25</span>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-stats">
            <div>
              <h2>15+</h2>
              <p>Advanced Tools</p>
            </div>
            <div>
              <h2>100+</h2>
              <p>Planning Scenarios</p>
            </div>
            <div>
              <h2>₹∞</h2>
              <p>Goal Support</p>
            </div>
          </div>
          <div className="hero-icons">
            <FaChartLine size={40} />
            <FaCoins size={40} />
            <FaArrowUp size={40} />
            <FaUsers size={40} />
          </div>
        </div>
      </section>

      <section className="features-grid">
        <Link to="/calculators" className="feature-card feature-card-link" style={{ borderLeftColor: '#3b82f6' }}>
          <div className="feature-icon" style={{ color: '#3b82f6' }}><FaLightbulb size={32} /></div>
          <h3>💡 Smart Calculators</h3>
          <p>Loan EMI, SIP returns, retirement corpus, tax liability, investment growth and more—all calculated in seconds.</p>
          <span className="card-cta" style={{ color: '#3b82f6' }}>Explore Tools →</span>
        </Link>
        <Link to="/gps" className="feature-card feature-card-link" style={{ borderLeftColor: '#10b981' }}>
          <div className="feature-icon" style={{ color: '#10b981' }}><FaChartLine size={32} /></div>
          <h3>📊 Financial Health Check</h3>
          <p>Instant feedback on emergency funds, insurance coverage, savings rate, and personalized recommendations.</p>
          <span className="card-cta" style={{ color: '#10b981' }}>Get Insights →</span>
        </Link>
        <Link to="/blog" className="feature-card feature-card-link" style={{ borderLeftColor: '#f59e0b' }}>
          <div className="feature-icon" style={{ color: '#f59e0b' }}><FaLightbulb size={32} /></div>
          <h3>📚 Learning Resources</h3>
          <p>Expert guides on insurance, tax strategies, investment basics, PPF, EPF, NPS and long-term financial planning.</p>
          <span className="card-cta" style={{ color: '#f59e0b' }}>Learn Now →</span>
        </Link>
      </section>

      <section className="trust-panel">
        <div className="trust-card">
          <FaShieldAlt size={40} className="trust-icon" />
          <h4>🔒 Secure & Private</h4>
          <p>Your financial data stays private. We use encrypted forms with no sensitive data storage. Zero tracking, full control.</p>
        </div>
        <div className="trust-card">
          <FaTrophy size={40} className="trust-icon" />
          <h4>🇮🇳 India-First Design</h4>
          <p>Built for Indian users with PPF, EPF, NPS, FY tax rules, HRA, LTA, and all deductions you actually claim.</p>
        </div>
        <div className="trust-card">
          <FaLightbulb size={40} className="trust-icon" />
          <h4>💡 Actionable Advice</h4>
          <p>Every result includes clear next steps, risk context, and follow-through guidance—not just numbers.</p>
        </div>
      </section>

      <section className="hero-cta-row">
        <div className="stat-card" style={{ borderLeftColor: '#3b82f6', borderLeftWidth: '4px' }}>
          <h3>🎯 Plan Your Retirement</h3>
          <p>Estimate your retirement corpus, calculate savings gaps, and get a personalized investment roadmap using advanced compounding calculations.</p>
          <Link to="/calculators/retirement" className="hero-button-secondary" style={{ backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none' }}>Open Retirement Planner</Link>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#10b981', borderLeftWidth: '4px' }}>
          <h3>💰 Check Financial Health</h3>
          <p>Run our Personal Finance GPS for a comprehensive gap analysis including emergency fund adequacy and protection review.</p>
          <Link to="/gps" className="hero-button-secondary" style={{ backgroundColor: '#10b981', color: 'white', textDecoration: 'none' }}>Start GPS Analysis</Link>
        </div>
      </section>

      <section className="calculator-showcase">
        <h2>Popular Calculators</h2>
        <div className="calculator-quick-links">
          <Link to="/calculators/loan" className="quick-link" style={{ borderTopColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>Loan EMI Calculator</Link>
          <Link to="/calculators/sip" className="quick-link" style={{ borderTopColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>SIP Calculator</Link>
          <Link to="/calculators/tax" className="quick-link" style={{ borderTopColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>Income Tax Calculator</Link>
          <Link to="/calculators/retirement" className="quick-link" style={{ borderTopColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>Retirement Planner</Link>
          <Link to="/calculators/ppf" className="quick-link" style={{ borderTopColor: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.05)' }}>PPF Calculator</Link>
          <Link to="/calculators/inflation" className="quick-link" style={{ borderTopColor: '#ec4899', backgroundColor: 'rgba(236, 72, 153, 0.05)' }}>Inflation Calculator</Link>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Is FinCalcHub really free?</h4>
            <p>Yes, 100% free. No hidden charges, no premium features, no data selling. We believe financial planning should be accessible to everyone.</p>
          </div>
          <div className="faq-item">
            <h4>Are the calculators accurate?</h4>
            <p>Our calculators use verified formulas aligned with Indian tax rules, insurance standards, and financial best practices. Always verify with your advisor for critical decisions.</p>
          </div>
          <div className="faq-item">
            <h4>Who should use FinCalcHub?</h4>
            <p>Anyone managing finances in India—students, salaried professionals, self-employed individuals, and those planning retirement. No experience needed.</p>
          </div>
          <div className="faq-item">
            <h4>How often are tax rules updated?</h4>
            <p>We update our tax calculators and guides whenever government makes changes. Our last update was for FY 2024-25 tax slabs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
