const eventsData = require('../data/eventsData');

// Get all events
exports.getAllEvents = (req, res) => {
  try {
    const events = [...eventsData].sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      return a.time.localeCompare(b.time);
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get events by day
exports.getEventsByDay = (req, res) => {
  try {
    const { day } = req.params;
    const events = eventsData.filter(event => event.day === parseInt(day))
      .sort((a, b) => a.time.localeCompare(b.time));
    
    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found for this day' });
    }
    
    res.json(events);
  } catch (error) {
    console.error('Error fetching events by day:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get event days summary
exports.getEventDays = (req, res) => {
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
    res.json(daysSummary.sort((a, b) => a.day - b.day));
  } catch (error) {
    console.error('Error fetching event days:', error);
    res.status(500).json({ error: 'Failed to fetch event days' });
  }
};