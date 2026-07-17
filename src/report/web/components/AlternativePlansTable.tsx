import type { AlternativePlansTableSection } from '../../types';

interface Props {
  section: AlternativePlansTableSection;
}

// AlternativePlansTable — "All Analysed Plans" (Figma best-rate report).
// White card with subtle stroke + report shadow. Title renders as an h2
// (not an eyebrow label). 3 columns by default (plan name / annual cost /
// vs today); a 4th VERDICT column only appears when at least one row sets
// `verdict`.
export function AlternativePlansTable({ section }: Props) {
  const hasVerdict = section.rows.some((r) => r.verdict);

  return (
    <div className="bg-white border border-[#F7F7F7] rounded-[14px] shadow-[0px_2px_4px_0px_rgba(40,41,61,0.01),0px_4px_32px_16px_rgba(96,97,112,0.01)] px-8 py-4 flex flex-col gap-6 w-full">
      <h2 className="text-[20px] leading-[24px] font-semibold text-[#000000] m-0">{section.title}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-[12px] leading-[16px] font-semibold text-[#66758D] uppercase py-3 whitespace-nowrap">
              PLAN NAME
            </th>
            <th className="text-right text-[12px] leading-[16px] font-semibold text-[#66758D] uppercase py-3 whitespace-nowrap">
              {section.costColumnLabel ?? 'ANNUAL COST'}
            </th>
            <th className="text-right text-[12px] leading-[16px] font-semibold text-[#66758D] uppercase py-3 whitespace-nowrap">
              {section.deltaColumnLabel ?? 'VS TODAY'}
            </th>
            {hasVerdict && (
              <th className="text-left text-[12px] leading-[16px] font-semibold text-[#66758D] uppercase py-3">
                VERDICT
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row) => (
            <tr key={row.name} className="border-t border-[#EFEFEF]">
              <td className="py-4 align-baseline">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] leading-[20px] font-semibold text-[#000000] whitespace-nowrap">
                    {row.name}
                  </span>
                  {row.isRecommended && (
                    <span className="text-[12px] leading-[16px] font-semibold text-white px-3 py-1 rounded-[10px] bg-[#14843C] whitespace-nowrap">
                      Recommended
                    </span>
                  )}
                </div>
              </td>
              <td className="py-4 align-baseline text-right text-[14px] leading-[20px] font-normal text-[#000000] whitespace-nowrap">
                {row.annualCost}
              </td>
              <td
                className="py-4 align-baseline text-right text-[14px] leading-[20px] font-normal whitespace-nowrap"
                style={{ color: row.vsTodayColor ?? '#000000' }}
              >
                {row.vsToday}
              </td>
              {hasVerdict && (
                <td className="py-4 align-baseline">
                  <p className="text-[14px] leading-[20px] font-normal text-[#000000] m-0">{row.verdict}</p>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
