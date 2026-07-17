import type { HourlyProfileSection } from '../../types';

interface Props {
  section: HourlyProfileSection;
}

const KPI_SURFACE: Record<HourlyProfileSection['kpis'][number]['tone'], { bg: string; border: string; value: string }> = {
  solar: { bg: '#FFF7ED', border: '#FED7AA', value: '#F59E0B' },
  usage: { bg: '#EFF6FF', border: '#BFDBFE', value: '#186CDD' },
  green: { bg: '#F0FDF4', border: '#BBF7D0', value: '#10B981' },
};

const LEGEND_SWATCH: Record<'orange' | 'blue' | 'green', string> = {
  orange: '/solar-hourly/legend_orange.svg',
  blue: '/solar-hourly/legend_blue.svg',
  green: '/solar-hourly/legend_green.png',
};

// HourlyProfile — tabbed usage/generation chart (Figma solar report). The
// area-chart layers are pre-rendered illustrative SVGs ported verbatim from
// the design export and stacked with the same absolute top-offsets, so the
// curve shapes match pixel-for-pixel.
export function HourlyProfile({ section }: Props) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[20px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.04)] p-10 flex flex-col gap-6 w-full">
      <p className="text-[12px] leading-[16px] font-semibold text-[#262E40]">{section.label}</p>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {section.tabs.map((tab, i) => (
          <span
            key={tab}
            className={`rounded-full px-4 py-2 text-[13px] ${
              i === 0 ? 'bg-[#186CDD] border border-[#186CDD] text-white font-semibold' : 'border border-[#EFEFEF] text-[#66758D] font-medium'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Month pills */}
      <div className="flex gap-1 w-full">
        {section.months.map((m) => (
          <span
            key={m}
            className={`flex-1 text-center rounded-2xl py-1.5 px-1 text-[13px] ${
              m === section.activeMonth ? 'bg-[#186CDD] border border-[#186CDD] text-white font-semibold' : 'border border-[#DFDFE0] text-[#66758D]'
            }`}
          >
            {m}
          </span>
        ))}
      </div>

      <p className="text-[12px] text-[#66758D]">{section.subtext}</p>

      {/* KPI row */}
      <div className="flex gap-3">
        {section.kpis.map((kpi) => {
          const s = KPI_SURFACE[kpi.tone];
          return (
            <div
              key={kpi.label}
              className="flex-1 rounded-xl p-3 flex flex-col items-center gap-1 border"
              style={{ background: s.bg, borderColor: s.border }}
            >
              <p className="text-[18px] font-bold m-0" style={{ color: s.value }}>{kpi.value}</p>
              <p className="text-[12px] text-[#66758D] m-0">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Area chart — layered pre-rendered SVGs, same offsets as reference */}
      <div className="flex gap-3" style={{ height: 240 }}>
        <div className="flex flex-col justify-between text-[12px] text-[#66758D] text-right" style={{ height: 200 }}>
          {section.yAxisLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="relative w-full" style={{ height: 200 }}>
            {[0, 50, 100, 150, 199].map((top) => (
              <div key={top} className="absolute left-0 w-full h-px bg-[#EFEFEF]" style={{ top }} />
            ))}
            <div className="absolute left-0 w-full" style={{ top: 100 }}>
              <img src="/solar-hourly/hourly_orange_fill.svg" alt="" className="w-full block" />
            </div>
            <div className="absolute left-0 w-full" style={{ top: 100 }}>
              <img src="/solar-hourly/hourly_orange_line.svg" alt="" className="w-full block" />
            </div>
            <div className="absolute left-0 w-full" style={{ top: 47 }}>
              <img src="/solar-hourly/hourly_blue_fill.svg" alt="" className="w-full block" />
            </div>
            <div className="absolute left-0 w-full" style={{ top: 47 }}>
              <img src="/solar-hourly/hourly_blue_line.svg" alt="" className="w-full block" />
            </div>
            <div className="absolute left-0 w-full" style={{ top: 19 }}>
              <img src="/solar-hourly/hourly_green_fill.svg" alt="" className="w-full block" />
            </div>
            <div className="absolute left-0 w-full" style={{ top: 19 }}>
              <img src="/solar-hourly/hourly_green_line.svg" alt="" className="w-full block" />
            </div>
          </div>
          <div className="flex justify-between text-[12px] text-[#66758D]">
            {section.xAxisLabels.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 justify-center">
        {section.legend.map((item) => (
          <div key={item.label} className="flex gap-2 items-center">
            <img src={LEGEND_SWATCH[item.swatch]} alt="" className="w-4 h-4" />
            <span className="text-[12px] text-[#66758D]">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Footer notes */}
      <div className="border-t border-[#E5E7EB] pt-4 flex gap-5 flex-wrap">
        {section.footerNotes.map((note, i) => (
          <div key={i} className="flex gap-1.5 items-center text-[12px] text-[#66758D]">
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}
