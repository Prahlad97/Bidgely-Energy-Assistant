import type { NumberedInsightsSection } from '../../types';

interface Props {
  section: NumberedInsightsSection;
}

// NumberedInsights — labeled list with rounded square badges. Per Figma 1476:9851:
//   - Outer  : white card, F7F7F7 1px stroke, 14 radius, 32 padding, 16 gap
//   - Label  : "KEY INSIGHTS" (FG/500 12/16 SemiBold)
//   - Item   : 50×58 dark FG/500 (#262E40) badge, 14 radius, with white
//              SemiBold 18/26 number; 24 horizontal gap to body text.
//   - Body   : Webapp/Label/SS/Regular (14/20). Inline parts may be bolded
//              or color-overridden (e.g. for the "+$87" red emphasis).
export function NumberedInsights({ section }: Props) {
  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] p-8 flex flex-col gap-4 w-full shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)]">
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase tracking-[0.02em]">
        {section.label}
      </span>

      <div className="flex flex-col gap-10">
        {section.insights.map((ins, i) => (
          <div key={i} className="flex flex-row items-start gap-6">
            {/* Number badge */}
            <div className="w-[50px] h-[58px] shrink-0 bg-[#262E40] rounded-[14px] flex items-center justify-center">
              <span className="text-[18px] leading-[26px] font-semibold text-white">
                {i + 1}
              </span>
            </div>

            {/* Body */}
            <p className="flex-1 text-[14px] leading-[20px] text-[#262E40] self-center">
              {ins.body.map((part, j) => (
                <span
                  key={j}
                  style={{ color: part.color }}
                  className={part.bold ? 'font-semibold' : ''}
                >
                  {part.text}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
