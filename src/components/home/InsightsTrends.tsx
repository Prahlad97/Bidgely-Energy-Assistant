import React from 'react';
import BillHistory from './BillHistory';
import Recommendations from './Recommendations';

export default function InsightsTrends() {
  return (
    <section className="w-full">
      <h2 className="text-[18px] font-semibold text-[#1e232e] mb-4">Insights &amp; Trends</h2>
      <div className="grid grid-cols-2 gap-6">
        <BillHistory />
        <Recommendations />
      </div>
    </section>
  );
}
