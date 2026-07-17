import type { CapitalActionsSection, CapitalActionCard } from '../../types';

interface Props {
  section: CapitalActionsSection;
}

function CapitalIcon({ kind }: { kind: CapitalActionCard['icon'] }) {
  switch (kind) {
    case 'cooling':
      // Snowflake — same as TweaksGrid for consistency
      return (
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M14 3v22M5.5 8l17 12M5.5 20l17-12" />
          <path d="M14 7l-2 2m2-2l2 2M14 21l-2-2m2 2l2-2M9 11l-2.5-.7M9 11l-.7-2.5M19 11l2.5-.7M19 11l.7-2.5M9 17l-2.5.7M9 17l-.7 2.5M19 17l2.5.7M19 17l.7 2.5" />
        </svg>
      );
    case 'solar':
      // Sun glyph
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="16" cy="16" r="6" />
          <path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.5 6.5l2 2M23.5 23.5l2 2M6.5 25.5l2-2M23.5 8.5l2-2" />
        </svg>
      );
  }
}

function CapitalCardView({ card }: { card: CapitalActionCard }) {
  return (
    <div className="flex-1 bg-white border border-[#F7F7F7] rounded-[14px] p-6 flex flex-col gap-6">
      <div className="w-11 h-11 flex items-center justify-center text-[#262E40]">
        <CapitalIcon kind={card.icon} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[18px] leading-[26px] font-semibold text-black">
          {card.title}
        </h3>
        <p className="text-[14px] leading-[20px] text-black">
          {card.description}
        </p>
      </div>

      {/* Violet payback chip */}
      <div className="self-start bg-[#A9A9F5] rounded-[6px] px-2 py-1">
        <span className="text-[12px] leading-[16px] font-semibold text-black">
          {card.costPayback}
        </span>
      </div>

      {/* Savings + optional cross-link */}
      <div className="flex flex-row items-center gap-6">
        <span className="text-[18px] leading-[26px] font-semibold text-[#14843C]">
          {card.savings}
        </span>
        {card.ctaLabel && (
          <a
            href={card.ctaUrl ?? '#'}
            className="text-[15px] leading-[20px] font-medium text-black underline decoration-[#262E40]/40 underline-offset-4"
          >
            {card.ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}

// CapitalActions — bottom of optimizer report. Per Figma 1497:11614.
//   - White surface band (24/32 padding)
//   - Section label "CAPITAL INVESTMENTS"
//   - 2 cards side-by-side, each with icon + title + body + violet
//     payback chip + green savings + optional cross-link CTA.
export function CapitalActions({ section }: Props) {
  return (
    <div className="bg-white px-8 pb-6 flex flex-col gap-4 w-full">
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase tracking-[0.02em]">
        {section.label}
      </span>
      <div className="flex flex-row gap-3 w-full items-stretch">
        {section.cards.map((card, i) => (
          <CapitalCardView key={i} card={card} />
        ))}
      </div>
    </div>
  );
}
