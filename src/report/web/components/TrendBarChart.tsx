import type { TrendBarChartSection } from '../../types';

interface Props {
  section: TrendBarChartSection;
}

const TONE_COLOR: Record<'purple' | 'orange' | 'blue', string> = {
  purple: '#B8B8FF',
  orange: '#FFDC9B',
  blue: '#125AAA',
};

const TONE_LABEL_BG: Record<'purple' | 'orange' | 'blue', string> = {
  purple: 'rgba(184,184,255,0.25)',
  orange: 'rgba(255,220,155,0.25)',
  blue: 'rgba(155,175,255,0.1)',
};

const NEUTRAL = '#CBD5E1';

// TrendBarChart — 13-month bar chart with 3 highlighted bars (same-time-
// previous-year / previous-bill-cycle / analyzed-cycle) and a bottom legend.
export function TrendBarChart({ section }: Props) {
  const max = Math.max(...section.points.map((p) => p.value), 1);
  const CHART_H = 140;

  return (
    <div className="bg-white border border-[#E7E7E7] rounded-[10px] p-6 flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center justify-between gap-3">
        <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase">
          {section.label}
        </span>
        {section.rightCaption && (
          <span className="text-[12px] leading-[16px] text-[#928DA9] text-right">{section.rightCaption}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row items-end gap-[6px] w-full" style={{ height: CHART_H + 24 }}>
          {section.points.map((p, i) => {
            const h = Math.max((p.value / max) * CHART_H, 4);
            const color = p.tone ? TONE_COLOR[p.tone] : NEUTRAL;
            return (
              <div key={i} className="flex-1 min-w-0 flex flex-col items-center justify-end" style={{ height: CHART_H + 24 }}>
                {p.displayValue ? (
                  <span
                    className="mb-1 px-1 rounded text-[12px] leading-[16px] whitespace-nowrap"
                    style={{
                      background: p.tone ? TONE_LABEL_BG[p.tone] : undefined,
                      fontWeight: p.tone === 'blue' ? 600 : 400,
                      color: p.tone === 'blue' ? '#001366' : '#1C1C1E',
                    }}
                  >
                    {p.displayValue}
                  </span>
                ) : (
                  <span className="mb-1 h-4" />
                )}
                <div className="w-[22px] rounded-[4px]" style={{ height: h, background: color }} />
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-[6px] w-full text-center">
          {section.points.map((p, i) => (
            <div
              key={i}
              className={`flex-1 min-w-0 text-[12px] leading-[16px] ${p.boldLabel ? 'font-bold text-[#0B1220]' : 'text-[#928DA9]'}`}
            >
              {p.label}
              {p.yearSuffix && <span className="block">{p.yearSuffix}</span>}
            </div>
          ))}
        </div>
      </div>

      {section.legend && (
        <div className="flex flex-row gap-4 items-center justify-center">
          {section.legend.map((item, i) => (
            <div key={i} className="flex flex-row items-center gap-1.5">
              <span className="w-3 h-3 rounded" style={{ background: TONE_COLOR[item.tone] }} />
              <span className="text-[12px] leading-[16px] text-[#928DA9]">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {section.insight && (
        <div className="bg-[#F3F8FD] rounded-[10px] p-6">
          <p className="text-[14px] leading-[20px] text-[#262E40]">{section.insight}</p>
        </div>
      )}
    </div>
  );
}
