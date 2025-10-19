import React from 'react';
import { motion } from 'framer-motion';
import './MenuButtons.css';

const MenuButtons = ({ onMenuClick }) => {
  const menuActions = [
    { 
      id: 1, 
      icon: '📅', 
      label: 'Full Schedule', 
      action: { type: 'show_schedule' },
      color: 'purple'
    },
    { 
      id: 2, 
      icon: '📆', 
      label: 'Day-wise', 
      action: { type: 'show_day_schedule' },
      color: 'blue'
    },
    { 
      id: 3, 
      icon: '📍', 
      label: 'Location', 
      action: { type: 'link', name: 'location' },
      color: 'green'
    },
    { 
      id: 4, 
      icon: 'ℹ️', 
      label: 'More Info', 
      action: { type: 'show_more' },
      color: 'orange'
    },
    { 
      id: 5, 
      icon: '📺', 
      label: 'YouTube', 
      action: { type: 'link', name: 'youtube' },
      color: 'red'
    },
    { 
      id: 6, 
      icon: '📸', 
      label: 'Instagram', 
      action: { type: 'link', name: 'instagram' },
      color: 'pink'
    },
    { 
      id: 7, 
      icon: '👥', 
      label: 'Facebook', 
      action: { type: 'link', name: 'facebook' },
      color: 'blue'
    }
  ];

  const handleMenuClick = (action) => {
    // Handle link actions by opening in new tab
    if (action.type === 'link') {
      let url = '';
      switch(action.name) {
        case 'location':
          url = 'https://maps.google.com/?q=Fergusson+College+Rd,+Shivajinagar,+Pune,+Maharashtra+411004';
          break;
        case 'youtube':
          url = 'https://youtube.com/@punebookfestival-2k24?si=jyc_JxtKkG4_SkHb';
          break;
        case 'instagram':
          url = 'https://www.instagram.com/punebookfestival?igsh=MWRxeG8yZzlmOXE3eQ==';
          break;
        case 'facebook':
          url = 'https://www.facebook.com/share/17DVjpf5g7/';
          break;
        case 'website':
          url = 'https://www.punebookfest2025.com';
          break;
        default:
          url = '#';
      }
      if (url !== '#') {
        window.open(url, '_blank');
      }
    }
    
    // Pass other actions to parent handler
    onMenuClick(action);
  };

  return (
    <div className="menu-buttons-container">
      <div className="menu-buttons-list">
        {menuActions.map((item) => (
          <motion.button
            key={item.id}
            className="menu-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleMenuClick(item.action)}
          >
            <span className="button-icon">{item.icon}</span>
            <span className="button-label">{item.label}</span>
            <span className="button-arrow">▶</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MenuButtons;