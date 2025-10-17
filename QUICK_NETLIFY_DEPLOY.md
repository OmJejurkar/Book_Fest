# ⚡ Quick Netlify Deployment Guide
## Deploy in 15 Minutes!

Follow these steps to get your chatbot live on Netlify.

---

## 🎯 What You'll Deploy

- **Frontend**: Netlify (FREE)
- **Backend**: Render (FREE)  
- **Database**: MongoDB Atlas (FREE)

**Total Cost: $0/month**

---

## Step 1: Database (5 minutes)

### MongoDB Atlas Setup

1. **Sign up**: https://www.mongodb.com/cloud/atlas/register
2. **Create cluster**: 
   - Choose FREE tier (M0)
   - Click "Create"
3. **Create user**:
   - Database Access → Add User
   - Username: `punebookfest`
   - Password: Auto-generate (SAVE IT!)
4. **Allow access**:
   - Network Access → Add IP
   - "Allow from Anywhere"
5. **Get connection**:
   - Database → Connect → Drivers
   - Copy connection string
   - Replace `<password>` with your password
   - Add `/pune-bookfest` before `?`:
   ```
   mongodb+srv://punebookfest:PASSWORD@cluster.mongodb.net/pune-bookfest?retryWrites=true&w=majority
   ```

6. **Seed database**:
```bash
# Update backend/.env with your connection string
cd backend
npm run seed
```

✅ Database ready!

---

## Step 2: Push to GitHub (2 minutes)

1. **Create repo**: https://github.com/new
   - Name: `pune-bookfest-chatbot`
   - Public
   - Create

2. **Push code**:
```bash
cd C:\ChatBot
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/pune-bookfest-chatbot.git
git push -u origin main
```

✅ Code on GitHub!

---

## Step 3: Deploy Backend on Render (3 minutes)

1. **Sign up**: https://render.com (use GitHub login)
2. **New Web Service**:
   - Connect GitHub
   - Select `pune-bookfest-chatbot`
3. **Configure**:
   - Name: `pune-bookfest-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Plan: FREE
4. **Environment Variables** (click Advanced):
   ```
   MONGODB_URI = your_atlas_connection_string
   PORT = 10000
   NODE_ENV = production
   ```
5. **Create** and wait 5 minutes

6. **Copy URL**: `https://pune-bookfest-backend.onrender.com`

✅ Backend live!

---

## Step 4: Update Frontend Config (1 minute)

1. **Edit** `frontend/.env.production`:
```env
VITE_API_URL=https://pune-bookfest-backend.onrender.com/api
VITE_SOCKET_URL=https://pune-bookfest-backend.onrender.com
```

2. **Push update**:
```bash
git add .
git commit -m "Add production config"
git push
```

✅ Frontend configured!

---

## Step 5: Deploy Frontend on Netlify (3 minutes)

1. **Sign up**: https://netlify.com (use GitHub login)
2. **Add site**:
   - "Import from Git"
   - Select `pune-bookfest-chatbot`
3. **Configure**:
   - Base directory: `frontend`
   - Build: `npm run build`
   - Publish: `frontend/dist`
4. **Environment Variables**:
   ```
   VITE_API_URL = https://pune-bookfest-backend.onrender.com/api
   VITE_SOCKET_URL = https://pune-bookfest-backend.onrender.com
   ```
5. **Deploy** and wait 2 minutes

6. **Get URL**: `https://random-name.netlify.app`

7. **Custom name** (optional):
   - Site settings → Change name
   - `pune-bookfest-chatbot`

✅ Frontend live!

---

## Step 6: Update CORS (1 minute)

1. **Edit** `backend/server.js`:

```javascript
// Find the CORS sections and update:
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://pune-bookfest-chatbot.netlify.app"  // Your Netlify URL
    ],
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pune-bookfest-chatbot.netlify.app"  // Your Netlify URL
  ]
}));
```

2. **Push**:
```bash
git add .
git commit -m "Update CORS"
git push
```

Render will auto-deploy in ~2 minutes.

✅ CORS configured!

---

## 🎉 You're Live!

Visit: `https://pune-bookfest-chatbot.netlify.app`

### Test Everything:
- [ ] Page loads
- [ ] Menu buttons work
- [ ] Type "Hi" - bot responds
- [ ] Click "Schedule" - events show
- [ ] No errors in console (F12)

---

## 🐛 Quick Fixes

### "Failed to fetch" error?
→ Check `VITE_API_URL` on Netlify matches Render URL

### CORS error?
→ Verify Netlify URL in `backend/server.js` CORS

### Backend slow?
→ First request after 15min wakes up Render (takes 30s)

---

## 📱 Share Your Success!

```
🎉 Just deployed my chatbot!
Frontend: https://pune-bookfest-chatbot.netlify.app
Built with: React, Node.js, MongoDB
Hosting: Netlify + Render (FREE!)
```

---

## 🔄 Future Updates

Just push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Both Netlify and Render auto-deploy! 🚀

---

**Need detailed help?** See `NETLIFY_DEPLOYMENT.md`

**Deployment done in:** ~15 minutes ⚡
