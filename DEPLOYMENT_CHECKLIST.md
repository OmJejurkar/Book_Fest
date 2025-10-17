# ✅ Netlify Deployment Checklist

Use this checklist to ensure smooth deployment of your Pune Book Fest Chatbot.

---

## 📋 Pre-Deployment Checklist

### Local Testing
- [ ] Application runs locally without errors
- [ ] Backend server starts successfully
- [ ] Frontend builds without errors (`npm run build`)
- [ ] Database is seeded with event data
- [ ] All menu buttons work
- [ ] Chat functionality works
- [ ] No console errors in browser

### Code Preparation
- [ ] All code committed to Git
- [ ] `.gitignore` files in place
- [ ] No sensitive data in code (passwords, API keys)
- [ ] Environment variables documented

---

## 🗄️ Database Deployment (MongoDB Atlas)

- [ ] MongoDB Atlas account created
- [ ] Free tier cluster created
- [ ] Database user created with password saved
- [ ] Network access set to "Allow from anywhere" (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Local database seeded to Atlas
- [ ] Verified data in Atlas (Browse Collections)

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

---

## 🖥️ Backend Deployment (Render)

### GitHub Setup
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Repository is public or Render has access

### Render Configuration
- [ ] Render account created (with GitHub)
- [ ] New Web Service created
- [ ] Repository connected
- [ ] Root directory set to: `backend`
- [ ] Build command set to: `npm install`
- [ ] Start command set to: `npm start`
- [ ] Environment variables added:
  - [ ] `MONGODB_URI` (Atlas connection string)
  - [ ] `PORT` (10000)
  - [ ] `NODE_ENV` (production)
- [ ] Free plan selected
- [ ] Deployment successful
- [ ] Backend URL copied: `https://______.onrender.com`

### Backend Testing
- [ ] Visit: `https://your-backend.onrender.com/api/schedule`
- [ ] Returns JSON data (not 404 or error)
- [ ] Visit: `https://your-backend.onrender.com/api/links`
- [ ] Returns JSON data

---

## 🎨 Frontend Deployment (Netlify)

### Environment Variables
- [ ] `frontend/.env.production` created
- [ ] `VITE_API_URL` set to Render backend URL + `/api`
- [ ] `VITE_SOCKET_URL` set to Render backend URL
- [ ] Example:
```env
VITE_API_URL=https://pune-bookfest-backend.onrender.com/api
VITE_SOCKET_URL=https://pune-bookfest-backend.onrender.com
```

### Netlify Configuration Files
- [ ] `frontend/netlify.toml` exists
- [ ] Contains build settings
- [ ] Contains redirect rules

### Netlify Setup
- [ ] Netlify account created (with GitHub)
- [ ] New site created
- [ ] Repository connected
- [ ] Build settings configured:
  - [ ] Base directory: `frontend`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `frontend/dist`
- [ ] Environment variables added on Netlify:
  - [ ] `VITE_API_URL`
  - [ ] `VITE_SOCKET_URL`
- [ ] Deployment successful
- [ ] Netlify URL copied: `https://______.netlify.app`
- [ ] (Optional) Custom site name set

---

## 🔄 CORS Configuration

### Update Backend CORS
- [ ] `backend/server.js` updated with Netlify URL
- [ ] Socket.io CORS includes Netlify URL
- [ ] Express CORS includes Netlify URL
- [ ] Changes committed and pushed to GitHub
- [ ] Render auto-deployed the update

**Example:**
```javascript
origin: [
  "http://localhost:5173",
  "https://pune-bookfest-chatbot.netlify.app"
]
```

---

## 🧪 Production Testing

### Functionality Tests
- [ ] Visit Netlify URL
- [ ] Page loads without errors
- [ ] Purple theme displays correctly
- [ ] Header shows "Pune Book Fest 2025"
- [ ] Quick Actions menu visible
- [ ] All 8 menu buttons present
- [ ] Chat window displays
- [ ] Message input box works
- [ ] Welcome message appears

### Menu Button Tests
- [ ] "Schedule" button - shows all events
- [ ] "Day-wise Schedule" button - shows day options
- [ ] "YouTube" button - opens link in new tab
- [ ] "Facebook" button - opens link in new tab
- [ ] "Instagram" button - opens link in new tab
- [ ] "Website" button - opens link in new tab
- [ ] "Google Location" button - opens Google Maps
- [ ] "More Details" button - shows event info

### Chat Tests
- [ ] Type "Hi" - bot responds
- [ ] Type "schedule" - bot responds appropriately
- [ ] Type "Day 1" - shows Day 1 events
- [ ] Type "Day 2" - shows Day 2 events
- [ ] Type "Day 3" - shows Day 3 events
- [ ] Type "location" - shows venue details
- [ ] Typing indicator shows when bot is responding
- [ ] Messages appear in correct order

### Browser Console
- [ ] Open DevTools (F12)
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] No JavaScript errors
- [ ] Socket.io connects successfully

