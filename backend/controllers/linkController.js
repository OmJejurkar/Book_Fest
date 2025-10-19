const linksData = require('../data/linksData');

// Get all links
exports.getAllLinks = (req, res) => {
  try {
    res.json(linksData);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Failed to fetch links' });
  }
};

// Get link by name
exports.getLinkByName = (req, res) => {
  try {
    const { name } = req.params;
    const link = linksData.find(link => link.name === name.toLowerCase());
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    res.json(link);
  } catch (error) {
    console.error('Error fetching link:', error);
    res.status(500).json({ error: 'Failed to fetch link' });
  }
};