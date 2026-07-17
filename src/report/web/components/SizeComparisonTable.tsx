import type { SizeComparisonSection } from '../../types';

interface Props {
  section: SizeComparisonSection;
}

// SizeComparisonTable — white card with subtle Web/Background/400 stroke (no shadow).
// Recommended row has NO background wash — label stays plain black, only the
// "Recommended" badge is tinted (Web/Green/200 bg + Green/700 text). Optional
// caption renders centered below the table.
export function SizeComparisonTable({ section }: Props) {
  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] pb-8 pt-6 px-8 w-full">
      {/* Header row — Figma column widths: 187 / 63 / 60 / 276 (flex-1), gap 24 */}
      <div className="flex gap-6 items-center pl-2 pb-2">
        <div className="w-[187px] shrink-0">
          <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase whitespace-nowrap">SIZE TRADEOFFS</span>
        </div>
        <div className="w-[63px] shrink-0 text-right">
          <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase whitespace-nowrap">NET COST</span>
        </div>
        <div className="w-[60px] shrink-0 text-right">
          <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase whitespace-nowrap">PAYBACK</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase whitespace-nowrap">VERDICT</span>
        </div>
      </div>

      {/* Option rows */}
      <div className="flex flex-col">
        {section.options.map((opt) => (
          <div
            key={opt.label}
            className="flex gap-6 items-start pl-2 py-4 border-t border-[#EFEFEF]"
          >
            <div className="w-[187px] shrink-0 flex items-center gap-2 flex-wrap">
              {/* Label — Webapp/Label/SS/Bold (14/20 SemiBold), plain black even when recommended. */}
              <span className="font-semibold text-[14px] leading-[20px] text-[#000000]">
                {opt.label}
              </span>
              {/* "Recommended" badge — Green/200 bg + Green/700 text, radius 10, padding 4/12 */}
              {opt.isRecommended && (
                <span className="text-[12px] leading-[16px] font-semibold text-[#026B28] px-3 py-1 rounded-[10px] bg-[#CEF3DA]">
                  Recommended
                </span>
              )}
            </div>

            <div className="w-[63px] shrink-0 text-right">
              <span className="text-[14px] leading-[20px] font-normal text-[#000000]">{opt.netCost}</span>
            </div>

            <div className="w-[60px] shrink-0 text-right">
              <span className="text-[14px] leading-[20px] font-normal text-[#000000]">{opt.payback}</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[14px] leading-[20px] font-normal text-[#262E40]">{opt.verdict}</p>
            </div>
          </div>
        ))}
      </div>

      {section.caption && (
        <p className="text-center text-[14px] font-normal text-[#66758D] pt-4">{section.caption}</p>
      )}
    </div>
  );
}
