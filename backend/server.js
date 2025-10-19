require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const chatbotRoutes = require('./routes/chatbotRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const linkRoutes = require('./routes/linkRoutes');

const app = express();
const server = http.createServer(app);

// Configure CORS for both development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://68f2c0a3de257120642c6ef7--pune-book-fest.netlify.app',
      'https://pune-book-fest.netlify.app'
    ];
    
    // Check if the origin is in our allowed list or if it's undefined (for server-to-server requests)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Configure Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // List of allowed origins for Socket.io
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://68f2c0a3de257120642c6ef7--pune-book-fest.netlify.app',
        'https://pune-book-fest.netlify.app'
      ];
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/messages', chatbotRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/links', linkRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Pune Book Fest 2025 API',
    endpoints: {
      messages: '/api/messages',
      schedule: '/api/schedule',
      links: '/api/links'
    }
  });
});

// Add health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Pune Book Fest 2025 API'
  });
});

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  socket.on('send_message', (data) => {
    // Broadcast message to all connected clients
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('👋 User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Pune Book Fest 2025 Chatbot API Ready!`);
});