import type { RateUsageChart } from '../../types';

// RateUsageChart — small usage-by-time-of-day chart embedded in an EV
// report rate-plan card (Figma 5581:5182). Two variants:
//   'flat' — a single flat band across a $/$$/$$$ axis (no time-based price).
//   'tou'  — colored off/mid/peak usage segments with time-of-day labels.

const TOU_BAR_COLOR: Record<string, string> = {
  'off-peak': '#28C898',
  'mid-peak': '#F9D423',
  peak: '#FA96A8',
};

const TOU_LABEL_COLOR: Record<string, string> = {
  'off-peak': '#015C1A',
  'mid-peak': '#9C6B00',
  peak: '#9C0900',
};

export function RateUsageChartView({ chart }: { chart: RateUsageChart }) {
  if (chart.variant === 'flat') {
    return (
      <div className="w-full bg-white rounded-[8px] flex flex-col" style={{ height: 151 }}>
        <div className="flex-1 flex">
          <div className="flex flex-col justify-between items-end pr-2 py-1 text-[8px] font-medium text-[#66758D]">
            <span>$$$</span>
            <span>$$</span>
            <span>$</span>
          </div>
          <div className="flex-1 relative border-l border-b border-[#EFEFEF]">
            <div className="absolute left-0 right-0 top-1/3 border-t border-dashed border-[#EFEFEF]" />
            <div className="absolute left-0 right-0 top-2/3 border-t border-dashed border-[#EFEFEF]" />
            {/* Flat rate has no time-based price — a single band spans the full day. */}
            <div className="absolute left-0 right-0 bg-[#A9A9F5] rounded-[3px]" style={{ top: '38%', bottom: '16%' }} />
          </div>
        </div>
        <div className="flex justify-between pl-6 pt-1 text-[8px] font-medium text-[#66758D]">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>12 AM</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[8px] flex flex-col gap-1" style={{ height: 151 }}>
      <div className="flex-1 flex items-end gap-[3px] px-1">
        {chart.segments.map((seg, i) => (
          <div key={i} className="flex flex-col items-center justify-end h-full" style={{ flex: seg.widthFr }}>
            {seg.label && (
              <span className="text-[8px] font-bold mb-1 whitespace-nowrap" style={{ color: TOU_LABEL_COLOR[seg.tone] }}>
                {seg.label}
              </span>
            )}
            <div
              className="w-full rounded-[3px]"
              style={{ height: `${seg.heightFr * 100}%`, background: TOU_BAR_COLOR[seg.tone] }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between px-1 text-[8px] font-medium text-[#66758D]">
        {chart.timeLabels.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
