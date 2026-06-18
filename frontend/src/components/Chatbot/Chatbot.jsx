import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import SuggestedQuestions from './SuggestedQuestions';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Hi! I am your Calculus Assistant 👋 Ask me anything about limits, derivatives, integrals, or continuity!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Send message handler
  const sendMessage = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Call your backend API
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        role: 'bot',
        content: data.response || data.message || 'Sorry, I did not understand that.',
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      // Show error message in chat
      const errorMessage = {
        role: 'bot',
        type: 'error',
        content: 'Something went wrong. Please check your connection and try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">

      {/* Header */}
      <div className="chatbot-header">
        <span>🧮 Calculus Assistant</span>
      </div>

      {/* Chat messages */}
      <ChatWindow messages={messages} isTyping={isTyping} />

      {/* Suggested questions */}
      <SuggestedQuestions
        messages={messages}
        onQuestionClick={(question) => sendMessage(question)}
      />

      {/* Input area */}
      <div className="chatbot-input-area">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Ask a calculus question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="chatbot-send-btn"
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default Chatbot;