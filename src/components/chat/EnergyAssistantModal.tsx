'use client';

// EnergyAssistantModal — fullscreen popup that wraps the ChatContainer.
//
// Two open animations:
//   • slide  — translateY from below the viewport (default; e.g. navbar trigger)
//   • morph  — clip-path expanding from a source rect on the page (e.g. home widget)
//
// Closing always reverses whichever animation opened it. Opening resets chat
// state so every session starts fresh.

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/lib/chat/store';
import ChatContainer from './ChatContainer';

export default function EnergyAssistantModal() {
  const modalOpen = useChatStore((s) => s.modalOpen);
  const modalOrigin = useChatStore((s) => s.modalOrigin);
  const closeModal = useChatStore((s) => s.closeModal);
  const ref = useRef<HTMLDivElement>(null);

  // Esc to close
  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalOpen, closeModal]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [modalOpen]);

  // Inline CSS vars for the morph animation
  const style: React.CSSProperties = modalOrigin
    ? ({
        ['--ea-from-top' as string]: `${modalOrigin.top}px`,
        ['--ea-from-right' as string]: `${modalOrigin.right}px`,
        ['--ea-from-bottom' as string]: `${modalOrigin.bottom}px`,
        ['--ea-from-left' as string]: `${modalOrigin.left}px`,
        ['--ea-from-radius' as string]: `${modalOrigin.radius}px`,
      } as React.CSSProperties)
    : {};

  const className =
    'ea-modal' +
    (modalOrigin ? ' morph' : ' slide') +
    (modalOpen ? ' open' : '');

  return (
    <div
      id="energy-assistant-modal"
      ref={ref}
      className={className}
      style={style}
      aria-hidden={!modalOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Energy Assistant"
    >
      <div className="ea-modal-inner">
        <ChatContainer />
      </div>
    </div>
  );
}
