import React from 'react';
import Seo from './Seo';

const articles = [
  {
    title: 'How to choose the right SIP for your goals',
    summary: 'A step-by-step guide to matching your investment horizon and risk appetite with the right SIP strategy.',
    category: 'Investment',
    content: 'Systematic Investment Plans (SIPs) are one of the most effective ways to build wealth in India. Whether you\'re a beginner or experienced investor, choosing the right SIP requires understanding your financial goals, time horizon, and risk tolerance. Start by defining your goals - are you investing for retirement, your child\'s education, or wealth creation? Next, assess your risk appetite. If you\'re a conservative investor, consider balanced mutual funds or debt funds. For aggressive investors with 7+ years horizon, large-cap equity funds work well. The magic of SIPs lies in rupee-cost averaging, which reduces the impact of market volatility. Invest consistently every month regardless of market conditions, and let your investment grow. Use our SIP Calculator to estimate your potential returns and adjust your monthly contribution accordingly.',
  },
  {
    title: 'PPF, NPS, EPF: How to layer tax-saving investments',
    summary: 'A practical comparison of India\'s top tax-saving instruments and how to use them together.',
    category: 'Tax Planning',
    content: 'India offers several powerful tax-saving investment vehicles, and the key to maximizing tax efficiency is understanding how to layer them effectively. Public Provident Fund (PPF) offers guaranteed returns, is completely tax-free, and allows withdrawal after 7 years - ideal for conservative investors. National Pension System (NPS) provides high tax deductions (₹1.5 lakhs under Section 80C + ₹50,000 under Section 80CCD(1B)) and offers equity, debt, and government security options. Employee Provident Fund (EPF) is mandatory for salaried employees and provides employer matching contributions - it\'s forced discipline in saving. A smart strategy: Max out your NPS contributions first (₹50,000 + ₹1.5 lakhs = ₹2 lakhs benefit), use the remaining Section 80C limit with PPF (₹150,000), and if eligible, contribute additional ₹50,000 under 80CCD(1B). This layered approach gives you tax efficiency, diversification, and different maturity schedules for your financial goals.',
  },
  {
    title: 'Retirement planning calculator: What numbers matter most',
    summary: 'Learn which inputs drive retirement readiness and how to estimate your corpus accurately.',
    category: 'Retirement',
    content: 'Building a secure retirement requires more than saving - it requires precision. The most critical number is your "retirement corpus," which represents all the money you need for a comfortable post-work life. Key inputs to calculate this: (1) Current annual expenses - be honest about how much you actually spend, (2) Inflation rate - historical average is 5-6% in India, (3) Years in retirement - use 25-30 years as a baseline, (4) Investment returns post-retirement - be conservative, assume 6-7% for balanced portfolios. Once you know your target corpus, work backward: How much should you save each month to reach this goal? What rate of return do you need? When can you realistically retire? Use our Retirement Planner to model multiple scenarios - retire at 55, 60, or 65 and see how it impacts your lifestyle. The beauty of compound returns is that starting 10 years earlier can cut your required monthly savings in half. Build in a 20% buffer for emergencies, unexpected health costs, and legacy planning.',
  },
  {
    title: 'Emergency Fund: Your Financial Safety Net',
    summary: 'Why an emergency fund matters and how much you really need to save.',
    category: 'Savings',
    content: 'An emergency fund is non-negotiable in financial planning. It protects you from derailing your long-term investments when life happens - job loss, medical emergencies, home repairs, family obligations. How much is enough? Standard advice is 3-6 months of expenses, but in India\'s context, consider 6-12 months given variable income scenarios and healthcare costs. For salaried professionals: If your monthly expenses are ₹50,000, maintain ₹3-6 lakhs in liquid savings. For self-employed: Aim for ₹8-12 lakhs. Where should you keep it? Liquid funds earn 5-6% returns, offer same-day redemption, and are more profitable than savings accounts (3.5%). High-yield savings accounts or ultra-short-term funds also work. The key is accessibility - it should never be in locked investments or illiquid assets. Once your emergency fund is set, stop worrying about "rainy days" and invest your remaining savings aggressively for growth.',
  },
  {
    title: 'Insurance You Actually Need (And What To Skip)',
    summary: 'Cut through insurance confusion with a practical buying checklist.',
    category: 'Insurance',
    content: 'Insurance is protection, not investment. Many Indians over-insure with low returns while leaving critical gaps. Here\'s what you actually need: (1) Term Life Insurance - the most critical. Buy 10-15x your annual income as term cover. A 35-year-old earning ₹10 lakhs should have ₹1-1.5 crore term insurance costing ~₹400-600/month. (2) Health Insurance - catastrophic medical events can derail retirement. Get a family floater of ₹10-20 lakhs depending on dependents and age. (3) Disability Insurance - income protection if you can\'t work. Less common in India but essential for high earners. What to skip: Endowment policies (poor returns), investment-linked insurance (conflicting objectives), overlapping policies. Avoid insurance agents pushing high-premium "wealth creation" plans - you\'re better off separating insurance (protection) and investments (growth). Bundle health insurance with your employer if possible. Review policies annually and increase coverage as income grows.',
  },
  {
    title: 'Understanding Mutual Funds: Active vs Passive Investing',
    summary: 'Should you pick individual mutual funds or invest in index funds?',
    category: 'Investment',
    content: 'The active vs. passive debate in Indian investing is straightforward when you look at the data. Active mutual funds (where fund managers pick stocks) charge higher fees (1-2% annually) but underperform their benchmarks 70% of the time in India. Index funds and ETFs track benchmarks (Nifty 50, Sensex, Nifty Next 50) with minimal fees (0.1-0.3%). Here\'s the reality: After fees and taxes, most active funds don\'t beat passive alternatives over 10+ years. For beginners, start with index funds in your core portfolio (70-80% allocation) for stability. Allocate 20-30% to active funds if you want to experiment with emerging sectors or small-cap opportunities. Or better yet, pick 3-5 good active mutual funds and stick with them. The tax advantage of index funds is also significant - direct stocks in index funds may attract lower taxes than actively managed funds depending on your holding period. Most importantly, diversification, consistency, and time horizon matter far more than picking the "best" fund.',
  },
];

