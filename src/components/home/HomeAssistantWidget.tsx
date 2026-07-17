'use client';

// HomeAssistantWidget — embedded entry point on the Home dashboard.
//
// Renders the same AssistantPrompt block that the modal's WelcomeScreen uses,
// so the visuals are identical. No card chrome — sits directly on the
// dashboard background, the same way the popup welcome sits directly on the
// modal's white background.
//
// On send, captures the widget's bounding rect, opens the modal with that rect
// as the morph origin, and dispatches the chat input. The modal opens already
// showing the user's message + the AI's typing indicator, so the conversation
// transitions seamlessly from this surface into the popup.

import { useRef } from 'react';
import { useChatStore } from '@/lib/chat/store';
import AssistantPrompt from '@/components/chat/AssistantPrompt';
import { useSendChat } from '@/lib/chat/useSendChat';

export default function HomeAssistantWidget() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const openModal = useChatStore((s) => s.openModal);
  const send = useSendChat();

  function handleSend(text: string) {
    const card = wrapperRef.current;
    const rect = card?.getBoundingClientRect();
    if (rect) {
      openModal({
        top: rect.top,
        right: window.innerWidth - rect.right,
        bottom: window.innerHeight - rect.bottom,
        left: rect.left,
        radius: 0,
      });
    } else {
      openModal();
    }
    send(text);
  }

  return (
    <div ref={wrapperRef} className="home-assistant-widget">
      <AssistantPrompt onSend={handleSend} showAccountInfo={false} />
    </div>
  );
}
