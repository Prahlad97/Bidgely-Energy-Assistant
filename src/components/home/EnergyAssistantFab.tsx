'use client';

// EnergyAssistantFab — floating action button (bottom-right) that opens the
// Energy Assistant modal. Renders the brand gradient chat-bubble icon with a
// white sparkle (per Figma node 2164:5048). Hidden while the modal is open.

import { useChatStore } from '@/lib/chat/store';

export default function EnergyAssistantFab() {
  const openModal = useChatStore((s) => s.openModal);
  const modalOpen = useChatStore((s) => s.modalOpen);

  if (modalOpen) return null;

  return (
    <button
      type="button"
      className="ea-fab"
      onClick={() => openModal()}
      aria-label="Open Energy Assistant"
    >
      <span className="ea-fab-label">Energy Assistant</span>
      <span className="ea-fab-icon">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient
              id="ea-fab-gradient"
              x1="6.5"
              y1="12.8"
              x2="119.61"
              y2="72.79"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0F4184" />
              <stop offset="0.233409" stopColor="#1E62C1" />
              <stop offset="0.4" stopColor="#94207B" />
              <stop offset="0.6" stopColor="#E4194B" />
              <stop offset="0.8" stopColor="#E4194B" />
              <stop offset="1" stopColor="#F1774A" />
            </linearGradient>
          </defs>
          {/* Chat bubble (offset 3px from top, per Figma 6.25% inset) */}
          <path
            transform="translate(0,3)"
            d="M24 42C37.254 42 48 32.598 48 21C48 9.402 37.254 0 24 0C10.746 0 0 9.402 0 21C0 26.28 2.229 31.11 5.91 34.8C5.619 37.848 4.659 41.19 3.597 43.698C3.36 44.256 3.819 44.88 4.416 44.784C11.184 43.674 15.207 41.97 16.956 41.082C19.2533 41.6969 21.6218 42.0056 24 42Z"
            fill="url(#ea-fab-gradient)"
          />
          {/* White sparkle, centered in the bubble */}
          <g transform="translate(14,15)" fill="#fff">
            <path d="M9.7561 0L12.1951 7.125L19.5122 9.5L12.1951 11.875L9.7561 19L7.31707 11.875L0 9.5L7.31707 7.125L9.7561 0Z" />
            <path d="M16.5854 1.9L17.561 4.275L20 5.225L17.561 6.175L16.5854 8.55L15.6098 6.175L13.1707 5.225L15.6098 4.275L16.5854 1.9Z" />
          </g>
        </svg>
      </span>
    </button>
  );
}
