import type { InputsSection } from '../../types';

interface Props {
  section: InputsSection;
}

// InputsBlock — Web/Blue/300 surface ("informational / contextual inputs"
// callout) with Web/Blue/700 deep-blue labels. Two layouts:
//   • narrative (solar / rate-plan reports): headline + body sentence,
//     optionally followed by a "PLUS A FEW ASSUMPTIONS" chip row.
//   • two-row chips (EV report, Figma 5346:41091): no body sentence — the
//     headline ("YOUR INPUTS") doubles as the first chip row's label,
//     followed by a divider and a second labelled chip row ("ASSUMPTIONS:").
export function InputsBlock({ section }: Props) {
  const hasBody = !!section.bodyParts?.length;
  const hasChips = section.assumptions.length > 0;
  const hasSecondary = !!section.secondaryChips?.length;
  // Solar/EV reports use 40 top/bottom; rate-plan compact form uses 24.
  const paddingClass = hasChips || hasSecondary ? 'py-10' : 'py-6';

  function ChipRow({ chips }: { chips: typeof section.assumptions }) {
    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <div
            key={chip.label}
            className="bg-white border border-white/80 rounded-full px-3 py-2 flex gap-1 items-center shadow-[0px_2px_8px_0px_rgba(0,89,132,0.08),0px_1px_3px_0px_rgba(0,89,132,0.1)]"
          >
            <span className="text-[14px] leading-[20px] font-normal text-[#262E40]">{chip.label}</span>
            <span className="text-[14px] leading-[20px] font-semibold text-[#000000]">{chip.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`bg-[#B5E4FF] rounded-[14px] px-8 ${paddingClass} w-full flex flex-col gap-3`}>
      {/* Headline label — Webapp/Label/XS/Bold (12/16 SemiBold) Web/Blue/700 */}
      <span className="text-[12px] leading-[16px] font-semibold text-[#005984] uppercase">
        {section.headline}
      </span>

      {hasBody && (
        <p className="text-[14px] leading-[20px] text-[#000000]">
          {section.bodyParts!.map((part, i) =>
            part.bold ? (
              <strong key={i} className="text-[14px] leading-[20px] font-semibold">
                {part.text}
              </strong>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </p>
      )}

      {hasChips && (
        <>
          {hasBody && (
            <>
              <div className="border-t border-[rgba(0,89,132,0.18)] my-3" />
              <span className="text-[12px] leading-[16px] font-semibold text-[#005984] uppercase">
                {section.assumptionsLabel ?? 'PLUS A FEW ASSUMPTIONS'}
              </span>
            </>
          )}
          <ChipRow chips={section.assumptions} />
        </>
      )}

      {hasSecondary && (
        <>
          <div className="border-t border-[rgba(0,89,132,0.18)] my-3" />
          <span className="text-[12px] leading-[16px] font-semibold text-[#005984] uppercase">
            {section.secondaryLabel}
          </span>
          <ChipRow chips={section.secondaryChips!} />
        </>
      )}
    </div>
  );
}
