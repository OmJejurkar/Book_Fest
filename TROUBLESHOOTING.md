# 🔧 Troubleshooting Guide - Pune Book Fest 2025 Chatbot

Quick solutions to common issues you might encounter.

---

## 🚨 Backend Issues

### 1. "Cannot connect to MongoDB"

**Error:**
```
MongooseError: failed to connect to server
```

**Solutions:**

**A. If using local MongoDB:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service (Windows)
net start MongoDB

# Or start manually
mongod
```

**B. If using MongoDB Atlas:**
1. Check connection string in `.env`
2. Ensure password doesn't contain special characters
3. Verify IP address is whitelisted (0.0.0.0/0 for development)
4. Test connection:
```bash
cd backend
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected')).catch(e => console.log('❌ Error:', e))"
```

---

### 2. "Port 5000 is already in use"

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Option A: Kill the process**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

**Option B: Change port**
```env
# Edit backend/.env
PORT=5001
```

---

### 3. "Module not found"

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd backend
npm install
```

---

### 4. Seed script fails

**Error:**
```
Error seeding database
```

**Solutions:**
1. Ensure MongoDB is running
2. Check connection string
3. Run with verbose output:
```bash
cd backend
node seed.js
```

---

## 🎨 Frontend Issues

### 5. "Port 5173 is already in use"

**Solution:**

**Option A: Kill process**
```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Option B: Change port**
```javascript
// frontend/vite.config.js
export default defineConfig({
  server: {
    port: 5174  // Change this
  }
})
```

---

### 6. "Vite not found"

**Error:**
```
'vite' is not recognized as an internal or external command
```

**Solution:**
```bash
cd frontend
npm install
```

---

### 7. Blank white screen

**Check:**
1. Browser console for errors (Press F12)
2. Backend is running on port 5000
3. API URL in `src/utils/api.js` is correct

**Solution:**
```javascript
// frontend/src/utils/api.js
// Verify this matches your backend URL
const API_BASE_URL = 'http://localhost:5000/api';
```

---

### 8. Components not rendering

**Check:**
```bash
# Ensure all dependencies are installed
cd frontend
npm install react react-dom framer-motion axios socket.io-client
```

---

## 🔗 Connection Issues

### 9. CORS Error

**Error in browser console:**
```
Access to fetch at 'http://localhost:5000/api/messages' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
```javascript
// backend/server.js
// Verify CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
}));
```

---

### 10. Socket.io not connecting

**Error:**
```
WebSocket connection to 'ws://localhost:5000/' failed
```

**Solutions:**

1. Check Socket.io CORS:
```javascript
// backend/server.js
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
```

2. Verify frontend Socket URL:
```javascript
// frontend/src/App.jsx
const newSocket = io('http://localhost:5000');
```

---

### 11. API calls failing (404)

**Error:**
```
GET http://localhost:5000/api/schedule 404 (Not Found)
```

**Check:**
1. Backend server is running
2. Routes are properly imported in `server.js`
3. API endpoint paths match

**Test backend:**
```bash
# Visit in browser
http://localhost:5000/api/schedule
# Should return JSON, not 404
```

---

## 💾 Database Issues

### 12. Database is empty

**Solution:**
```bash
cd backend
npm run seed
```

---

### 13. Duplicate key error

**Error:**
```
E11000 duplicate key error collection
```

**Solution:**
```bash
# Clear and re-seed database
cd backend
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => { require('./models/Event').deleteMany({}); require('./models/Link').deleteMany({}); }).then(() => process.exit())"
npm run seed
```

---

### 14. Can't access MongoDB Compass

**Solution:**
```
Connection string for Compass:
mongodb://localhost:27017/pune-bookfest
```

---

## 📦 Installation Issues

### 15. npm install fails

**Error:**
```
npm ERR! code EPERM
```

**Solutions:**

**Option A: Run as Administrator**
```powershell
# Right-click PowerShell → Run as Administrator
cd C:\ChatBot\backend
npm install
```

**Option B: Clear npm cache**
```bash
npm cache clean --force
npm install
```

**Option C: Delete and reinstall**
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

### 16. "Cannot find Node.js"

**Solution:**
1. Install Node.js from: https://nodejs.org/
2. Restart terminal/PowerShell
3. Verify: `node --version`

---

## 🎯 Runtime Errors

### 17. "ReferenceError: io is not defined"

**Frontend error**

**Solution:**
```javascript
// Ensure import at top of file
import { io } from 'socket.io-client';
```

---

### 18. "Cannot read property of undefined"

**Check:**
1. Data is being fetched successfully
2. API returns expected format
3. Add safety checks:
```javascript
const events = data?.events || [];
```

