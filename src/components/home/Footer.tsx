import React from 'react';

const socials = [
  {
    label: 'Facebook',
    path: 'M13 22v-8h3l1-4h-4V7.5c0-1.2.3-2 2-2h2V2.1A28 28 0 0014.6 2C12 2 10 3.6 10 6.7V10H7v4h3v8h3z',
  },
  {
    label: 'Twitter',
    path: 'M22 5.8a8 8 0 01-2.4.7 4 4 0 001.8-2.2 8 8 0 01-2.6 1 4 4 0 00-7 3.7A11.5 11.5 0 013 4.5a4 4 0 001.3 5.4 4 4 0 01-1.8-.5v.1a4 4 0 003.3 4 4 4 0 01-1.8.1A4 4 0 008 16.4 8 8 0 012 18a11.4 11.4 0 006.3 1.8c7.5 0 11.6-6.2 11.6-11.6v-.5A8 8 0 0022 5.8z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.9.2 2.3.4.6.2 1 .5 1.5 1s.7.9 1 1.5c.1.4.3 1.1.4 2.3 0 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.4 2.3-.3.6-.5 1-1 1.5s-.9.7-1.5 1c-.4.1-1.1.3-2.3.4-1.2 0-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.3-.4-.6-.3-1-.5-1.5-1s-.7-.9-1-1.5c-.1-.4-.3-1.1-.4-2.3 0-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.9.4-2.3.3-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1.1-.4 2.3-.4 1.2-.1 1.6-.1 4.8-.1zm0 6a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6zm5-1.4a.9.9 0 100 1.8.9.9 0 000-1.8z',
  },
  {
    label: 'YouTube',
    path: 'M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3-5.2 3z',
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#eef3f8] py-10">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="w-8 h-8 rounded-full bg-[#3a4a6b] hover:bg-[#1d6cdb] flex items-center justify-center text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
        <div className="text-center text-[12px] text-[#616f89] leading-6">
          <div className="font-semibold text-[#1e232e]">EnergyCo</div>
          <div>15 BallPark Avenue</div>
          <div>City, ST 12345</div>
          <div>1-800-000-0000</div>
          <a href="https://www.energyco.com/contactUs" className="text-[#616f89] hover:underline">
            https://www.&lt;energyco&gt;.com/ContactUs
          </a>
        </div>
        <div className="text-[12px] text-[#1d6cdb]">
          <a href="#" className="hover:underline">Terms of Service</a>
          <span className="mx-1">-</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
