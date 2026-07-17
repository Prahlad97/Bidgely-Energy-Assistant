import type { BillKpiTilesSection } from '../../types';

interface Props {
  section: BillKpiTilesSection;
}

// BillKpiTiles — three side-by-side colored tiles for the High Bill report.
//   - blue (analyzed cycle)  : bg #125AAA, white text, no shadow, no delta pill
//   - orange (vs. prev cycle): bg #FFDC9B, black text, shadow, white delta pill
//   - purple (vs. prev year) : bg #B8B8FF, black text, shadow, white delta pill
export function BillKpiTiles({ section }: Props) {
  return (
    <div className="flex flex-row gap-4 w-full items-stretch">
      {section.tiles.map((tile, i) => {
        const isBlue = tile.surface === 'blue';
        const bg = isBlue ? '#125AAA' : tile.surface === 'orange' ? '#FFDC9B' : '#B8B8FF';
        const textColor = isBlue ? '#FFFFFF' : '#000000';
        return (
          <div
            key={i}
            className={`flex-1 rounded-[14px] p-6 flex flex-col gap-3 min-h-[148px] ${isBlue ? '' : 'shadow-[0px_6px_14px_0px_rgba(17,24,39,0.06)]'}`}
            style={{ background: bg }}
          >
            <span className="text-[12px] leading-[16px] font-semibold uppercase" style={{ color: textColor }}>
              {tile.label}
            </span>

            <div className="flex flex-row items-center gap-3">
              <span className="text-[36px] leading-[44px] font-bold" style={{ color: textColor }}>
                {tile.value}
              </span>
              {tile.delta && (
                <span className="inline-flex items-center bg-white rounded-[6px] px-2 py-1 text-[12px] leading-[16px] font-semibold text-[#8A3A00]">
                  {tile.delta}
                </span>
              )}
            </div>

            <span className="text-[12px] leading-[16px]" style={{ color: textColor }}>
              {tile.subtext}
            </span>
          </div>
        );
      })}
    </div>
  );
}
