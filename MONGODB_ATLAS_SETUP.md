# 🗄️ Complete MongoDB Atlas Setup Guide

## Step-by-Step Instructions for Pune Book Fest Chatbot

---

## 📋 Your Credentials
- **Username**: `prernabhamre2005_db_user`
- **Password**: `sPHS8Kh3SWo5GwFm`

---

## 🚀 STEP 1: Login to MongoDB Atlas

1. Go to: **https://cloud.mongodb.com**
2. **Login** with your account
3. You should see the MongoDB Atlas dashboard

---

## 🗄️ STEP 2: Create/Find Your Cluster

### If you DON'T have a cluster yet:

1. Click **"Build a Database"** or **"Create"** button
2. Choose **"Shared"** (FREE tier - M0)
3. Select **Cloud Provider**: AWS (recommended)
4. Select **Region**: Choose closest to India (e.g., Mumbai ap-south-1)
5. **Cluster Name**: `Cluster0` (or any name you prefer)
6. Click **"Create Cluster"**
7. **Wait 3-5 minutes** for cluster to be created

### If you ALREADY have a cluster:

1. You should see it listed under "Database" section
2. Note down the cluster name (e.g., Cluster0)

---

## 👤 STEP 3: Create Database User (IMPORTANT!)

1. Click **"Database Access"** in the left sidebar (under SECURITY section)
2. Click **"Add New Database User"** button

### Configure User:

**Authentication Method**: Password

**Username**: `prernabhamre2005_db_user` (you already have this)

**Password**: `sPHS8Kh3SWo5GwFm` (you already have this)

**Database User Privileges**: 
- Select: **"Read and write to any database"**

3. Click **"Add User"**

✅ **User created!**

---

## 🌐 STEP 4: Setup Network Access (CRITICAL!)

This is often the cause of connection errors!

1. Click **"Network Access"** in the left sidebar (under SECURITY section)
2. Click **"Add IP Address"** button

### Option A: Allow from Anywhere (Easiest for development)

1. Click **"Allow Access from Anywhere"**
2. This will add: `0.0.0.0/0`
3. Click **"Confirm"**

### Option B: Add Your Current IP (More Secure)

1. Click **"Add Current IP Address"**
2. Your IP will be automatically detected
3. Click **"Confirm"**

**⚠️ IMPORTANT**: For demo/development, use **Option A** (Allow from Anywhere)

✅ **Network access configured!**

---

## 🔗 STEP 5: Get Your Connection String

1. Go back to **"Database"** in the left sidebar
2. Find your cluster (e.g., Cluster0)
3. Click **"Connect"** button (on the right side of your cluster)

### In the connection dialog:

1. Click **"Connect your application"**
2. **Driver**: Select **"Node.js"**
3. **Version**: Select **"4.1 or later"**
4. You'll see a connection string like this:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 🔑 Important Parts of Connection String:

- **`cluster0.xxxxx.mongodb.net`** - This is YOUR cluster URL
- The **`xxxxx`** part is unique to your cluster (like `abc123`, `xyz789`, etc.)

**Example URLs you might see:**
- `cluster0.abc123.mongodb.net`
- `cluster0.mongodb.net`
- `cluster0.xy1z2.mongodb.net`

5. **Copy the ENTIRE connection string**

---

## 📝 STEP 6: Build Your Complete Connection String

Take the connection string you copied and modify it:

### Template:
```
mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@YOUR_CLUSTER_URL/pune-bookfest?retryWrites=true&w=majority
```

### Replace `YOUR_CLUSTER_URL` with what you see in Atlas

**Examples of complete strings:**

If your cluster URL is `cluster0.abc123.mongodb.net`:
```
mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.abc123.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

If your cluster URL is `cluster0.mongodb.net`:
```
mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

### 🎯 Key Points:
- Username: `prernabhamre2005_db_user`
- Password: `sPHS8Kh3SWo5GwFm`
- Database name: `pune-bookfest` (added before the `?`)
- Must include: `?retryWrites=true&w=majority`

---

## ⚙️ STEP 7: Update Your .env File

1. Open: **`C:\ChatBot\backend\.env`**

2. Replace the MONGODB_URI line with your complete connection string:

