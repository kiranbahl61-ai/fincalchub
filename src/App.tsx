import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import Home from './components/Home';
import Calculators from './components/Calculators';
import LoanCalculator from './components/LoanCalculator';
import SIPCalculator from './components/SIPCalculator';
import RetirementPlanner from './components/RetirementPlanner';
import TaxCalculator from './components/TaxCalculator';
import InvestmentGrowthCalculator from './components/InvestmentGrowthCalculator';
import InsurancePremiumCalculator from './components/InsurancePremiumCalculator';
import EducationalContent from './components/EducationalContent';
import InvestmentInstruments from './components/InvestmentInstruments';
import Glossary from './components/Glossary';
import FundGrowthStrategies from './components/FundGrowthStrategies';
import GoalPlannerCalculator from './components/GoalPlannerCalculator';
import InflationCalculator from './components/InflationCalculator';
import CAGRCalculator from './components/CAGRCalculator';
import PPFCalculator from './components/PPFCalculator';
import PFCalculator from './components/PFCalculator';
import PersonalFinanceGPS from './components/PersonalFinanceGPS';
import MarketDashboard from './components/MarketDashboard';
import LoanDecisionGuide from './components/LoanDecisionGuide';
import OllamaChat from './components/OllamaChat';
import About from './components/About';
import Services from './components/Services';
import Blog from './components/Blog';
import Contact from './components/Contact';
import './styles/variables.css';
import './styles/components.css';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div data-theme={theme} className="app-shell">
      <Router>
        <header className="site-header">
          <div className="brand-group">
            <Link to="/" className="brand-logo">FinCalcHub</Link>
            <span className="brand-tag">India’s personal finance platform</span>
          </div>

          <nav className="site-nav">
            <Link to="/">Home</Link>
            <Link to="/calculators">Calculators</Link>
            <Link to="/gps">GPS</Link>
            <Link to="/market">Market</Link>
            <Link to="/blog">Knowledge Hub</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
          </nav>

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gps" element={<PersonalFinanceGPS />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/calculators/loan" element={<LoanCalculator />} />
            <Route path="/calculators/sip" element={<SIPCalculator />} />
            <Route path="/calculators/retirement" element={<RetirementPlanner />} />
            <Route path="/calculators/emi" element={<LoanCalculator />} />
            <Route path="/calculators/tax" element={<TaxCalculator />} />
            <Route path="/calculators/growth" element={<InvestmentGrowthCalculator />} />
            <Route path="/calculators/insurance" element={<InsurancePremiumCalculator />} />
            <Route path="/calculators/goal-planner" element={<GoalPlannerCalculator />} />
            <Route path="/calculators/inflation" element={<InflationCalculator />} />
            <Route path="/calculators/cagr" element={<CAGRCalculator />} />
            <Route path="/calculators/ppf" element={<PPFCalculator />} />
            <Route path="/calculators/epf" element={<PFCalculator />} />
            <Route path="/calculators/personal-finance-gps" element={<PersonalFinanceGPS />} />
            <Route path="/calculators/loan-advisor" element={<LoanDecisionGuide />} />
            <Route path="/market" element={<MarketDashboard />} />
            <Route path="/chat" element={<OllamaChat />} />
            <Route path="/ai-chat" element={<OllamaChat />} />
            <Route path="/education" element={<EducationalContent />} />
            <Route path="/instruments" element={<InvestmentInstruments />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/strategies" element={<FundGrowthStrategies />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>Page not found</h1>
                  <p>The page you are looking for does not exist yet. Go back to the homepage to continue exploring.</p>
                  <Link to="/" className="hero-button-secondary">Return home</Link>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="site-footer">
          <div>
            <p className="footer-brand">FinCalcHub</p>
            <p>Comprehensive personal finance tools, calculators, and planning guidance for Indian users.</p>
          </div>
          <div className="footer-links">
            <Link to="/services">Services</Link>
            <Link to="/education">Education</Link>
            <Link to="/glossary">Glossary</Link>
            <Link to="/blog">Knowledge Hub</Link>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
