'use client';

// WelcomeScreen — the modal's idle state, shown until the user sends their
// first message. The visual block is shared with the home dashboard's
// HomeAssistantWidget via AssistantPrompt; the only popup-specific bits are
// the surrounding #welcome-screen layout shell and the bottom disclaimer.

import AssistantPrompt from './AssistantPrompt';
import { useSendChat } from '@/lib/chat/useSendChat';

export default function WelcomeScreen() {
  const send = useSendChat();

  return (
    <div id="welcome-screen">
      <AssistantPrompt onSend={send} showAccountInfo />
      <p className="disclaimer">AI can make mistakes. Verify important information.</p>
    </div>
  );
}
