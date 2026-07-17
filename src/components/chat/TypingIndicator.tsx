export default function TypingIndicator() {
  return (
    <div className="message-row">
      <div className="message-avatar">⚡</div>
      <div className="typing-indicator">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
