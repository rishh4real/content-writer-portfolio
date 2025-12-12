# How to Set Up Google Analytics for Your Portfolio

## Step 1: Create a Google Analytics Account
1. Go to https://analytics.google.com/
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an account name (e.g., "My Portfolio")
5. Set up a property (your website)
6. Enter your website URL: `rishh4real.github.io/content-writer-portfolio`

## Step 2: Get Your Tracking ID
1. After creating the property, you'll get a Measurement ID
2. It will look like: `G-XXXXXXXXXX` (starts with G-)

## Step 3: Add Tracking ID to Your Site
1. Open `index.html` (and other HTML files)
2. Find this line: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID
4. Also replace it in the `gtag('config', 'G-XXXXXXXXXX')` line
5. Do this for all HTML files: `index.html`, `about.html`, `portfolio.html`, `contact.html`, `developer.html`

## Step 4: View Your Analytics
1. Go back to Google Analytics dashboard
2. Wait 24-48 hours for data to start appearing
3. You can see:
   - Number of visitors
   - Page views
   - Where visitors came from
   - Which pages are most popular
   - Visitor locations
   - And much more!

## Alternative: Simple Visitor Counter
If you want a simpler solution, you can use:
- **GoatCounter** (free, privacy-friendly): https://goatcounter.com/
- **Plausible Analytics** (paid, privacy-focused)
- **Cloudflare Web Analytics** (free): https://www.cloudflare.com/web-analytics/
