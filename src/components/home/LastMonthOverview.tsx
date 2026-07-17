import React from 'react';
import BillSummary from './BillSummary';
import EnergyByAppliance from './EnergyByAppliance';

export default function LastMonthOverview() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-[#1e232e]">Last Month Overview</h2>
        <span className="text-[13px] text-[#616f89]">Jun 26, 2021 — Jul 26, 2021</span>
      </div>

      {/* Weather strip */}
      <div className="flex items-center gap-2 h-[34px] px-4 rounded-md bg-[#1d6cdb] text-white text-[13px]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
            fill="#fff"
          />
        </svg>
        <span>
          <span className="font-semibold">Mountain View, California</span>
          <span className="mx-2 opacity-50">—</span>
          +5&deg;F hotter last month, leading to a 3% increase in Cooling
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <BillSummary />
        <EnergyByAppliance />
      </div>
    </section>
  );
}
