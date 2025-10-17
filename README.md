# Pune Book Fest 2025 - Interactive Chatbot

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) chatbot application for the Pune Book Fest 2025 event. Features an intuitive chat interface with clickable menu options for easy navigation.

## 🎯 Features

- **Interactive Chat Interface** - Clean, responsive chatbot UI with smooth animations
- **Clickable Menu Buttons** - Quick access to:
  - 🗓️ Complete Event Schedule
  - 📅 Day-wise Schedule
  - 🎥 YouTube Channel
  - 👍 Facebook Page
  - 📸 Instagram Profile
  - 🌐 Official Website
  - 📍 Google Maps Location
  - ℹ️ Event Details & FAQs
- **Real-time Communication** - Socket.io integration for live updates
- **Smart Responses** - Context-aware bot responses based on user queries
- **Beautiful UI** - Purple gradient theme with smooth animations
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io
- CORS, dotenv

### Frontend
- React.js (with Vite)
- Framer Motion (animations)
- Socket.io Client
- Axios
- CSS3 with custom styling

## 📁 Project Structure

```
pune-bookfest-chatbot/
├── backend/
│   ├── models/
│   │   ├── Message.js
│   │   ├── Event.js
│   │   └── Link.js
│   ├── routes/
│   │   ├── chatbotRoutes.js
│   │   ├── scheduleRoutes.js
│   │   └── linkRoutes.js
│   ├── controllers/
│   │   ├── chatbotController.js
│   │   ├── scheduleController.js
│   │   └── linkController.js
│   ├── server.js
│   ├── seed.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── MenuButtons.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
cd C:\ChatBot
```

### Step 2: Install MongoDB
Make sure MongoDB is installed and running on your system.
- **Windows**: Download from https://www.mongodb.com/try/download/community
- Start MongoDB service: `mongod` or use MongoDB Compass

### Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/pune-bookfest
# PORT=5000

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

Backend will run on: http://localhost:5000

### Step 4: Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on: http://localhost:5173

## 📊 Database Seeding

The application comes with pre-configured sample data including:
- **12 Events** spread across 3 days (Jan 10-12, 2025)
- **5 Social Links** (YouTube, Facebook, Instagram, Website, Location)

To seed the database:
```bash
cd backend
npm run seed
```

## 🎨 Design Theme

- **Primary Color**: Purple (#8976a5)
- **Gradient Background**: Light purple (#eeeeff to #c8c7ff)
- **Accent**: Dark purple (#100223d0)
- **Font**: Poppins (Google Fonts)

## 🔌 API Endpoints

### Messages
- `POST /api/messages` - Send a message
- `GET /api/messages/:sessionId` - Get chat history

### Schedule
- `GET /api/schedule` - Get all events
- `GET /api/schedule/days` - Get event days summary
- `GET /api/schedule/:day` - Get events by day (1, 2, or 3)

### Links
- `GET /api/links` - Get all social links
- `GET /api/links/:name` - Get specific link by name

## 💬 Usage Examples

### User Interactions
1. **Greetings**: "Hi", "Hello", "Hey"
2. **Schedule Queries**: "Show schedule", "When are the events?"
3. **Location**: "Where is the venue?", "Location"
4. **Contact**: "Contact info", "How to reach?"
5. **Day-specific**: "Day 1", "Day 2", "Day 3"

### Menu Actions
Click any menu button to:
- View complete or day-wise schedules
- Open social media pages in new tabs
- Get venue location on Google Maps
- Access detailed event information

## 🌐 Socket.io Integration

Real-time features powered by Socket.io:
- Live message broadcasting
- Connection status monitoring
- Real-time user presence

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎭 Animations

Smooth animations using Framer Motion:
- Page load animations
- Message slide-in effects
- Button hover effects
- Typing indicators

## 🔒 Environment Variables

Create `.env` file in the backend folder:

```env
MONGODB_URI=mongodb://localhost:27017/pune-bookfest
PORT=5000
NODE_ENV=development
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Change port in `vite.config.js`

### CORS Issues
- Verify backend URL in `frontend/src/utils/api.js`
- Check CORS configuration in `backend/server.js`

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in environment variables

## 📝 License

ISC

## 👨‍💻 Author

Built with ❤️ for Pune Book Fest 2025

## 🙏 Acknowledgments

- Pune Book Fest organizers
- MERN stack community
- Framer Motion for amazing animations
- Socket.io for real-time capabilities
