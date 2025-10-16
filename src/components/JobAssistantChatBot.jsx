import { useState, useRef, useEffect } from 'react';

export function JobAssistant({ jobContext, isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your job search assistant. I can help you with career advice, resume tips, interview preparation, and job search strategies. How can I help you today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();

    if (!userMessage) return;

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInputValue('');

    try {
      const response = await fetch('/api/ChatBotJobAssistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, jobContext }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assistant response.');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (error) {
      console.error('Error fetching assistant response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again or ask a different question.',
        },
      ]);
    }
  };

  // Quick prompt buttons
  const quickPrompts = [
    'How do I write a good resume?',
    'Tips for job interviews',
    'What skills are in demand?',
    'How to negotiate salary?',
    'Remote work best practices',
  ];

  const handleQuickPrompt = (prompt) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="job-assistant-overlay">
      <div className="job-assistant-panel">
        {/* Header */}
        <div className="assistant-header">
          <h3>🤖 Job Search Assistant</h3>
          <button
            onClick={onClose}
            className="close-btn"
            aria-label="Close assistant"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="assistant-messages" aria-live="polite">
          {messages.map((message, index) => (
            <div key={index} className={`message message--${message.role}`}>
              <div className="message-avatar">
                {message.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <strong>
                  {message.role === 'user' ? 'You' : 'Assistant'}:
                </strong>
                <p>{message.content}</p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="quick-prompts">
          <p>Quick questions:</p>
          <div className="prompt-buttons">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="prompt-btn"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="assistant-form">
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me about jobs, careers, or applications..."
              aria-label="Chat with job assistant"
              required
            />
            <button
              type="submit"
              className="send-btn"
            >
              📤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}