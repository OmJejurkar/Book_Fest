require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const chatbotRoutes = require('./routes/chatbotRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const linkRoutes = require('./routes/linkRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

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

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  socket.on('send_message', async (data) => {
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
