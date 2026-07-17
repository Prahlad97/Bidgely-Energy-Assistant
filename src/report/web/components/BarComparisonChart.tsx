import type { BarComparisonSection } from '../../types';

interface Props {
  section: BarComparisonSection;
}

const CHART_AREA_PX = 200;        // pixel height available for bars
const MIN_VISIBLE_PX = 6;         // tiny sliver if value > 0 but ratio is near zero

// BarComparisonChart — white card with a subtle Web/Background/400 1px stroke,
// NO drop shadow. Bars have NO shadow. The smaller (savings) bar value uses
// Webapp/H2 (20/24 SemiBold) Web/Green/600; the larger (today) value uses
// Webapp/Label/LL/Bold (18/26 SemiBold) Foreground/700.
export function BarComparisonChart({ section }: Props) {
  const maxValue = Math.max(...section.items.map((i) => i.value));

  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] p-8 w-full flex flex-col items-center gap-6">
      {/* Title — Webapp/Label/XS/Bold (12/16 SemiBold) Foreground/500 */}
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase">
        {section.title}
      </span>

      <div className="relative flex items-end justify-center gap-16 w-full" style={{ height: CHART_AREA_PX + 40 }}>
        {/* Gridlines — 2 faint horizontal lines + a slightly darker baseline */}
        <div className="absolute left-0 right-0 top-0 h-px bg-[#EFEFEF]" />
        <div className="absolute left-0 right-0 h-px bg-[#EFEFEF]" style={{ top: CHART_AREA_PX * 0.36 }} />
        <div className="absolute left-0 right-0 h-px bg-[#262E40] opacity-15" style={{ top: CHART_AREA_PX }} />

        {section.items.map((item) => {
          const ratio = maxValue > 0 ? item.value / maxValue : 0;
          const barPx = item.value === 0
            ? 0
            : Math.max(MIN_VISIBLE_PX, Math.round(ratio * CHART_AREA_PX));
          const isMax = item.value === maxValue;
          return (
            <div key={item.label} className="relative flex flex-col items-center gap-2">
              {/* Value — max = Label/LL/Bold (18/26) FG/700; min = H2 (20/24) Green/700 */}
              {isMax ? (
                <span className="text-[18px] leading-[26px] font-semibold mb-1 text-[#000000]">
                  {item.displayValue}
                </span>
              ) : (
                <span
                  className="text-[20px] leading-[24px] font-semibold mb-1"
                  style={{ color: item.valueColor ?? '#14843C' }}
                >
                  {item.displayValue}
                </span>
              )}
              <div
                className="w-28 rounded-[6px]"
                style={{
                  height: `${barPx}px`,
                  backgroundColor: item.color,
                }}
              />
              {/* Label — Webapp/Label/XS/Regular (12/16) Foreground/500 */}
              <span className="text-[12px] leading-[16px] font-normal text-[#262E40] mt-1">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
