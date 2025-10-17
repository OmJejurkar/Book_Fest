# 🚀 Deploy Pune Book Fest Chatbot to Netlify

## Complete Deployment Guide

This guide will walk you through deploying your MERN chatbot application to production using free hosting services.

---

## 📋 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│  Frontend (React)  →  Netlify (FREE)            │
│  Backend (Node.js) →  Render (FREE)             │
│  Database (MongoDB) → MongoDB Atlas (FREE)       │
└─────────────────────────────────────────────────┘
```

---

## Part 1: Deploy Database to MongoDB Atlas

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google account
3. Choose **FREE** tier (M0 Sandbox)

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose **FREE** Shared tier
3. Select provider: **AWS** (recommended)
4. Choose region closest to you
5. Cluster name: `pune-bookfest`
6. Click "Create"

### Step 3: Setup Database Access
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. **Username**: `punebookfest`
4. **Password**: Click "Autogenerate Secure Password" (copy it!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### Step 4: Setup Network Access
1. Go to "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go back to "Database" 
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy the connection string:
```
mongodb+srv://punebookfest:<password>@pune-bookfest.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
6. Replace `<password>` with your actual password
7. Add database name before the `?`:
```
mongodb+srv://punebookfest:YOUR_PASSWORD@pune-bookfest.xxxxx.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

**Save this connection string - you'll need it!**

### Step 6: Seed Production Database
1. Update `backend/.env` with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://punebookfest:YOUR_PASSWORD@pune-bookfest.xxxxx.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

2. Seed the database:
```bash
cd backend
npm run seed
```

3. Verify in MongoDB Atlas:
   - Go to "Database" → "Browse Collections"
   - You should see 3 collections: events, links, messages

✅ **Database Setup Complete!**

---

## Part 2: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

1. Create `.gitignore` in backend folder (if not exists):
```bash
cd backend
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
```

2. Ensure your `backend/package.json` has:
```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### Step 2: Push to GitHub

1. Create new repository on GitHub: https://github.com/new
   - Name: `pune-bookfest-chatbot`
   - Public or Private (your choice)
   - Don't initialize with README

2. Push your code:
```bash
# In C:\ChatBot directory
git init
git add .
git commit -m "Initial commit - Pune Book Fest Chatbot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pune-bookfest-chatbot.git
git push -u origin main
```

### Step 3: Deploy on Render

1. Go to https://render.com
2. Sign up with GitHub account
3. Click "New +" → "Web Service"
4. Click "Connect GitHub" → Authorize Render
5. Select your repository: `pune-bookfest-chatbot`

### Step 4: Configure Render

**Settings:**
- **Name**: `pune-bookfest-backend`
- **Region**: Choose closest to you
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free**

### Step 5: Add Environment Variables

Click "Advanced" → "Add Environment Variable":

```
Key: MONGODB_URI
Value: mongodb+srv://punebookfest:YOUR_PASSWORD@pune-bookfest.xxxxx.mongodb.net/pune-bookfest?retryWrites=true&w=majority

Key: PORT
Value: 10000

Key: NODE_ENV
Value: production
```

### Step 6: Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://pune-bookfest-backend.onrender.com`

### Step 7: Test Backend

Visit these URLs in browser:
```
https://pune-bookfest-backend.onrender.com/api/schedule
https://pune-bookfest-backend.onrender.com/api/links
```

Should return JSON data (not errors).

✅ **Backend Deployed!**

**⚠️ IMPORTANT: Copy your backend URL!** You'll need it for frontend deployment.

---

## Part 3: Deploy Frontend to Netlify

### Step 1: Update Frontend Environment Variables

1. Edit `frontend/.env.production`:
```env
VITE_API_URL=https://pune-bookfest-backend.onrender.com/api
VITE_SOCKET_URL=https://pune-bookfest-backend.onrender.com
```

Replace with YOUR actual Render backend URL!

### Step 2: Update Backend CORS

Edit `backend/server.js` - update CORS to allow your Netlify domain:

```javascript
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://pune-bookfest-chatbot.netlify.app"  // Add this (will update after deployment)
    ],
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pune-bookfest-chatbot.netlify.app"  // Add this (will update after deployment)
  ]
}));
```

### Step 3: Commit and Push Changes

```bash
git add .
git commit -m "Configure for production deployment"
git push
```

(Render will auto-redeploy backend with CORS changes)

### Step 4: Deploy to Netlify

#### Option A: Netlify UI (Easiest)

1. Go to https://netlify.com
2. Sign up with GitHub account
3. Click "Add new site" → "Import an existing project"
4. Choose "GitHub" → Authorize
5. Select repository: `pune-bookfest-chatbot`

**Build Settings:**
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

6. Click "Show advanced" → "New variable"

