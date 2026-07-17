'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const slices = [
  { label: 'Cooling', value: 49, color: '#1d6cdb' },
  { label: 'EV Charging', value: 38, color: '#5bd584' },
  { label: 'Water Heating', value: 14, color: '#f08a2a' },
  { label: 'Always On', value: 11, color: '#c5b8e8' },
  { label: 'Other Appliances', value: 9, color: '#3a4a6b', isLink: true },
  { label: 'Other Charges', value: 4, color: '#cfd5dd', subtext: '(fixed charges and taxes)' },
];

export default function EnergyByAppliance() {
  const data = {
    labels: slices.map((s) => s.label),
    datasets: [
      {
        data: slices.map((s) => s.value),
        backgroundColor: slices.map((s) => s.color),
        borderColor: '#fff',
        borderWidth: 2,
        spacing: 0,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl border border-[#eaedf6] p-6 h-full flex flex-col">
      <div className="flex items-start justify-between">
        <h3 className="text-[15px] font-semibold text-[#1e232e]">Your Energy Use By Appliance</h3>
        <button
          type="button"
          aria-label="Info"
          className="w-7 h-7 rounded-full border border-[#eaedf6] flex items-center justify-center text-[#1d6cdb]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-6 mt-4 flex-1">
        <div className="relative w-[180px] h-[180px] flex-shrink-0">
          <Doughnut
            data={data}
            options={{
              cutout: '72%',
              plugins: { legend: { display: false }, tooltip: { enabled: true } },
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[24px] font-bold text-[#1e232e] leading-none">$160</span>
          </div>
        </div>

        <ul className="flex-1 space-y-2.5">
          {slices.map((s) => (
            <li key={s.label} className="flex items-baseline gap-2 text-[13px]">
              <span
                className="inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <div className="flex-1">
                <span className="text-[#1e232e] font-medium">${s.value} </span>
                {s.isLink ? (
                  <a href="#" className="text-[#1d6cdb] underline">
                    {s.label}
                  </a>
                ) : (
                  <span className="text-[#1e232e]">{s.label}</span>
                )}
                {s.subtext && (
                  <div className="text-[11px] text-[#9a9a9a] leading-tight mt-0.5">{s.subtext}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[11px] text-[#9a9a9a] leading-snug mt-5">
        Appliance Energy charges don&apos;t include taxes, fixed charges, rebates, or credits, and
        therefore may be different than your total bill amount.
      </p>

      <div className="flex items-center justify-between mt-4 -mx-6 -mb-6 px-6 py-3 bg-[#f4f6fa] rounded-b-xl border-t border-[#eaedf6]">
        <span className="text-[12px] text-[#616f89]">Seeing incorrect data?</span>
        <button
          type="button"
          className="h-8 px-3 rounded-md border border-[#1d6cdb] text-[#1d6cdb] text-[12px] font-medium hover:bg-[#dbe7fe] transition-colors"
        >
          Personalize your home profile
        </button>
      </div>
    </div>
  );
}
