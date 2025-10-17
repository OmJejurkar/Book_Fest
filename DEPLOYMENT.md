# 🚀 Deployment Guide - Pune Book Fest 2025 Chatbot

## Overview
This guide covers deploying the MERN chatbot to production using free/affordable hosting services.

---

## 📋 Pre-Deployment Checklist

- [ ] Application works locally
- [ ] Database is seeded with data
- [ ] Environment variables are documented
- [ ] Code is pushed to GitHub/GitLab
- [ ] Dependencies are up to date
- [ ] No sensitive data in code

---

## 1️⃣ Deploy Database - MongoDB Atlas

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create organization and project

### Step 2: Create Cluster
1. Click "Build a Cluster"
2. Choose **FREE** tier (M0)
3. Select cloud provider (AWS/Google/Azure)
4. Choose region closest to your users
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Configure Security
1. **Database Access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and strong password
   - Set permissions to "Read and write to any database"

2. **Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select Driver: Node.js, Version: 4.1 or later
4. Copy connection string
5. Replace `<password>` with your database user password
6. Add database name: `/pune-bookfest?retryWrites=true&w=majority`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

### Step 5: Seed Production Database
1. Update local `backend/.env` with Atlas connection string
2. Run: `cd backend && npm run seed`
3. Verify data in MongoDB Atlas (Browse Collections)

✅ Database is now ready for production!

---

## 2️⃣ Deploy Backend - Render

### Why Render?
- Free tier available
- Easy deployment
- Auto-deploy from GitHub
- Built-in environment variables

### Step 1: Prepare Backend for Deployment
1. Create `.gitignore` in backend folder:
```
node_modules/
.env
*.log
```

2. Ensure `package.json` has start script:
```json
"scripts": {
  "start": "node server.js"
}
```

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Pune Book Fest Chatbot"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3: Deploy on Render
1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** pune-bookfest-backend
   - **Root Directory:** backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 4: Set Environment Variables
In Render dashboard, add:
```
MONGODB_URI = your_atlas_connection_string
PORT = 10000
NODE_ENV = production
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes)
3. Note your backend URL: `https://pune-bookfest-backend.onrender.com`

### Step 6: Test Backend
Visit: `https://pune-bookfest-backend.onrender.com/api/schedule`

Should return JSON with events.

✅ Backend is live!

---

## 3️⃣ Deploy Frontend - Vercel

### Why Vercel?
- Optimized for React
- Free tier with custom domain
- Instant deployments
- Great performance

### Step 1: Update Frontend for Production
1. Update `frontend/src/utils/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

2. Update `frontend/src/App.jsx` (Socket.io connection):
```javascript
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
const newSocket = io(SOCKET_URL);
```

3. Create `frontend/.env.production`:
```
VITE_API_URL=https://pune-bookfest-backend.onrender.com/api
VITE_SOCKET_URL=https://pune-bookfest-backend.onrender.com
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com and sign up
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** dist

### Step 3: Set Environment Variables
In Vercel project settings → Environment Variables:
```
VITE_API_URL = https://pune-bookfest-backend.onrender.com/api
VITE_SOCKET_URL = https://pune-bookfest-backend.onrender.com
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build (2-3 minutes)
3. Note your frontend URL: `https://pune-bookfest-chatbot.vercel.app`

✅ Frontend is live!

---

## 4️⃣ Update Backend CORS

### Important: Allow Frontend Domain
Update `backend/server.js`:
```javascript
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://pune-bookfest-chatbot.vercel.app"  // Add your Vercel URL
    ],
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pune-bookfest-chatbot.vercel.app"  // Add your Vercel URL
  ]
}));
```

Commit and push changes - Render will auto-deploy.

---

## 🎉 Final Testing

### Test All Features:
1. ✅ Visit your Vercel URL
2. ✅ Chat interface loads
3. ✅ Send a message ("Hi")
4. ✅ Bot responds
5. ✅ Click "Schedule" - events load
6. ✅ Click "Day-wise Schedule" - days show
7. ✅ Select a day - events display
8. ✅ Social media links open
9. ✅ Location opens Google Maps
10. ✅ "More Details" shows info

