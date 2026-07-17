// ProjectedBillCard — the core "bill projection" visual.
//
// Used in two places:
//   • Home dashboard's <ProjectedBill /> section (with surrounding heading + See more)
//   • Inline chat answer for "What's my bill going to look like next month?"
//
// Pure presentational. Pass `showSeeMore={false}` from the chat surface so the
// widget reads as an answer, not a teaser into another page.

import React from 'react';

interface Props {
  /** $ accrued so far this month. */
  current?: number;
  /** Forecasted $ at month-end. */
  projected?: number;
  /** Where to position the current pill along the track (0–100). Default 22. */
  progressPct?: number;
  /** Show the outlined "See more" button at the bottom. Default true (home page). */
  showSeeMore?: boolean;
  /** Optional onClick for "See more" when shown. */
  onSeeMore?: () => void;
}

export default function ProjectedBillCard({
  current = 47,
  projected = 165,
  progressPct = 22,
  showSeeMore = true,
  onSeeMore,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-[#eaedf6] p-6 w-full">
      <div className="flex items-center justify-between">
        <span className="text-[18px] font-semibold text-[#1e232e]">Projected Bill</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#1d6cdb" strokeWidth="1.5" />
          <path d="M12 11v5" stroke="#1d6cdb" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="8" r="1" fill="#1d6cdb" />
        </svg>
      </div>

      {/* Track */}
      <div className="relative mt-12 h-[60px]">
        <div className="absolute left-0 right-0 top-[26px] h-[10px] rounded-full bg-[#eaedf6]" />
        <div
          className="absolute left-0 top-[26px] h-[10px] rounded-full bg-[#1d6cdb]"
          style={{ width: `${progressPct}%` }}
        />

        {/* Current pill */}
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center justify-center w-[83px] h-[60px] rounded-md bg-[#1d6cdb] text-white shadow-md"
          style={{ left: `${progressPct}%`, top: 0 }}
        >
          <span className="text-[18px] font-bold leading-none">${current}</span>
          <span className="mt-1 text-[9px] font-semibold tracking-wider">CURRENT</span>
          <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#1d6cdb]" />
        </div>

        {/* Projected pill */}
        <div className="absolute right-0 top-0 flex flex-col items-center justify-center w-[83px] h-[60px] rounded-md bg-[#1e232e] text-white shadow-md">
          <span className="text-[18px] font-bold leading-none">${projected}</span>
          <span className="mt-1 text-[9px] font-semibold tracking-wider">PROJECTED</span>
          <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#1e232e]" />
        </div>
      </div>

      {showSeeMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={onSeeMore}
            className="h-9 px-8 rounded-md border border-[#1d6cdb] text-[#1d6cdb] text-[13px] font-medium hover:bg-[#e8f0fc] transition-colors"
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
}
