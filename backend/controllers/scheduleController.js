const Event = require('../models/Event');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ day: 1, time: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get events by day
exports.getEventsByDay = async (req, res) => {
  try {
    const { day } = req.params;
    const events = await Event.find({ day: parseInt(day) }).sort({ time: 1 });
    
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
exports.getEventDays = async (req, res) => {
  try {
    const days = await Event.distinct('day');
    const daysSummary = await Promise.all(
      days.map(async (day) => {
        const dayEvents = await Event.find({ day }).sort({ time: 1 });
        return {
          day,
          date: dayEvents[0]?.date || '',
          eventCount: dayEvents.length
        };
      })
    );
    res.json(daysSummary.sort((a, b) => a.day - b.day));
  } catch (error) {
    console.error('Error fetching event days:', error);
    res.status(500).json({ error: 'Failed to fetch event days' });
  }
};
