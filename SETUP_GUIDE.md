# 🚀 Quick Setup Guide - Pune Book Fest 2025 Chatbot

## Option 1: Using MongoDB Atlas (Recommended - No Local Installation Required)

### Step 1: Create Free MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new cluster (free tier - M0)
4. Wait for cluster to be created (2-3 minutes)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`)
4. Replace `<password>` with your actual password
5. Add database name at the end: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pune-bookfest`

### Step 3: Update Backend .env File
1. Open `backend\.env`
2. Replace the MONGODB_URI with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pune-bookfest
PORT=5000
NODE_ENV=development
```

### Step 4: Whitelist IP Address
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Confirm

### Step 5: Seed Database & Start Backend
```bash
cd backend
npm run seed
npm run dev
```

### Step 6: Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```

### Step 7: Open Application
Open your browser and go to: http://localhost:5173

---

## Option 2: Using Local MongoDB

### Step 1: Install MongoDB
**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer (.msi file)
3. Choose "Complete" installation
4. Install as a Windows Service (check the box)
5. Install MongoDB Compass (optional GUI)

**Alternative - Using Chocolatey:**
```powershell
choco install mongodb
```

### Step 2: Start MongoDB Service
**Windows (if installed as service):**
MongoDB should start automatically. If not:
```powershell
net start MongoDB
```

**Manual Start:**
```powershell
mongod
```

### Step 3: Verify MongoDB is Running
Open a new terminal:
```powershell
mongosh
# or
mongo
```

If you see MongoDB shell, it's working!

### Step 4: Keep .env as Default
The default .env already has local MongoDB configured:
```
MONGODB_URI=mongodb://localhost:27017/pune-bookfest
PORT=5000
NODE_ENV=development
```

### Step 5: Seed Database & Start Backend
```bash
cd backend
npm run seed
npm run dev
```

### Step 6: Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```

### Step 7: Open Application
Open your browser and go to: http://localhost:5173

---

## 🎯 Testing the Application

Once both servers are running, try these interactions:

### Test Chatbot Features:
1. Type "Hi" or "Hello" - Bot should greet you
2. Type "schedule" - Bot should prompt you about schedule options
3. Type "Day 1" - Bot should show Day 1 events
4. Type "location" - Bot should show venue details
5. Type "contact" - Bot should show contact information

### Test Menu Buttons:
1. Click "Schedule" - View complete 3-day schedule
2. Click "Day-wise Schedule" - Select individual days
3. Click "YouTube" - Opens YouTube in new tab
4. Click "Facebook" - Opens Facebook in new tab
5. Click "Instagram" - Opens Instagram in new tab
6. Click "Website" - Opens official website in new tab
7. Click "Google Location" - Opens Google Maps in new tab
8. Click "More Details" - Shows event details, tickets, contact info

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution:**
- If using Atlas: Check connection string, password, and IP whitelist
- If using local: Ensure MongoDB service is running (`net start MongoDB`)

### Issue 2: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in backend\.env
PORT=5001
```

### Issue 3: "Port 5173 already in use"
**Solution:**
Change port in `frontend\vite.config.js`:
```javascript
server: {
  port: 5174,  // Change this
  ...
}
```

### Issue 4: CORS errors in browser console
**Solution:**
- Ensure backend is running on http://localhost:5000
- Check `backend\server.js` CORS configuration
- Verify frontend API calls use correct URL in `frontend\src\utils\api.js`

### Issue 5: Seed script fails
**Solution:**
```bash
# Make sure MongoDB is running first
# Then run seed with more verbose output
cd backend
node seed.js
```

---

## 📱 Accessing from Mobile Device

1. Find your computer's IP address:
```powershell
ipconfig
# Look for "IPv4 Address"
```

2. Update frontend API to use your IP:
Edit `frontend\src\utils\api.js`:
```javascript
const API_BASE_URL = 'http://YOUR_IP:5000/api';
```

3. Update backend CORS:
Edit `backend\server.js`:
```javascript
cors: {
  origin: "http://YOUR_IP:5173",
  ...
}
```

4. Access from mobile browser:
```
http://YOUR_IP:5173
```

---

## 🎨 Customization

### Change Theme Colors
Edit `frontend\src\index.css`:
```css
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### Modify Events
Edit `backend\seed.js` and re-run:
```bash
npm run seed
```

### Add More Menu Buttons
Edit `frontend\src\components\MenuButtons.jsx` - Add to `menuItems` array

---

## 📊 Project Scripts

### Backend Scripts
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm run seed    # Seed database with sample data
```

### Frontend Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## 🌟 Next Steps

After successfully running the application:

1. ✅ Explore all menu options
2. ✅ Test chatbot responses
3. ✅ Try day-wise schedule viewing
4. ✅ Check responsive design on mobile
5. ✅ Customize event data in seed.js
6. ✅ Add your own social media links
7. ✅ Deploy to production (see README.md)

---

## 💡 Tips

- Keep both terminal windows open (backend & frontend)
- Use MongoDB Compass to view database visually
- Check browser console (F12) for any errors
- Backend logs appear in backend terminal
- Frontend logs appear in browser console

---

## 🆘 Need Help?

Check the main README.md for:
- Detailed API documentation
- Deployment instructions
- Architecture overview
- Advanced features

---

**Happy Coding! 📚✨**
