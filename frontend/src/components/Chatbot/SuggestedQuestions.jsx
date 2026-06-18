import React from 'react';

// Topic-based suggested questions
const topicQuestions = {
  limit: [
    "What is the limit of sin(x)/x as x approaches 0?",
    "How do you solve limits at infinity?",
    "What is L'Hôpital's rule?",
    "What does it mean when a limit does not exist?",
  ],
  derivative: [
    "What is the chain rule?",
    "How do you find the derivative of sin(x)?",
    "What is the product rule?",
    "How do you differentiate implicit functions?",
  ],
  integral: [
    "What is the difference between definite and indefinite integrals?",
    "How do you use integration by parts?",
    "What is the fundamental theorem of calculus?",
    "How do you solve improper integrals?",
  ],
  continuity: [
    "What makes a function continuous?",
    "What is a removable discontinuity?",
    "How is continuity related to differentiability?",
    "Can a function be continuous but not differentiable?",
  ],
  default: [
    "What is a derivative?",
    "How do I solve a basic integral?",
    "What is the chain rule?",
    "Explain limits with an example.",
  ],
};

// Detect topic from last bot message
const detectTopic = (messages) => {
  if (!messages || messages.length === 0) return 'default';

  // Get last bot message
  const lastBotMessage = [...messages]
    .reverse()
    .find((m) => m.role === 'bot' || m.role === 'assistant');

  if (!lastBotMessage) return 'default';

  const text = lastBotMessage.content?.toLowerCase() || '';

  if (text.includes('limit') || text.includes('continuity')) return 'limit';
  if (text.includes('derivative') || text.includes('differentiat')) return 'derivative';
  if (text.includes('integral') || text.includes('integrat')) return 'integral';
  if (text.includes('continu')) return 'continuity';

  return 'default';
};

const SuggestedQuestions = ({ messages, onQuestionClick }) => {
  const topic = detectTopic(messages);
  const questions = topicQuestions[topic];

  return (
    <div className="suggested-questions">
      <p>Suggested questions:</p>
      {questions.map((question, index) => (
        <button
          key={index}
          className="suggestion-chip"
          onClick={() => onQuestionClick(question)}
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;