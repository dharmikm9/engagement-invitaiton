# 🪔 Dharmik & Drashti — Royal Engagement Invitation Website

A luxury, traditional Indian engagement invitation website built for **Dharmik & Drashti**'s Ring Ceremony on **23rd August 2026** at **Ramvadi, Nawa Para, Bhavnagar, Gujarat**.

---

## ✨ Key Features

- **👑 Royal Velvet Maroon & Metallic Gold Theme**: Designed with custom vector artwork, gold filigree ornaments, and self-hosted luxury typography (`Marcellus`, `Cormorant Garamond`, `Noto Serif Gujarati`).
- **⚡ Zero External Network Dependency**: Self-hosted WOFF2 fonts for 100% offline capability and zero render-blocking Google Fonts API roundtrips.
- **🎨 Handcrafted Indian Artwork**: Optimized WebP artwork illustrations for the hero section couple background, groom (Dharmik) avatar, and bride (Drashti) avatar.
- **🌐 English & Gujarati Dual Language Support**: Smooth bilingual toggle (`EN | ગુજરાતી`) with authentic Gujarati terminology (*શુભ સગાઈ*, *રામવાડી, નવા પરા, ભાવનગર*).
- **⏱️ Live Countdown Timer**: High-performance timer leading up to the ceremony date.
- **📅 Google Calendar & Maps Integration**: One-click "Add to Calendar" and Google Maps navigation to Ramvadi venue.
- **🎵 Ambient Music Toggle**: Top navigation bar player for background shehnai/flute music.
- **🌸 Floating Petals Particle Engine**: Hardware-accelerated HTML5 Path2D Canvas engine rendering floating golden dust and rose petals at 60 FPS.

---

## 📁 Repository Structure

```
InviteSite/
├── index.html        # Main HTML structure with bilingual data attributes & SEO tags
├── style.css         # Royal Maroon & Gold design system & self-hosted @font-face
├── script.js        # DOM-cached timer, language toggle, audio & Path2D canvas engine
├── fonts/            # Self-hosted WOFF2 web fonts (Marcellus, Cormorant Garamond, Noto Serif Gujarati)
├── images/
│   ├── hero-couple.webp  # Hero couple illustration background (WebP)
│   ├── groom.webp        # Groom artwork illustration (WebP)
│   └── bride.webp        # Bride artwork illustration (WebP)
├── audio/
│   └── invite-music.mp3  # Indian traditional background music
├── README.md         # Project documentation
└── .gitignore
```

---

## 🚀 How to Host on GitHub Pages (Free)

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```
2. Go to **Settings** -> **Pages** in your GitHub repository.
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**. Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`!

