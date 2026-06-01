# ⭐ MyRetroBlog

> *Relive the golden era of personal blogging — 2006 style, modern performance.*

A nostalgic social blogging platform inspired by the classic Skyblog / MySpace era (2004–2010). Built with pure HTML, CSS, and Vanilla JavaScript. No frameworks. No build tools. Just vibes. ✨

---

## 🌸 Live Demo

**[→ View Live on GitHub Pages](https://yourusername.github.io/MyRetroBlog/)**

---

## ✨ Features

### 📝 Personal Blogs
- Custom blog title, profile photo, and description
- Favorite music, movies & interests
- Online status indicator
- Visitor counter

### 📔 Blog Posts
- **Diary entries** — share your daily thoughts
- **Stories** — longer narrative posts
- **Photo posts** — upload and showcase images
- **Status updates** — quick mood check-ins
- Mood selector (😊 happy, 🌙 nostalgic, 💕 in love, and more)
- Tag system for discovery
- Rich text toolbar with emoji picker

### 📸 Photo Gallery
- Create multiple albums
- Upload photos from your device
- Fullscreen lightbox viewer with prev/next navigation
- Photo count per album

### 💬 Social Features
- Comment on any post
- Like / unlike posts
- Follow / unfollow bloggers
- Guestbook for each blog
- Share posts via Web Share API or clipboard

### 🎨 Profile Customization
- 8 color themes: Pink, Blue, Green, Purple, Dark, Rainbow, Sunset, Mint
- Theme switcher with live preview
- Custom avatar URL
- Profile banner with emoji

### 🔍 Discovery
- Browse all blogs in a card grid
- Filter by category: Lifestyle, Music, Gaming, Fashion, Food, Travel, Art
- Search by username, blog name, description, interests
- Featured blogs sidebar widget
- Top blogs leaderboard
- Trending tags cloud
- Random blog button

### 🎵 Music Player Widget
- Floating retro music player
- Playlist navigation (prev / next)
- Play/pause toggle
- Minimizable

### 🌟 Retro Widgets
- Animated star marquee ticker
- Mood emoji grid
- "This Day In History" facts
- Newest members showcase
- Visitor counter with green LED display
- Glitter/sparkle cursor effect (desktop)

---

## 🚀 Getting Started

### Option 1: GitHub Pages (Recommended)

1. **Fork** this repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://yourusername.github.io/MyRetroBlog/`

### Option 2: Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/MyRetroBlog.git
cd MyRetroBlog

# Open in browser (no build step needed!)
open index.html

# Or use a local server (recommended)
npx serve .
# or
python -m http.server 8080
```

---

## 📁 File Structure

```
MyRetroBlog/
├── index.html       # Main HTML — all views and modals
├── style.css        # All styles — themes, animations, responsive
├── app.js           # App controller — nav, auth, widgets, glitter
├── profiles.js      # Profile data, renderers, blog cards
├── blog.js          # Posts, editor, gallery, guestbook logic
├── sitemap.xml      # SEO sitemap
├── robots.txt       # SEO robots file
└── README.md        # This file
```

---

## 🎨 Themes

| Theme | Color | Vibe |
|-------|-------|------|
| 🌸 Default Pink | `#ff69b4` | Classic girly blog |
| 💙 Ocean Blue | `#4fc3f7` | Cool and calm |
| 🌿 Forest Green | `#66bb6a` | Natural vibes |
| 💜 Purple Dream | `#ab47bc` | Mysterious |
| 🖤 Dark Night | `#e91e63` | Emo / night owl |
| 🌈 Rainbow | Multi | Fun and playful |
| 🌅 Sunset | `#ff7675` | Warm and cozy |
| 🍃 Mint Fresh | `#00b894` | Clean and fresh |

---

## 💾 Data Storage

MyRetroBlog uses **localStorage** for all data persistence — no backend required!

| Key | Contents |
|-----|----------|
| `currentUser` | Logged-in user object |
| `mySettings` | Blog settings (title, theme, etc.) |
| `userPosts` | User's published posts |
| `guestbook` | Guestbook entries |
| `albums` | Photo albums |
| `comments_{postId}` | Comments per post |
| `visitorCount` | Visitor counter |
| `draft` | Auto-saved draft |

> ⚠️ Data is stored locally in the browser. Clearing browser data will reset the app.

---

## 📱 Browser Support

| Browser | Status |
|---------|--------|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Mobile Chrome | ✅ Responsive |
| Mobile Safari | ✅ Responsive |

---

## ⚡ Performance

- Zero external JS dependencies
- CSS animations use `transform` and `opacity` (GPU accelerated)
- Images use `loading="lazy"`
- Glitter canvas disabled on mobile to save battery
- No build step — pure static files

---

## 🔒 Privacy & Security

- All data stays in the user's browser (localStorage)
- No tracking, no analytics, no ads
- No server-side storage
- XSS protection via `escapeHtml()` on all user input
- No external API calls (except Google Fonts + Pravatar for demo avatars)

---

## 🛠️ Customization

### Add Real Music

In `app.js`, update the `MUSIC_PLAYLIST` array with real audio URLs:

```js
const MUSIC_PLAYLIST = [
  { title: 'My Favorite Song 🎵', src: 'https://yourserver.com/song.mp3' },
  // ...
];
```

Then in `musicToggle()`, create an `<audio>` element to play the src.

### Add Your Own Sample Posts

In `profiles.js`, add to `SAMPLE_POSTS`:

```js
{
  id: 'p009',
  authorId: 'your_profile_id',
  title: 'My Amazing Post',
  body: 'Post content here...',
  type: 'diary', // diary | story | photo | status
  mood: 'happy',
  tags: ['life', 'blog'],
  likes: 0,
  comments: 0,
  date: '2006-09-15T10:00:00',
  liked: false,
}
```

### Change Default Profiles

Edit the `SAMPLE_PROFILES` array in `profiles.js`. Each profile has:
- `id`, `username`, `blogName`, `desc`, `bio`
- `avatar` (URL), `banner` (emoji)
- `music`, `movies`, `interests`, `location`
- `posts`, `followers`, `following`, `views`
- `theme`, `category`, `badges`

---

## 📣 SEO

- Semantic HTML5 structure
- Open Graph meta tags
- Twitter Card meta tags
- `sitemap.xml` for search engine crawling
- `robots.txt` for crawler instructions
- `<link rel="canonical">` tag
- Descriptive `alt` attributes on images

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 📬 Contact

**Email:** salatrir@gmail.com

---

## 💖 Acknowledgments

- Inspired by **Skyblog** (2002–2023), **MySpace** (2003–), and the golden era of personal blogging
- Avatar placeholders by [pravatar.cc](https://pravatar.cc)
- Photography from [Unsplash](https://unsplash.com)
- Fonts: [Fredoka One](https://fonts.google.com/specimen/Fredoka+One), [Nunito](https://fonts.google.com/specimen/Nunito), [Patrick Hand](https://fonts.google.com/specimen/Patrick+Hand) via Google Fonts

---

*Made with 💖 · Relive the golden era of blogging · MyRetroBlog © 2006–2026*

```
★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★
```
