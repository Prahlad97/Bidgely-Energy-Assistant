import React from 'react';

export default function Promotions() {
  return (
    <section className="w-full">
      <h2 className="text-[18px] font-semibold text-[#1e232e] mb-4">Promotions</h2>
      <div className="bg-white rounded-xl border border-[#eaedf6] overflow-hidden">
        <div className="flex items-center gap-6 p-6">
          {/* Thumbnail placeholder */}
          <div
            className="w-[180px] h-[120px] rounded-lg flex-shrink-0"
            style={{
              background:
                'linear-gradient(135deg, #f59f3a 0%, #ec5b8c 50%, #1d5ed8 100%)',
            }}
            aria-label="Promotion image"
          />
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-[#1e232e]">
              $10 Off Energy Efficient Lighting
            </h3>
            <p className="mt-2 text-[13px] text-[#616f89] leading-relaxed">
              Find out more about how you can save $10 when you purchase energy efficient lighting,
              such as LED lightbulbs.
            </p>
            <button
              type="button"
              className="mt-4 h-9 px-5 rounded-md bg-[#1d6cdb] text-white text-[13px] font-medium hover:bg-[#1a4fbb] transition-colors"
            >
              View Offer
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-[#f4f6fa] border-t border-[#eaedf6] text-[12px] text-[#616f89]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 21h6m-3-18a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-1.3A7 7 0 0012 3z"
              stroke="#f59f3a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>You used 10% more lighting compared to similar homes in the last billing cycle.</span>
        </div>
      </div>
    </section>
  );
}
