import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your farming assistant. How can I help you with your potato crop today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: input })
      });
    
      const data = await res.json();
    
      const botMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      };
    
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const botMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I couldn\'t process your request. Please try again later.',
        timestamp: new Date()
      };
    
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }    
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Farming Assistant
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chat with our AI assistant to get advice about potato diseases, treatment options, and general farming tips.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs sm:max-w-sm md:max-w-md rounded-lg px-4 py-2 flex ${
                    message.role === 'user' 
                      ? 'bg-green-600 text-white rounded-tr-none ml-12' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none mr-12'
                  }`}
                >
                  <div className="flex-shrink-0 mr-3">
                    {message.role === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-green-200' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center rounded-tl-none mr-12">
                  <Loader2 className="h-5 w-5 text-green-600 animate-spin mr-2" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about potato diseases or farming advice..."
              className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;