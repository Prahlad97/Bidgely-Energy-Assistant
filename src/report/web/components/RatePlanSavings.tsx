import type { RatePlanSavingsSection, BehavioralTweakRow } from '../../types';

interface Props {
  section: RatePlanSavingsSection;
}

// Tier color tokens — must stay in sync with the rate-plan report's TOU bar
// and the optimizer's TOU chart.
const TIER_FILL: Record<'$' | '$$' | '$$$', string> = {
  '$': '#28C898',     // Web/Green/500 — off-peak
  '$$': '#FFD362',    // Web/Yellow/400 — mid-peak
  '$$$': '#FA96A8',   // Web/Red/400 — peak
};

const TONE_FILL: Record<'off-peak' | 'mid-peak' | 'peak', string> = {
  'off-peak': '#49BA84',  // matches Figma TOU chart segments (slightly darker green)
  'mid-peak': '#F2C94C',
  'peak':     '#FA96A8',
};

// Minimal inline SVG glyphs (subset of the TweaksGrid icons).
function TweakIcon({ kind }: { kind: BehavioralTweakRow['icon'] }) {
  switch (kind) {
    case 'cooling':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M14 3v22M5.5 8l17 12M5.5 20l17-12" />
          <path d="M14 7l-2 2m2-2l2 2M14 21l-2-2m2 2l2-2M9 11l-2.5-.7M9 11l-.7-2.5M19 11l2.5-.7M19 11l.7-2.5M9 17l-2.5.7M9 17l-.7 2.5M19 17l2.5.7M19 17l.7 2.5" />
        </svg>
      );
    case 'pool':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M3 18c2 1 3 -1 5 -1s3 2 5 2 3 -2 5 -2 3 1 5 1" />
          <path d="M3 22c2 1 3 -1 5 -1s3 2 5 2 3 -2 5 -2 3 1 5 1" />
          <path d="M14 4c0 4 -3 5 -3 8a3 3 0 006 0c0 -3 -3 -4 -3 -8z" />
        </svg>
      );
    case 'ev':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3v5M18 3v5M7 8h14v3a7 7 0 01-14 0V8z" />
          <path d="M14 18v3a3 3 0 003 3h0a3 3 0 003-3v-2" />
        </svg>
      );
  }
}

