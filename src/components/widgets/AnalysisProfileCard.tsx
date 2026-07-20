import type { AnalysisProfileSection } from '@/lib/chat/types';

interface Props {
  sections: AnalysisProfileSection[];
}

// AnalysisProfileCard — inline chat-bubble widget showing "what we already
// know" before handing off to a report (e.g. the Solar flow's auto-detected
// home + roof profile). Two-column label/value rows, dashed dividers,
// grouped under bold section headings — no user input required.
export default function AnalysisProfileCard({ sections }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-2 mb-1 w-full max-w-[460px]">
      {sections.map((section) => (
        <div key={section.heading} className="flex flex-col gap-1">
          <p className="text-[15px] font-semibold text-[#1e232e] m-0">{section.heading}</p>
          <div className="flex flex-col">
            {section.rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 py-2.5 ${
                  i > 0 ? 'border-t border-dashed border-[#dfdfe0]' : ''
                }`}
              >
                <span className="flex items-center gap-2 text-[14px] text-[#1e232e] whitespace-nowrap">
                  <span aria-hidden="true">{row.icon}</span>
                  {row.label}
                </span>
                <span className="text-[14px] text-[#1e232e] text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
