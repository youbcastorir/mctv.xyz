// ═══════════════════════════════════════════════
//  MyRetroBlog — app.js
//  Main controller: init, nav, auth, widgets,
//  glitter effect, music player, theme, toast
// ═══════════════════════════════════════════════

'use strict';

/* ══════════════════════════════════════════
   APP STATE
══════════════════════════════════════════ */
let currentUser = null;
let currentView = 'home';
let musicPlaying = false;
let musicIndex = 0;
const MUSIC_PLAYLIST = [
  { title: 'Chill Vibes ✨', src: '' },
  { title: 'Nostalgic Dreams 🌙', src: '' },
  { title: 'Summer 2006 ☀️', src: '' },
  { title: 'Late Night Thoughts 💭', src: '' },
];

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Load saved user
  currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (currentUser) updateAuthUI();

  // Init glitter
  initGlitter();

  // Init visitor counter
  initVisitorCounter();

  // Init sidebar widgets
  initFeaturedBlogs();
  initTagCloud();
  initMoodGrid();
  initHistoryFact();
  initTopBlogs();
  initNewMembers();

  // Init theme
  const settings = loadSettings();
  if (settings.theme) applyTheme(settings.theme);
  if (settings.avatar || settings.blogTitle) updateMyProfile(settings);

  // Init theme picker in blog editor
  initThemePicker();

  // Init feed
  initFeed();

  // Init discover
  initDiscover();

  // Init gallery
  initGallery();

  // Init my blog
  myPosts = loadUserPosts();
  updateMyStats();

  // Load draft if exists
  loadDraft();

  // Set default avatar
  const avatarEl = document.getElementById('my-avatar');
  if (avatarEl && !avatarEl.src.includes('pravatar')) {
    avatarEl.src = settings.avatar || 'https://i.pravatar.cc/150?img=5';
  } else if (avatarEl && !avatarEl.src) {
    avatarEl.src = 'https://i.pravatar.cc/150?img=5';
  }

  // Ticker duplicate for seamless loop
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
  }
}

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */
function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + viewName);
  if (target) {
    target.classList.add('active');
    currentView = viewName;
  }
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navMap = {
    home: 0, discover: 1, 'create-blog': 2, profile: 3, gallery: 4
  };
  const navLinks = document.querySelectorAll('.nav-link');
  if (navMap[viewName] !== undefined && navLinks[navMap[viewName]]) {
    navLinks[navMap[viewName]].classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('open');
}

/* ══════════════════════════════════════════
   AUTH
══════════════════════════════════════════ */
function doLogin() {
  const username = document.getElementById('login-user').value.trim();
  const password = document.getElementById('login-pass').value;

  if (!username || !password) {
    showToast('⚠️ Please fill in all fields!');
    return;
  }

  // Demo login — accepts anything
  currentUser = { username, email: username, blogName: username + '\'s Blog' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateAuthUI();
  closeModal('login-modal');
  showToast('🎉 Welcome back, ' + username + '! ✨');
}

function doSignup() {
  const username = document.getElementById('signup-user').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-pass').value;
  const blogName = document.getElementById('signup-blog').value.trim();

  if (!username || !email || !password) {
    showToast('⚠️ Please fill in all required fields!');
    return;
  }
  if (password.length < 6) {
    showToast('⚠️ Password must be at least 6 characters!');
    return;
  }
  if (!email.includes('@')) {
    showToast('⚠️ Please enter a valid email!');
    return;
  }

  currentUser = { username, email, blogName: blogName || username + '\'s Blog' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  // Save initial settings
  const settings = loadSettings();
  if (!settings.blogTitle) {
    settings.blogTitle = currentUser.blogName;
    settings.name = username;
    settings.avatar = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70 + 1);
    localStorage.setItem('mySettings', JSON.stringify(settings));
  }

  updateAuthUI();
  updateMyProfile(settings);
  closeModal('signup-modal');
  showToast('🎉 Welcome to MyRetroBlog, ' + username + '! Start blogging! ✨');
  showView('create-blog');
}

function updateAuthUI() {
  if (!currentUser) return;
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup:not(.big)');
  if (loginBtn) { loginBtn.textContent = '👤 ' + currentUser.username; loginBtn.onclick = () => showView('create-blog'); }
  if (signupBtn) { signupBtn.textContent = '✨ My Blog'; signupBtn.onclick = () => showView('create-blog'); signupBtn.style.animation = 'none'; }
}

/* ══════════════════════════════════════════
   MODALS
══════════════════════════════════════════ */
function showModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function switchModal(from, to) {
  closeModal(from);
  showModal(to);
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.add('hidden');
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
  }
});

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function showToast(msg, duration = 2800) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add('hidden'), duration);
}

