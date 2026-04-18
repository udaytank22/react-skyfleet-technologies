# NexaCore IT Solutions — Landing Page

A professional, fully-responsive IT services landing page with Node.js (or PHP) contact form backend.

---

## 📁 Folder Structure

```
nexacore-it-services/
│
├── index.html          ← Main HTML page (all sections)
├── style.css           ← All styling (edit CSS variables to retheme)
├── script.js           ← JS: navbar, animations, counter, form submit
│
├── server.js           ← Node.js + Express email backend
├── mail.php            ← PHP alternative email backend
├── package.json        ← Node.js dependencies
├── .env.example        ← Copy to .env and fill in SMTP credentials
│
└── README.md           ← This file
```

---

## 🚀 How to Run Locally

### Option A — Frontend only (no email)

1. Open `index.html` directly in your browser, **or**
2. Use VS Code's **Live Server** extension for hot reload.

> The contact form will show an error (can't reach backend), but everything else works perfectly.

---

### Option B — Full stack with Node.js backend

**Requirements:** Node.js 18+ installed

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Then open .env and fill in your SMTP credentials (see below)

# 3. Start the server
npm start
# or for auto-restart during development:
npm run dev
```

The server runs at `http://localhost:3001`.
Open `index.html` with Live Server (port 5500) — form submissions will work.

---

### Option C — PHP backend (shared hosting)

1. Upload all files to your hosting's `public_html` (or similar).
2. In `script.js`, change the fetch URL from:
   ```js
   'http://localhost:3001/send-email'
   ```
   to:
   ```js
   'mail.php'
   ```
3. Edit `$to_email` in `mail.php` to your inbox.
4. Done! PHP's `mail()` function handles sending.

For SMTP via PHPMailer (recommended for Gmail), see the commented section at the bottom of `mail.php`.

---

## 🔑 SMTP / Gmail Setup

1. Enable **2-Step Verification** on your Google account.
2. Visit [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. Generate an App Password for "Mail" → "Other".
4. Paste the 16-character password into `.env` as `SMTP_PASS`.

Works with any SMTP provider: SendGrid, Mailgun, Zoho, Outlook, etc.

---

## 🎨 Customisation Guide

### Change company name / content
- All text is in `index.html`. Search for comments like `<!-- Edit ... here -->`.
- Company name: `NexaCore` → find & replace in `index.html`.

### Change colours
Open `style.css` and edit the `:root` block at the top:
```css
:root {
  --accent:   #00d4ff;   /* primary colour */
  --accent-2: #7c3aed;   /* secondary colour */
  --bg:       #07090f;   /* page background */
}
```

### Add/remove services
In `index.html`, find the `<!-- ── Service Card: ... ── -->` comments and copy/paste a card block.

### Replace portfolio images
Find `.port-img--1` through `.port-img--6` in `style.css` and replace the gradient with a real image:
```css
.port-img--1 {
  background-image: url('images/project1.jpg');
}
```

---

## 📦 Libraries Used (all free/open-source)

| Library | Purpose | CDN |
|---|---|---|
| [Phosphor Icons](https://phosphoricons.com/) | Icons | unpkg |
| [Google Fonts](https://fonts.google.com/) — Syne + DM Sans | Typography | fonts.googleapis.com |

No frontend frameworks required. Pure HTML, CSS, JavaScript.

---

## 🌐 Deploying to Production

**Frontend:** Host `index.html`, `style.css`, `script.js` on any static host:
- [Netlify](https://netlify.com) (recommended, free tier)
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com)

**Backend (Node.js):** Deploy `server.js` to:
- [Railway](https://railway.app) (easiest, free tier)
- [Render](https://render.com)
- Any VPS (DigitalOcean, Linode, etc.)

After deploying, update the fetch URL in `script.js`:
```js
const response = await fetch('https://your-backend-url.railway.app/send-email', { ... });
```

---

© 2025 NexaCore IT Solutions
