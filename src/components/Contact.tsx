import React, { useState } from 'react';
import Seo from './Seo';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Seo
        title="Contact"
        description="Get in touch with FinCalcHub for calculator support, financial planning questions, or partnership inquiries."
        url="https://fincalchub.com/contact"
      />
      <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact & Support</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Need help with tools, planning, or your finance questions? Send us a message and we’ll respond quickly.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-6">
            <p className="text-emerald-700 dark:text-emerald-100 font-semibold">Thanks! Your message has been received.</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">We will reply within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input type="text" required className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input type="email" required className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What can we help you with?</label>
              <select required className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white">
                <option>General question</option>
                <option>Calculator support</option>
                <option>Financial planning</option>
                <option>Partnership inquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea required rows={5} className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white" />
            </div>
            <button type="submit" className="rounded-2xl bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 font-semibold">Send message</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Contact;
