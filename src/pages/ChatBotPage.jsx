import JobAssistantChatBot from '../components/JobAssistantChatBot';

function ChatBotPage() {
  return (
    <div className="chatbot-page">
      <h1>Job Assistant</h1>
      <p>Ask me anything about your job search, resume tips, or career advice!</p>
      <JobAssistantChatBot /> {/* Render the chatbot */}
    </div>
  );
}

export default ChatBotPage;