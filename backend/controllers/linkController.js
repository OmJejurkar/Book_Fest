const Link = require('../models/Link');

// Get all links
exports.getAllLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Failed to fetch links' });
  }
};

// Get link by name
exports.getLinkByName = async (req, res) => {
  try {
    const { name } = req.params;
    const link = await Link.findOne({ name: name.toLowerCase() });
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    res.json(link);
  } catch (error) {
    console.error('Error fetching link:', error);
    res.status(500).json({ error: 'Failed to fetch link' });
  }
};
