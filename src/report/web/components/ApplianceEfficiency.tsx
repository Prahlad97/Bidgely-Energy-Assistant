import type { ApplianceEfficiencySection, ApplianceCategoryCard } from '../../types';

interface Props {
  section: ApplianceEfficiencySection;
}

// SVG donut chart. Renders concentric arc strokes (one per slice) on a
// circle path; the trick: each arc has a different stroke-dasharray so it
// only shows for the slice's angular range, and stroke-dashoffset rotates
// it into position. Works in both browser and PDF (Playwright) contexts.
function Donut({
  total,
  slices,
}: {
  total: string;
  slices: ApplianceEfficiencySection['donutSlices'];
}) {
  const SIZE = 200;
  const STROKE = 32;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * RADIUS;
  const sum = slices.reduce((s, c) => s + c.numericValue, 0);

  let acc = 0;
  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          {slices.map((slice, i) => {
            const fraction = slice.numericValue / sum;
            const arcLen = fraction * CIRC;
            const offset = -acc;
            acc += arcLen;
            return (
              <circle
                key={i}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={slice.color}
                strokeWidth={STROKE}
                strokeDasharray={`${arcLen} ${CIRC - arcLen}`}
                strokeDashoffset={offset}
              />
            );
          })}
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[25px] leading-[28px] font-bold text-[#262E40]">
          {total}
        </span>
      </div>
    </div>
  );
}

function DonutCard({ section }: { section: ApplianceEfficiencySection }) {
  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] p-8 flex flex-row items-center gap-8 w-full">
      <div className="flex-1 flex justify-center">
        <Donut total={section.donutTotal} slices={section.donutSlices} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {section.donutSlices.map((slice, i) => (
          <div key={i} className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-2 min-w-0">
              <span
                className="w-4 h-4 shrink-0 rounded-[4px]"
                style={{ background: slice.color }}
              />
              <span className="text-[14px] leading-[20px] text-[#262E40] truncate">
                {slice.label}
              </span>
            </div>
            <span className="text-[14px] leading-[20px] text-[#262E40]">
              {slice.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ card }: { card: ApplianceCategoryCard }) {
  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] p-8 flex flex-col gap-4 w-full">
      {/* Title + description */}
      <div className="flex flex-col gap-1">
        <h3 className="text-[20px] leading-[24px] font-semibold text-black">
          {card.title}
        </h3>
        <p className="text-[14px] leading-[20px] text-[#262E40]">
          {card.description}
        </p>
      </div>

      {/* 3 KPI sub-tiles: blue today / violet peer / mint savings */}
      <div className="flex flex-row gap-6 w-full">
        <div className="flex-1 bg-[#B5E4FF] rounded-[10px] p-4 flex flex-col gap-2">
          <span className="text-[12px] leading-[16px] font-semibold text-black uppercase tracking-[0.02em]">
            YOU TODAY
          </span>
          <span className="text-[20px] leading-[24px] font-semibold text-black">
            {card.todayCost}
          </span>
        </div>
        <div className="flex-1 bg-[#B8B8FF] rounded-[10px] p-4 flex flex-col gap-2">
          <span className="text-[12px] leading-[16px] font-semibold text-black uppercase tracking-[0.02em]">
            EFFICIENT PEER
          </span>
          <span className="text-[20px] leading-[24px] font-semibold text-black">
            {card.peerCost}
          </span>
        </div>
        <div className="flex-1 bg-[#7FECCB] rounded-[14px] p-4 flex flex-col gap-3">
          <span className="text-[12px] leading-[16px] font-semibold text-black uppercase tracking-[0.02em]">
            YOUR SAVINGS POTENTIAL
          </span>
          <span className="text-[20px] leading-[24px] font-semibold text-black">
            {card.savingsCost}
          </span>
        </div>
      </div>

      {/* "X WAYS TO GET THERE" label + horizontal rule */}
      <div className="flex flex-row items-center gap-2 py-1">
        <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase tracking-[0.02em] whitespace-nowrap">
          {card.waysLabel}
        </span>
        <div className="flex-1 h-px bg-[#DFDFE0]" />
      </div>

      {/* Action rows */}
      <div className="flex flex-col">
        {card.actions.map((action, i) => (
          <div key={i} className="flex flex-row items-center gap-4 py-5">
            {/* Bolt icon */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center text-[#262E40]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 1L3 11h6l-1 7 9-11h-6l0-6z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <h4 className="text-[18px] leading-[26px] font-semibold text-black">
                {action.title}
              </h4>
              <p className="text-[14px] leading-[20px] text-black">
                {action.description}
              </p>
            </div>
            <span className="text-[18px] leading-[26px] font-semibold text-[#14843C] whitespace-nowrap">
              {action.savings}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ApplianceEfficiency — compound section per Figma 1497:11433. Stack:
//   Label                               (12/16 SemiBold FG/500)
//   Donut card                          (white, F7F7F7 stroke, 14 radius)
//   Category card × 3 (HVAC / Water / Always-on baseload)
// All on a white surface band with 24/32 padding.
export function ApplianceEfficiency({ section }: Props) {
  return (
    <div className="bg-white px-8 pb-6 flex flex-col gap-4 w-full">
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase tracking-[0.02em]">
        {section.label}
      </span>
      <DonutCard section={section} />
      {section.categories.map((card, i) => (
        <CategoryCard key={i} card={card} />
      ))}
    </div>
  );
}
