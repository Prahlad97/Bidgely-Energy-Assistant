import type { OptimizerSummarySection } from '../../types';

interface Props {
  section: OptimizerSummarySection;
}

// OptimizerSummary — top-of-report KPI block. Per Figma 1497:11281 →
//   - Outer  : transparent (sits on the white surface band)
//   - 3 KPI tiles (each 14 radius, 24 padding, 12 vertical gap):
//       blue   = #B5E4FF (Web/Blue/300)   → "Your annual bill"
//       violet = #B8B8FF (Web/Violet/300) → "Efficient peers"
//       mint   = #7FECCB (Web/Green/400)  → "Annual savings potential"
//   - Insight banner: Web/Green/200 #CEF3DA, 14 radius, 12/20 padding,
//                     14/20 Regular text in Web/Green/700 #026B28
//   - Footnote      : Foreground/400 (#66758D) 12/16 Regular
//
// The whole block lives inside its own white surface band — emitted by
// ReportWebView's full-bleed wrapper.
export function OptimizerSummary({ section }: Props) {
  const surfaceMap = {
    blue: 'bg-[#B5E4FF]',
    violet: 'bg-[#B8B8FF]',
    mint: 'bg-[#7FECCB]',
  } as const;
  return (
    // No bg — the outer FBFBFC shows through here, creating the visible
    // tinted band between the white title block above and the white
    // top-savings-tips card below. Matches Figma 1497:11281 (transparent
    // fill) where this section breaks the otherwise-continuous white sheet.
    <div className="px-8 pb-6 flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4 w-full">
        {section.tiles.map((tile, i) => (
          <div
            key={i}
            className={`flex-1 ${surfaceMap[tile.surface]} rounded-[14px] p-6 flex flex-col gap-3`}
          >
            <span className="text-[12px] leading-[16px] font-semibold text-black uppercase tracking-[0.02em]">
              {tile.label}
            </span>
            <span className="text-[36px] leading-[44px] font-bold text-black">
              {tile.value}
            </span>
            <span className="text-[12px] leading-[16px] text-[#262E40]">
              {tile.subtext}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#CEF3DA] rounded-[14px] px-5 py-3 flex items-center gap-2">
        <p className="text-[14px] leading-[20px] text-[#026B28]">
          {section.insight}
        </p>
      </div>

      <p className="text-[12px] leading-[16px] text-[#66758D]">
        {section.footnote}
      </p>
    </div>
  );
}
