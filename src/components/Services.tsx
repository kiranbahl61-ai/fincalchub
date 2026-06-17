import React from 'react';
import Seo from './Seo';

const serviceItems = [
  {
    title: 'Financial Planning Toolkit',
    description: 'A complete set of calculators and planning guides for every stage of life.',
  },
  {
    title: 'Personal Finance GPS™',
    description: 'A tailored financial health check, gap analysis, and action roadmap.',
  },
  {
    title: 'Goal Planning & Retirement',
    description: 'Use our calculators to map retirement, education, and wealth goals with clarity.',
  },
  {
    title: 'Tax Optimization Insights',
    description: 'Discover tax-saving strategies and investment allocations that work for your situation.',
  },
  {
    title: 'Insurance Protection Review',
    description: 'Assess your coverage gaps for health, life, and emergency protection.',
  },
];

const Services: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Seo
        title="Services"
        description="FinCalcHub provides intelligent tools, planning guides, and practical support for financial decision-making in India."
        url="https://fincalchub.com/services"
      />
      <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Services & Solutions</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-8">
          FinCalcHub provides intelligent tools, actionable analysis, and clear next steps for your finance journey.
          Whether you are saving, investing, protecting, or planning for retirement, our platform helps you move forward.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {serviceItems.map((item) => (
          <div key={item.title} className="bg-slate-100 dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How we present value</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Clarity first</h3>
            <p className="text-gray-600 dark:text-gray-300">Every service is described in everyday language, with assumptions and next steps made explicit.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Action-oriented advice</h3>
            <p className="text-gray-600 dark:text-gray-300">Tools do more than calculate — they point you to what to do next and how to improve your financial health.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Built for Indian finances</h3>
            <p className="text-gray-600 dark:text-gray-300">We focus on the needs of Indian users with tax-aware, goal-based financial planning.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
