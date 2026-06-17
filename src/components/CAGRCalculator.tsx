import React, { useMemo, useState } from 'react';

const CAGRCalculator: React.FC = () => {
  const [startValue, setStartValue] = useState<number>(100000);
  const [endValue, setEndValue] = useState<number>(200000);
  const [years, setYears] = useState<number>(5);

  const cagr = useMemo(() => {
    if (startValue <= 0 || endValue <= 0 || years <= 0) return 0;
    return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
  }, [startValue, endValue, years]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">CAGR Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Compute the Compound Annual Growth Rate for your investment over a fixed period.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Value (₹)</label>
            <input
              type="number"
              value={startValue}
              onChange={(e) => setStartValue(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Value (₹)</label>
            <input
              type="number"
              value={endValue}
              onChange={(e) => setEndValue(Number(e.target.value))}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white"
              min={1}
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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Results</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Start value: {formatCurrency(startValue)}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">End value: {formatCurrency(endValue)}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Time horizon: {years} years</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300 mt-4">CAGR: {cagr.toFixed(2)}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Use CAGR to compare different investments with different timeframes and returns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CAGRCalculator;