Add environment variables:
```
Key: VITE_API_URL
Value: https://pune-bookfest-backend.onrender.com/api

Key: VITE_SOCKET_URL
Value: https://pune-bookfest-backend.onrender.com
```

7. Click "Deploy site"
8. Wait 2-3 minutes

#### Option B: Netlify CLI (Advanced)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from frontend folder
cd frontend
netlify deploy --prod
```

### Step 5: Get Your Netlify URL

You'll get a URL like: `https://your-site-name.netlify.app`

You can customize it:
1. Go to "Site settings"
2. Click "Change site name"
3. Enter: `pune-bookfest-chatbot`
4. Your site: `https://pune-bookfest-chatbot.netlify.app`

### Step 6: Update Backend CORS (Again)

Now that you have your Netlify URL, update `backend/server.js`:

```javascript
origin: [
  "http://localhost:5173",
  "https://pune-bookfest-chatbot.netlify.app"  // Your actual Netlify URL
]
```

Commit and push:
```bash
git add backend/server.js
git commit -m "Update CORS with Netlify URL"
git push
```

Render will auto-deploy the update.

✅ **Frontend Deployed!**

---

## 🎉 Part 4: Final Testing

### Test Your Live Application

Visit: `https://pune-bookfest-chatbot.netlify.app`

**Test Checklist:**
- [ ] Page loads without errors
- [ ] Chat interface appears
- [ ] Menu buttons are visible
- [ ] Click "Schedule" - events load
- [ ] Click "Day-wise Schedule" - days show
- [ ] Type "Hi" - bot responds
- [ ] Type "Day 1" - events display
- [ ] Social media links open
- [ ] No console errors (F12)

### If Something Doesn't Work:

**Check Browser Console (F12):**
- CORS errors? → Update backend CORS with correct Netlify URL
- API errors? → Check backend is running on Render
- Socket errors? → Check VITE_SOCKET_URL is correct

**Check Netlify Deploy Logs:**
1. Go to Netlify dashboard
2. Click "Deploys"
3. Click latest deploy
4. Check logs for errors

**Check Render Backend Logs:**
1. Go to Render dashboard
2. Click your service
3. Click "Logs"
4. Look for errors

---

## 🔄 Future Updates

### To Update Frontend:
```bash
# Make changes to code
git add .
git commit -m "Your update message"
git push
```
Netlify auto-deploys from GitHub!

### To Update Backend:
```bash
# Make changes to code
git add .
git commit -m "Your update message"
git push
```
Render auto-deploys from GitHub!

---

## 📊 Deployment Summary

### Your Live URLs:

```
Frontend (Netlify):  https://pune-bookfest-chatbot.netlify.app
Backend (Render):    https://pune-bookfest-backend.onrender.com
Database (Atlas):    MongoDB Cloud
```

### Costs:

- **Netlify**: FREE (100GB bandwidth/month)
- **Render**: FREE (750 hours/month, sleeps after 15 min inactivity)
- **MongoDB Atlas**: FREE (512MB storage)

**Total: $0/month** 🎉

---

## ⚠️ Important Notes

### Render Free Tier Limitations:
- Backend **sleeps** after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- **Solution**: Upgrade to paid ($7/mo) or use UptimeRobot to ping every 5 min

### Keep Backend Awake (Optional):
Use UptimeRobot (free): https://uptimerobot.com
- Create monitor
- Type: HTTP(s)
- URL: Your Render backend URL
- Interval: 5 minutes

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain to Netlify:

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Netlify: "Domain settings" → "Add custom domain"
3. Enter your domain: `punebookfest.com`
4. Follow DNS instructions
5. Netlify provides free SSL certificate!

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" errors

**Solution:**
```javascript
// Check frontend/.env.production has correct backend URL
VITE_API_URL=https://YOUR-ACTUAL-BACKEND-URL.onrender.com/api
```

### Issue: CORS errors

**Solution:**
```javascript
// backend/server.js - add your Netlify URL
origin: ["https://your-netlify-site.netlify.app"]
```

### Issue: Backend not responding

**Solutions:**
1. Check Render dashboard - service running?
2. Check Render logs for errors
3. Verify MongoDB Atlas connection string
4. Verify environment variables on Render

### Issue: Build fails on Netlify

**Check:**
1. Base directory: `frontend`
2. Build command: `npm run build`
3. Publish directory: `frontend/dist`
4. Node version: 18

---

## 🎯 Next Steps

After successful deployment:

1. ✅ Share your live URL!
2. ✅ Add to your portfolio
3. ✅ Set up analytics (Google Analytics)
4. ✅ Add SEO metadata
5. ✅ Monitor with UptimeRobot
6. ✅ Get user feedback
7. ✅ Plan v2 features!

---

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **GitHub Issues**: For bug reports

---

**Congratulations! Your chatbot is now live on the internet! 🎊🚀📚**

Share it with the world: `https://pune-bookfest-chatbot.netlify.app`
