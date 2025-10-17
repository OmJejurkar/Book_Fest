# 🔑 Environment Variables Quick Reference

## Your Credentials
```
Username: prernabhamre2005_db_user
Password: sPHS8Kh3SWo5GwFm
```

---

## 📝 LOCAL DEVELOPMENT

### File: `C:\ChatBot\backend\.env`

```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@YOUR_CLUSTER_URL/pune-bookfest?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**⚠️ REPLACE `YOUR_CLUSTER_URL` with your actual cluster URL from MongoDB Atlas**

### Where to get YOUR_CLUSTER_URL:
1. Login to https://cloud.mongodb.com
2. Click "Database" → Your Cluster → "Connect"
3. Choose "Connect your application"
4. Look for the URL part: `cluster0.XXXXX.mongodb.net`
5. That's your cluster URL!

**Examples of what it might look like:**
- `cluster0.abc123.mongodb.net`
- `cluster0.mongodb.net`
- `cluster0.xy1z2.mongodb.net`

---

## 🌐 RENDER DEPLOYMENT (Backend)

When deploying to Render, add these **3 environment variables**:

### Variable 1:
**Key**: `MONGODB_URI`
**Value**: 
```
mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@YOUR_CLUSTER_URL/pune-bookfest?retryWrites=true&w=majority
```

### Variable 2:
**Key**: `PORT`
**Value**: `10000`

### Variable 3:
**Key**: `NODE_ENV`
**Value**: `production`

---

## 🎨 NETLIFY DEPLOYMENT (Frontend)

### File: `C:\ChatBot\frontend\.env.production`

```env
VITE_API_URL=https://your-backend-app.onrender.com/api
VITE_SOCKET_URL=https://your-backend-app.onrender.com
```

**⚠️ Update after deploying backend to Render**

### On Netlify Dashboard:

Add these **2 environment variables**:

### Variable 1:
**Key**: `VITE_API_URL`
**Value**: `https://your-backend-app.onrender.com/api`

### Variable 2:
**Key**: `VITE_SOCKET_URL`
**Value**: `https://your-backend-app.onrender.com`

---

## ✅ Complete Connection String Example

If your cluster URL is `cluster0.ab1cd.mongodb.net`, your full connection string is:

```
mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.ab1cd.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

### Parts Breakdown:
```
mongodb+srv://              ← Protocol
prernabhamre2005_db_user    ← Your username
:                           ← Separator
sPHS8Kh3SWo5GwFm           ← Your password
@                           ← Separator
cluster0.ab1cd.mongodb.net  ← YOUR cluster URL (GET THIS FROM ATLAS!)
/pune-bookfest              ← Database name
?retryWrites=true&w=majority ← Connection options
```

---

## 🎯 Quick Setup Steps

1. **Login to MongoDB Atlas**: https://cloud.mongodb.com

2. **Get your cluster URL**:
   - Database → Connect → Connect your application
   - Copy the URL part (e.g., `cluster0.xxxxx.mongodb.net`)

3. **Update .env file**:
   ```bash
   # Open in editor
   notepad C:\ChatBot\backend\.env
   
   # Replace YOUR_CLUSTER_URL with actual URL
   ```

4. **Save and seed**:
   ```bash
   cd C:\ChatBot\backend
   npm run seed
   ```

5. **Verify success**:
   - Should see: "✅ Connected to MongoDB"
   - Should see: "✨ Database seeded successfully!"

---

## 🐛 Common Mistakes

### ❌ WRONG: Leaving placeholder
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/...
```

### ❌ WRONG: Missing database name
```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.abc.mongodb.net?retryWrites=true
```

### ❌ WRONG: Missing password
```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:<password>@cluster0.abc.mongodb.net/pune-bookfest
```

### ✅ CORRECT: Complete connection string
```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.abc123.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

---

## 📋 Checklist Before Seeding

- [ ] MongoDB Atlas cluster is active (green status)
- [ ] User `prernabhamre2005_db_user` created in "Database Access"
- [ ] Network Access allows `0.0.0.0/0` (or your IP)
- [ ] Connection string copied from Atlas
- [ ] Cluster URL updated in .env file
- [ ] Password is correct (no `<password>` placeholder)
- [ ] Database name `/pune-bookfest` is included
- [ ] .env file saved
- [ ] Terminal is in `backend` folder

---

## 🎬 Ready to Test?

```bash
# Navigate to backend
cd C:\ChatBot\backend

# Test connection by seeding
npm run seed

# Expected output:
# ✅ Connected to MongoDB
# 🗑️ Cleared existing data  
# 📅 Events seeded successfully
# 🔗 Links seeded successfully
# ✨ Database seeded successfully!
```

---

## 📞 Still Getting Errors?

### Error: "querySrv ENOTFOUND"
→ **Wrong cluster URL**
→ Get exact URL from Atlas "Connect" dialog

### Error: "Authentication failed"  
→ **Wrong username or password**
→ Verify credentials in "Database Access"

### Error: "Connection timeout"
→ **IP not whitelisted**
→ Add `0.0.0.0/0` in "Network Access"

---

**Need the full guide? Check: `MONGODB_ATLAS_SETUP.md`**