```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@YOUR_ACTUAL_CLUSTER_URL/pune-bookfest?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**⚠️ Make sure to replace `YOUR_ACTUAL_CLUSTER_URL` with the real URL from Atlas!**

3. **Save the file**

---

## 🌱 STEP 8: Seed Your Database

Now that everything is configured, seed the database:

```bash
cd C:\ChatBot\backend
npm run seed
```

### ✅ Success Output:
```
✅ Connected to MongoDB
🗑️ Cleared existing data
📅 Events seeded successfully
🔗 Links seeded successfully
✨ Database seeded successfully!
```

### ❌ If you see errors:

**Error: "querySrv ENOTFOUND"**
→ Wrong cluster URL in connection string

**Error: "Authentication failed"**
→ Wrong username or password

**Error: "Connection timeout"**
→ Network Access not configured (Step 4)

---

## 🔍 STEP 9: Verify Data in Atlas

1. Go to **MongoDB Atlas Dashboard**
2. Click **"Database"** → **"Browse Collections"**
3. Select your cluster
4. You should see database: **`pune-bookfest`**
5. Inside it, you should see 3 collections:
   - **events** (12 documents)
   - **links** (5 documents)
   - **messages** (0 or more documents)

✅ **Database is ready!**

---

## 📊 COMPLETE ENVIRONMENT VARIABLES

### For Local Development:

**File**: `C:\ChatBot\backend\.env`

```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@YOUR_CLUSTER_URL/pune-bookfest?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### For Render Deployment (Backend):

When deploying backend to Render, add these environment variables:

**Key**: `MONGODB_URI`
**Value**: `mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@YOUR_CLUSTER_URL/pune-bookfest?retryWrites=true&w=majority`

**Key**: `PORT`
**Value**: `10000`

**Key**: `NODE_ENV`
**Value**: `production`

### For Netlify Deployment (Frontend):

**File**: `C:\ChatBot\frontend\.env.production`

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

(Update these after deploying backend to Render)

---

## 🐛 Common Issues & Solutions

### Issue 1: "querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net"

**Cause**: Incorrect cluster URL in connection string

**Solution**:
1. Go to MongoDB Atlas
2. Get the EXACT connection string from "Connect" → "Connect your application"
3. Copy YOUR specific cluster URL
4. Update .env file with the correct URL

### Issue 2: "Authentication failed"

**Cause**: Wrong username or password

**Solution**:
1. Go to "Database Access" in Atlas
2. Verify username: `prernabhamre2005_db_user` exists
3. If not, create it with password: `sPHS8Kh3SWo5GwFm`
4. Make sure "Read and write to any database" permission is set

### Issue 3: "Connection timed out"

**Cause**: IP not whitelisted

**Solution**:
1. Go to "Network Access" in Atlas
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Wait 1-2 minutes for changes to apply

### Issue 4: "MongoServerError: bad auth"

**Cause**: Special characters in password not URL-encoded

**Solution**:
If your password has special characters, they need to be URL-encoded:
- Replace `@` with `%40`
- Replace `#` with `%23`
- Replace `$` with `%24`
- etc.

**Your password** `sPHS8Kh3SWo5GwFm` is safe (no special characters).

---

## ✅ Quick Verification Checklist

Before running `npm run seed`, verify:

- [ ] MongoDB Atlas cluster is created and active (green status)
- [ ] Database user `prernabhamre2005_db_user` exists
- [ ] User has "Read and write to any database" privileges
- [ ] Network Access includes `0.0.0.0/0` or your current IP
- [ ] Connection string is copied from Atlas
- [ ] Connection string includes database name `/pune-bookfest`
- [ ] Connection string has your password (no `<password>` placeholder)
- [ ] `.env` file is saved with correct connection string
- [ ] Terminal is in `C:\ChatBot\backend` directory

---

## 🎯 Example: Complete Working Connection String

If your cluster URL from Atlas is `cluster0.ab1cd.mongodb.net`, your complete connection string should be:

```
mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.ab1cd.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

**Parts breakdown:**
- Protocol: `mongodb+srv://`
- Username: `prernabhamre2005_db_user`
- Password: `sPHS8Kh3SWo5GwFm`
- Cluster: `@cluster0.ab1cd.mongodb.net`
- Database: `/pune-bookfest`
- Options: `?retryWrites=true&w=majority`

---

## 📞 Need Help?

If you're still getting errors:

1. **Take a screenshot** of:
   - The error message in your terminal
   - MongoDB Atlas "Database" page showing your cluster
   - Your .env file (hide the password if sharing)

2. **Check**:
   - Is your cluster status "Active" (green dot)?
   - Can you see the connection string in Atlas?
   - Is the string in .env all on ONE line (no line breaks)?

3. **Try**:
   - Using MongoDB Compass to test connection
   - Download from: https://www.mongodb.com/try/download/compass
   - Paste your connection string in Compass
   - If Compass connects, Node.js should too

---

## 🚀 After Successful Setup

Once your database is seeded:

1. **Start your servers**:
```bash
# Terminal 1 - Backend
cd C:\ChatBot\backend
npm run dev

# Terminal 2 - Frontend
cd C:\ChatBot\frontend
npm run dev
```

2. **Open**: http://localhost:5173

3. **Show to your Pune client!**

---

## 🌐 Deploy to Show Client Online

If you want to give client a live URL:

Follow: **`QUICK_NETLIFY_DEPLOY.md`**

Your MongoDB Atlas is already set up and will work for both local and deployed versions!

---

**Your connection is almost ready! Just get the correct cluster URL from Atlas and update your .env file!** 🚀
