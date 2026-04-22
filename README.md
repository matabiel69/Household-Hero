# 🏠 HouseHold Hero

**You've got this. We've got you.**

A warm, encouraging DIY fix-it app for anyone who wants to handle things themselves. 40+ step-by-step guides across plumbing, electrical, appliances, car, tech, safety, and yard care — plus a personalized maintenance calendar.

## ✨ Features (v1)

- 📚 **40+ DIY fixes** with difficulty ratings, time estimates, and tool lists
- 📅 **Maintenance calendar** — monthly, seasonal, and annual tasks tailored to your home
- 🏠 **Home profile** — own/rent, house type, year built, ZIP
- 💾 **Local save** — favorites and progress saved to your device
- 🛠️ **Affiliate tool links** — Amazon Associates integration (your ID in `src/data/pros.js`)
- 📞 **Pro directory** — featured local pros + national aggregator fallbacks
- 🎨 **Warm aesthetic** — rose + pastel, Nunito font, friendly language

## 🚀 Quick Start (Local Development)

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 📦 Deploy to Vercel (Recommended)

### First-time setup (5 min, free forever)

1. **Create a GitHub account** at https://github.com/signup (if you don't have one)
2. **Create a Vercel account** at https://vercel.com/signup — choose "Continue with GitHub"

### Deploy

1. On GitHub, click **+** → **New repository** → name it `household-hero` → Public → **Create repository**
2. Click **"uploading an existing file"** on the next page
3. Drag ALL files from this project into the browser (keep the `src` folder structure)
4. Click **Commit changes**
5. Go to https://vercel.com/new → click **Import** next to your repo
6. Leave all defaults → click **Deploy**
7. Wait ~60 seconds. Done.

You'll get a URL like `household-hero.vercel.app` you can share. Every push to GitHub auto-deploys.

## 🗂️ Project Structure

```
household-hero/
├── src/
│   ├── App.jsx            # Main app (all views + routing)
│   ├── main.jsx           # React entry point
│   ├── index.css          # Tailwind + global styles
│   ├── utils.js           # Icon + color helpers
│   └── data/
│       ├── categories.js  # Category definitions
│       ├── fixes.js       # 40+ DIY fix guides (edit here to add more!)
│       ├── maintenance.js # Maintenance calendar tasks
│       └── pros.js        # Local pros + affiliate links
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## ➕ Adding New Fixes

Edit `src/data/fixes.js`. Each fix follows this shape:

```js
{
  id: "unique-slug",
  category: "plumbing",  // must match a category ID
  title: "Short scannable title",
  tagline: "Warm encouraging one-liner.",
  difficulty: 2,  // 1-5
  time: "20 min",
  tools: [
    { name: "Wrench", affiliateTag: "wrench" },  // affiliateTag auto-generates Amazon link
    { name: "Flashlight" },                       // no tag = just a label
  ],
  safety: ["Safety warning here"],  // empty array if none
  steps: ["Step 1...", "Step 2...", "Step 3..."],
  whenToCallPro: "When to give up and call someone.",
  emergency: false,  // optional, true for gas leaks etc
}
```

No React code changes needed — just add to the array and redeploy.

## 💰 Monetization Setup

### Amazon Associates (affiliate links)

1. Sign up at https://associates.amazon.com
2. Get your tracking ID (looks like `yourname-20`)
3. Open `src/data/pros.js`
4. Replace `const AFFILIATE_TAG = "householdhero-20"` with your tag
5. Commit and push — every tool chip is now an affiliate link

### Local Pros Directory

When you sign up paying pros:

1. Open `src/data/pros.js`
2. Add entries to `LOCAL_PROS` array
3. Set `paid: true` and optionally scope to ZIP codes
4. Commit and push

Suggested pricing: $50-150/month per listing, higher for "Featured" status.

## 🔐 Future Roadmap (v2+)

When you're ready to add auth and user accounts:

- **Backend:** Supabase (recommended — free tier, open source)
- **Auth methods:** Email/password + Google + Apple Sign-In
- **Sync:** Saved fixes, maintenance log, profile across devices
- **Community:** User-suggested fixes, reviews
- **Monetization:** Premium tier, featured pro listings, branded merch

## ⚖️ Legal & Safety

HouseHold Hero guides are informational only. Always:
- Use your own judgment
- Follow local codes and permits
- Call a pro for anything involving gas, high-voltage, structural work, or beyond your comfort
- For emergencies (gas leak, fire, flood): leave first, call 911

The app is not liable for DIY outcomes. Users agree to these terms in the Profile tab.

## 📄 License

MIT — do what you want, just don't blame us if a DIY goes sideways.

---

Built with ❤️ by Jarred Hoffman
