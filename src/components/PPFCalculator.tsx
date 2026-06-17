import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaLandmark, FaChartLine, FaInfoCircle } from 'react-icons/fa';

const PPFCalculator: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [time, setTime] = useState<number>(15);
  const [showChart, setShowChart] = useState<boolean>(true);

  const calculationResult = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    let totalBalance = 0;
    const yearlyData = [];
    
    for (let year = 1; year <= time; year++) {
      for (let month = 0; month < 12; month++) {
        totalBalance += monthlyContribution;
        totalBalance += totalBalance * monthlyRate;
      }
      const yearEnd = totalBalance;
      const contributions = monthlyContribution * 12 * year;
      yearlyData.push({
        year: `Year ${year}`,
        contribution: Math.round(contributions),
        interest: Math.round(yearEnd - contributions),
        total: Math.round(yearEnd),
      });
    }

    const totalContributions = monthlyContribution * 12 * time;
    const totalInterest = totalBalance - totalContributions;

    return {
      totalBalance,
      totalContributions,
      totalInterest,
      yearlyData,
    };
  }, [monthlyContribution, interestRate, time]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const pieData = [
    { name: 'Contributions', value: calculationResult.totalContributions, color: '#8b5cf6' },
    { name: 'Interest', value: calculationResult.totalInterest, color: '#10b981' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-xl flex items-center justify-center">
            <FaLandmark className="text-2xl text-violet-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">PPF Calculator</h2>
            <p className="text-gray-500 dark:text-gray-400">Public Provident Fund returns calculator</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Contribution (₹)
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                min="500"
                step="500"
              />
              <input
                type="range"
                min="500"
                max="150000"
                step="500"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹500</span>
                <span>₹1,50,000/yr</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                min="1"
                max="12"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Current rate: 7.1% (Q1 FY26)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Investment Period (Years)
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span className="font-medium">{time} Years</span>
                <span>50 Years</span>
              </div>
            </div>

            <button
              onClick={() => setShowChart(!showChart)}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FaChartLine />
              {showChart ? 'Hide' : 'Show'} Chart
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl p-6 text-white">
              <p className="text-violet-200 mb-1">Maturity Amount</p>
              <p className="text-3xl font-bold">{formatCurrency(calculationResult.totalBalance)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Contributions</p>
                <p className="text-xl font-bold text-violet-600 dark:text-violet-400">
                  {formatCurrency(calculationResult.totalContributions)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400">Interest Earned</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(calculationResult.totalInterest)}
                </p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                <span>Contributions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Interest</span>
              </div>
            </div>
          </div>
        </div>

        {/* Area Chart */}
        {showChart && (
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">PPF Growth Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculationResult.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Area type="monotone" dataKey="total" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Total" />
                  <Area type="monotone" dataKey="contribution" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Contributions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-4 flex items-start gap-3">
        <FaInfoCircle className="text-violet-500 mt-1" />
        <div>
          <h4 className="font-semibold text-violet-900 dark:text-violet-100">About PPF</h4>
          <p className="text-sm text-violet-700 dark:text-violet-300">
            Public Provident Fund (PPF) is a long-term savings scheme with tax benefits under Section 80C. 
            Minimum: ₹500/year, Maximum: ₹1,50,000/year. Lock-in: 15 years (extendable in 5-year blocks).
          </p>
        </div>
      </div>
    </div>
  );
};

export default PPFCalculator;