const Blog: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Seo
        title="Knowledge Hub"
        description="Explore FinCalcHub’s Knowledge Hub with practical finance guides, tool-based insights, and planning strategies for Indian users."
        url="https://fincalchub.com/blog"
      />
      <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Knowledge Hub</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-8">
          Discover practical guides, finance explainers, and tool-based insights that help you take action.
          The Knowledge Hub is built to support better money decisions with clear, SEO-optimised content.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article 
            key={article.title} 
            className="bg-slate-100 dark:bg-gray-900 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col h-full"
          >
            <div className="mb-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={{
                backgroundColor: getCategoryColor(article.category).bg,
                color: getCategoryColor(article.category).text,
              }}>
                {article.category}
              </span>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{article.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{article.summary}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow mb-4">{article.content.substring(0, 150)}...</p>
            <button className="px-4 py-2 rounded-lg font-medium transition-colors w-full text-center" style={{
              backgroundColor: getCategoryColor(article.category).bg,
              color: getCategoryColor(article.category).text,
            }}>
              Read Full Article →
            </button>
          </article>
        ))}
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stay updated</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-8 mb-4">
          Add your email to receive calculator updates, finance insights, and action-ready guides directly in your inbox.
        </p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

function getCategoryColor(category: string): { bg: string; text: string } {
  const colors: Record<string, { bg: string; text: string }> = {
    'Investment': { bg: '#dbeafe', text: '#1e40af' },
    'Tax Planning': { bg: '#dcfce7', text: '#15803d' },
    'Retirement': { bg: '#fef3c7', text: '#b45309' },
    'Savings': { bg: '#f3e8ff', text: '#7e22ce' },
    'Insurance': { bg: '#fee2e2', text: '#991b1b' },
  };
  return colors[category] || { bg: '#f3f4f6', text: '#374151' };
}

export default Blog;
