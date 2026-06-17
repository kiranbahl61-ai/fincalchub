import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import ollamaRouter from './ollama';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Ollama API proxy
app.use('/api/ollama', ollamaRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SIP Calculator API
app.post('/api/calculators/sip', (req, res) => {
  const { monthlyInvestment, rate, time } = req.body;
  const r = rate / 12 / 100;
  const n = time * 12;
  const fv = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalInvested = monthlyInvestment * n;
  
  res.json({
    futureValue: Math.round(fv),
    totalInvested,
    estimatedReturns: Math.round(fv - totalInvested),
    yearlyBreakdown: generateYearlySIPData(monthlyInvestment, rate, time)
  });
});

// Loan EMI Calculator API
app.post('/api/calculators/loan', (req, res) => {
  const { principal, rate, time } = req.body;
  const r = rate / 12 / 100;
  const n = time * 12;
  const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  
  res.json({
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalPayment - principal),
    amortizationSchedule: generateAmortizationSchedule(principal, rate, time)
  });
});

// PPF Calculator API
app.post('/api/calculators/ppf', (req, res) => {
  const { monthlyContribution, rate, time } = req.body;
  const r = rate / 12 / 100;
  let totalBalance = 0;
  
  for (let year = 1; year <= time; year++) {
    for (let month = 0; month < 12; month++) {
      totalBalance += monthlyContribution;
      totalBalance += totalBalance * r;
    }
  }
  
  const totalContributions = monthlyContribution * 12 * time;
  
  res.json({
    maturityAmount: Math.round(totalBalance),
    totalContributions,
    totalInterest: Math.round(totalBalance - totalContributions),
    yearlyBreakdown: generateYearlyPPFData(monthlyContribution, rate, time)
  });
});

// EPF Calculator API
app.post('/api/calculators/epf', (req, res) => {
  const { basicSalary, dearnessAllowance, employeeContribution, employerContribution, interestRate, time } = req.body;
  const monthlyBasic = basicSalary + dearnessAllowance;
  const employeeContrib = monthlyBasic * (employeeContribution / 100);
  const employerContrib = monthlyBasic * (employerContribution / 100);
  const totalMonthly = employeeContrib + employerContrib;
  const monthlyRate = interestRate / 12 / 100;
  let totalBalance = 0;
  
  for (let year = 1; year <= time; year++) {
    for (let month = 0; month < 12; month++) {
      totalBalance += totalMonthly;
      totalBalance += totalBalance * monthlyRate;
    }
  }
  
  const totalContributions = totalMonthly * 12 * time;
  
  res.json({
    monthlyContribution: Math.round(totalMonthly),
    employeeContribution: Math.round(employeeContrib),
    employerContribution: Math.round(employerContrib),
    totalBalance: Math.round(totalBalance),
    totalContributions,
    totalInterest: Math.round(totalBalance - totalContributions)
  });
});

// Tax Calculator API
app.post('/api/calculators/tax', (req, res) => {
  const { income, age, deductions } = req.body;
  
  // Old tax regime (simplified)
  let taxableIncome = income - (deductions || 0);
  let tax = 0;
  
  if (taxableIncome <= 250000) tax = 0;
  else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
  else if (taxableIncome <= 750000) tax = 12500 + (taxableIncome - 500000) * 0.1;
  else if (taxableIncome <= 1000000) tax = 37500 + (taxableIncome - 750000) * 0.15;
  else if (taxableIncome <= 1250000) tax = 75000 + (taxableIncome - 1000000) * 0.2;
  else if (taxableIncome <= 1500000) tax = 125000 + (taxableIncome - 1250000) * 0.25;
  else tax = 187500 + (taxableIncome - 1500000) * 0.3;
  
  // Senior citizen rebate
  const rebate = age >= 60 && age < 80 && taxableIncome <= 500000 ? Math.min(tax, 10000) : 0;
  tax = Math.max(0, tax - rebate);
  
  res.json({
    grossIncome: income,
    deductions: deductions || 0,
    taxableIncome,
    tax,
    effectiveRate: ((tax / income) * 100).toFixed(2)
  });
});

// Retirement Calculator API
app.post('/api/calculators/retirement', (req, res) => {
  const { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate } = req.body;
  const yearsToRetirement = retirementAge - currentAge;
  const r = expectedReturn / 100;
  const n = yearsToRetirement * 12;
  const monthlyRate = r / 12;
  
  // Future value of current savings
  const fvCurrentSavings = currentSavings * Math.pow(1 + r, yearsToRetirement);
  
  // Future value of monthly contributions
  const fvMonthlyContrib = monthlyContribution * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
  
  const totalCorpus = fvCurrentSavings + fvMonthlyContrib;
  const inflationAdjustedCorpus = totalCorpus / Math.pow(1 + inflationRate / 100, yearsToRetirement);
  
  res.json({
    currentAge,
    retirementAge,
    yearsToRetirement,
    currentSavings,
    monthlyContribution,
    totalCorpus: Math.round(totalCorpus),
    inflationAdjustedCorpus: Math.round(inflationAdjustedCorpus),
    monthlyPension: Math.round(inflationAdjustedCorpus / (20 * 12)) // Assume 20 years post-retirement
  });
});

// Helper functions
function generateYearlySIPData(monthlyInvestment: number, rate: number, time: number) {
  const data = [];
  const r = rate / 12 / 100;
  
  for (let year = 1; year <= time; year++) {
    const months = year * 12;
    const yearFV = monthlyInvestment * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    const yearInvested = monthlyInvestment * months;
    data.push({
      year,
      invested: Math.round(yearInvested),
      returns: Math.round(yearFV - yearInvested),
      total: Math.round(yearFV)
    });
  }
  return data;
}

function generateAmortizationSchedule(principal: number, rate: number, time: number) {
  const schedule = [];
  const r = rate / 12 / 100;
  const n = time * 12;
  const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  let balance = principal;
  
  for (let month = 1; month <= n; month++) {
    const interestPayment = balance * r;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;
    
    if (month % 12 === 0 || month === 1) {
      schedule.push({
        year: Math.ceil(month / 12),
        principal: Math.round(principalPayment * 12),
        interest: Math.round(interestPayment * 12),
        balance: Math.round(Math.max(0, balance))
      });
    }
  }
  return schedule;
}

function generateYearlyPPFData(monthlyContribution: number, rate: number, time: number) {
  const data = [];
  const r = rate / 12 / 100;
  let totalBalance = 0;
  
  for (let year = 1; year <= time; year++) {
    for (let month = 0; month < 12; month++) {
      totalBalance += monthlyContribution;
      totalBalance += totalBalance * r;
    }
    const contributions = monthlyContribution * 12 * year;
    data.push({
      year,
      contribution: Math.round(contributions),
      interest: Math.round(totalBalance - contributions),
      total: Math.round(totalBalance)
    });
  }
  return data;
}

// Start server
app.listen(PORT, () => {
  console.log(`FinCalcHub API server running on port ${PORT}`);
});

export default app;