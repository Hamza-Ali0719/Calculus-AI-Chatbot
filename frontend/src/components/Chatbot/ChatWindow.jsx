import React, { useEffect, useRef } from 'react';
import Message from './Message';

const ChatWindow = ({ messages, isTyping }) => {
  const bottomRef = useRef(null);

  // Auto scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chat-window">

      {/* Render all messages */}
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}

      {/* Typing indicator — shows when bot is responding */}
      {isTyping && (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {/* This empty div keeps scroll at the bottom */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;