---

## 🌐 Alternative Deployment Options

### Backend Alternatives
- **Railway** (https://railway.app)
- **Heroku** (https://heroku.com) - $5/month
- **Fly.io** (https://fly.io)
- **Cyclic** (https://cyclic.sh)

### Frontend Alternatives
- **Netlify** (https://netlify.com)
- **GitHub Pages** (free, but requires setup)
- **Cloudflare Pages** (https://pages.cloudflare.com)

---

## 🔧 Post-Deployment

### Monitor Your App
1. **Render Dashboard:**
   - Check logs for errors
   - Monitor uptime
   - View metrics

2. **Vercel Dashboard:**
   - Check deployment status
   - View analytics
   - Monitor bandwidth

### Custom Domain (Optional)
1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **Add to Vercel:**
   - Project Settings → Domains
   - Add your domain
   - Follow DNS instructions

3. **Update CORS:**
   - Add custom domain to backend CORS
   - Redeploy

### SSL Certificate
Both Render and Vercel provide free SSL automatically! 🔒

---

## 🐛 Troubleshooting Production

### Issue: Backend API not responding
**Check:**
- Render logs for errors
- MongoDB Atlas connection
- Environment variables set correctly
- IP whitelist allows all IPs (0.0.0.0/0)

### Issue: CORS errors in browser
**Check:**
- Backend CORS includes frontend URL
- Both http:// and https:// versions
- No trailing slash in URLs

### Issue: Socket.io not connecting
**Check:**
- Socket URL uses same domain as API
- CORS configured for Socket.io
- Frontend using correct SOCKET_URL

### Issue: Database empty
**Solution:**
```bash
# Seed production database
# Update .env with Atlas connection
cd backend
npm run seed
```

### Issue: Slow backend response
**Render free tier sleeps after inactivity**
**Solutions:**
- Use paid tier ($7/month)
- Use UptimeRobot to ping every 5 minutes
- Upgrade to Railway/Heroku

---

## 📊 Performance Optimization

### Backend
1. Enable compression:
```bash
npm install compression
```
```javascript
const compression = require('compression');
app.use(compression());
```

2. Add caching headers
3. Optimize database queries
4. Use connection pooling

### Frontend
1. Lazy load components
2. Optimize images
3. Enable code splitting
4. Use production build

---

## 🔒 Security Checklist

- [ ] No API keys in frontend code
- [ ] Environment variables secured
- [ ] MongoDB Atlas IP whitelist configured
- [ ] CORS properly configured
- [ ] HTTPS enabled (auto with Vercel/Render)
- [ ] Strong database passwords
- [ ] Regular dependency updates

---

## 📈 Scaling Considerations

### When you outgrow free tiers:

1. **Database:** MongoDB Atlas M10+ ($0.08/hr)
2. **Backend:** Render Standard ($7/mo)
3. **Frontend:** Vercel Pro ($20/mo)
4. **CDN:** Cloudflare (free/paid)
5. **Monitoring:** Sentry, LogRocket

---

## 💰 Cost Summary

### Free Tier (Ideal for MVP/Demo)
- Database: MongoDB Atlas M0 - **FREE**
- Backend: Render Free - **FREE** (sleeps after 15min)
- Frontend: Vercel Free - **FREE**
- **Total: $0/month**

### Production Tier (24/7 uptime)
- Database: MongoDB Atlas M2 - **$9/month**
- Backend: Render Standard - **$7/month**
- Frontend: Vercel Pro - **$20/month** (or stay free)
- **Total: $16-36/month**

---

## 🎯 Next Steps

After deployment:
1. ✅ Share your live URL!
2. ✅ Add to portfolio
3. ✅ Monitor usage and errors
4. ✅ Gather user feedback
5. ✅ Plan v2 features
6. ✅ Set up analytics (Google Analytics)
7. ✅ Add SEO metadata

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Stack Overflow:** For troubleshooting

---

**Congratulations! Your chatbot is now live! 🎉📚✨**
