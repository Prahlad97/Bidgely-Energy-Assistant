import type { CtaBannerSection } from '../../types';

interface Props {
  section: CtaBannerSection;
}

// CtaBanner — variant-aware. All variants share the same structure
// (radius 14, padding-x 32, headline + subtext on the left, button on
// the right). They differ in surface + button colors.
//
//   solar (default): Web/Appliance/Solar/100 (#FFEEAB) surface
//                    + Web/Appliance/Solar/700 (#A9640B) button + white text
//                    + py-6 (24 top/bottom)
//   ev             : raw mint #B7F6D8 surface (Web/Appliance/EV/100 ramp pending)
//                    + Web/Green/600 (#14843C) button + white text
//                    + py-8 (32 top/bottom) per Figma 1476:9659 padding 32/32
//   rate           : Web/Green/200 (#CEF3DA) surface
//                    + Web/Success/600 (#015C1A) button + white text
//                    + py-6 (24 top/bottom) per Figma 1476:10337 padding 24/32
export function CtaBanner({ section }: Props) {
  const variant = section.variant ?? 'solar';

  const surfaceClass = variant === 'ev'
    ? 'bg-[#B7F6D8]'
    : variant === 'rate'
    ? 'bg-[#CEF3DA]'
    : 'bg-[#FFEEAB]';
  const buttonClass = variant === 'solar'
    ? 'bg-[#A9640B] text-white'                      // Web/Appliance/Solar/700
    : variant === 'rate'
    ? 'bg-[#015C1A] text-white'                      // Web/Success/600
    : 'bg-[#14843C] text-white';                     // Web/Green/600 (ev)
  // EV banner uses 32/32 padding; solar + rate use 24/32.
  const paddingClass = variant === 'ev' ? 'px-8 py-8' : 'px-8 py-6';

  return (
    <div
      className={`${surfaceClass} ${paddingClass} rounded-[14px] flex items-center justify-between gap-10 w-full`}
    >
      <div className="flex flex-col gap-1">
        {section.label && (
          <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase tracking-[0.02em]">
            {section.label}
          </span>
        )}
        {/* Headline — Webapp/Label/LL/Bold (18/26 SemiBold) Foreground/700 */}
        <span className="text-[18px] leading-[26px] font-semibold text-[#000000]">
          {section.headline}
        </span>
        {/* Subtext — Webapp/Label/SS/Regular (14/20) Foreground/500 */}
        {section.subtext && (
          <span className="text-[14px] leading-[20px] font-normal text-[#262E40]">
            {section.subtext}
          </span>
        )}
      </div>
      <a
        href={section.buttonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`shrink-0 h-[44px] px-5 flex items-center justify-center gap-2 rounded-[10px] text-[14px] leading-[20px] font-semibold whitespace-nowrap ${buttonClass}`}
      >
        {section.buttonLabel}
      </a>
    </div>
  );
}
