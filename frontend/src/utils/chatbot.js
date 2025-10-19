import eventsData from '../data/eventsData';
import linksData from '../data/linksData';

// Generate bot response logic
export const generateBotResponse = (userInput) => {
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
    if (greetings.some(greeting => userInput.includes(greeting))) {
      return {
        text: "Hello! Welcome to Pune Book Fest 2025 📚\n\nI'm here to help you explore the festival. Please select from the menu below or ask me anything!",
        type: 'greeting'
      };
    }

    if (locationKeywords.some(keyword => userInput.includes(keyword))) {
      return {
        text: "📍 Pune Book Fest 2025 is being held at:\n\nFergusson College, Pune\nFergusson College Rd, Shivajinagar, Pune, Maharashtra 411004\n\nClick 'Google Location' button for directions!",
        type: 'location'
      };
    }

    if (contactKeywords.some(keyword => userInput.includes(keyword))) {
      return {
        text: "📚 Pune Book Fest 2025 - Event Details\n\n📅 Dates: December 13-21, 2025\n\n📍 Venue: Fergusson College, Pune\nFergusson College Rd, Shivajinagar, Pune, Maharashtra 411004\n\n🎫 Ticket Information:\n\n• General Entry: Free\n• Workshop Registration: ₹300 per session\n• VIP Pass: ₹1500 (All 9 days access + Meet & Greet)\n\n📞 Contact:\n\n• Email: info@punebookfest2025.com\n• Phone: +91 98765 43210\n• Helpline: 1800-XXX-XXXX\n\n⏰ Timings: 10:00 AM - 9:00 PM (All Days)\n\n🅿️ Parking: Available on campus\n\n🍽️ Food: Multiple food stalls available",
        type: 'contact'
      };
    }

    // Return default response if nothing else matches
    return defaultResponse;
  } catch (error) {
    console.error('Error in generateBotResponse:', error);
    // Return a safe default response in case of errors
    return defaultResponse;
  }
};

// Get all events
export const getAllEvents = () => {
  try {
    const events = [...eventsData].sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      return a.time.localeCompare(b.time);
    });
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
};

// Get events by day
export const getEventsByDay = (day) => {
  try {
    const events = eventsData.filter(event => event.day === parseInt(day))
      .sort((a, b) => a.time.localeCompare(b.time));
    
    if (events.length === 0) {
      throw new Error('No events found for this day');
    }
    
    return events;
  } catch (error) {
    console.error('Error fetching events by day:', error);
    throw new Error('Failed to fetch events');
  }
};

// Get event days summary
export const getEventDays = () => {
  try {
    const days = [...new Set(eventsData.map(event => event.day))];
    const daysSummary = days.map(day => {
      const dayEvents = eventsData.filter(event => event.day === day);
      return {
        day,
        date: dayEvents[0]?.date || '',
        eventCount: dayEvents.length
      };
    });
    return daysSummary.sort((a, b) => a.day - b.day);
  } catch (error) {
    console.error('Error fetching event days:', error);
    throw new Error('Failed to fetch event days');
  }
};

// Get all links
export const getAllLinks = () => {
  try {
    return linksData;
  } catch (error) {
    console.error('Error fetching links:', error);
    throw new Error('Failed to fetch links');
  }
};

// Get link by name
export const getLinkByName = (name) => {
  try {
    const link = linksData.find(link => link.name === name.toLowerCase());
    
    if (!link) {
      throw new Error('Link not found');
    }
    
    return link;
  } catch (error) {
    console.error('Error fetching link:', error);
    throw new Error('Failed to fetch link');
  }
};