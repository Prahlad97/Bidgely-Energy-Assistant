'use client';

// Miraki MONTHLY_SUMMARY widget (Insights Monthly Summary V3) — portable UI
// without Redux; data from lib/data/insights.

import { APPLIANCE_BREAKDOWN, LATEST_CYCLE } from '@/lib/data/insights';

export default function MonthlySummaryWidget() {
  const size = 240;
  const stroke = 36;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;

  let acc = 0;
  const slices = APPLIANCE_BREAKDOWN.map((a) => {
    const fraction = a.kwh / LATEST_CYCLE.kwh;
    const dasharray = `${circ * fraction} ${circ}`;
    const dashoffset = -circ * acc;
    acc += fraction;
    return { ...a, dasharray, dashoffset };
  });

  return (
    <section className="miraki-widget">
      <div className="rounded-lg border border-[#eaedf6] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[18px] font-semibold text-[#2E384D]">
            Monthly Summary — {LATEST_CYCLE.label}
          </h2>
          <span className="text-[12px] text-[#66758D]">
            {LATEST_CYCLE.daysInCycle} days in cycle
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#f4f6fa"
                strokeWidth={stroke}
              />
              {slices.map((s) => (
                <circle
                  key={s.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={stroke}
                  strokeDasharray={s.dasharray}
                  strokeDashoffset={s.dashoffset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[11px] uppercase tracking-wide text-[#66758D]">Total</p>
              <p className="text-[24px] font-bold text-[#2E384D]">
                {LATEST_CYCLE.kwh}{' '}
                <span className="text-[14px] font-normal text-[#66758D]">kWh</span>
              </p>
              <p className="mt-0.5 text-[14px] font-semibold text-[#1f9b6a]">
                ${LATEST_CYCLE.cost.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-[14px]">
                <thead>
                  <tr className="border-b border-[#eaedf6] text-[12px] uppercase tracking-wide text-[#66758D]">
                    <th className="py-2 pr-2 text-left font-semibold">Appliance</th>
                    <th className="py-2 px-2 text-right font-semibold">kWh</th>
                    <th className="py-2 px-2 text-right font-semibold">Cost</th>
                    <th className="py-2 pl-2 text-right font-semibold">% of bill</th>
                  </tr>
                </thead>
                <tbody>
                  {APPLIANCE_BREAKDOWN.map((a) => (
                    <tr key={a.name} className="border-b border-[#f4f6fa] text-[#2E384D]">
                      <td className="py-2 pr-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{ backgroundColor: a.color }}
                            aria-hidden="true"
                          />
                          {a.name}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right tabular-nums">{a.kwh}</td>
                      <td className="py-2 px-2 text-right tabular-nums">${a.cost.toFixed(2)}</td>
                      <td className="py-2 pl-2 text-right tabular-nums text-[#66758D]">
                        {a.pctOfTotal}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded border border-[#eaedf6] bg-[#FBFBFC] p-4 text-[13px] text-[#66758D]">
          <p className="text-[#2E384D]">
            <span className="font-semibold">How is this calculated?</span> Appliance itemization
            is derived from your meter signal. Per-appliance numbers are estimates with a typical
            accuracy band of ±10%.
          </p>
        </div>
      </div>
    </section>
  );
}
