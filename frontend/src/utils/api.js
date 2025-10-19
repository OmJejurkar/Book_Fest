import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Message API
export const sendMessage = async (text, sessionId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/messages`, {
      text,
      sessionId
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach the server');
    } else {
      throw new Error('Request error: ' + error.message);
    }
  }
};

export const getChatHistory = async (sessionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach the server');
    } else {
      throw new Error('Request error: ' + error.message);
    }
  }
};

// Schedule API
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedule`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach the server');
    } else {
      throw new Error('Request error: ' + error.message);
    }
  }
};

export const getEventsByDay = async (day) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedule/${day}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events by day:', error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach the server');
    } else {
      throw new Error('Request error: ' + error.message);
    }
  }
};

export const getEventDays = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedule/days`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event days:', error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach the server');
    } else {
      throw new Error('Request error: ' + error.message);
    }
  }
};

// Links API
export const getAllLinks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/links`);
    return response.data;
  } catch (error) {
    console.error('Error fetching links:', error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach the server');
    } else {
      throw new Error('Request error: ' + error.message);
    }
  }
};

export const getLinkByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/links/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching link:', error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach the server');
    } else {
      throw new Error('Request error: ' + error.message);
    }
  }
};