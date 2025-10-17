# 🔧 MongoDB Atlas Connection Troubleshooting

## Quick Diagnostic Flow

```
Start: npm run seed fails
        ↓
   Check Error Message
        ↓
┌───────────────────────────────────┐
│ Error Type?                       │
└───────────────────────────────────┘
        ↓
   ┌────┴────────────────┐
   ↓                     ↓
"querySrv ENOTFOUND"   "Authentication failed"
   ↓                     ↓
Wrong cluster URL      Wrong credentials
   ↓                     ↓
Fix: Get correct      Fix: Verify username
     URL from Atlas        and password
        ↓                     ↓
   ┌────┴─────────────────────┘
   ↓
"Connection timeout"
   ↓
IP not whitelisted
   ↓
Fix: Add 0.0.0.0/0
     in Network Access
```

---

## 🎯 Step 1: Get Your Cluster URL from Atlas

### Visual Guide:

```
MongoDB Atlas Dashboard
  └─ Database (left sidebar)
      └─ Your Cluster (e.g., "Cluster0")
          └─ Click "Connect" button
              └─ Choose "Connect your application"
                  └─ Driver: Node.js
                      └─ Version: 4.1 or later
                          └─ Connection string appears:
```

**You'll see something like:**
```
mongodb+srv://<username>:<password>@cluster0.XXXXX.mongodb.net/?retryWrites=true&w=majority
```

**The important part:** `cluster0.XXXXX.mongodb.net`

---

## 📝 Step 2: Build Your Connection String

### Template:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/DATABASE?OPTIONS
```

### Your Values:
- **USERNAME**: `prernabhamre2005_db_user`
- **PASSWORD**: `sPHS8Kh3SWo5GwFm`  
- **CLUSTER_URL**: `cluster0.XXXXX.mongodb.net` ← GET THIS FROM ATLAS!
- **DATABASE**: `pune-bookfest`
- **OPTIONS**: `retryWrites=true&w=majority`

### Result:
```
mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.XXXXX.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

**⚠️ Replace XXXXX with your actual cluster identifier!**

---

## 🔍 Step 3: Common Cluster URL Formats

Your cluster URL might look like one of these:

```
cluster0.mongodb.net
cluster0.abc123.mongodb.net
cluster0.xy1z2.mongodb.net  
cluster0.ab1cd.mongodb.net
cluster-name.xyz789.mongodb.net
```

**The format is:** `<cluster-name>.<random-chars>.mongodb.net`

---

## ⚙️ Step 4: Update Your .env File

### Open the file:
```bash
# Windows
notepad C:\ChatBot\backend\.env

# Or use VS Code
code C:\ChatBot\backend\.env
```

### Replace ENTIRE MONGODB_URI line:

**BEFORE:**
```env
MONGODB_URI=mongodb://localhost:27017/pune-bookfest
```

**AFTER** (with YOUR cluster URL):
```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@YOUR_ACTUAL_CLUSTER_URL/pune-bookfest?retryWrites=true&w=majority
```

### Example with real cluster URL:
```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.ab1cd.mongodb.net/pune-bookfest?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**Important:**
- Must be ONE long line (no line breaks)
- No spaces
- No quotes around the value
- Save the file!

---

## 🌐 Step 5: Network Access Configuration

### Why this is important:
MongoDB Atlas blocks all connections by default for security. You must whitelist your IP.

### How to allow access:

1. **MongoDB Atlas** → **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"**
   - This adds: `0.0.0.0/0`
   - Best for development and showing to clients
4. Click **"Confirm"**
5. **Wait 1-2 minutes** for changes to apply

### Visual:
```
Network Access Page
  └─ IP Access List
      └─ 0.0.0.0/0 (Allows access from anywhere)
          └─ Status: Active ✅