### Responsive Design
- [ ] Desktop view looks good
- [ ] Tablet view (iPad) looks good
- [ ] Mobile view (iPhone) looks good
- [ ] All buttons clickable on mobile

---

## 📱 Mobile Testing

- [ ] Open on actual mobile device
- [ ] Layout is responsive
- [ ] Buttons are tap-friendly
- [ ] Text is readable
- [ ] Scrolling works smoothly
- [ ] No horizontal scroll

---

## 🚀 Performance Check

- [ ] Initial page load < 3 seconds
- [ ] Messages send/receive quickly
- [ ] No lag when clicking buttons
- [ ] Images/emojis load properly
- [ ] Animations are smooth

---

## 📊 Monitoring Setup (Optional)

### UptimeRobot (Keep Backend Awake)
- [ ] UptimeRobot account created
- [ ] Monitor created for backend URL
- [ ] Monitor type: HTTP(s)
- [ ] Check interval: 5 minutes
- [ ] Email notifications enabled

### Analytics (Optional)
- [ ] Google Analytics added
- [ ] Tracking code in `index.html`
- [ ] Real-time tracking verified

---

## 🔒 Security Review

- [ ] No API keys in frontend code
- [ ] No passwords in Git repository
- [ ] MongoDB Atlas IP whitelist configured
- [ ] HTTPS enabled (automatic with Netlify)
- [ ] Environment variables not exposed
- [ ] CORS properly restricted to your domain

---

## 📝 Documentation Update

- [ ] README.md has live URL
- [ ] Deployment guide accessible
- [ ] Environment variables documented
- [ ] Known issues documented

---

## 🎯 Post-Deployment Tasks

### Immediate
- [ ] Share URL with team/friends
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Take screenshots for portfolio
- [ ] Create demo video (optional)

### Within 24 Hours
- [ ] Monitor Render logs for errors
- [ ] Check Netlify analytics
- [ ] Verify all features still work
- [ ] Note any issues

### Within 1 Week
- [ ] Gather user feedback
- [ ] Check MongoDB Atlas usage
- [ ] Review Render/Netlify usage
- [ ] Plan updates based on feedback

---

## 🐛 Common Issues & Quick Fixes

### Issue: "Failed to fetch"
**Fix:** Update `VITE_API_URL` in Netlify environment variables

### Issue: CORS Error
**Fix:** Add Netlify URL to `backend/server.js` CORS configuration

### Issue: Backend not responding
**Fix:** Check if Render service is sleeping (first request takes 30s)

### Issue: Build fails
**Fix:** Check build logs, verify Node version, check package.json

### Issue: Socket.io not connecting
**Fix:** Verify `VITE_SOCKET_URL` matches backend URL exactly

---

## ✅ Deployment Complete!

When all checkboxes are checked, your chatbot is successfully deployed! 🎉

**Your Live URLs:**
- Frontend: https://______.netlify.app
- Backend: https://______.onrender.com
- Database: MongoDB Atlas Cloud

**Share your success:**
- [ ] Add to portfolio
- [ ] Post on LinkedIn
- [ ] Share on social media
- [ ] Add to GitHub README

---

## 📞 Need Help?

- Check `NETLIFY_DEPLOYMENT.md` for detailed instructions
- Check `TROUBLESHOOTING.md` for common issues
- Check Render/Netlify documentation
- Search Stack Overflow

---

**Congratulations on your deployment! 🚀📚✨**

Date Deployed: _______________
Frontend URL: _______________
Backend URL: _______________
