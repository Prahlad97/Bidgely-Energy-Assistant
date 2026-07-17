import type { CostComparisonBarSection } from '../../types';

interface Props {
  section: CostComparisonBarSection;
}

const CHART_AREA_PX = 280;        // total chart height (matches Figma 600x280)
const MIN_VISIBLE_PX = 18;        // minimum height for any visible segment

// CostComparisonBar — two stacked bars side-by-side comparing dollar totals.
// Used by the EV report ("With Gasoline Car" vs "With EV"). Each column has
// segments stacked bottom-up; per-segment dollar text sits inside the
// segment, the column total above the bar, and the column label below.
//
// White card surface with the same Web/Background/400 1px stroke and no
// shadow used by other report cards. The optional insight callout below
// the chart uses Web/Primary/200 (#F3F8FD) surface with Web/Primary/700
// (#0C366F) body text, matching Figma 1476:9502.
export function CostComparisonBar({ section }: Props) {
  // Determine the tallest column to scale all segment heights against.
  const columnTotals = section.columns.map((c) =>
    c.segments.reduce((s, seg) => s + seg.value, 0)
  );
  const maxColumnTotal = Math.max(...columnTotals);

  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] p-8 w-full flex flex-col gap-6">
      {/* Title — Webapp/Label/XS/Bold (12/16 SemiBold) Foreground/500 */}
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase">
        {section.title}
      </span>

      {/* Chart area — bars centered, legend on the right */}
      <div className="flex gap-6 items-end">
        {/* Bars + their column labels — `justify-center` keeps the two bars
            optically centered within the chart area instead of pinned left,
            matching Figma 1476:9476 layout. */}
        <div className="flex items-end justify-center gap-12 flex-1">
          {section.columns.map((column) => {
            const colTotal = column.segments.reduce((s, seg) => s + seg.value, 0);
            const stackPx = maxColumnTotal > 0
              ? Math.round((colTotal / maxColumnTotal) * CHART_AREA_PX)
              : 0;
            return (
              <div key={column.label} className="flex flex-col items-center gap-2 shrink-0">
                {/* Total above the bar — Webapp/Label/LL/Bold (18/26 SemiBold) FG/700 */}
                <span className="text-[18px] leading-[26px] font-semibold text-[#000000]">
                  {column.total}
                </span>

                {/* Stacked bar — width 140px, segments sit bottom-up so the
                    first item in `segments` is the bottom-most segment. */}
                <div
                  className="w-[140px] flex flex-col-reverse overflow-hidden rounded-[6px]"
                  style={{ height: `${stackPx}px` }}
                >
                  {column.segments.map((seg, idx) => {
                    const ratio = colTotal > 0 ? seg.value / colTotal : 0;
                    const px = seg.value === 0
                      ? 0
                      : Math.max(MIN_VISIBLE_PX, Math.round(ratio * stackPx));
                    return (
                      <div
                        key={idx}
                        className="w-full flex items-center justify-center"
                        style={{ height: `${px}px`, backgroundColor: seg.color }}
                      >
                        {/* Per-segment dollar — Webapp/Label/XS/Bold (12/16 SemiBold) white */}
                        <span className="text-[12px] leading-[16px] font-semibold text-white">
                          {seg.displayValue}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Column label — Webapp/Label/XS/Regular (12/16) Foreground/500 */}
                <span className="text-[12px] leading-[16px] font-normal text-[#262E40] mt-1">
                  {column.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend — gap 12 vertical, gap 8 between dot and label */}
        <div className="flex flex-col gap-3 shrink-0 mb-8">
          {section.legend.map((item) => (
            <div key={item.label} className="flex gap-2 items-center">
              <div
                className="w-4 h-4 rounded-[4px] shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[12px] leading-[16px] font-normal text-[#262E40]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Optional insight callout — Web/Primary/200 surface, Web/Primary/700 body */}
      {section.insight && (
        <div className="bg-[#F3F8FD] rounded-[10px] p-6 w-full">
          <p className="text-[14px] leading-[20px] font-normal text-[#0C366F]">
            {section.insight}
          </p>
        </div>
      )}
    </div>
  );
}
