---
description: How to deploy the Water Polo Stat Tracker to the web
---

To put your website online, follow these steps:

### 1. Initialize Git and Push to GitHub
If you haven't already, you'll need to put your code on GitHub.

1. Open your terminal in the project folder.
2. Initialize git:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit: Water Polo Stat Tracker"
   ```
3. Create a new repository on [GitHub](https://github.com/new).
4. Follow the instructions on GitHub to push your local repository:
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Vercel or Netlify (Recommended)
These platforms are free for personal projects and offer automatic deployments whenever you push to GitHub.

#### Option A: Vercel (Easiest)
1. Go to [Vercel](https://vercel.com).
2. Click **"Add New"** -> **"Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect it's a Vite project. Click **"Deploy"**.

#### Option B: Netlify
1. Go to [Netlify](https://app.netlify.com).
2. Click **"Add new site"** -> **"Import an existing project"**.
3. Connect to GitHub and select your repo.
4. Click **"Deploy [Site Name]"**.

### 3. Manual Build (Optional)
If you want to host it yourself on a standard server:
1. Run `npm run build`.
2. This will create a `dist` folder.
3. Upload the contents of the `dist` folder to your web server.
