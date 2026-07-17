import type { NeighborhoodSection } from '../../types';

interface Props {
  section: NeighborhoodSection;
}

// NeighborhoodBlock — Web/Green/200 (#CEF3DA) surface. The "YOUR NEIGHBORHOOD"
// label was removed in the latest Figma, so the block is just the count + the
// two-line description. Number is Webapp/Display/XLL (36/44 Bold) Green/700.
export function NeighborhoodBlock({ section }: Props) {
  return (
    <div className="bg-[#CEF3DA] rounded-[14px] p-8 w-full flex gap-6 items-center">
      {/* Count — Webapp/Display/XLL (36/44 Bold) Green/700 */}
      <span className="text-[36px] leading-[44px] font-bold text-[#026B28] shrink-0">
        {section.count}
      </span>
      <div className="flex flex-col gap-1">
        {/* Headline — Webapp/Label/SS/Bold (14/20 SemiBold) Web/Green/700
            (#026B28) per Figma 1476:9092. */}
        <p className="text-[14px] leading-[20px] font-semibold text-[#026B28]">{section.headline}</p>
        {/* Body — Webapp/Label/SS/Regular (14/20) Foreground/700 per Figma 1476:9093. */}
        <p className="text-[14px] leading-[20px] font-normal text-[#000000]">{section.body}</p>
      </div>
    </div>
  );
}
