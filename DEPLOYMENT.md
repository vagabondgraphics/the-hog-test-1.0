# 🚀 Deploy The Hog Dashboard to Vercel

## Quick Deploy (5 minutes)

### Step 1: Push to GitHub

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `the-hog-dashboard`
3. Keep it public (or private if you have a paid plan)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

6. Run these commands in your terminal:

```bash
git remote add origin YOUR_GITHUB_URL_HERE
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/login with GitHub (free)
3. Click "Add New Project"
4. Import your `the-hog-dashboard` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"
7. Wait 2-3 minutes for deployment

### Step 3: Get Your Embed Link

Once deployed, Vercel gives you a URL like:
```
https://the-hog-dashboard.vercel.app
```

### For Framer Embed:

**Option A: iframe Embed**
```html
<iframe
  src="https://your-deployment-url.vercel.app"
  width="100%"
  height="800px"
  frameborder="0"
  style="border: none;"
></iframe>
```

**Option B: Direct Link**
Just paste the Vercel URL directly into Framer's embed component.

---

## Alternative: Netlify Drop

If you prefer a drag-and-drop approach:

1. Build the project locally:
```bash
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `.next` folder
4. Get instant deployment URL

---

## Notes

- ✅ Project is ready to deploy (all files committed)
- ✅ Git repository initialized
- ✅ Production build works
- ⚠️ Font files are placeholders - replace with actual Akkurat fonts if needed
- 📊 All charts and interactions will work in production

## Support

If you encounter any issues:
- Check build logs on Vercel/Netlify
- Verify all dependencies installed correctly
- Ensure Node.js version is 18+ (Vercel uses this automatically)
