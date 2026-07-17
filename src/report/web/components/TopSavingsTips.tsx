import type { TopSavingsTipsSection } from '../../types';

interface Props {
  section: TopSavingsTipsSection;
}

// TopSavingsTips — 3-column numbered card. Per Figma 1497:11298 → 1497:11300
//   - Outer band : white surface, 24/32 padding
//   - Card       : white, F7F7F7 1px stroke, 14 radius, 24 padding, 16 horizontal gap
//   - Each column: number in Web/Green/700 (#026B28) Bold 36/44, then title
//                  Webapp/Label/SS/Bold 14/20, subtitle 12/16 Foreground/400
//   - Vertical dividers between columns (DFDFE0 1px lines)
export function TopSavingsTips({ section }: Props) {
  return (
    <div className="bg-white px-8 pb-6 flex flex-col gap-3 w-full">
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase tracking-[0.02em]">
        {section.label}
      </span>
      <div className="bg-white border border-[#F7F7F7] rounded-[14px] p-6 flex flex-row items-stretch gap-4">
        {section.tips.map((tip, i) => (
          <div key={i} className="flex flex-row flex-1 gap-4">
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              <span className="text-[36px] leading-[44px] font-bold text-[#026B28]">
                {tip.number}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] leading-[20px] font-semibold text-black">
                  {tip.title}
                </span>
                <span className="text-[12px] leading-[16px] text-[#66758D]">
                  {tip.description}
                </span>
              </div>
            </div>
            {i < section.tips.length - 1 && (
              <div className="w-px self-stretch bg-[#EFEFEF]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
