import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatWindow.css';

const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessageContent = (message) => {
    // Check if message contains event list
    if (message.text.includes('📖') || message.text.includes('👩‍🏫')) {
      return (
        <div className="event-list">
          {message.text.split('\n').map((line, index) => (
            line.trim() && <div key={index} className="event-item">{line}</div>
          ))}
        </div>
      );
    }
    
    // Regular message
    return message.text.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  return (
    <div className="chat-window">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`message ${message.sender}`}
          >
            <div className="message-avatar">
              {message.sender === 'bot' ? '📚' : '👤'}
            </div>
            <div className="message-content">
              <div className="message-text">
                {renderMessageContent(message)}
              </div>
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
