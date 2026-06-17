import React, { useMemo, useState } from 'react';

const InflationCalculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<number>(100000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [years, setYears] = useState<number>(10);

  const futureValue = useMemo(() => {
    return currentValue * Math.pow(1 + inflationRate / 100, years);
  }, [currentValue, inflationRate, years]);

  const purchasingPower = useMemo(() => {
    return currentValue / Math.pow(1 + inflationRate / 100, years);
  }, [currentValue, inflationRate, years]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Inflation Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Estimate how inflation erodes purchasing power and what future expenses may look like.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Value (₹)</label>
            <input
              type="number"
              value={currentValue}
              onChange={(e) => setCurrentValue(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Annual Inflation (%)</label>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Years</label>
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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Inflation Impact</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Future value in {years} years: {formatCurrency(futureValue)}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Current purchasing power equivalent: {formatCurrency(purchasingPower)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Inflation reduces what your savings can buy over time. This tool helps you estimate the real cost of future goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InflationCalculator;
