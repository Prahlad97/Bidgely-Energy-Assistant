import type { CostBreakdownSection } from '../../types';

interface Props {
  section: CostBreakdownSection;
}

// CostBreakdownTable — three-column dollar table used by the EV report.
// Per Figma 1476:9505: white card, Web/Background/400 1px stroke, padding
// 12/32/16/32, gap 4 between rows. Header row has a transparent top stroke
// (so it visually has no divider above), and each data row + the total row
// have a top stroke of #EFEFEF (Web/Background/400). Total row uses
// Webapp/Label/MM/Bold (16/24 SemiBold) and is taller (16/0/16 padding).
//
// Per-column color overrides are supported so a "+$N" column can render in
// red and "−$N" in green without the component needing to know the
// semantic — the data layer decides.
export function CostBreakdownTable({ section }: Props) {
  // Column widths per Figma: 300 label, then three 110px numeric columns.
  const labelW = 'w-[300px]';
  const numW = 'w-[110px]';

  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] pb-4 pt-3 px-8 w-full flex flex-col gap-1">
      {/* Header row — 12/16 SemiBold Foreground/400. No top stroke (white). */}
      <div className="flex gap-3 items-center py-3">
        <div className={`${labelW} shrink-0`} />
        {section.columns.map((col) => (
          <div key={col} className={`${numW} shrink-0 text-right`}>
            <span className="text-[12px] leading-[16px] font-semibold text-[#66758D] uppercase whitespace-nowrap">
              {col}
            </span>
          </div>
        ))}
      </div>

      {/* Data rows — Webapp/Label/SS/Regular (14/20). Top stroke #EFEFEF. */}
      {section.rows.map((row) => (
        <div key={row.label} className="flex gap-3 items-center py-3 border-t border-[#EFEFEF]">
          <div className={`${labelW} shrink-0`}>
            <span className="text-[14px] leading-[20px] font-normal text-[#000000]">
              {row.label}
            </span>
          </div>
          {row.values.map((v, i) => (
            <div key={i} className={`${numW} shrink-0 text-right`}>
              <span
                className="text-[14px] leading-[20px] font-normal"
                style={{ color: row.valueColors?.[i] ?? '#000000' }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* Total row — Webapp/Label/MM/Bold (16/24 SemiBold), 16/0/16 padding */}
      <div className="flex gap-3 items-center py-4 border-t border-[#EFEFEF]">
        <div className={`${labelW} shrink-0`}>
          <span className="text-[16px] leading-[24px] font-semibold text-[#000000]">
            {section.total.label}
          </span>
        </div>
        {section.total.values.map((v, i) => (
          <div key={i} className={`${numW} shrink-0 text-right`}>
            <span
              className="text-[16px] leading-[24px] font-semibold"
              style={{ color: section.total.valueColors?.[i] ?? '#000000' }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
