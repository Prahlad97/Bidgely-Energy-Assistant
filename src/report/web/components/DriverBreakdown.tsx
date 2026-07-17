import type { DriverBreakdownSection, DriverGroup, DriverRow } from '../../types';

interface Props {
  section: DriverBreakdownSection;
}

const CATEGORY_ICON: Record<NonNullable<DriverRow['categoryIcon']>, string> = {
  heating: 'heating', // composite icon, rendered specially below
  'always-on': '/hba/always_on.svg',
  ev: '/hba/electric_vehicle.svg',
  other: '/hba/other_electric.svg',
};

function HeatingIcon() {
  // Composite flame + base icon, ported from the reference export (3 flame
  // paths layered over a base glyph). The SVGs are preserveAspectRatio="none"
  // (they stretch to fill their box), so each layer needs an explicit
  // width+height — not just a position — or it collapses to nothing.
  return (
    <span className="relative w-6 h-6 shrink-0">
      <img src="/hba/vector1.svg" alt="" className="absolute" style={{ top: 2.81, left: 13.96, width: 2.12, height: 4.43 }} />
      <img src="/hba/vector2.svg" alt="" className="absolute" style={{ top: 2.81, left: 10.81, width: 2.12, height: 4.43 }} />
      <img src="/hba/vector3.svg" alt="" className="absolute" style={{ top: 2.81, left: 7.66, width: 2.12, height: 4.43 }} />
      <img src="/hba/group1.svg" alt="" className="absolute" style={{ top: 7.52, left: 1.5, width: 21, height: 14.98 }} />
    </span>
  );
}

function Row({ row }: { row: DriverRow }) {
  const isTopLevel = !row.indent && !row.secondary;
  const titleColor = '#0B1220';
  const descColor = row.secondary ? '#2A3347' : '#66758D';
  const amountClass = row.indent
    ? 'text-[14px] leading-[20px] font-normal text-[#66758D]'
    : row.secondary
    ? 'text-[14px] leading-[20px] font-normal text-[#2A3347]'
    : 'text-[16px] leading-[24px] font-normal text-[#0B1220]';

  return (
    <div className={`flex gap-4 items-start border-t border-dashed border-[#DFDFE0] ${isTopLevel ? 'py-4' : 'py-[11px]'} ${row.indent ? 'pl-10' : ''}`}>
      {isTopLevel ? (
        <span className="w-4 h-[17.5px] shrink-0 flex items-center justify-center rotate-90">
          <img src="/hba/vector.svg" alt="" className="w-4 h-[17.5px]" />
        </span>
      ) : (
        <span className="w-6 h-6 shrink-0 rotate-90">
          <img src="/hba/arrow_up_right.svg" alt="" className="w-6 h-6" />
        </span>
      )}
      {row.categoryIcon && (
        row.categoryIcon === 'heating'
          ? <HeatingIcon />
          : <img src={CATEGORY_ICON[row.categoryIcon]} alt="" className="w-6 h-6 shrink-0" />
      )}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="text-[14px] leading-[20px] m-0 whitespace-nowrap" style={{ color: titleColor }}>{row.title}</p>
        <p className="text-[14px] leading-[20px] m-0" style={{ color: descColor }}>{row.description}</p>
        {row.flag && (
          <div className="flex gap-2 items-center py-1">
            <img src="/hba/flag.svg" alt="" className="w-5 h-5" />
            <span className="text-[14px] leading-[20px] text-black underline">{row.flag}</span>
          </div>
        )}
      </div>
      <span className={`w-16 text-right shrink-0 ${amountClass}`}>{row.amount}</span>
    </div>
  );
}

function Group({ group, isFirst }: { group: DriverGroup; isFirst: boolean }) {
  return (
    <div
      className={`rounded-xl flex flex-col gap-4 ${
        group.dominant ? 'bg-[#FEE2E2] p-4' : `${isFirst ? '' : 'border-t border-[#F0F0F2] pt-5'}`
      }`}
    >
      <div className="flex gap-4 items-start w-full">
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-[16px] leading-[24px] font-semibold text-[#0B1220] whitespace-nowrap">{group.title}</span>
            {group.dominant && (
              <span className="bg-white text-[#B91C1C] text-[12px] leading-[16px] font-semibold px-3 py-1 rounded-full">
                DOMINANT CAUSE
              </span>
            )}
          </div>
          <p className="text-[14px] leading-[20px] text-[#2A3347] m-0">{group.description}</p>
        </div>
        <span className="text-[16px] leading-[24px] font-semibold text-[#0B1220] w-16 text-right shrink-0">
          {group.amount}
        </span>
      </div>

      {group.rows.map((row, i) => (
        <Row key={i} row={row} />
      ))}
    </div>
  );
}

// DriverBreakdown — nested bill-attribution card (Figma HBA report). A stack
// of driver groups; each group has a header (title, optional dominant badge,
// description, amount) and a list of detail rows below it.
export function DriverBreakdown({ section }: Props) {
  return (
    <div className="bg-white rounded-[14px] p-6 flex flex-col gap-6 w-full shadow-[0px_2px_4px_0px_rgba(40,41,61,0.01),0px_4px_32px_16px_rgba(96,97,112,0.01)]">
      <div className="flex flex-col gap-1">
        <h2 className="text-[20px] leading-[24px] font-semibold text-[#000000] m-0">{section.label}</h2>
        {section.description && (
          <p className="text-[14px] leading-[20px] text-[#2A3347] m-0">{section.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-5">
        {section.groups.map((group, i) => (
          <Group key={i} group={group} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
}
