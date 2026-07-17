import type { MonthlyChartSection } from '../../types';

interface Props {
  section: MonthlyChartSection;
}

const CHART_AREA_PX = 200;

// MonthlyChart — white card with a subtle Web/Background/400 stroke (no shadow).
// Grid: top + middle lines = #EFEFEF (BG/400, very subtle); bottom = #DFDFE0 (BG/500).
// Bars: blue Web/Info/500 (#1467D5) + amber Web/Appliance/Solar (#FFB84F).
// Axis labels: Webapp/Label/XS/Regular (12/16) Foreground/500.
// Insight callout: Web/Appliance/Solar/50 (#FFFCEE) surface, p-4, Foreground/500 body.
export function MonthlyChart({ section }: Props) {
  const { data, yMax, yUnit, series, insight } = section;

  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] pb-8 pt-6 px-8 w-full flex flex-col items-center gap-4">
      {/* Title — Webapp/Label/XS/Bold (12/16 SemiBold) Foreground/500 */}
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase">
        {section.title}
      </span>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[320px]">
          <div className="flex w-full" style={{ height: CHART_AREA_PX }}>
            {/* Y-axis labels — Webapp/Label/XS/Regular (12/16) Foreground/500.
                whitespace-nowrap + wider column (w-20 = 80px) so values like
                "800 kWh" / "2000 kWh" don't get chopped from the left when
                they're wider than 56px (w-16 minus pr-2). */}
            <div className="flex flex-col justify-between items-end pr-2 shrink-0 w-20 py-0">
              <span className="text-[12px] leading-[16px] font-normal text-[#262E40] whitespace-nowrap">{yMax.toLocaleString()} {yUnit}</span>
              <span className="text-[12px] leading-[16px] font-normal text-[#262E40] whitespace-nowrap">{Math.round(yMax / 2).toLocaleString()} {yUnit}</span>
              <span className="text-[12px] leading-[16px] font-normal text-[#262E40] whitespace-nowrap">0 {yUnit}</span>
            </div>

            {/* Bars area with grid lines — Figma 1476:8845/47/49: top + middle
                use #EFEFEF at 50% opacity (very faint), bottom (baseline) uses
                #DFDFE0 at full opacity. */}
            <div className="relative flex-1">
              {/* Top — #EFEFEF @ 50% */}
              <div className="absolute left-0 right-0 border-t border-[rgba(239,239,239,0.5)]" style={{ top: '0%' }} />
              {/* Middle — #EFEFEF @ 50% */}
              <div className="absolute left-0 right-0 border-t border-[rgba(239,239,239,0.5)]" style={{ top: '50%' }} />
              {/* Bottom (baseline) — #DFDFE0 full opacity */}
              <div className="absolute left-0 right-0 border-t border-[#DFDFE0]" style={{ top: '100%' }} />

              <div className="absolute inset-0 flex items-end">
                {data.map((point) => {
                  const consumptionPx = Math.round((point.consumption / yMax) * CHART_AREA_PX);
                  const generationPx = Math.round((point.generation / yMax) * CHART_AREA_PX);
                  return (
                    <div
                      key={point.month}
                      className="flex-1 flex items-end justify-center gap-[2px] px-[2px]"
                    >
                      {/* Consumption — Web/Info/500 */}
                      <div
                        className="rounded-[4px] bg-[#1467D5]"
                        style={{
                          height: `${consumptionPx}px`,
                          width: 'clamp(6px, 45%, 14px)',
                        }}
                      />
                      {/* Generation — Web/Appliance/Solar */}
                      <div
                        className="rounded-[4px] bg-[#FFB84F]"
                        style={{
                          height: `${generationPx}px`,
                          width: 'clamp(6px, 45%, 14px)',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* X-axis labels — Webapp/Label/XS/Regular (12/16) Foreground/500.
              pl-20 matches the y-axis column width (w-20) so months align
              under their bars. */}
          <div className="flex pl-20 mt-2">
            {data.map((point) => (
              <div key={point.month} className="flex-1 text-center">
                <span className="text-[12px] leading-[16px] font-normal text-[#262E40]">{point.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend — Webapp/Label/XS/Bold (12/16 SemiBold) Foreground/700 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <div className="w-[10px] h-[10px] rounded-[4px] bg-[#1467D5] shrink-0" />
          <span className="text-[12px] leading-[16px] font-semibold text-[#000000]">{series.consumptionLabel}</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[10px] h-[10px] rounded-[4px] bg-[#FFB84F] shrink-0" />
          <span className="text-[12px] leading-[16px] font-semibold text-[#000000]">{series.generationLabel}</span>
        </div>
      </div>

      {insight && (
        // Figma 1476:8894 / 1476:8895: Solar/50 surface, padding 24 on all
        // sides, body text is Webapp/Label/SS/Regular (14/20) Regular on
        // Web/Appliance/Solar/700. The amber-on-amber treatment ties the
        // insight visually to the system-recommendation block below.
        <div className="bg-[#FFFCEE] rounded-[10px] p-6 w-full">
          <p className="text-[14px] leading-[20px] font-normal text-[#A9640B]">{insight}</p>
        </div>
      )}
    </div>
  );
}
