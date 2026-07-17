import type { TweaksGridSection, TweakCard } from '../../types';

interface Props {
  section: TweaksGridSection;
}

// Minimal inline SVG glyphs for the appliance icons. They use currentColor
// so the parent CSS controls the stroke color.
function ApplianceIcon({ kind }: { kind: TweakCard['icon'] }) {
  switch (kind) {
    case 'cooling':
      // Snowflake — 6-arm
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M14 3v22M5.5 8l17 12M5.5 20l17-12" />
          <path d="M14 7l-2 2m2-2l2 2M14 21l-2-2m2 2l2-2M9 11l-2.5-.7M9 11l-.7-2.5M19 11l2.5-.7M19 11l.7-2.5M9 17l-2.5.7M9 17l-.7 2.5M19 17l2.5.7M19 17l.7 2.5" />
        </svg>
      );
    case 'pool':
      // Wave-and-droplet — pool pump
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M3 18c2 1 3 -1 5 -1s3 2 5 2 3 -2 5 -2 3 1 5 1" />
          <path d="M3 22c2 1 3 -1 5 -1s3 2 5 2 3 -2 5 -2 3 1 5 1" />
          <path d="M14 4c0 4 -3 5 -3 8a3 3 0 006 0c0 -3 -3 -4 -3 -8z" />
        </svg>
      );
    case 'ev':
      // Plug
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3v5M18 3v5M7 8h14v3a7 7 0 01-14 0V8z" />
          <path d="M14 18v3a3 3 0 003 3h0a3 3 0 003-3v-2" />
        </svg>
      );
    case 'water-heating':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3c0 5 -4 7 -4 11a4 4 0 008 0c0 -4 -4 -6 -4 -11z" />
        </svg>
      );
    case 'laundry':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="6" y="4" width="16" height="20" rx="2" />
          <circle cx="14" cy="15" r="5" />
          <circle cx="9" cy="8" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'cooking':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <rect x="4" y="9" width="20" height="14" rx="2" />
          <path d="M8 9V6h12v3" />
          <circle cx="10" cy="16" r="1.5" />
          <circle cx="18" cy="16" r="1.5" />
        </svg>
      );
  }
}

// TweaksGrid — 3-card horizontal grid for the rate-plan report's
// "SMALL TWEAKS TO SAVE MORE" section. Each card has icon + title + a
// "from" red chip → "to" green chip → description, with a divider above
// a SAVINGS row at the bottom.
export function TweaksGrid({ section }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section label — Webapp/Label/XS/Bold (12/16 SemiBold) Foreground/500 */}
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase">
        {section.label}
      </span>

      <div className="flex gap-3 w-full">
        {section.cards.map((card) => (
          <div
            key={card.title}
            className="flex-1 min-w-0 bg-white border border-[#F7F7F7] rounded-[14px] flex flex-col gap-3"
            style={{ padding: '24px 24px 20px 24px' }}
          >
            {/* Icon + title row */}
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-[10px] bg-white flex items-center justify-center text-[#262E40] shrink-0">
                <ApplianceIcon kind={card.icon} />
              </div>
              <span className="text-[18px] leading-[26px] font-semibold text-[#000000]">
                {card.title}
              </span>
            </div>

            {/* From → To chip row */}
            <div className="flex items-center gap-1">
              {/* From chip — Web/Error/200 surface, Web/Error/600 text */}
              <span
                className="px-2 py-1 rounded-[6px] text-[12px] leading-[16px] font-semibold"
                style={{ backgroundColor: '#FCE7E5', color: '#9C0900' }}
              >
                {card.fromTime}
              </span>
              {/* Arrow */}
              <span className="px-1 text-[14px] leading-[20px] font-semibold text-[#66758D]">→</span>
              {/* To chip — off-peak: Web/Success/200 surface + Success/600 text;
                  mid-peak: #FFF9F4 surface + Web/Warning/500 (#F85A01) text */}
              <span
                className="px-2 py-1 rounded-[6px] text-[12px] leading-[16px] font-semibold"
                style={
                  card.toTone === 'mid-peak'
                    ? { backgroundColor: '#FFF9F4', color: '#F85A01' }
                    : { backgroundColor: '#E6F3E9', color: '#015C1A' }
                }
              >
                {card.toTime}
              </span>
            </div>

            {/* Description — Webapp/Label/SS/Regular Foreground/700 */}
            <p className="text-[14px] leading-[20px] font-normal text-[#000000] flex-1">
              {card.description}
            </p>

            {/* Divider top + SAVINGS row */}
            <div className="flex items-center justify-between border-t border-[#DFDFE0] pt-4">
              <span className="text-[12px] leading-[16px] font-semibold text-[#66758D] uppercase">SAVINGS</span>
              <span className="text-[20px] leading-[24px] font-semibold text-[#015C1A]">
                {card.savings}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
