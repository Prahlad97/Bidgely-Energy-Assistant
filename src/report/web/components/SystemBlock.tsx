import type { SystemRecommendationSection } from '../../types';

interface Props {
  section: SystemRecommendationSection;
}

// SystemBlock — Solar/100 (#FFEEAB) outer surface, no shadow, no stroke.
// "Why this size?" inner card uses Solar/50 (#FFFCEE) surface (NOT translucent
// white). Financial sub-tiles have NO left border and use Webapp/Label/XS/Bold
// (12/16) labels. Highlighted financial value uses Web/Green/700 (#026B28).
export function SystemBlock({ section }: Props) {
  return (
    <div className="bg-[#FFEEAB] rounded-[14px] p-8 w-full flex flex-col gap-4">
      {/* Section label — Webapp/Label/XS/Bold (12/16 SemiBold) Foreground/700 */}
      <span className="text-[12px] leading-[16px] font-semibold text-[#000000] uppercase">
        {section.label}
      </span>

      {/* Hero row — icon square + (kW number, supplement on the right). The
          kW value is rendered as a SINGLE text node per Figma 1476:8904 (one
          color, one size, one weight). The supplement is pushed to the right
          edge with ml-auto so it right-aligns at the row end. */}
      <div className="flex gap-6 items-center w-full">
        <div className="bg-[#FFFCEE] rounded-[10px] shrink-0 w-[78px] h-[78px] flex items-center justify-center">
          {section.iconUrl ? (
            <img src={section.iconUrl} alt="" className="w-11 h-11" />
          ) : (
            <span className="text-2xl">☀️</span>
          )}
        </div>
        <div className="flex items-baseline gap-2 flex-1 min-w-0">
          {/* kW value — Webapp/Display/XLL (36/44 Bold) Foreground/700, one span */}
          <span className="text-[36px] leading-[44px] font-bold text-[#000000] whitespace-nowrap">
            {section.sizeKw} kW
          </span>
          {/* Supplement — Webapp/Label/SS/Regular (14/20) Foreground/700,
              right-aligned via ml-auto */}
          <span className="ml-auto text-[14px] leading-[20px] font-normal text-[#000000] whitespace-nowrap text-right">
            {section.panelCount} panels × 400W · ~{section.roofSqFt} sq ft of roof
          </span>
        </div>
      </div>

      {/* Why this size — Solar/50 inner card, padding 16, gap 8, radius 10 */}
      <div className="bg-[#FFFCEE] rounded-[10px] p-4 flex flex-col gap-2">
        {/* Headline — Webapp/Label/MM/Bold (16/24 SemiBold) Solar/700 */}
        <span className="text-[16px] leading-[24px] font-semibold text-[#A9640B]">Why this size?</span>
        {/* Body — Webapp/Label/SS/Regular (14/20) Foreground/500 */}
        <p className="text-[14px] leading-[20px] font-normal text-[#262E40]">
          {section.whySizeBody}
        </p>
      </div>

      {/* Financials — horizontal row, gap 20, padding 16/4/0/4. Each sub-tile
          has NO border, padding 4/16/4/16 (px-4 py-1), gap 8 vertical. */}
      <div className="flex gap-5 pt-4 px-1">
        {section.financials.map((fin) => (
          <div
            key={fin.label}
            className="flex-1 flex flex-col gap-2 px-4 py-1"
          >
            {/* Label — Webapp/Label/XS/Bold (12/16 SemiBold) Foreground/700 */}
            <span className="text-[12px] leading-[16px] font-semibold text-[#000000] uppercase">
              {fin.label}
            </span>
            {/* Value — Webapp/Display/LL (28/32 Bold). Highlighted = Web/Green/700 (#026B28). */}
            <span
              className={`text-[28px] leading-[32px] font-bold ${
                fin.highlight ? 'text-[#026B28]' : 'text-[#000000]'
              }`}
            >
              {fin.value}
            </span>
            {/* Subtext — Webapp/Label/XS/Regular (12/16) Foreground/500 */}
            <span className="text-[12px] leading-[16px] font-normal text-[#262E40]">
              {fin.subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
