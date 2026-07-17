import React from 'react';

export default function CarbonFootprint() {
  return (
    <section className="w-full">
      <h2 className="text-[18px] font-semibold text-[#1e232e] mb-4">Carbon Footprint</h2>
      <div className="relative rounded-xl overflow-hidden h-[200px] flex items-center justify-center px-6 bg-white border border-[#eaedf6]">
        {/* Top leaves */}
        <svg
          className="absolute top-0 left-0 w-full"
          height="60"
          viewBox="0 0 600 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="#5bd584" opacity="0.85">
            <ellipse cx="40" cy="0" rx="40" ry="30" />
            <ellipse cx="120" cy="-5" rx="35" ry="28" />
            <ellipse cx="200" cy="0" rx="42" ry="32" />
            <ellipse cx="290" cy="-8" rx="38" ry="26" />
            <ellipse cx="380" cy="0" rx="44" ry="32" />
            <ellipse cx="470" cy="-4" rx="36" ry="28" />
            <ellipse cx="560" cy="0" rx="40" ry="30" />
          </g>
          <g fill="#1a7a4a" opacity="0.6">
            <ellipse cx="80" cy="-2" rx="22" ry="16" />
            <ellipse cx="240" cy="-3" rx="22" ry="16" />
            <ellipse cx="430" cy="-2" rx="22" ry="16" />
          </g>
        </svg>

        {/* Bottom grass */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          height="40"
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="#5bd584">
            {Array.from({ length: 60 }).map((_, i) => (
              <path
                key={i}
                d={`M${i * 10} 40 L${i * 10 + 4} ${20 + (i % 3) * 5} L${i * 10 + 8} 40 Z`}
              />
            ))}
          </g>
        </svg>

        <p className="relative text-center text-[15px] text-[#1e232e] max-w-[560px] leading-relaxed">
          It takes <span className="font-bold text-[#1a7a3c]">7 trees</span> to balance your{' '}
          <span className="font-bold text-[#1e232e]">CO2</span> impact based on NET
          consumption of <span className="font-bold text-[#1a7a3c]">214 kWh</span> in the last
          period.
        </p>
      </div>
    </section>
  );
}
