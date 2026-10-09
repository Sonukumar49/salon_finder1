# Step 1 – Deploy to Vercel

1. Push this folder to a GitHub repo:
   git init && git add . && git commit -m "step 1" 
   (create repo on github.com, then)
   git remote add origin <your-repo-url> && git branch -M main && git push -u origin main
2. Go to vercel.com -> Add New -> Project -> import the repo.
3. Settings are auto-detected (Vite, build: npm run build, output: dist). Click Deploy.
4. Done. Every git push redeploys automatically.

Local run:  npm install && npm run dev
