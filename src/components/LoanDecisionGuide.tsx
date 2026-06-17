import React, { useMemo, useState } from 'react';
import { FaPhone, FaPlane, FaCreditCard, FaShieldAlt, FaLightbulb, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const purposes = [
  { value: 'phone', label: 'Phone Purchase', icon: FaPhone },
  { value: 'travel', label: 'Travel Loan', icon: FaPlane },
  { value: 'laptop', label: 'Laptop Purchase', icon: FaCreditCard },
  { value: 'education', label: 'Education Loan', icon: FaShieldAlt },
  { value: 'other', label: 'Other Loan', icon: FaLightbulb },
];

const calculateEMI = (principal: number, rate: number, tenureYears: number) => {
  if (principal <= 0 || rate <= 0 || tenureYears <= 0) return 0;
  const monthlyRate = rate / 12 / 100;
  const months = tenureYears * 12;
  return principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
};

const LoanDecisionGuide: React.FC = () => {
  const [purpose, setPurpose] = useState<string>('phone');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(30000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(18000);
  const [currentEMI, setCurrentEMI] = useState<number>(5000);
  const [loanAmount, setLoanAmount] = useState<number>(20000);
  const [interestRate, setInterestRate] = useState<number>(14);
  const [tenureYears, setTenureYears] = useState<number>(1);

  const emi = useMemo(() => calculateEMI(loanAmount, interestRate, tenureYears), [loanAmount, interestRate, tenureYears]);
  const totalMonthlyCommitment = currentEMI + emi;
  const dti = monthlyIncome > 0 ? totalMonthlyCommitment / monthlyIncome : 0;

  const guidance = useMemo(() => {
    const reasons: string[] = [];
    let decision = 'Consider carefully';
    let color: 'success' | 'warning' | 'danger' = 'warning';

    if (dti > 0.5) {
      decision = 'Avoid this loan';
      color = 'danger';
      reasons.push('Your total EMI burden exceeds 50% of your income.');
    } else if (interestRate >= 18) {
      decision = 'Avoid this loan';
      color = 'danger';
      reasons.push('The interest rate is very high and may make the loan expensive.');
    } else {
      if (purpose === 'travel' || purpose === 'phone' || purpose === 'laptop') {
        if (dti > 0.35 || interestRate > 14) {
          decision = 'Avoid this loan';
          color = 'danger';
          reasons.push('This is a discretionary expense with a high EMI burden or high interest.');
        } else if (dti > 0.25) {
          decision = 'Use caution';
          color = 'warning';
          reasons.push('EMI takes a significant share of income, consider saving more before borrowing.');
        } else {
          decision = 'Proceed with caution';
          color = 'success';
          reasons.push('The loan looks manageable, but make sure you can still save monthly.');
        }
      } else if (purpose === 'education') {
        if (interestRate > 12 && dti > 0.4) {
          decision = 'Use caution';
          color = 'warning';
          reasons.push('Education loan is a good goal, but the EMI burden and interest rate are high.');
        } else {
          decision = 'Proceed';
          color = 'success';
          reasons.push('Education loans can be a reasonable investment if the rate and EMI fit your budget.');
        }
      } else {
        if (dti > 0.4) {
          decision = 'Use caution';
          color = 'warning';
          reasons.push('The EMI burden is high, consider if the purpose is essential.');
        } else {
          decision = 'Proceed with caution';
          color = 'success';
          reasons.push('Make sure the expected benefit outweighs the cost of interest.');
        }
      }
    }

    if (totalMonthlyCommitment <= monthlyExpenses) {
      reasons.push('Your expenses are covered before EMI, which is a good liquidity sign.');
    } else {
      reasons.push('Your EMIs plus expenses are tight; watch your discretionary spending carefully.');
    }

    if (interestRate <= 10) {
      reasons.push('The interest rate is attractive for a personal loan.');
    }

    return { decision, reasons, color };
  }, [dti, interestRate, monthlyExpenses, monthlyIncome, totalMonthlyCommitment, purpose]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gradient-to-r from-indigo-600 to-slate-900 rounded-3xl p-8 text-white shadow-xl mb-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Loan Decision Guide</h1>
            <p className="mt-3 max-w-2xl text-blue-100 text-lg">
              Advice for young borrowers on phone, travel, laptop and personal loans based on EMI ratio, interest rate, and budget.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 border border-white/20 backdrop-blur">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-3xl text-amber-300" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-amber-200">Loan guidance</p>
                <p className="text-2xl font-semibold">Safe borrowing rules</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Loan Snapshot</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Purpose</label>
              <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white">
                {purposes.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Amount (₹)</label>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white" min={0} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate (%)</label>
              <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white" min={0} step={0.1} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tenure (years)</label>
              <input type="number" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white" min={1} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Income (₹)</label>
              <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white" min={0} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Expenses (₹)</label>
              <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white" min={0} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current EMI (₹)</label>
              <input type="number" value={currentEMI} onChange={(e) => setCurrentEMI(Number(e.target.value))} className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white" min={0} />
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-50 dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Loan Impact</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Estimated EMI</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{emi.toFixed(0)}</p>
              </div>
              <div className="rounded-3xl bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">EMI + Current Commitments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalMonthlyCommitment.toFixed(0)}</p>
              </div>
              <div className="rounded-3xl bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Debt-to-Income Ratio</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{(dti * 100).toFixed(1)}%</p>
              </div>
              <div className="rounded-3xl bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Expense Coverage</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{monthlyIncome ? `${Math.round((monthlyExpenses / monthlyIncome) * 100)}%` : '—'}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className={`flex items-center gap-3 mb-4 ${guidance.color === 'danger' ? 'text-red-600' : guidance.color === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`}>
              {guidance.color === 'danger' ? <FaTimesCircle className="text-3xl" /> : <FaCheckCircle className="text-3xl" />}
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Recommendation</p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{guidance.decision}</h2>
              </div>
            </div>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              {guidance.reasons.map((reason, idx) => (
                <p key={idx}>• {reason}</p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Youth Loan Advice</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>• Prefer cash for short-term discretionary buys like phones and travel when possible.</li>
              <li>• If borrowing, keep interest below 14% and EMI under 25% of income.</li>
              <li>• Avoid high-interest personal loans for depreciation-heavy purchases.</li>
              <li>• Use loans for education or skills only if the cost is likely to improve your earning potential.</li>
              <li>• Build an emergency fund before taking additional debt.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LoanDecisionGuide;
