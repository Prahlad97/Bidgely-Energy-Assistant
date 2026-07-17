'use client';

import React from 'react';

const tabs = [
  { label: 'Home', icon: '/navbar/home.svg', active: true },
  { label: 'Energy Insights', icon: '/navbar/insights.svg', active: false },
  { label: 'My Recommendations', icon: '/navbar/reco.svg', active: false, badge: 2 },
  { label: 'My Home Survey', icon: '/navbar/survey.svg', active: false },
  { label: 'FAQs', icon: '/navbar/faq.svg', active: false },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-[0px_0px_1px_0px_rgba(40,41,61,0.08),0px_0.5px_2px_0px_rgba(96,97,112,0.16)]">
      <div className="mx-auto h-14 w-full max-w-[1440px] px-7 flex items-center justify-between">
        {/* Logo pill */}
        <div className="flex items-center">
          <div className="flex items-center gap-2 h-[36px] px-3 rounded-full bg-[#125aaa] text-white">
            <img src="/navbar/bulb.svg" alt="" className="h-[25px] w-[24px]" />
            <img src="/navbar/energyco.svg" alt="Energy Co." className="h-[17px] w-[83px]" />
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.label}
              type="button"
              className={`flex items-center gap-1 p-2 rounded text-[14px] font-normal whitespace-nowrap ${
                t.active ? 'bg-[#186cdd] text-white' : 'text-[#262e40] hover:bg-[#f3f6fb]'
              }`}
            >
              <img src={t.icon} alt="" className="h-[14px] w-[14px]" />
              <span>{t.label}</span>
              {t.badge != null && (
                <span className="flex items-center justify-center h-[14px] min-w-[14px] px-[3px] rounded-full bg-[#df0d00] text-white text-[10px] font-bold leading-none">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Menu"
            className="w-6 h-6 flex flex-col justify-center gap-[4px] text-[#262e40]"
          >
            <span className="block h-[2px] w-6 bg-current rounded-full" />
            <span className="block h-[2px] w-6 bg-current rounded-full" />
            <span className="block h-[2px] w-6 bg-current rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
