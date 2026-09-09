# SkyFleet Technologies — Landing Page

A professional, fully-responsive IT services landing page built with pure HTML, CSS, and Vanilla JavaScript.

---

## 📁 Folder Structure

```
skyfleet-technologies/
│
├── index.html          ← Main HTML5 page (all sections)
├── style.css           ← All styling (CSS custom properties, responsive design)
├── script.js           ← Vanilla JS (sticky navbar, menu, scroll animations, card tilt)
│
├── assets/             ← Project images and graphic assets
│
└── README.md           ← Documentation
```

---

## 🚀 How to Run Locally

1. Simply open `index.html` directly in any web browser, **or**
2. Use VS Code's **Live Server** extension (or any local static file server) for live reload.

No backend server, build step, or Node environment required!

---

## 🎨 Customisation Guide

### Change company name / content
- All text content is in `index.html`.
- Company details and contact info can be modified directly in the respective HTML section tags.

### Change colours
Open `style.css` and edit the `:root` variables block at the top:
```css
:root {
  --accent:    #00d4ff;   /* primary accent colour */
  --accent-2:  #7c3aed;   /* secondary accent colour */
  --bg:        #07090f;   /* page background */
}
```

---

## 📦 Tech Stack & Assets

- **HTML5**: Semantic markup & SEO structured content
- **CSS3**: Custom layout, flexbox, grid, glassmorphism, responsive styles
- **Vanilla JavaScript**: Mobile navigation, IntersectionObserver scroll animations, 3D card tilts, client-side form validation
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Typography**: Google Fonts (Syne + DM Sans)

---

## 🌐 Deploying to Production

Host `index.html`, `style.css`, `script.js`, and `assets/` on any static hosting provider:
- [GitHub Pages](https://pages.github.com)
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- Standard Web Hosting (cPanel / Apache / NGINX)

---

© 2026 SkyFleet Technologies. All rights reserved.
