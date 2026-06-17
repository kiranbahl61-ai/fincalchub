import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { FaChartLine, FaArrowUp, FaArrowDown, FaSync, FaBuilding, FaIndustry, FaMobileAlt, FaUniversity, FaChartBar } from 'react-icons/fa';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  sector: string;
  history: { time: string; price: number }[];
}

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const MarketDashboard: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [indices] = useState<MarketIndex[]>([
    { name: 'Nifty 50', value: 24567.85, change: 125.35, changePercent: 0.51 },
    { name: 'Sensex', value: 81245.67, change: 425.28, changePercent: 0.53 },
    { name: 'Nifty Bank', value: 51234.56, change: -156.78, changePercent: -0.31 },
    { name: 'Nifty IT', value: 35678.90, change: 456.78, changePercent: 1.30 },
  ]);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulated stock data (in production, this would come from a real API)
  useEffect(() => {
    const initialStocks: StockData[] = [
      {
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        price: 2890.45,
        change: 25.67,
        changePercent: 0.90,
        high: 2912.30,
        low: 2865.80,
        volume: '2.4 Cr',
        sector: 'Conglomerate',
        history: generateHistory(2890.45, 30)
      },
      {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        price: 4125.80,
        change: -15.45,
        changePercent: -0.37,
        high: 4156.20,
        low: 4108.30,
        volume: '1.1 Cr',
        sector: 'IT',
        history: generateHistory(4125.80, 30)
      },
      {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank',
        price: 1689.30,
        change: 12.45,
        changePercent: 0.74,
        high: 1698.50,
        low: 1675.20,
        volume: '3.2 Cr',
        sector: 'Banking',
        history: generateHistory(1689.30, 30)
      },
      {
        symbol: 'INFY',
        name: 'Infosys',
        price: 1890.25,
        change: 8.90,
        changePercent: 0.47,
        high: 1902.15,
        low: 1878.30,
        volume: '1.8 Cr',
        sector: 'IT',
        history: generateHistory(1890.25, 30)
      },
      {
        symbol: 'ICICIBANK',
        name: 'ICICI Bank',
        price: 1125.60,
        change: -5.30,
        changePercent: -0.47,
        high: 1135.80,
        low: 1118.40,
        volume: '2.1 Cr',
        sector: 'Banking',
        history: generateHistory(1125.60, 30)
      },
      {
        symbol: 'SBIN',
        name: 'State Bank of India',
        price: 756.40,
        change: 18.90,
        changePercent: 2.56,
        high: 762.15,
        low: 738.20,
        volume: '4.5 Cr',
        sector: 'Banking',
        history: generateHistory(756.40, 30)
      },
      {
        symbol: 'WIPRO',
        name: 'Wipro',
        price: 578.90,
        change: -3.45,
        changePercent: -0.59,
        high: 585.20,
        low: 575.30,
        volume: '0.9 Cr',
        sector: 'IT',
        history: generateHistory(578.90, 30)
      },
      {
        symbol: 'BHARTIARTL',
        name: 'Bharti Airtel',
        price: 1456.78,
        change: 22.34,
        changePercent: 1.56,
        high: 1465.20,
        low: 1435.60,
        volume: '1.3 Cr',
        sector: 'Telecom',
        history: generateHistory(1456.78, 30)
      },
    ];
    setStocks(initialStocks);
    setSelectedStock(initialStocks[0]);
    setLoading(false);
  }, []);

  const generateHistory = (basePrice: number, days: number) => {
    const history = [];
    let price = basePrice * 0.95;
    for (let i = days; i >= 0; i--) {
      const change = (Math.random() - 0.45) * (basePrice * 0.02);
      price = Math.max(price + change, basePrice * 0.9);
      history.push({
        time: `Day ${days - i + 1}`,
        price: Math.round(price * 100) / 100
      });
    }
    return history;
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStocks(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 10,
        change: (Math.random() - 0.5) * 20,
        changePercent: ((Math.random() - 0.5) * 2).toFixed(2) as unknown as number
      })));
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'Banking': return <FaUniversity />;
      case 'IT': return <FaChartBar />;
      case 'Telecom': return <FaMobileAlt />;
      case 'Conglomerate': return <FaBuilding />;
      default: return <FaIndustry />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaChartLine className="text-2xl" />
              Live Market Dashboard
            </h1>
            <p className="text-indigo-100 mt-2">Real-time Indian stock market data</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-indigo-200">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={refreshData}
              disabled={loading}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {indices.map((index, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">{index.name}</span>
              {index.change >= 0 ? (
                <FaArrowUp className="text-green-500" />
              ) : (
                <FaArrowDown className="text-red-500" />
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {index.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
            <p className={`text-sm ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stock List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Top Stocks</h2>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {stocks.map((stock, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedStock(stock)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedStock?.symbol === stock.symbol ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</p>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(stock.price)}
                    </p>
                    <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Detail */}
        <div className="lg:col-span-2">
          {selectedStock && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedStock.symbol}
                    </h2>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm flex items-center gap-2">
                      {getSectorIcon(selectedStock.sector)}
                      {selectedStock.sector}
                    </span>
                  </div>
                  <p className="text-gray-500">{selectedStock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(selectedStock.price)}
                  </p>
                  <p className={`text-lg ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                  </p>
                </div>
              </div>

              {/* Stock Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">High</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(selectedStock.high)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Low</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(selectedStock.low)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Volume</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedStock.volume}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Change</p>
                  <p className={`font-semibold ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedStock.history}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} domain={['auto', 'auto']} />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={selectedStock.change >= 0 ? '#10b981' : '#ef4444'}
                      fill={selectedStock.change >= 0 ? '#10b981' : '#ef4444'}
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Disclaimer */}
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  <strong>Disclaimer:</strong> This is simulated data for demonstration purposes. 
                  Not for actual trading. Consult a financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;