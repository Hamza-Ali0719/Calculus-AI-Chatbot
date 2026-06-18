import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// This function splits message text and renders math expressions
const renderMessageContent = (text) => {
  if (!text) return null;

  // Split by block math first: $$...$$
  const blockParts = text.split(/\$\$([\s\S]+?)\$\$/g);

  return blockParts.map((part, blockIndex) => {
    // Every odd index is a block math expression
    if (blockIndex % 2 === 1) {
      return (
        <BlockMath key={blockIndex} math={part} />
      );
    }

    // For normal text, check for inline math: $...$
    const inlineParts = part.split(/\$([\s\S]+?)\$/g);

    return inlineParts.map((inlinePart, inlineIndex) => {
      if (inlineIndex % 2 === 1) {
        return (
          <InlineMath key={`${blockIndex}-${inlineIndex}`} math={inlinePart} />
        );
      }
      // Plain text — split by newline to handle line breaks
      return inlinePart.split('\n').map((line, i, arr) => (
        <React.Fragment key={`${blockIndex}-${inlineIndex}-${i}`}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    });
  });
};

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.type === 'error';

  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'bot'}`}>
      <div
        className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'} ${isError ? 'error-bubble' : ''}`}
      >
        {isError ? (
          <span className="error-text">⚠️ {message.content}</span>
        ) : (
          <div className="message-content">
            {renderMessageContent(message.content)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;