---

### 19. Messages not displaying

**Check:**
1. Backend `/api/messages` endpoint works
2. Console for errors (F12)
3. Message format matches schema

**Test:**
```javascript
// Browser console
console.log(messages);
```

---

### 20. Typing indicator stuck

**Solution:**
```javascript
// Ensure setIsTyping(false) is always called
try {
  const response = await sendMessage(text, sessionId);
  setIsTyping(false);  // ✅ Add this
} catch (error) {
  setIsTyping(false);  // ✅ And here
}
```

---

## 🖥️ Windows-Specific Issues

### 21. PowerShell execution policy

**Error:**
```
cannot be loaded because running scripts is disabled on this system
```

**Solution:**
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### 22. Long path names error

**Error:**
```
ENAMETOOLONG: name too long
```

**Solution:**
```powershell
# Enable long paths
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

---

## 🌐 Browser Issues

### 23. Cache problems

**Solution:**
```
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

Or:
Ctrl + Shift + Delete → Clear browsing data
```

---

### 24. Browser not opening

**Check:**
```powershell
# Verify URL
http://localhost:5173

# Try different browser
# Chrome, Firefox, Edge
```

---

## 🔍 Debugging Tips

### Check Backend Logs
```bash
cd backend
npm run dev
# Watch terminal for errors
```

### Check Frontend Console
```
1. Open browser (F12)
2. Go to Console tab
3. Look for red errors
```

### Verify Environment Variables
```bash
cd backend
cat .env    # Linux/Mac
type .env   # Windows
```

### Test API Directly
```
Visit in browser:
http://localhost:5000/api/schedule
http://localhost:5000/api/links

Should return JSON, not errors
```

### Check Process Running
```powershell
# Check if backend is running
netstat -ano | findstr :5000

# Check if frontend is running
netstat -ano | findstr :5173
```

---

## 🆘 Still Having Issues?

### 1. Check Documentation
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Setup instructions
- `PROJECT_SUMMARY.md` - Quick reference

### 2. Restart Everything
```bash
# Stop all servers (Ctrl+C)
# Close all terminals
# Restart:
cd backend && npm run dev
cd frontend && npm run dev
```

### 3. Fresh Install
```bash
# Backup your .env file!
# Then:
Remove-Item -Recurse -Force backend/node_modules, frontend/node_modules
cd backend && npm install
cd ../frontend && npm install
```

### 4. Check System Requirements
- ✅ Node.js v14+
- ✅ npm v6+
- ✅ MongoDB (local or Atlas)
- ✅ Modern browser (Chrome, Firefox, Edge)
- ✅ 2GB RAM minimum

### 5. Test Minimal Setup
```bash
# Test backend only
cd backend
npm run dev
# Visit: http://localhost:5000

# Test frontend only
cd frontend
npm run dev
# Visit: http://localhost:5173
```

---

## 📊 Health Check Checklist

Run through this list:

- [ ] Node.js installed (`node --version`)
- [ ] npm works (`npm --version`)
- [ ] MongoDB running (Atlas or local)
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] `.env` configured correctly
- [ ] Database seeded
- [ ] No port conflicts (5000, 5173)
- [ ] Backend starts without errors
- [ ] Frontend builds without errors
- [ ] Browser can access both URLs
- [ ] No CORS errors in console
- [ ] Socket.io connects successfully

---

## 🎓 Pro Tips

1. **Always check both terminals** (backend & frontend)
2. **Read error messages carefully** (they usually tell you what's wrong)
3. **Check browser console** (F12)
4. **Verify environment variables** (backend/.env)
5. **Restart servers after code changes**
6. **Clear browser cache if CSS doesn't update**
7. **Use MongoDB Compass** for visual database inspection
8. **Test API endpoints directly** in browser
9. **Use console.log** for debugging
10. **Keep MongoDB running** while developing

---

## 💡 Quick Commands Reference

```bash
# Check what's running on port
netstat -ano | findstr :5000

# Kill process by PID
taskkill /PID <number> /F

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
Remove-Item -Recurse node_modules
npm install

# Check Node/npm version
node --version
npm --version

# Test MongoDB connection
mongosh
# or
mongo

# View backend logs
cd backend && npm run dev

# View frontend logs
cd frontend && npm run dev
```

---

**Remember: Most issues are fixed by:**
1. ✅ Ensuring MongoDB is running
2. ✅ Installing all dependencies
3. ✅ Checking environment variables
4. ✅ Restarting servers
5. ✅ Clearing browser cache

**Happy Debugging! 🐛🔨**