/* ══════════════════════════════════════════
   THEME
══════════════════════════════════════════ */
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme || 'default');
  document.querySelectorAll('.theme-swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.theme === (theme || 'default'));
  });
}

function initThemePicker() {
  const container = document.getElementById('theme-picker');
  if (!container) return;

  const themes = [
    { id: 'default', color: '#ff69b4', label: '🌸 Pink' },
    { id: 'blue',    color: '#4fc3f7', label: '💙 Blue' },
    { id: 'green',   color: '#66bb6a', label: '🌿 Green' },
    { id: 'purple',  color: '#ab47bc', label: '💜 Purple' },
    { id: 'dark',    color: '#1a1a2e', label: '🖤 Dark' },
    { id: 'rainbow', color: 'linear-gradient(135deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff)', label: '🌈 Rainbow' },
    { id: 'sunset',  color: '#ff7675', label: '🌅 Sunset' },
    { id: 'mint',    color: '#00b894', label: '🍃 Mint' },
  ];

  container.innerHTML = themes.map(t => `
    <div class="theme-swatch ${t.id === 'default' ? 'active' : ''}"
         style="background:${t.color}"
         data-theme="${t.id}"
         title="${t.label}"
         onclick="applyTheme('${t.id}')">
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   SIDEBAR WIDGETS
══════════════════════════════════════════ */
function initFeaturedBlogs() {
  const container = document.getElementById('featured-blogs');
  if (!container) return;
  const featured = SAMPLE_PROFILES.filter(p => p.badges && p.badges.some(b => b.includes('Featured')));
  container.innerHTML = featured.slice(0, 3).map(p => `
    <div class="featured-item" onclick="renderProfile('${p.id}')">
      <img src="${p.avatar}" alt="${p.username}" class="featured-avatar" />
      <div class="featured-info">
        <div class="featured-name">${p.username}</div>
        <div class="featured-desc">${p.desc}</div>
      </div>
    </div>
  `).join('');
}

function initTagCloud() {
  const container = document.getElementById('tag-cloud');
  if (!container) return;
  const tags = ['life','music','gaming','travel','diary','art','fashion','food',
                 'photography','writing','dreams','nostalgic','coding','books','cats'];
  container.innerHTML = tags.map(t => `<span class="tag" onclick="filterByTag('${t}')">#${t}</span>`).join('');
}

function initMoodGrid() {
  const container = document.getElementById('mood-grid');
  if (!container) return;
  const moods = [
    ['😊','happy'],['😢','sad'],['🤩','excited'],['😑','bored'],['💕','in-love'],
    ['😠','angry'],['😰','anxious'],['🌙','nostalgic'],['🙏','grateful'],['😜','silly']
  ];
  container.innerHTML = moods.map(([emoji, label]) => `
    <div class="mood-item" title="${label}" onclick="showToast('${emoji} Feeling ${label}! We feel you! ✨')">${emoji}</div>
  `).join('');
}

function initHistoryFact() {
  const container = document.getElementById('history-fact');
  if (!container) return;
  const facts = [
    '🗓️ September 14, 2006: MySpace had over 100 million accounts!',
    '📺 YouTube was founded in February 2005 — only 1 year old!',
    '💾 MSN Messenger peak: 330 million users worldwide.',
    '📱 The first iPhone was still 1 year away from launch.',
    '🌐 Google bought YouTube for $1.65 billion in October 2006.',
    '🎮 Wii launched in November 2006 — the revolution began!',
    '📷 Flickr was THE photo sharing site of the era.',
    '🎵 iTunes Store had 1 billion downloads by February 2006.',
  ];
  const today = new Date().getDate();
  container.textContent = facts[today % facts.length];
}

function initTopBlogs() {
  const container = document.getElementById('top-blogs-list');
  if (!container) return;
  const top = SAMPLE_PROFILES.sort((a, b) => b.followers - a.followers).slice(0, 5);
  container.innerHTML = top.map(p => `
    <li onclick="renderProfile('${p.id}')">${p.blogName} <span style="color:var(--text-light);font-weight:400;">(${formatNum(p.followers)} followers)</span></li>
  `).join('');
}

function initNewMembers() {
  const container = document.getElementById('new-members');
  if (!container) return;
  const recent = SAMPLE_PROFILES.slice(0, 6);
  container.innerHTML = recent.map(p => `
    <div class="new-member" onclick="renderProfile('${p.id}')" title="${p.username}">
      <img src="${p.avatar}" alt="${p.username}" />
      <span>${p.username.substring(0, 8)}</span>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   VISITOR COUNTER
══════════════════════════════════════════ */
function initVisitorCounter() {
  let count = parseInt(localStorage.getItem('visitorCount') || '10247');
  count += Math.floor(Math.random() * 3) + 1;
  localStorage.setItem('visitorCount', count);

  const el = document.getElementById('visit-count');
  if (el) {
    el.textContent = count.toString().padStart(6, '0');
  }
}

/* ══════════════════════════════════════════
   MUSIC PLAYER
══════════════════════════════════════════ */
function toggleMusicPlayer() {
  const player = document.getElementById('music-player');
  if (player) player.classList.toggle('hidden');
}

function closeMusicPlayer() {
  const player = document.getElementById('music-player');
  if (player) player.classList.add('hidden');
}

function musicToggle() {
  musicPlaying = !musicPlaying;
  const btn = document.getElementById('music-play-btn');
  if (btn) btn.textContent = musicPlaying ? '⏸' : '▶';
  const titleEl = document.getElementById('music-title');
  if (titleEl) titleEl.textContent = musicPlaying ? MUSIC_PLAYLIST[musicIndex].title : 'Paused...';
  showToast(musicPlaying ? '🎵 Now playing: ' + MUSIC_PLAYLIST[musicIndex].title : '⏸ Paused');
}

function musicNext() {
  musicIndex = (musicIndex + 1) % MUSIC_PLAYLIST.length;
  const titleEl = document.getElementById('music-title');
  if (titleEl) titleEl.textContent = MUSIC_PLAYLIST[musicIndex].title;
  if (musicPlaying) showToast('🎵 ' + MUSIC_PLAYLIST[musicIndex].title);
}

function musicPrev() {
  musicIndex = (musicIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
  const titleEl = document.getElementById('music-title');
  if (titleEl) titleEl.textContent = MUSIC_PLAYLIST[musicIndex].title;
  if (musicPlaying) showToast('🎵 ' + MUSIC_PLAYLIST[musicIndex].title);
}

/* ══════════════════════════════════════════
   ✨ GLITTER EFFECT
══════════════════════════════════════════ */
function initGlitter() {
  const canvas = document.getElementById('glitter-canvas');
  if (!canvas) return;

  // Only run glitter on desktop to save performance
  if (window.innerWidth < 600) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 40;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = Math.random() * -0.8 - 0.2;
      this.life = 1;
      this.decay = Math.random() * 0.005 + 0.003;
      const colors = ['#ff69b4','#FFD700','#ff1493','#e6d5f5','#00bcd4','#ffffff','#ffb6c1'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      this.angle += this.spin;
      if (this.life <= 0 || this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      // Draw a star/sparkle
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size, Math.sin((i * Math.PI) / 2) * this.size);
        ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.4), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.4));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = new Particle();
    p.y = Math.random() * canvas.height; // Random start position
    p.life = Math.random();
    particles.push(p);
  }

  // Add particles on mouse move
  let mouseTimeout;
  document.addEventListener('mousemove', (e) => {
    if (particles.length < 80) {
      const burst = new Particle();
      burst.x = e.clientX;
      burst.y = e.clientY;
      burst.speedY = -1.5;
      burst.size = Math.random() * 5 + 2;
      particles.push(burst);
    }
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      particles = particles.slice(0, PARTICLE_COUNT);
    }, 2000);
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ══════════════════════════════════════════
   KEYBOARD SHORTCUTS
══════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.altKey) {
    switch(e.key) {
      case '1': showView('home'); break;
      case '2': showView('discover'); break;
      case '3': showView('create-blog'); break;
      case '4': showView('gallery'); break;
    }
  }
});

/* ══════════════════════════════════════════
   LAZY LOADING IMAGES
══════════════════════════════════════════ */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* ══════════════════════════════════════════
   SCROLL TO TOP ON VIEW CHANGE
══════════════════════════════════════════ */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

/* ══════════════════════════════════════════
   ONLINE STATUS HEARTBEAT
══════════════════════════════════════════ */
setInterval(() => {
  const dot = document.querySelector('.online-dot');
  if (dot) {
    dot.style.background = '#2ecc71';
    dot.title = 'Online';
  }
}, 30000);
