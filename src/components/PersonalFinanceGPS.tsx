import React, { useEffect, useMemo, useState } from 'react';
import { FaMapSigns, FaHeartbeat, FaShieldAlt, FaBullseye, FaLightbulb, FaStar } from 'react-icons/fa';

const financialGoals = [
  'Emergency Fund',
  'Retirement Corpus',
  'Home Ownership',
  'Child Education',
  'Travel Fund',
  'Debt Free Goal',
  'Wealth Creation',
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const currency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const PersonalFinanceGPS: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [maritalStatus, setMaritalStatus] = useState<string>('Single');
  const [dependents, setDependents] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [annualIncome, setAnnualIncome] = useState<number>(600000);
  const [city, setCity] = useState<string>('Mumbai');
  const [existingLoanEMI, setExistingLoanEMI] = useState<number>(15000);
  const [existingSIP, setExistingSIP] = useState<number>(8000);
  const [mutualFunds, setMutualFunds] = useState<number>(200000);
  const [ppf, setPPF] = useState<number>(150000);
  const [epf, setEPF] = useState<number>(120000);
  const [vpf, setVPF] = useState<number>(0);
  const [nps, setNPS] = useState<number>(0);
  const [fd, setFD] = useState<number>(500000);
  const [stocks, setStocks] = useState<number>(100000);
  const [gold, setGold] = useState<number>(50000);
  const [reits, setREITs] = useState<number>(0);
  const [insuranceCoverage, setInsuranceCoverage] = useState<number>(1000000);
  const [hasHealthInsurance, setHasHealthInsurance] = useState<boolean>(true);
  const [hasTermInsurance, setHasTermInsurance] = useState<boolean>(false);
  const [emergencyFund, setEmergencyFund] = useState<number>(100000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(35000);
  const [financialGoal, setFinancialGoal] = useState<string>('Build a retirement corpus of ₹2 Cr');

  useEffect(() => {
    document.title = 'Personal Finance GPS | FinCalcHub';
  }, []);

  const analysis = useMemo(() => {
    const annualIncomeComputed = annualIncome || monthlyIncome * 12;
    const savingsCapacity = Math.max(annualIncomeComputed - monthlyExpenses * 12, 0);
    const emergencyTarget = monthlyExpenses * 6;
    const emergencyRatio = emergencyFund / Math.max(emergencyTarget, 1);
    const debtCoverage = monthlyExpenses > 0 ? existingLoanEMI / monthlyExpenses : 0;
    const debtServiceRatio = monthlyIncome > 0 ? existingLoanEMI / monthlyIncome : 0;
    const liquidityCoverage = monthlyIncome > 0 ? emergencyFund / monthlyIncome : 0;
    const debtRiskScore = clamp((debtServiceRatio / 0.5) * 100, 0, 100);
    const insuranceGap = !hasHealthInsurance || insuranceCoverage < annualIncomeComputed * 10;
    const totalLiquidWealth = existingSIP + mutualFunds + ppf + epf + vpf + nps + fd + stocks + gold + reits + emergencyFund;
    const instrumentPresence = {
      sip: existingSIP > 0,
      mutualFunds: mutualFunds > 0,
      ppf: ppf > 0,
      epf: epf > 0,
      vpf: vpf > 0,
      nps: nps > 0,
      fd: fd > 0,
      stocks: stocks > 0,
      gold: gold > 0,
      reits: reits > 0,
      emergencyFund: emergencyFund > 0,
      termInsurance: hasTermInsurance,
    };
    const heldInstruments = Object.entries(instrumentPresence).flatMap(([key, present]) =>
      present
        ? [
            key === 'sip'
              ? 'SIP'
              : key === 'mutualFunds'
              ? 'Mutual Funds'
              : key === 'ppf'
              ? 'PPF'
              : key === 'epf'
              ? 'EPF'
              : key === 'vpf'
              ? 'VPF'
              : key === 'nps'
              ? 'NPS'
              : key === 'fd'
              ? 'FDs'
              : key === 'stocks'
              ? 'Stocks'
              : key === 'gold'
              ? 'Gold'
              : key === 'reits'
              ? 'REITs'
              : key === 'termInsurance'
              ? 'Term Insurance'
              : 'Emergency Fund',
          ]
        : []
    );
    const diversificationScore = [existingSIP, mutualFunds, ppf, epf, vpf, nps, fd, stocks, gold, reits, emergencyFund].filter((value) => value > 0).length;
    const insuranceRatio = insuranceCoverage / Math.max(annualIncomeComputed * 10, 1);
    const retirementTarget = monthlyExpenses * 300;
    const projectedRetirementAssets = ppf + epf + vpf + nps + existingSIP * 12 * 10;
    const retirementScore = clamp((projectedRetirementAssets / retirementTarget) * 100, 0, 100);
    const healthScore = clamp(
      emergencyRatio * 30 +
        Math.min(insuranceRatio, 1) * 25 +
        (1 - clamp(debtCoverage / 0.35, 0, 1)) * 20 +
        clamp(diversificationScore / 7, 0, 1) * 15 +
        clamp(savingsCapacity / Math.max(annualIncomeComputed, 1), 0, 1) * 10,
      0,
      100
    );
    const financialHealthScore = clamp(
      emergencyRatio * 25 +
        Math.min(insuranceRatio, 1) * 20 +
        (1 - clamp(debtCoverage / 0.35, 0, 1)) * 20 +
        clamp(diversificationScore / 7, 0, 1) * 20 +
        clamp(savingsCapacity / Math.max(annualIncomeComputed, 1), 0, 1) * 15,
      0,
      100
    );
    const goalType = financialGoal.toLowerCase().includes('retirement')
      ? 'retirement'
      : financialGoal.toLowerCase().includes('education')
      ? 'education'
      : financialGoal.toLowerCase().includes('travel')
      ? 'travel'
      : 'wealth';

    const taxPotential = clamp(150000 - (existingSIP * 12 + ppf + epf + vpf + nps), 0, 150000);
    const missingAssets = [] as string[];
    const opportunitySignals = [] as string[];
    const recommendations: Array<{ title: string; why: string; expectedImpact: string; risk: string; taxImplication: string; liquidityImpact: string; timeframe: string }> = [];

    if (emergencyRatio < 1) {
      missingAssets.push('Emergency Fund');
      opportunitySignals.push('Emergency reserve below recommended 6 months');
      recommendations.push({
        title: 'Build a stronger emergency fund',
        why: 'Your savings cover less than 6 months of expenses.',
        expectedImpact: 'Improves financial resilience and reduces reliance on debt.',
        risk: 'Low',
        taxImplication: 'No direct tax benefit, but lowers liquidity risk.',
        liquidityImpact: 'High liquidity improvement',
        timeframe: 'Do Immediately',
      });
    }
    if (!hasHealthInsurance) {
      missingAssets.push('Health Insurance');
      opportunitySignals.push('No health insurance detected');
      recommendations.push({
        title: 'Secure health insurance coverage',
        why: 'Health costs can derail your financial plan without coverage.',
        expectedImpact: 'Reduces medical expense risk and preserves savings.',
        risk: 'Low',
        taxImplication: 'Premiums may be eligible for deductions under Section 80D.',
        liquidityImpact: 'Improves liquidity resilience',
        timeframe: 'Do Immediately',
      });
    }
    if (!hasTermInsurance || insuranceCoverage < annualIncomeComputed * 10) {
      missingAssets.push('Term Insurance');
      opportunitySignals.push('Life cover is below recommended 10x annual income.');
      recommendations.push({
        title: 'Increase life insurance cover',
        why: 'Protect dependents against income loss if something happens to you.',
        expectedImpact: 'Reduces financial risk for family and improves protection.',
        risk: 'Low',
        taxImplication: 'Premiums may qualify for deductions under Section 80C.',
        liquidityImpact: 'Negligible',
        timeframe: 'Do Immediately',
      });
    }
    if (!nps) {
      missingAssets.push('NPS');
      opportunitySignals.push('No NPS holdings detected.');
      recommendations.push({
        title: 'Start an NPS account',
        why: 'NPS adds retirement diversification and tax savings.',
        expectedImpact: 'Improves retirement readiness and lowers tax liability.',
        risk: 'Medium',
        taxImplication: 'Up to ₹50,000 deduction under Section 80CCD(1B).',
        liquidityImpact: 'Low liquidity until retirement',
        timeframe: 'Do Within 6 Months',
      });
    }
    if (!existingSIP) {
      missingAssets.push('SIP / Systematic Investment Plan');
      opportunitySignals.push('No SIP or regular equity investment plan found.');
      recommendations.push({
        title: 'Start a SIP plan',
        why: 'Regular contributions benefit from rupee cost averaging.',
        expectedImpact: 'Builds long-term wealth with disciplined investing.',
        risk: 'Medium',
        taxImplication: 'Equity funds held over 1 year get long-term capital gains benefits.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 6 Months',
      });
    }
    if (!mutualFunds) {
      missingAssets.push('Mutual Funds');
      opportunitySignals.push('No mutual fund exposure detected.');
      recommendations.push({
        title: 'Consider mutual funds for diversification',
        why: 'Mutual funds make professional diversification accessible. ',
        expectedImpact: 'Reduces single-asset concentration risk.',
        risk: 'Medium',
        taxImplication: 'Equity funds held over 1 year get long-term capital gains benefits.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 6 Months',
      });
    }
    if (!ppf) {
      missingAssets.push('PPF');
      opportunitySignals.push('No PPF contribution detected.');
      recommendations.push({
        title: 'Open or fund PPF',
        why: 'PPF offers stable tax-free returns for long-term wealth building.',
        expectedImpact: 'Improves tax savings and secure retirement assets.',
        risk: 'Low',
        taxImplication: 'Up to ₹1.5 lakh deduction under Section 80C.',
        liquidityImpact: 'Low until maturity',
        timeframe: 'Do Within 6 Months',
      });
    }
    if (!epf) {
      missingAssets.push('EPF');
      opportunitySignals.push('No EPF balance detected.');
      recommendations.push({
        title: 'Check EPF contributions',
        why: 'EPF is a key retirement savings asset for salaried individuals.',
        expectedImpact: 'Builds a stable retirement corpus with tax benefits.',
        risk: 'Low',
        taxImplication: 'Contributions get Section 80C deductions.',
        liquidityImpact: 'Low until retirement',
        timeframe: 'Do Within 6 Months',
      });
    }
    if (!vpf) {
      missingAssets.push('VPF');
      opportunitySignals.push('No VPF balance detected.');
      recommendations.push({
        title: 'Evaluate VPF top-up contributions',
        why: 'VPF is a low-risk way to increase retirement savings from salary.',
        expectedImpact: 'Improves retirement corpus with guaranteed returns.',
        risk: 'Low',
        taxImplication: 'Contributions are eligible under Section 80C.',
        liquidityImpact: 'Low until retirement',
        timeframe: 'Do Within 1 Year',
      });
    }
    if (!fd) {
      missingAssets.push('Fixed Deposits');
      opportunitySignals.push('No fixed deposit holdings detected.');
      recommendations.push({
        title: 'Add some fixed deposit exposure',
        why: 'FDs preserve capital while providing predictable income.',
        expectedImpact: 'Improves cash stability and emergency liquidity.',
        risk: 'Low',
        taxImplication: 'Interest taxed as income.',
        liquidityImpact: 'Low to moderate',
        timeframe: 'Do Within 1 Year',
      });
    }
    if (!stocks) {
      missingAssets.push('Stocks / Equity exposure');
      opportunitySignals.push('No direct equity exposure detected.');
      recommendations.push({
        title: 'Consider some equity investments',
        why: 'Equity is essential for long-term wealth creation. ',
        expectedImpact: 'Improves growth potential over long horizons.',
        risk: 'High',
        taxImplication: 'Long-term capital gains for holdings over 1 year.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 1 Year',
      });
    }
    if (!gold) {
      missingAssets.push('Gold or alternate asset exposure');
      opportunitySignals.push('No gold or alternate asset exposure detected.');
      recommendations.push({
        title: 'Add a small gold or alternate asset allocation',
        why: 'Alternative assets can hedge inflation and diversify equity risk.',
        expectedImpact: 'Improves overall portfolio resilience.',
        risk: 'Medium',
        taxImplication: 'Long-term capital gains apply after 3 years.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 1 Year',
      });
    }

    const hasMarketExposure = existingSIP > 0 || mutualFunds > 0 || stocks > 0 || ppf > 0 || epf > 0 || vpf > 0 || nps > 0;
    if (hasMarketExposure && !reits) {
      missingAssets.push('REITs');
      opportunitySignals.push('Real estate exposure via REITs can broaden diversification beyond equities and debt.');
      recommendations.push({
        title: 'Consider REITs for real estate exposure',
        why: 'REITs provide a liquid way to add property-backed income to your portfolio.',
        expectedImpact: 'Improves diversification and adds an inflation-sensitive asset class.',
        risk: 'Medium',
        taxImplication: 'Distributions may be taxed as income; long-term gains are preferable.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 1 Year',
      });
    }
    if (existingLoanEMI > 0) {
      opportunitySignals.push('Existing loan EMI may affect your debt servicing ability.');
      recommendations.push({
        title: 'Review loan protection and tax benefits',
        why: 'Home and personal loans have tax and insurance implications.',
        expectedImpact: 'Reduces risk from loan repayment disruptions.',
        risk: 'Low',
        taxImplication: 'Interest may qualify for deductions under Section 24 or 80C.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 6 Months',
      });
    }
    if (existingSIP && ppf && epf) {
      if (!instrumentPresence.vpf) missingAssets.push('VPF');
      if (!instrumentPresence.nps) missingAssets.push('NPS');
      if (!hasHealthInsurance) missingAssets.push('Health Insurance');
      if (insuranceCoverage < annualIncomeComputed * 10) missingAssets.push('Term Insurance');
      if (!reits) missingAssets.push('REITs');
      opportunitySignals.push('Core retirement savings are present; add protection and alternative growth assets.');
      recommendations.push({
        title: 'Add protection and alternative assets',
        why: 'Strong savings need protection and diversification for long-term resilience.',
        expectedImpact: 'Improves portfolio safety and growth potential.',
        risk: 'Medium',
        taxImplication: 'Insurance premiums and NPS contributions may qualify for deductions.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 6 Months',
      });
    }
    if (goalType === 'education' && !nps) {
      opportunitySignals.push('Your goal is education; NPS can add retirement diversification while preserving tax savings.');
      recommendations.push({
        title: 'Link education goal to long-term retirement planning',
        why: 'Balancing short-term goals with retirement savings keeps long-term plans on track.',
        expectedImpact: 'Reduces future retirement funding pressure.',
        risk: 'Low',
        taxImplication: 'Helps maintain Section 80C eligibility across goals.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 6 Months',
      });
    }
    if (goalType === 'travel' && emergencyRatio < 1) {
      opportunitySignals.push('Travel goals are best funded after emergency reserves are built.');
      recommendations.push({
        title: 'Prioritize emergency savings before discretionary travel funding',
        why: 'Travel is discretionary and should not weaken your financial safety net.',
        expectedImpact: 'Improves liquidity and lowers debt risk.',
        risk: 'Low',
        taxImplication: 'No direct benefit, but preserves financial resilience.',
        liquidityImpact: 'High',
        timeframe: 'Do Immediately',
      });
    }
    if (diversificationScore <= 3) {
      missingAssets.push('Index Funds / ETFs');
      opportunitySignals.push('Portfolio concentration is low, consider diversifying.');
      recommendations.push({
        title: 'Increase diversification with index funds or ETFs',
        why: 'Diversified equity exposure lowers portfolio concentration risk.',
        expectedImpact: 'Improves risk-adjusted returns over time.',
        risk: 'Medium',
        taxImplication: 'Capital gains taxed favorably for long-term holdings.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 1 Year',
      });
    }
    if (ppf || epf) {
      opportunitySignals.push('Stable retirement instruments detected. Add modern assets for growth.');
      recommendations.push({
        title: 'Balance retirement savings with growth assets',
        why: 'PPF and EPF are safe, but may lag inflation over long horizons.',
        expectedImpact: 'Enhances total returns without sacrificing safety.',
        risk: 'Medium',
        taxImplication: 'Diversified asset mix optimizes tax and inflation outcomes.',
        liquidityImpact: 'Moderate to low',
        timeframe: 'Do Within 1 Year',
      });
    }
    if (stocks > 0 && !gold) {
      missingAssets.push('Gold or alternate asset exposure');
      opportunitySignals.push('Equity exposure exists with little allocation to alternate assets.');
      recommendations.push({
        title: 'Consider a small gold allocation',
        why: 'Gold can hedge equity risk and inflation in India.',
        expectedImpact: 'Improves portfolio diversification.',
        risk: 'Medium',
        taxImplication: 'Long-term capital gains apply after 3 years.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 1 Year',
      });
    }
    if (!mutualFunds && existingSIP) {
      missingAssets.push('Mutual Fund diversification');
      opportunitySignals.push('SIP exists but broader mutual fund exposure is limited.');
      recommendations.push({
        title: 'Review mutual fund diversification',
        why: 'Multiple funds/asset classes reduce risk and capture growth.',
        expectedImpact: 'Improves portfolio resilience and compounding potential.',
        risk: 'Medium',
        taxImplication: 'Multiple fund types unlock favorable holding periods.',
        liquidityImpact: 'Moderate',
        timeframe: 'Do Within 1 Year',
      });
    }

    const uniqueMissing = Array.from(new Set(missingAssets));

    return {
      annualIncomeComputed,
      savingsCapacity,
      emergencyTarget,
      emergencyRatio,
      liquidityCoverage,
      debtCoverage,
      debtServiceRatio,
      debtRiskScore: Math.round(debtRiskScore),
      insuranceGap,
      totalLiquidWealth,
      heldInstruments,
      diversificationScore,
      healthScore: Math.round(healthScore),
      financialHealthScore: Math.round(financialHealthScore),
      retirementScore: Math.round(retirementScore),
      taxPotential,
      uniqueMissing,
      opportunitySignals,
      recommendations,
      roadmap: [
        { title: 'Emergency fund', timeframe: 'Do Immediately', detail: 'Reach at least 6 months of expenses first.' },
        { title: 'Health and life insurance', timeframe: 'Do Immediately', detail: 'Protect your family and savings from shocks.' },
        { title: 'Tax optimization', timeframe: 'Do Within 6 Months', detail: 'Use Section 80C and 80D deductions fully.' },
        { title: 'Retirement diversification', timeframe: 'Do Within 1 Year', detail: 'Add NPS, index funds and alternate assets.' },
        { title: 'Long-term wealth creation', timeframe: 'Long-Term Actions', detail: 'Build a balanced portfolio and review annually.' },
      ],
    };
  }, [age, annualIncome, existingLoanEMI, existingSIP, emergencyFund, epf, gold, hasHealthInsurance, hasTermInsurance, insuranceCoverage, monthlyExpenses, monthlyIncome, mutualFunds, nps, ppf, reits, stocks, vpf]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-gradient-to-r from-cyan-600 to-slate-900 rounded-3xl p-8 text-white shadow-xl mb-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Personal Finance GPS™</h1>
            <p className="mt-3 max-w-2xl text-blue-100 text-lg">
              A financial co-pilot that evaluates your risk, insurance, retirement and investment guidance with a personalized roadmap.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 border border-white/20 backdrop-blur">
            <div className="flex items-center gap-3">
              <FaMapSigns className="text-3xl text-amber-300" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-amber-200">Flagship Feature</p>
                <p className="text-2xl font-semibold">Actionable roadmap</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Your Profile</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                  min={18}
                  max={80}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marital Status</label>
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Married with Children</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dependents</label>
                <input
                  type="number"
                  value={dependents}
                  onChange={(e) => setDependents(Number(e.target.value))}
                  className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                  min={0}
                  max={10}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Financial Snapshot</h2>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Income (₹)</label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Annual Income (₹)</label>
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Expenses (₹)</label>
                  <input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Emergency Fund (₹)</label>
                  <input
                    type="number"
                    value={emergencyFund}
                    onChange={(e) => setEmergencyFund(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Existing Loan EMI (₹)</label>
                  <input
                    type="number"
                    value={existingLoanEMI}
                    onChange={(e) => setExistingLoanEMI(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Insurance Coverage (₹)</label>
                  <input
                    type="number"
                    value={insuranceCoverage}
                    onChange={(e) => setInsuranceCoverage(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <input
                  id="health-insurance"
                  type="checkbox"
                  checked={hasHealthInsurance}
                  onChange={(e) => setHasHealthInsurance(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="health-insurance" className="text-sm text-gray-700 dark:text-gray-300">
                  I have health insurance
                </label>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <input
                id="term-insurance"
                type="checkbox"
                checked={hasTermInsurance}
                onChange={(e) => setHasTermInsurance(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="term-insurance" className="text-sm text-gray-700 dark:text-gray-300">
                I have term insurance
              </label>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Existing Investments</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { label: 'Monthly SIPs (₹)', value: existingSIP, setter: setExistingSIP },
                { label: 'Mutual Funds (₹)', value: mutualFunds, setter: setMutualFunds },
                { label: 'PPF Balance (₹)', value: ppf, setter: setPPF },
                { label: 'EPF Balance (₹)', value: epf, setter: setEPF },
                { label: 'VPF Balance (₹)', value: vpf, setter: setVPF },
                { label: 'NPS Balance (₹)', value: nps, setter: setNPS },
                { label: 'Fixed Deposits (₹)', value: fd, setter: setFD },
                { label: 'Stocks (₹)', value: stocks, setter: setStocks },
                { label: 'Gold (₹)', value: gold, setter: setGold },
                { label: 'REITs (₹)', value: reits, setter: setREITs },
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{item.label}</label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => item.setter(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Financial Goals</h2>
            <textarea
              value={financialGoal}
              onChange={(e) => setFinancialGoal(e.target.value)}
              rows={4}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-4 text-gray-900 dark:text-white"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {financialGoals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setFinancialGoal(goal)}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700"
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaHeartbeat className="text-3xl text-rose-500" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Health Score</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{analysis.healthScore}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your score is based on emergency reserves, protection, debt, diversification and savings capacity.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaStar className="text-3xl text-yellow-500" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Flagship Score</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{analysis.financialHealthScore}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">A flagship Personal Finance GPS score combining resilience, protection, debt and diversification into a single co-pilot metric.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaBullseye className="text-3xl text-emerald-500" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Retirement Readiness</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{analysis.retirementScore}%</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">An approximate view of how your retirement assets compare to a ₹{currency(monthlyExpenses * 300)} target corpus.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-3xl text-indigo-500" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Tax Opportunity</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{currency(analysis.taxPotential)}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Potential additional 80C / 80CCD tax-saving headroom based on reported investments.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-3xl text-red-500" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Insurance Gap</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{analysis.insuranceGap ? 'Review Needed' : 'Adequate'}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{analysis.insuranceGap ? 'Your cover is below the 10x income benchmark or health insurance is missing.' : 'Health and life coverage are aligned for now.'}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-3xl text-orange-500" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Debt Risk</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{analysis.debtRiskScore}%</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated risk based on EMI as a share of income. Below 50% is generally safer.</p>
          </div>
        </aside>
      </div>

      <section className="mt-10 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaLightbulb className="text-3xl text-yellow-500" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Opportunity Engine</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {analysis.opportunitySignals.map((signal, idx) => (
              <div key={idx} className="rounded-3xl border border-gray-200 dark:border-gray-700 p-4 bg-slate-50 dark:bg-gray-900">
                <p className="text-sm text-gray-700 dark:text-gray-200">{signal}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Held Financial Instruments</h2>
          {analysis.heldInstruments.length ? (
            <ul className="space-y-3 mb-6">
              {analysis.heldInstruments.map((item) => (
                <li key={item} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 p-4 text-gray-800 dark:text-gray-100">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 mb-6">No core investment instruments detected yet. Add SIP, mutual funds, PPF or stocks to begin.</p>
          )}
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Missing Financial Instruments</h2>
          {analysis.uniqueMissing.length ? (
            <ul className="space-y-3">
              {analysis.uniqueMissing.map((item) => (
                <li key={item} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 p-4 text-gray-800 dark:text-gray-100">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Your portfolio shows good coverage of core instruments.</p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Personalized Action Plan</h3>
            <div className="space-y-4">
              {analysis.recommendations.map((item) => (
                <div key={item.title} className="rounded-3xl border border-gray-200 dark:border-gray-700 p-4 bg-slate-50 dark:bg-gray-900">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.timeframe}</p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">{item.risk}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{item.why}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Impact: {item.expectedImpact}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tax: {item.taxImplication}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Liquidity: {item.liquidityImpact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Wealth Creation Roadmap</h3>
            <div className="space-y-4">
              {analysis.roadmap.map((stage) => (
                <div key={stage.title} className="rounded-3xl border border-gray-200 dark:border-gray-700 p-4 bg-slate-50 dark:bg-gray-900">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{stage.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stage.detail}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">{stage.timeframe}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalFinanceGPS;
