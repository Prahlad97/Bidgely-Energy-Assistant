'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/lib/chat/store';
import MessageBubble from './MessageBubble';

export default function MessageThread() {
  const { messages, isTyping } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div id="message-thread">
      {messages.map((msg, i) => (
        <MessageBubble key={msg.id} message={msg} isLast={i === messages.length - 1} />
      ))}
      {isTyping && (
        <div className="message-group ai-group">
          <div className="typing-dots">
            <span /><span /><span />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
