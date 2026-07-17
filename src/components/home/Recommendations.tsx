import React from 'react';

type Tag = 'Insight' | 'Recommendation';
type Item = { tag: Tag; title?: string; body: string; date: string };

const items: Item[] = [
  {
    tag: 'Insight',
    body:
      'Maintain a minimum clearance around your fridge. Keeping some room between your fridge coils and the wall will increase cooling efficiency.',
    date: 'August 9, 2021',
  },
  {
    tag: 'Recommendation',
    title: 'Keep your fridge cool',
    body:
      'Maintain a minimum clearance around your fridge. Keeping some room between your fridge coils and the wall will increase cooling efficiency.',
    date: 'August 4, 2021',
  },
  {
    tag: 'Insight',
    body: 'You used 11% less energy on Lighting than similar homes last month. Great job!',
    date: 'August 2, 2021',
  },
];

const tagColors: Record<Tag, string> = {
  Insight: 'bg-[#1d6cdb]',
  Recommendation: 'bg-[#ec5b8c]',
};

export default function Recommendations() {
  return (
    <div className="bg-white rounded-xl border border-[#eaedf6] p-6 h-full flex flex-col">
      <h3 className="text-[15px] font-semibold text-[#1e232e]">Recommendations for you</h3>

      <ul className="mt-4 flex-1 space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-lg bg-[#f4f6fa] p-4 relative"
          >
            <span
              className={`inline-flex items-center h-5 px-2.5 rounded-full text-[10px] font-semibold text-white ${tagColors[item.tag]}`}
            >
              {item.tag}
            </span>
            <span className="absolute top-4 right-4 text-[11px] text-[#9a9a9a]">{item.date}</span>
            {item.title && (
              <div className="mt-2 text-[14px] font-semibold text-[#1e232e]">{item.title}</div>
            )}
            <p className="mt-2 text-[12px] text-[#333] leading-relaxed">{item.body}</p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 h-9 w-full rounded-md border border-[#1d6cdb] text-[#1d6cdb] text-[12px] font-semibold tracking-wider hover:bg-[#dbe7fe] transition-colors"
      >
        READ MORE
      </button>
    </div>
  );
}
