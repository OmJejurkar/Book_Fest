const Message = require('../models/Message');
const Event = require('../models/Event');
const Link = require('../models/Link');

// Handle chatbot messages
exports.handleMessage = async (req, res) => {
  try {
    const { text, sessionId } = req.body;

    // Save user message
    const userMessage = new Message({
      text,
      sender: 'user',
      sessionId
    });
    await userMessage.save();

    // Generate bot response based on user input
    let botResponse = await generateBotResponse(text.toLowerCase());

    // Save bot message
    const botMessage = new Message({
      text: botResponse.text,
      sender: 'bot',
      sessionId
    });
    await botMessage.save();

    res.json({
      message: botResponse
    });
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};

// Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = await Message.find({ sessionId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

// Generate bot response logic
async function generateBotResponse(userInput) {
  const greetings = ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening'];
  const scheduleKeywords = ['schedule', 'timing', 'when', 'time'];
  const locationKeywords = ['location', 'where', 'address', 'venue'];
  const contactKeywords = ['contact', 'phone', 'email', 'reach'];

  if (greetings.some(greeting => userInput.includes(greeting))) {
    return {
      text: "Hello! Welcome to Pune Book Fest 2025 📚\n\nI'm here to help you explore the festival. Please select from the menu below or ask me anything!",
      type: 'greeting'
    };
  }

  if (scheduleKeywords.some(keyword => userInput.includes(keyword))) {
    return {
      text: "I can help you with the schedule! Please click on 'Schedule' for the complete event schedule or 'Day-wise Schedule' to see events by specific days.",
      type: 'schedule_prompt'
    };
  }

  if (locationKeywords.some(keyword => userInput.includes(keyword))) {
    return {
      text: "📍 Pune Book Fest 2025 is being held at:\n\nSymbiosis International University Campus\nGramajit Vimannagar Road, Pune\n\nClick 'Google Location' button for directions!",
      type: 'location'
    };
  }

  if (contactKeywords.some(keyword => userInput.includes(keyword))) {
    return {
      text: "📞 Contact Information:\n\nEmail: info@punebookfest2025.com\nPhone: +91 98765 43210\n\nFor more details, click the 'More Details' button!",
      type: 'contact'
    };
  }

  return {
    text: "I'm here to help! You can:\n\n🗓️ View the complete schedule\n📅 Check day-wise events\n🌐 Visit our social media\n📍 Get location details\n\nPlease use the menu buttons or ask me a specific question!",
    type: 'default'
  };
}
