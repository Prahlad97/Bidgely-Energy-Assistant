'use client';
import { useState } from 'react';
import type { FaqSection as FaqSectionType } from '../../types';

interface Props {
  section: FaqSectionType;
}

// FaqSection — each row is a white pill with a subtle Web/Background/400 1px
// stroke, NO shadow, radius 10, padding 16/16/16/24 (l=24 r=16 t=16 b=16).
export function FaqSection({ section }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section label — Webapp/Label/XS/Bold (12/16 SemiBold) Foreground/500 */}
      <span className="text-[12px] leading-[16px] font-semibold text-[#262E40] uppercase">
        COMMON QUESTIONS
      </span>
      <div className="flex flex-col gap-3">
        {section.items.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-[#F7F7F7] rounded-[10px] overflow-hidden"
          >
            <button
              className="flex items-center justify-between w-full pl-6 pr-4 py-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              {/* Question — Webapp/Label/SS/Regular (14/20) Foreground/700 */}
              <span className="text-[14px] leading-[20px] font-normal text-[#000000]">{item.question}</span>
              <svg
                className={`shrink-0 w-5 h-5 text-[#262E40] transition-transform ${
                  open === i ? 'rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open === i && (
              <div className="px-6 pb-4">
                {/* Answer — Webapp/Label/SS/Regular (14/20) Foreground/500 */}
                <p className="text-[14px] leading-[20px] font-normal text-[#262E40]">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
