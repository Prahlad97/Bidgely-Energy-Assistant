import type { BillDonutSection } from '../../types';

interface Props {
  section: BillDonutSection;
}

// BillDonut — standalone conic-gradient donut + legend (Home Optimizer
// report's "BILL BREAKDOWN IN LAST 12 MONTHS" card), separate from the
// appliance-efficiency section's embedded donut.
export function BillDonut({ section }: Props) {
  const total = section.slices.reduce((sum, s) => sum + s.value, 0) || 1;
  let cursor = 0;
  const stops = section.slices.map((s) => {
    const start = (cursor / total) * 100;
    cursor += s.value;
    const end = (cursor / total) * 100;
    return `${s.color} ${start}% ${end}%`;
  });

  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] p-6 flex flex-col gap-4 w-full">
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] text-center">{section.title}</span>
      <div className="flex gap-4 items-center">
        <div className="flex-1 h-[200px] flex items-center justify-center">
          <div
            className="w-[173px] h-[173px] rounded-full flex items-center justify-center relative"
            style={{ background: `conic-gradient(${stops.join(', ')})` }}
          >
            <div className="absolute w-[108px] h-[108px] rounded-full bg-white flex items-center justify-center">
              <span className="text-[25px] font-bold text-[#262E40]">{section.centerLabel}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {section.slices.map((s) => (
            <div key={s.label} className="flex gap-2 items-center">
              <span className="w-4 h-4 rounded shrink-0" style={{ background: s.color }} />
              <span className="w-[174px] text-[14px] leading-[20px] text-[#262E40]">{s.label}</span>
              <span className="text-[14px] leading-[20px] text-[#262E40]">{s.displayValue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
