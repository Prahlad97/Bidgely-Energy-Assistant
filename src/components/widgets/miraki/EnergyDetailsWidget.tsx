'use client';

// Miraki USAGE / Energy Details widget — 13-month usage chart (Insights Usage V2).

import { useState } from 'react';
import { MONTHLY_USAGE } from '@/lib/data/insights';

export default function EnergyDetailsWidget() {
  const [unit, setUnit] = useState<'kwh' | 'cost'>('kwh');

  const data = MONTHLY_USAGE;
  const max =
    unit === 'kwh'
      ? Math.max(...data.map((d) => d.kwh))
      : Math.max(...data.map((d) => d.cost));

  const step = unit === 'kwh' ? 250 : 50;
  const ymax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= ymax; v += step) ticks.push(v);

  const chartHeight = 280;

  return (
    <section className="miraki-widget">
      <div className="rounded-lg border border-[#eaedf6] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-[#2E384D]">Last 13 Months</h2>
            <p className="mt-0.5 text-[13px] text-[#66758D]">
              Each bar is one billing cycle. Hover for details.
            </p>
          </div>
          <div
            role="group"
            aria-label="Usage unit"
            className="flex rounded-full border border-[#cdd5e2] p-0.5"
          >
            {(['kwh', 'cost'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={[
                  'h-7 rounded-full px-3 text-[12px] transition-colors',
                  unit === u
                    ? 'bg-[#1d6cdb] text-white font-semibold'
                    : 'text-[#66758D] hover:text-[#2E384D]',
                ].join(' ')}
              >
                {u === 'kwh' ? 'kWh' : 'Cost ($)'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex">
          <div className="relative w-12 shrink-0" style={{ height: chartHeight + 28 }}>
            {ticks.map((t) => {
              const y = chartHeight - (t / ymax) * chartHeight;
              return (
                <div
                  key={t}
                  className="absolute right-2 text-[11px] text-[#66758D]"
                  style={{ top: y - 7 }}
                >
                  {unit === 'kwh' ? t : `$${t}`}
                </div>
              );
            })}
          </div>

          <div className="relative flex-1 overflow-x-auto pb-7">
            <div className="absolute inset-x-0 top-0" style={{ height: chartHeight }}>
              {ticks.map((t) => {
                const y = chartHeight - (t / ymax) * chartHeight;
                return (
                  <div
                    key={t}
                    className="absolute inset-x-0 border-t border-dashed border-[#eaedf6]"
                    style={{ top: y }}
                  />
                );
              })}
            </div>

            <div
              className="relative flex items-end gap-2 pl-2 pr-2"
              style={{ height: chartHeight }}
            >
              {data.map((d, i) => {
                const v = unit === 'kwh' ? d.kwh : d.cost;
                const h = (v / ymax) * chartHeight;
                const isPartial = i === data.length - 1;
                return (
                  <div
                    key={d.month}
                    className="group relative flex w-7 flex-col items-center"
                    style={{ height: chartHeight }}
                  >
                    <div className="flex flex-1 items-end">
                      <div
                        className={[
                          'w-7 rounded-t bg-[#1d6cdb] transition-colors',
                          isPartial ? 'opacity-50' : 'group-hover:bg-[#1a4fbb]',
                        ].join(' ')}
                        style={{ height: h }}
                        aria-label={`${d.month}: ${unit === 'kwh' ? `${d.kwh} kWh` : `$${d.cost.toFixed(2)}`}`}
                      />
                    </div>
                    <div className="pointer-events-none absolute bottom-full mb-1 hidden rounded bg-[#2E384D] px-2 py-1 text-[11px] whitespace-nowrap text-white shadow-[0_2px_6px_rgba(16,24,40,0.16)] group-hover:block">
                      <div className="font-semibold">{d.month}</div>
                      <div>
                        {d.kwh} kWh · ${d.cost.toFixed(2)}
                      </div>
                      {isPartial && (
                        <div className="text-[10px] text-[#cdd5e2]">Cycle in progress</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 pl-2 pr-2 pt-1">
              {data.map((d) => (
                <div key={d.month} className="w-7 text-center text-[11px] text-[#66758D]">
                  {d.shortMonth}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="12-month total">
            {data.slice(0, 12).reduce((s, d) => s + d.kwh, 0).toLocaleString()} kWh
          </Stat>
          <Stat label="12-month spend">
            ${data.slice(0, 12).reduce((s, d) => s + d.cost, 0).toFixed(2)}
          </Stat>
          <Stat label="Average / month">
            {Math.round(data.slice(0, 12).reduce((s, d) => s + d.kwh, 0) / 12).toLocaleString()}{' '}
            kWh
          </Stat>
          <Stat label="Highest month">
            {data.slice(0, 12).reduce((m, d) => (d.kwh > m.kwh ? d : m), data[0]).shortMonth}
          </Stat>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded border border-[#eaedf6] bg-[#FBFBFC] p-3">
      <p className="text-[11px] uppercase tracking-wide text-[#66758D]">{label}</p>
      <p className="mt-1 text-[16px] font-semibold text-[#2E384D]">{children}</p>
    </div>
  );
}
