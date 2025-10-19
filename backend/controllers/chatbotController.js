// In-memory storage for messages
const messagesStorage = new Map();
const eventsData = require('../data/eventsData');

// Handle chatbot messages
exports.handleMessage = (req, res) => {
  try {
    const { text, sessionId } = req.body;

    // Validate input
    if (!text || !sessionId) {
      return res.status(400).json({ 
        error: 'Missing required fields: text and sessionId' 
      });
    }

    // Initialize session storage if it doesn't exist
    if (!messagesStorage.has(sessionId)) {
      messagesStorage.set(sessionId, []);
    }

    const sessionMessages = messagesStorage.get(sessionId);

    // Save user message
    const userMessage = {
      id: Date.now() + '-user',
      text,
      sender: 'user',
      sessionId,
      timestamp: new Date()
    };
    sessionMessages.push(userMessage);

    // Generate bot response based on user input
    let botResponse = generateBotResponse(text.toLowerCase(), sessionId);

    // Save bot message
    const botMessage = {
      id: Date.now() + '-bot',
      text: botResponse.text,
      sender: 'bot',
      sessionId,
      timestamp: new Date()
    };
    sessionMessages.push(botMessage);

    res.json({
      message: botResponse
    });
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ 
      error: 'Sorry, I couldn\'t fetch that information. Please try again.',
      details: error.message 
    });
  }
};

// Get chat history
exports.getChatHistory = (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = messagesStorage.get(sessionId) || [];
    res.json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

// Generate bot response logic
function generateBotResponse(userInput, sessionId) {
  // Default response in case nothing matches
  const defaultResponse = {
    text: "I'm here to help! You can ask me about:\n\n🗓️ Complete schedule\n📅 Day-wise events\n📍 Location details\nℹ️ Event information\n\nPlease select from the menu or ask a specific question!",
    type: 'default'
  };

  try {
    const greetings = ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening'];
    const fullScheduleExact = ['show me the complete schedule', 'complete schedule', 'full schedule'];
    const dayScheduleExact = ['show me day-wise schedule', 'day-wise schedule', 'day wise schedule'];
    const locationKeywords = ['location', 'where', 'address', 'venue'];
    const contactKeywords = ['contact', 'phone', 'email', 'reach', 'more details'];

    // Check if this is the first message in the session to avoid duplicate welcome messages
    const sessionMessages = messagesStorage.get(sessionId) || [];
    const isFirstMessage = sessionMessages.length === 1; // Only the user's message has been added so far

    // Check for exact matches first
    if (fullScheduleExact.some(keyword => userInput === keyword || userInput.includes(keyword))) {
      // Generate a formatted schedule response
      const events = [...eventsData].sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        return a.time.localeCompare(b.time);
      });
      
      let scheduleText = "🗓️ COMPLETE SCHEDULE - PUNE BOOK FEST 2025 📚\n\n";
      
      let currentDay = -1;
      events.forEach(event => {
        if (event.day !== currentDay) {
          currentDay = event.day;
          scheduleText += `\n--- DAY ${event.day} - ${event.date} ---\n\n`;
        }
        scheduleText += `${event.time} - ${event.title}\n`;
        if (event.speaker && event.speaker.trim() !== '') {
          scheduleText += `Speaker: ${event.speaker}\n`;
        }
        scheduleText += `Location: ${event.location}\n`;
        scheduleText += `${event.description}\n\n`;
      });
      
      return {
        text: scheduleText,
        type: 'full_schedule'
      };
    }

    if (dayScheduleExact.some(keyword => userInput === keyword || userInput.includes(keyword))) {
      // Generate day-wise schedule response
      const days = [...new Set(eventsData.map(event => event.day))];
      let dayScheduleText = "📅 DAY-WISE SCHEDULE - PUNE BOOK FEST 2025 📚\n\n";
      
      days.forEach(day => {
        const dayEvents = eventsData.filter(event => event.day === day);
        const date = dayEvents[0]?.date || '';
        dayScheduleText += `--- DAY ${day} - ${date} ---\n`;
        dayScheduleText += `Total Events: ${dayEvents.length}\n\n`;
        
        dayEvents.sort((a, b) => a.time.localeCompare(b.time));
        dayEvents.forEach(event => {
          dayScheduleText += `${event.time} - ${event.title}\n`;
          if (event.speaker && event.speaker.trim() !== '') {
            dayScheduleText += `Speaker: ${event.speaker}\n`;
          }
          dayScheduleText += `Location: ${event.location}\n\n`;
        });
        
        dayScheduleText += "\n";
      });
      
      return {
        text: dayScheduleText,
        type: 'day_schedule'
      };
    }

    // Check for keyword matches
    if (greetings.some(greeting => userInput.includes(greeting)) && isFirstMessage) {
      return {
        text: "Hello! Welcome to Pune Book Fest 2025 📚\n\nI'm here to help you explore the festival. Please select from the menu below or ask me anything!",
        type: 'greeting'
      };
    }

    if (locationKeywords.some(keyword => userInput.includes(keyword))) {
      return {
        text: "📍 Pune Book Fest 2025 is being held at:\n\nSymbiosis International University, Gramajit Vimannagar Road, Pune\n\nClick 'Google Location' button for directions!",
        type: 'location'
      };
    }

    if (contactKeywords.some(keyword => userInput.includes(keyword))) {
      return {
        text: "📚 Pune Book Fest 2025 - Event Details\n\n📅 Dates: December 14-21, 2025\n\n📍 Venue: Symbiosis International University, Gramajit Vimannagar Road, Pune\n\n🎫 Ticket Information:\n\n• General Entry: Free\n• Workshop Registration: ₹300 per session\n• VIP Pass: ₹1500 (All 8 days access + Meet & Greet)\n\n📞 Contact:\n\n• Email: info@punebookfest2025.com\n• Phone: +91 98765 43210\n• Helpline: 1800-XXX-XXXX\n\n⏰ Timings: 10:00 AM - 9:00 PM (All Days)\n\n🅿️ Parking: Available on campus\n\n🍽️ Food: Multiple food stalls available",
        type: 'contact'
      };
    }

    // For subsequent messages, provide a more concise default response
    if (!isFirstMessage) {
      return {
        text: "I'm here to help! You can ask me about:\n\n🗓️ Complete schedule\n📅 Day-wise events\n📍 Location details\nℹ️ Event information\n\nPlease select from the menu or ask a specific question!",
        type: 'default'
      };
    }

    // Default greeting for first message if no specific keywords matched
    if (isFirstMessage) {
      return {
        text: "Hello! Welcome to Pune Book Fest 2025 📚\n\nI'm here to help you explore the festival. Please select from the menu below or ask me anything!",
        type: 'greeting'
      };
    }

    // Return default response if nothing else matches
    return defaultResponse;
  } catch (error) {
    console.error('Error in generateBotResponse:', error);
    // Return a safe default response in case of errors
    return defaultResponse;
  }
}
