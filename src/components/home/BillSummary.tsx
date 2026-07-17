import React from 'react';

const charges = [
  { label: 'Energy Usage Charges', value: '$115' },
  { label: 'Demand Charges', value: '$38' },
  { label: 'Fixed Charges', value: '$4' },
  { label: 'Other Charges', value: '$3' },
];

export default function BillSummary() {
  return (
    <div className="bg-white rounded-xl border border-[#eaedf6] p-6 h-full">
      <h3 className="text-[15px] font-semibold text-[#1e232e]">Bill Summary</h3>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#f4f6fa] p-4">
          <div className="text-[10px] font-semibold tracking-wider text-[#616f89]">ENERGY USAGE</div>
          <div className="mt-2 text-[24px] font-bold text-[#1e232e] leading-none">870 kWh</div>
          <div className="mt-2 text-[11px] text-[#616f89]">
            <span className="text-[#616f89]">↓ 3%</span> vs previous month
          </div>
        </div>
        <div className="rounded-lg bg-[#f4f6fa] p-4">
          <div className="text-[10px] font-semibold tracking-wider text-[#616f89]">TOTAL BILL</div>
          <div className="mt-2 text-[24px] font-bold text-[#1e232e] leading-none">$160</div>
          <div className="mt-2 text-[11px] text-[#616f89]">
            <span className="text-[#616f89]">↑ 2%</span> vs previous month
          </div>
        </div>
      </div>

      <ul className="mt-6 divide-y divide-[#eaedf6]">
        {charges.map((c) => (
          <li
            key={c.label}
            className="flex items-center justify-between py-3 text-[13px]"
          >
            <span className="text-[#1e232e]">{c.label}</span>
            <span className="font-semibold text-[#1e232e]">{c.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
