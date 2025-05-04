import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);

    try {
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id || 'anonymous';

      // Call FastAPI chatbot service
      const response = await axios.post('http://localhost:8001/chat', {
        message: userMessage,
        user_id: userId
      });

      // Add bot response to chat
      setMessages(prev => [...prev, { 
        text: response.data.response,
        sender: 'bot',
        confidence: response.data.confidence
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        error: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow'
              }`}
            >
              <p>{message.text}</p>
              {message.sender === 'bot' && message.confidence && (
                <p className="text-xs text-gray-500 mt-1">
                  Confidence: {(message.confidence * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white rounded-lg p-3 shadow">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Chatbot; 