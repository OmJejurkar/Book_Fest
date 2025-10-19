import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import MenuButtons from './components/MenuButtons';
import { sendMessage, getAllEvents, getEventsByDay, getEventDays } from './utils/api';
import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Removed the welcome message here - it will be handled by the backend
    // when the user sends their first message

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  const addBotMessage = (text) => {
    const botMessage = {
      text,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const addUserMessage = (text) => {
    const userMessage = {
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const handleSendMessage = async (text) => {
    // Add user message
    addUserMessage(text);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Send to backend
      const response = await sendMessage(text, sessionId);
      
      // Simulate typing delay
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(response.message.text);
      }, 800);

      // Emit via socket
      if (socket) {
        socket.emit('send_message', { text, sessionId, sender: 'user' });
      }
    } catch (error) {
      setIsTyping(false);
      addBotMessage("Sorry, I'm having trouble connecting. Please try again later.");
    }
  };

  const handleMenuClick = async (action) => {
    setIsTyping(true);

    try {
      if (action.type === 'link') {
        addUserMessage(`Open ${action.name}`);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(`Opening ${action.name} in a new tab! 🚀`);
        }, 500);
      } else if (action.type === 'show_schedule') {
        addUserMessage('Show me the complete schedule');
        const events = await getAllEvents();
      
        setTimeout(() => {
          setIsTyping(false);
          const scheduleText = formatFullSchedule(events);
          addBotMessage(scheduleText);
        }, 800);
      } else if (action.type === 'show_day_schedule') {
        addUserMessage('Show me day-wise schedule');
        const days = await getEventDays();
      
        setTimeout(() => {
          setIsTyping(false);
          const daysText = `Please select a day to view the schedule:\n\n${days.map(d => `📅 Day ${d.day} - ${d.date} (${d.eventCount} events)`).join('\n')}`;
          addBotMessage(daysText);
        
          // Show day selection buttons
          showDayButtons(days);
        }, 800);
      } else if (action.type === 'show_more') {
        addUserMessage('Tell me more details');
        setTimeout(() => {
          setIsTyping(false);
          const moreDetails = `📚 Pune Book Fest 2025 - Event Details

📅 Dates: December 14-21, 2024
📍 Venue: Fergusson College Ground, Pune

🎫 Ticket Information:
• General Entry: Free
• Workshop Registration: ₹300 per session
• VIP Pass: ₹1500 (All 8 days access + Meet & Greet)

📞 Contact:
• Email: info@punebookfest2024.com
• Phone: +91 98765 43210
• Helpline: 1800-XXX-XXXX

⏰ Timings: 10:00 AM - 9:00 PM (All Days)

🅿️ Parking: Available on campus
🍽️ Food: Multiple food stalls available`;
          addBotMessage(moreDetails);
        }, 800);
      }
    } catch (error) {
      setIsTyping(false);
      console.error('API Error:', error);
      // Provide more specific error messages
      if (error.response) {
        // Server responded with error status
        addBotMessage(`Sorry, I received an error from the server: ${error.response.status}. Please try again.`);
      } else if (error.request) {
        // Request was made but no response received
        addBotMessage("Sorry, I couldn't connect to the server. Please check your internet connection and try again.");
      } else {
        // Something else happened
        addBotMessage("Sorry, I couldn't fetch that information. Please try again.");
      }
    }
  };

  const showDayButtons = (days) => {
    // This would show interactive day buttons in a real implementation
    // For now, we'll add instructions
    setTimeout(() => {
      addBotMessage("Type 'Day 1', 'Day 2', or 'Day 3' to see events for that specific day!");
    }, 1000);
  };

  const formatFullSchedule = (events) => {
    if (!events || events.length === 0) {
      return "No events scheduled at the moment.";
    }

    let schedule = "📅 Complete Event Schedule - Pune Book Fest 2025\n\n";
    
    // Group events by day
    const eventsByDay = events.reduce((acc, event) => {
      if (!acc[event.day]) acc[event.day] = [];
      acc[event.day].push(event);
      return acc;
    }, {});

    Object.keys(eventsByDay).sort().forEach(day => {
      const dayEvents = eventsByDay[day];
      schedule += `\n━━━ Day ${day} - ${dayEvents[0].date} ━━━\n\n`;
      
      dayEvents.forEach(event => {
        schedule += `🕐 ${event.time}\n`;
        schedule += `📖 ${event.title}\n`;
        if (event.speaker) schedule += `👤 ${event.speaker}\n`;
        schedule += `📍 ${event.location}\n\n`;
      });
    });

    return schedule;
  };

  // Listen for day requests in messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      const text = lastMessage.text.toLowerCase();
      const dayMatch = text.match(/day (\d)/);
      
      if (dayMatch) {
        const dayNumber = parseInt(dayMatch[1]);
        if (dayNumber >= 1 && dayNumber <= 3) {
          fetchDaySchedule(dayNumber);
        }
      }
    }
  }, [messages]);

  const fetchDaySchedule = async (day) => {
    setIsTyping(true);
    try {
      const events = await getEventsByDay(day);
      setTimeout(() => {
        setIsTyping(false);
        const scheduleText = formatDaySchedule(day, events);
        addBotMessage(scheduleText);
      }, 800);
    } catch (error) {
      setIsTyping(false);
      console.error('API Error:', error);
      // Provide more specific error messages
      if (error.response) {
        // Server responded with error status
        addBotMessage(`Sorry, I received an error from the server: ${error.response.status}. Please try again.`);
      } else if (error.request) {
        // Request was made but no response received
        addBotMessage("Sorry, I couldn't connect to the server. Please check your internet connection and try again.");
      } else {
        // Something else happened
        addBotMessage(`Sorry, couldn't fetch schedule for Day ${day}. Please try again.`);
      }
    }
  };

  const formatDaySchedule = (day, events) => {
    if (!events || events.length === 0) {
      return `No events scheduled for Day ${day}.`;
    }

    let schedule = `📅 Day ${day} Schedule - ${events[0].date}\n\n`;
    
    events.forEach((event, index) => {
      schedule += `${index + 1}. 🕐 ${event.time}\n`;
      schedule += `   📖 ${event.title}\n`;
      if (event.speaker) schedule += `   👤 ${event.speaker}\n`;
      schedule += `   📍 ${event.location}\n`;
      if (event.description) schedule += `   📝 ${event.description}\n`;
      schedule += '\n';
    });

    return schedule;
  };

  return (
    <div className="app-container">
      <div className="chat-header">
        <div className="header-content">
          <div className="header-icon">📚</div>
          <div className="header-text">
            <h1>Pune Book Fest 2025</h1>
            <p>Your Virtual Festival Guide</p>
          </div>
        </div>
      </div>

      <MenuButtons onMenuClick={handleMenuClick} />

      <motion.div 
        className="chat-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ChatWindow messages={messages} />
        
        {isTyping && (
          <div className="typing-container">
            <div className="typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </motion.div>
    </div>
  );
};

export default App;
