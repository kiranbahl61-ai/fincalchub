import React from 'react';
import Seo from './Seo';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Seo
        title="About"
        description="Learn how FinCalcHub helps Indian users plan wealth, manage tax, and make confident financial decisions."
        url="https://fincalchub.com/about"
      />
      <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About FinCalcHub</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-8">
          FinCalcHub is built to make financial planning simple, transparent, and actionable for every Indian household.
          We combine calculators, planning tools, and expert guidance so you can make smarter money decisions with confidence.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="bg-slate-100 dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To deliver clear, practical financial intelligence that helps users reach their goals faster and feel more secure.
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To become India’s trusted personal finance companion by combining data, educational content, and actionable recommendations.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Transparent guidance',
            description: 'We explain outcomes, assumptions, and next steps in plain language.',
          },
          {
            title: 'Practical tools',
            description: 'Tools are built for real financial decisions, not just formulas.',
          },
          {
            title: 'Responsible planning',
            description: 'We focus on protection, emergency readiness, and long-term growth together.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our story</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-8">
          FinCalcHub started as a wish to make finance feel less intimidating and more actionable.
          We saw too many users struggle with scattered calculators, confusing jargon, and financial goals that never felt within reach.
          Our website brings those pieces together with a clear path from intention to execution.
        </p>
      </section>
    </div>
  );
};

export default About;
