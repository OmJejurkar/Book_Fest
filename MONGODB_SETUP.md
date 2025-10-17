# 🚀 Quick Setup for Pune Client Demo

## Your MongoDB Credentials
- **Username:** `prernabhamre2005_db_user`
- **Password:** `sPHS8Kh3SWo5GwFm`

---

## ✅ Get Your Correct MongoDB Connection String

### Step 1: Go to MongoDB Atlas
1. Visit: https://cloud.mongodb.com
2. Login with your account

### Step 2: Get Connection String
1. Click on "Database" in left sidebar
2. Find your cluster (should be visible)
3. Click "Connect" button
4. Choose "Connect your application"
5. Copy the connection string

**It should look like:**
```
mongodb+srv://prernabhamre2005_db_user:<password>@cluster0.XXXXX.mongodb.net/?retryWrites=true&w=majority
```

### Step 3: Create Correct Connection String

Replace:
- `<password>` with: `sPHS8Kh3SWo5GwFm`
- Add database name `/pune-bookfest` before the `?`

**Final format:**
```
mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.XXXXX.mongodb.net/pune-bookfest?retryWrites=true&w=majority
```

**Note:** Replace `XXXXX` with your actual cluster identifier from Atlas

---

## 🔧 Update Your Configuration

### Method 1: Copy from MongoDB Atlas (Recommended)

1. **Get the exact connection string from Atlas** (as shown above)
2. **Edit:** `C:\ChatBot\backend\.env`
3. **Replace the MONGODB_URI line with your actual connection string**

Example:
```env
MONGODB_URI=mongodb+srv://prernabhamre2005_db_user:sPHS8Kh3SWo5GwFm@cluster0.abc123.mongodb.net/pune-bookfest?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### Method 2: If You Already Have a Cluster

If your cluster identifier is different, just update the XXXXX part with your actual cluster domain.

---

## 📊 Then Seed the Database

After updating the connection string:

```bash
cd backend
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️ Cleared existing data
📅 Events seeded successfully
🔗 Links seeded successfully
✨ Database seeded successfully!
```

---

## 🎯 Ready for Client Demo

Once seeded, your chatbot will have:
- ✅ 12 events across 3 days
- ✅ 5 social media links
- ✅ All data stored in MongoDB Atlas (cloud)
- ✅ Ready to show to your Pune client!

---

## 🖥️ Show to Client

Your app is already running at:
👉 **http://localhost:5173**

**Open this in your browser and demonstrate to your client!**

---

## 🌐 Optional: Deploy Online for Client

If you want to give your client a live URL they can access:

**Quick Deploy (15 min):**
1. Follow: `QUICK_NETLIFY_DEPLOY.md`
2. You'll get: `https://pune-bookfest-chatbot.netlify.app`
3. Client can access from anywhere!

---

## 🆘 Need Help?

**If connection still fails:**
1. Check MongoDB Atlas → Network Access
2. Ensure IP whitelist includes: `0.0.0.0/0` (Allow from anywhere)
3. Verify username and password are correct in Atlas

**Check your cluster:**
1. Go to MongoDB Atlas
2. Database → Browse Collections
3. After seeding, you should see 3 collections

---

**Your credentials are saved. Just get the correct cluster URL from MongoDB Atlas!** 🚀
