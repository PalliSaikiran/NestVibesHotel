# Deployment Guide for NestVibes

## Option 1: Render.com (Recommended - Free Tier)

### Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)

### Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with username/password
5. Whitelist IP address (0.0.0.0/0 for all IPs)
6. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/nestvibes`)

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nestvibes.git
git push -u origin main
```

### Step 3: Deploy on Render
1. Go to [Render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: nestvibes
   - **Branch**: main
   - **Root Directory**: (leave empty)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
6. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `SESSION_SECRET`: Generate a random string (use: `openssl rand -base64 32`)
   - `PORT`: 3000
7. Click "Deploy Web Service"

### Step 4: Update MongoDB Connection
Your app will automatically use the `MONGO_URI` environment variable from Render.

---

## Option 2: Railway (Free Tier)

### Step 1: Set up MongoDB Atlas (same as above)

### Step 2: Deploy on Railway
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will automatically detect Node.js
5. Add environment variables in the "Variables" tab:
   - `MONGO_URI`: Your MongoDB connection string
   - `SESSION_SECRET`: Random string
   - `PORT`: 3000
6. Click "Deploy"

---

## Option 3: Vercel (with modifications)

Vercel is primarily for static sites and serverless functions. To use it with Express:

### Step 1: Modify for Vercel
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ]
}
```

### Step 2: Deploy
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables when asked

---

## Environment Variables Needed

For all platforms, you'll need:
- `MONGO_URI`: MongoDB connection string
- `SESSION_SECRET`: Random secret string for sessions
- `PORT`: Port number (usually 3000)

---

## Post-Deployment Checklist

1. **Test the live URL**
2. **Verify database connection**
3. **Test user registration/login**
4. **Test creating/editing/deleting listings**
5. **Check image loading**
6. **Test on mobile devices**

---

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Verify database user credentials

### Build Errors
- Check that all dependencies are in package.json
- Ensure Node.js version is compatible
- Review build logs in deployment platform

### Runtime Errors
- Check environment variables are set correctly
- Review application logs
- Verify MongoDB connection string format

---

## Custom Domain (Optional)

Once deployed, you can add a custom domain:
- **Render**: Settings → Domains → Add Domain
- **Railway**: Settings → Domains → Add Domain
- **Vercel**: Domains → Add Domain

Then update your DNS records at your domain registrar.
