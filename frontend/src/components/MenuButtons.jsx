import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllLinks } from '../utils/api';
import './MenuButtons.css';

const MenuButtons = ({ onMenuClick }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await getAllLinks();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  const menuItems = [
    { 
      id: 'schedule', 
      label: 'Schedule', 
      icon: '🗓️',
      action: 'show_schedule'
    },
    { 
      id: 'day-schedule', 
      label: 'Day-wise Schedule', 
      icon: '📅',
      action: 'show_day_schedule'
    },
    { 
      id: 'youtube', 
      label: 'YouTube', 
      icon: '🎥',
      action: 'open_link',
      linkName: 'youtube'
    },
    { 
      id: 'facebook', 
      label: 'Facebook', 
      icon: '👍',
      action: 'open_link',
      linkName: 'facebook'
    },
    { 
      id: 'instagram', 
      label: 'Instagram', 
      icon: '📸',
      action: 'open_link',
      linkName: 'instagram'
    },
    { 
      id: 'website', 
      label: 'Website', 
      icon: '🌐',
      action: 'open_link',
      linkName: 'website'
    },
    { 
      id: 'location', 
      label: 'Google Location', 
      icon: '📍',
      action: 'open_link',
      linkName: 'location'
    },
    { 
      id: 'more', 
      label: 'More Details', 
      icon: 'ℹ️',
      action: 'show_more'
    }
  ];

  const handleClick = (item) => {
    if (item.action === 'open_link') {
      const link = links.find(l => l.name === item.linkName);
      if (link) {
        window.open(link.url, '_blank');
        onMenuClick({
          type: 'link',
          name: item.label,
          url: link.url
        });
      }
    } else {
      onMenuClick({
        type: item.action,
        name: item.label
      });
    }
  };

  return (
    <div className="menu-buttons-container">
      <div className="menu-title">Quick Actions</div>
      <div className="menu-buttons-grid">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            className="menu-button"
            onClick={() => handleClick(item)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MenuButtons;
