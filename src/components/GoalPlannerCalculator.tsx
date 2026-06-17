import React, { useMemo, useState } from 'react';

const GoalPlannerCalculator: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState<number>(1000000);
  const [currentSavings, setCurrentSavings] = useState<number>(200000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [years, setYears] = useState<number>(10);

  const annualReturn = expectedReturn / 100;
  const periods = years * 12;
  const monthlyRate = annualReturn / 12;

  const predictedCorpus = useMemo(() => {
    const savingsFuture = currentSavings * Math.pow(1 + annualReturn, years);
    const contributionsFuture = monthlyContribution === 0 || monthlyRate === 0
      ? monthlyContribution * periods
      : monthlyContribution * ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate) * (1 + monthlyRate);
    return savingsFuture + contributionsFuture;
  }, [currentSavings, monthlyContribution, annualReturn, monthlyRate, years, periods]);

  const requiredMonthly = useMemo(() => {
    if (monthlyRate <= 0) {
      return Math.max((goalAmount - currentSavings) / periods, 0);
    }
    const targetAfterSavings = goalAmount - currentSavings * Math.pow(1 + annualReturn, years);
    if (targetAfterSavings <= 0) return 0;
    return targetAfterSavings * monthlyRate / (Math.pow(1 + monthlyRate, periods) - 1);
  }, [annualReturn, currentSavings, goalAmount, monthlyRate, periods, years]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Goal Planner</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Match your savings and investment plan to a chosen financial goal.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal Amount (₹)</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Savings (₹)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Contribution (₹)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Annual Return (%)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={0}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Horizon (years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={1}
            />
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Planning Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Predicted corpus after {years} years: {formatCurrency(predictedCorpus)}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Required monthly contribution to reach goal: {formatCurrency(requiredMonthly)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            If your current savings and contributions continue at this pace, this is the estimated future corpus and savings gap for your goal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalPlannerCalculator;