```

---

## 👤 Step 6: Verify Database User

### Check if user exists:

1. **MongoDB Atlas** → **Database Access** (left sidebar)
2. Look for user: `prernabhamre2005_db_user`

### If user exists:
```
Username: prernabhamre2005_db_user
Auth Method: Password
Database User Privileges: Read and write to any database ✅
```

### If user doesn't exist:
1. Click **"Add New Database User"**
2. **Username**: `prernabhamre2005_db_user`
3. **Password**: `sPHS8Kh3SWo5GwFm`
4. **Privileges**: "Read and write to any database"
5. Click **"Add User"**

---

## 🧪 Step 7: Test Connection

### Method 1: Seed Database
```bash
cd C:\ChatBot\backend
npm run seed
```

### Success Output:
```
✅ Connected to MongoDB
🗑️ Cleared existing data
📅 Events seeded successfully
🔗 Links seeded successfully
✨ Database seeded successfully!
```

### Method 2: Use MongoDB Compass (Visual Tool)

1. Download: https://www.mongodb.com/try/download/compass
2. Install and open
3. Paste your complete connection string
4. Click "Connect"
5. If it connects, your string is correct!

---

## ❌ Error Messages & Solutions

### Error 1: "querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net"

**Cause**: Wrong or incomplete cluster URL

**Solution**:
1. Go to Atlas → Database → Connect
2. Get the EXACT connection string
3. Look for the cluster URL part
4. Update .env with correct URL

**Example fix:**
```env
# ❌ WRONG
MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/...

# ✅ CORRECT (with full cluster URL)
MONGODB_URI=mongodb+srv://user:pass@cluster0.abc123.mongodb.net/...
```

---

### Error 2: "MongoServerError: bad auth : Authentication failed"

**Cause**: Wrong username or password

**Solution**:
1. Check Database Access in Atlas
2. Verify user `prernabhamre2005_db_user` exists
3. Password is `sPHS8Kh3SWo5GwFm`
4. If unsure, delete user and recreate it

**Fix .env:**
```env
# Make sure these are EXACT:
# Username: prernabhamre2005_db_user
# Password: sPHS8Kh3SWo5GwFm
```

---

### Error 3: "MongoNetworkError: connection timed out"

**Cause**: IP address not whitelisted

**Solution**:
1. Go to Network Access in Atlas
2. Add IP: `0.0.0.0/0` (allow from anywhere)
3. Wait 1-2 minutes
4. Try again

---

### Error 4: "URI does not have hostname, domain name and tld"

**Cause**: Malformed connection string

**Solution**:
Check your connection string format:

```env
# Must include:
mongodb+srv://           ← Protocol
username:password@       ← Credentials
cluster0.xyz.mongodb.net ← Cluster URL
/database                ← Database name
?retryWrites=true        ← Options
```

---

## ✅ Verification Checklist

Before running `npm run seed`:

- [ ] **Atlas Cluster**: Active (green status) in Atlas dashboard
- [ ] **Database User**: `prernabhamre2005_db_user` exists
- [ ] **User Permissions**: "Read and write to any database"
- [ ] **Network Access**: `0.0.0.0/0` added and active
- [ ] **Cluster URL**: Copied from Atlas (not guessed)
- [ ] **Connection String**: Complete with all parts
- [ ] **.env File**: Saved after editing
- [ ] **No Placeholders**: No `<password>` or `<username>` in .env
- [ ] **Database Name**: `/pune-bookfest` included
- [ ] **One Line**: Connection string not split across lines

---

## 🎯 Example: Working .env File

```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.abc123.mongodb.net/pune-bookfest?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**Key points:**
- No line breaks in MONGODB_URI
- No quotes
- No spaces around `=`
- Actual cluster URL (not cluster0.mongodb.net)

---

## 🔄 After Successful Seeding

### Verify in Atlas:
1. Go to Atlas → Database → Browse Collections
2. Select your cluster
3. You should see database: `pune-bookfest`
4. Collections:
   - **events**: 12 documents
   - **links**: 5 documents  
   - **messages**: (empty initially)

### Start Your App:
```bash
# Terminal 1
cd C:\ChatBot\backend
npm run dev

# Terminal 2
cd C:\ChatBot\frontend
npm run dev
```

### Access:
http://localhost:5173

---

## 📞 Still Need Help?

### What to check:
1. **Screenshot Atlas "Connect" dialog** showing connection string
2. **Screenshot your .env file** (you can hide password)
3. **Screenshot error message** in terminal

### Where to get cluster URL:
The **ONLY** reliable place is:
```
Atlas → Database → Your Cluster → Connect → Connect your application
```

Don't guess the URL - copy it from Atlas!

---

## 🚀 Quick Command Reference

```bash
# Go to backend folder
cd C:\ChatBot\backend

# Test connection with seed
npm run seed

# If successful, start server
npm run dev

# Check if connected
# Look for: "✅ MongoDB Connected Successfully"
```

---

**Follow these steps carefully and your MongoDB Atlas will be connected! 🎉**

For the complete guide, see: **`MONGODB_ATLAS_SETUP.md`**
