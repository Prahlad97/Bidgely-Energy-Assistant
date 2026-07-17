'use client';

// useSendChat — single source of truth for "what happens when a user sends
// a message into the assistant". Both the modal's WelcomeScreen and the
// home dashboard's HomeAssistantWidget call this so the conversation flow,
// timing, and side-effects stay identical across surfaces.

import { useChatStore } from './store';
import { dispatchInput } from './responses';
import { getSolarStep } from './flows/solar';
import { getEvMessage } from './flows/ev';

export function useSendChat() {
  const setChatMode = useChatStore((s) => s.setChatMode);
  const addMessage = useChatStore((s) => s.addMessage);
  const setIsTyping = useChatStore((s) => s.setIsTyping);
  const openPanel = useChatStore((s) => s.openPanel);
  const setFlow = useChatStore((s) => s.setFlow);

  return function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setChatMode(true);
    addMessage({
      id: Math.random().toString(36).slice(2),
      role: 'user',
      text: trimmed,
      timestamp: Date.now(),
    });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const result = dispatchInput(trimmed);
      if (result.startFlow === 'solar') {
        setFlow('solar', 0, {});
        addMessage(getSolarStep(0, {}));
      } else if (result.startFlow === 'ev') {
        setFlow('ev', 0, {});
        addMessage(getEvMessage());
      } else {
        addMessage(result.message);
        if (result.openPanel) openPanel(result.openPanel.key, result.openPanel.title);
      }
    }, 700);
  };
}
