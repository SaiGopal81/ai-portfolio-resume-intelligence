# Deployment Guide

This guide details how to deploy the AI Data Engineer Portfolio & Resume Studio to Vercel.

## Prerequisites
- A GitHub, GitLab, or Bitbucket account.
- A Vercel account (free tier is sufficient).
- API keys for Resend (Email) and Groq (AI capabilities).

## Step 1: Push to GitHub
Ensure your code is pushed to a remote repository.
```bash
git add .
git commit -m "Initial commit for AI Portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

## Step 2: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Import the `portfolio` repository from your connected Git account.
4. **Configure Project:**
   - Framework Preset: Next.js (will be auto-detected)
   - Build Command: `npm run build`
   - Install Command: `npm install`
5. **Environment Variables:**
   Expand the *Environment Variables* section and add the keys from your `.env.local`:
   - `GROQ_API_KEY`: Your Groq API key
   - `RESEND_API_KEY`: Your Resend API key
   - `CONTACT_RECEIVER_EMAIL`: The email where you want to receive messages
   - `GITHUB_TOKEN`: (Optional) Your GitHub PAT for pulling live stats
6. Click **Deploy**.

## Step 3: Verify Post-Deployment
- Navigate to the provided Vercel domain (e.g., `https://your-portfolio.vercel.app`).
- Test the **Contact Form** to ensure Resend is working.
- Navigate to the **Resume Studio** and test the parsing capabilities.
- Check the **Recruiter Dashboard** (`/recruiter`).

## Notes on the Proxy (Middleware)
Vercel Edge functions perfectly support the rate-limiting proxy configured in `src/proxy.ts`. No further configuration is required to prevent API abuse.
