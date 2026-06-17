import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaUniversity, FaChartLine, FaInfoCircle } from 'react-icons/fa';

const PFCalculator: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(30000);
  const [dearnessAllowance, setDearnessAllowance] = useState<number>(10000);
  const [employeeContribution, setEmployeeContribution] = useState<number>(12);
  const [employerContribution, setEmployerContribution] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number>(8.25);
  const [time, setTime] = useState<number>(5);
  const [showChart, setShowChart] = useState<boolean>(true);

  const calculationResult = useMemo(() => {
    const monthlyBasic = basicSalary + dearnessAllowance;
    const employeeContrib = monthlyBasic * (employeeContribution / 100);
    const employerContrib = monthlyBasic * (employerContribution / 100);
    const totalMonthly = employeeContrib + employerContrib;
    
    // Calculate with interest (simplified compound interest)
    const monthlyRate = interestRate / 12 / 100;
    let totalBalance = 0;
    const yearlyData = [];
    
    for (let year = 1; year <= time; year++) {
      for (let month = 0; month < 12; month++) {
        totalBalance += totalMonthly;
        totalBalance += totalBalance * monthlyRate;
      }
      const yearEnd = totalBalance;
      yearlyData.push({
        year: `Year ${year}`,
        contribution: Math.round(totalMonthly * 12 * year),
        interest: Math.round(yearEnd - (totalMonthly * 12 * year)),
        total: Math.round(yearEnd),
      });
    }

    const totalContributions = totalMonthly * 12 * time;
    const totalInterest = totalBalance - totalContributions;

    return {
      monthlyContribution: totalMonthly,
      employeeContribution: employeeContrib,
      employerContribution: employerContrib,
      totalBalance,
      totalContributions,
      totalInterest,
      yearlyData,
    };
  }, [basicSalary, dearnessAllowance, employeeContribution, employerContribution, interestRate, time]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const pieData = [
    { name: 'Contributions', value: calculationResult.totalContributions, color: '#3b82f6' },
    { name: 'Interest', value: calculationResult.totalInterest, color: '#10b981' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
            <FaUniversity className="text-2xl text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">EPF Calculator</h2>
            <p className="text-gray-500 dark:text-gray-400">Employee Provident Fund returns calculator</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Basic Salary (₹)
              </label>
              <input
                type="number"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="5000"
                step="1000"
              />
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dearness Allowance (₹)
              </label>
              <input
                type="number"
                value={dearnessAllowance}
                onChange={(e) => setDearnessAllowance(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
                step="1000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Employee % 
                </label>
                <input
                  type="number"
                  value={employeeContribution}
                  onChange={(e) => setEmployeeContribution(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Employer %
                </label>
                <input
                  type="number"
                  value={employerContribution}
                  onChange={(e) => setEmployerContribution(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="1"
                max="15"
                step="0.05"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Investment Period (Years)
              </label>
              <input
                type="range"
                min="1"
                max="35"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span className="font-medium">{time} Years</span>
                <span>35 Years</span>
              </div>
            </div>

            <button
              onClick={() => setShowChart(!showChart)}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FaChartLine />
              {showChart ? 'Hide' : 'Show'} Chart
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl text-center">
                <p className="text-sm text-purple-600 dark:text-purple-400">Monthly</p>
                <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                  {formatCurrency(calculationResult.monthlyContribution)}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl text-center">
                <p className="text-sm text-green-600 dark:text-green-400">Interest Earned</p>
                <p className="text-xl font-bold text-green-700 dark:text-green-300">
                  {formatCurrency(calculationResult.totalInterest)}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Balance</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  {formatCurrency(calculationResult.totalBalance)}
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
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Contributions: {formatCurrency(calculationResult.totalContributions)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Interest: {formatCurrency(calculationResult.totalInterest)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Area Chart */}
        {showChart && (
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">EPF Growth Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculationResult.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Area type="monotone" dataKey="total" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Total Balance" />
                  <Area type="monotone" dataKey="contribution" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Contributions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 flex items-start gap-3">
        <FaInfoCircle className="text-purple-500 mt-1" />
        <div>
          <h4 className="font-semibold text-purple-900 dark:text-purple-100">About EPF</h4>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Employee Provident Fund (EPF) is a retirement benefit scheme for salaried employees. 
            Both employee and employer contribute 12% of basic salary + DA towards EPF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PFCalculator;