function PlanCallout({ section }: { section: RatePlanSavingsSection }) {
  const totalFr = section.importPeriods.reduce((s, p) => s + p.widthFr, 0) || 1;
  return (
    <div className="bg-[#CEF3DA] rounded-[14px] p-8 flex flex-row gap-10 w-full">
      {/* Left column — pill + plan name + description */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="self-start bg-[#14843C] rounded-[10px] px-3 py-1">
          <span className="text-[12px] leading-[16px] font-semibold text-white uppercase tracking-[0.02em]">
            {section.badge}
          </span>
        </div>
        <h3 className="text-[20px] leading-[24px] font-semibold text-black">
          {section.planName}
        </h3>
        <p className="text-[14px] leading-[20px] text-[#262E40]">
          {section.planDescription}
        </p>
      </div>

      {/* Right column — IMPORT bar */}
      <div className="flex-1 flex flex-col gap-2">
        <span className="text-[12px] leading-[16px] font-semibold text-black uppercase tracking-[0.02em]">
          {section.importLabel}
        </span>
        <div className="rounded-[10px] overflow-hidden flex flex-row gap-px h-[38px]">
          {section.importPeriods.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                background: TIER_FILL[p.tier],
                flex: `${p.widthFr / totalFr} 1 0`,
              }}
            >
              <span className="text-[12px] leading-[16px] font-semibold text-black">
                {p.tier}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-1 w-full">
          {section.importPeriods.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{ flex: `${p.widthFr / totalFr} 1 0` }}
            >
              <span className="text-[12px] leading-[16px] font-semibold text-black">
                {p.timeRange}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TouChart({ label, tiers }: { label: string; tiers: RatePlanSavingsSection['touTiers'] }) {
  const totalKwh = tiers.reduce((s, t) => s + t.kwh, 0);
  const totalUsd = tiers.reduce((s, t) => s + t.dollar, 0);
  const BAR_H = 168;
  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] px-8 py-6 w-full flex flex-col gap-4">
      {/* Title centered above the chart, like Figma 1497:11349 (text frame
          spans the chart width but is rendered centered). */}
      <span className="text-center text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase tracking-[0.02em]">
        {label}
      </span>

      <div className="flex flex-row items-stretch justify-center gap-12 w-full">
        {/* Left: kWh bar with labels on the LEFT side */}
        <div className="flex flex-row items-stretch gap-3">
          <div className="flex flex-col justify-between text-right" style={{ height: BAR_H }}>
            {tiers.map((t, i) => {
              const pct = (t.kwh / totalKwh) * 100;
              return (
                <div
                  key={i}
                  className="flex items-center justify-end text-[14px] leading-[20px] text-[#262E40]"
                  style={{ height: `${pct}%` }}
                >
                  {t.kwh.toLocaleString()} kWh
                </div>
              );
            })}
          </div>
          <div
            className="w-[25px] rounded-[6px] overflow-hidden flex flex-col gap-px"
            style={{ height: BAR_H }}
          >
            {tiers.map((t, i) => (
              <div
                key={i}
                style={{
                  flex: `${t.kwh / totalKwh} 1 0`,
                  background: TONE_FILL[t.tone],
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: $ bar with labels on the RIGHT side */}
        <div className="flex flex-row items-stretch gap-3">
          <div
            className="w-[26px] rounded-[6px] overflow-hidden flex flex-col gap-px"
            style={{ height: BAR_H }}
          >
            {tiers.map((t, i) => (
              <div
                key={i}
                style={{
                  flex: `${t.dollar / totalUsd} 1 0`,
                  background: TONE_FILL[t.tone],
                }}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between" style={{ height: BAR_H }}>
            {tiers.map((t, i) => {
              const pct = (t.dollar / totalUsd) * 100;
              return (
                <div
                  key={i}
                  className="flex items-center text-[14px] leading-[20px] text-[#262E40]"
                  style={{ height: `${pct}%` }}
                >
                  ${t.dollar.toLocaleString()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Far-right legend */}
        <div className="flex flex-col gap-1 self-center">
          {tiers.map((t, i) => (
            <div key={i} className="flex flex-row items-center gap-2">
              <span
                className="w-[9px] h-[9px] rounded-[1.3px]"
                style={{ background: TONE_FILL[t.tone] }}
              />
              <span className="text-[14px] leading-[20px] text-black">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TweakRow({ row }: { row: BehavioralTweakRow }) {
  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] p-6 flex flex-row items-center gap-6">
      {/* Icon column — colored to match the matter (cooling=teal, pool=blue, ev=violet) */}
      <div className="w-11 h-11 shrink-0 flex items-center justify-center text-[#262E40]">
        <TweakIcon kind={row.icon} />
      </div>

      {/* Content column */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h4 className="text-[18px] leading-[26px] font-semibold text-black">
            {row.title}
          </h4>
          <p className="text-[14px] leading-[20px] text-black">
            {row.description}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="bg-[#FCE7E5] text-[#9C0900] rounded-[6px] px-2 py-1 text-[12px] leading-[16px] font-semibold">
            {row.fromLabel}
          </span>
          <span className="text-[14px] leading-[20px] font-semibold text-[#66758D]">→</span>
          <span className="bg-[#CEF3DA] text-[#14843C] rounded-[6px] px-2 py-1 text-[12px] leading-[16px] font-semibold">
            {row.toLabel}
          </span>
        </div>
      </div>

      {/* Right: savings */}
      <span className="text-[18px] leading-[26px] font-semibold text-[#14843C] whitespace-nowrap">
        {row.savings}
      </span>
    </div>
  );
}

export function RatePlanSavings({ section }: Props) {
  return (
    <div className="bg-white px-8 pb-6 flex flex-col gap-4 w-full">
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase tracking-[0.02em]">
        {section.label}
      </span>

      <PlanCallout section={section} />

      <TouChart label={section.touChartLabel} tiers={section.touTiers} />

      <div className="flex flex-col gap-3 mt-2">
        {section.tweaks.map((row, i) => (
          <TweakRow key={i} row={row} />
        ))}
      </div>
    </div>
  );
}
