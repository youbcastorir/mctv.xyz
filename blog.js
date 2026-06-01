// ═══════════════════════════════════════════════
//  MyRetroBlog — blog.js
//  Post rendering, editor, gallery, guestbook
// ═══════════════════════════════════════════════

'use strict';

/* ── STATE ── */
let allPosts = [];
let currentFeedFilter = 'all';
let currentCategoryFilter = 'all';
let feedPage = 0;
const POSTS_PER_PAGE = 4;
let currentOpenPostId = null;
let currentPostType = 'diary';
let uploadedPhotos = [];
let albums = [];
let myPosts = [];
let guestbookEntries = [];

/* ══════════════════════════════════════════
   POST RENDERING
══════════════════════════════════════════ */

function renderPost(post, truncate = true) {
  const profile = SAMPLE_PROFILES.find(p => p.id === post.authorId) || {
    username: 'Unknown', avatar: 'https://i.pravatar.cc/150?img=1', blogName: 'Unknown Blog'
  };

  const moodEmojis = {
    happy:'😊', sad:'😢', excited:'🤩', bored:'😑',
    'in-love':'💕', angry:'😠', anxious:'😰', nostalgic:'🌙',
    grateful:'🙏', silly:'😜'
  };

  const typeLabels = { diary:'📔 Diary', story:'📖 Story', photo:'📸 Photo', status:'💭 Status' };

  const bodyText = truncate && post.body.length > 300
    ? post.body.substring(0, 300) + '...'
    : post.body;

  return `
    <div class="post-card" id="post-${post.id}">
      <span class="post-type-badge">${typeLabels[post.type] || post.type}</span>
      <div class="post-header">
        <img src="${profile.avatar}" alt="${profile.username}" class="post-avatar" onclick="renderProfile('${profile.id}')" />
        <div class="post-meta">
          <a class="post-author" onclick="renderProfile('${profile.id}')">${profile.blogName}</a>
          <div class="post-date">${formatDate(post.date)}</div>
        </div>
        ${post.mood ? `<span class="post-mood-badge">${moodEmojis[post.mood]||''} ${post.mood}</span>` : ''}
      </div>

      <h3 class="post-title" onclick="openPost('${post.id}')">${post.title}</h3>

      ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" onclick="openPost('${post.id}')" loading="lazy" />` : ''}

      <div class="post-body ${truncate && post.body.length > 300 ? 'truncated' : ''}">${escapeHtml(bodyText)}</div>

      ${truncate && post.body.length > 300 ? `<button class="read-more" onclick="openPost('${post.id}')">Read more →</button>` : ''}

      ${post.tags && post.tags.length ? `
        <div class="post-tags-row">
          ${post.tags.map(t => `<span class="post-tag" onclick="filterByTag('${t}')">#${t}</span>`).join('')}
        </div>
      ` : ''}

      <div class="post-actions">
        <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike('${post.id}', this)">
          ${post.liked ? '❤️' : '🤍'} <span class="like-count">${formatNum(post.likes)}</span>
        </button>
        <button class="post-action-btn" onclick="openPost('${post.id}')">
          💬 ${post.comments} Comments
        </button>
        <button class="post-action-btn" onclick="sharePost('${post.id}')">
          🔗 Share
        </button>
        <button class="post-action-btn" onclick="openPost('${post.id}')">
          📖 Read
        </button>
      </div>
    </div>
  `;
}

function openPost(postId) {
  const post = allPosts.find(p => p.id === postId);
  if (!post) return;
  currentOpenPostId = postId;

  const profile = SAMPLE_PROFILES.find(p => p.id === post.authorId) || {
    username: 'Unknown', avatar: 'https://i.pravatar.cc/150?img=1', blogName: 'Unknown Blog'
  };

  const moodEmojis = {
    happy:'😊', sad:'😢', excited:'🤩', bored:'😑',
    'in-love':'💕', angry:'😠', anxious:'😰', nostalgic:'🌙',
    grateful:'🙏', silly:'😜'
  };

  document.getElementById('post-modal-content').innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
      <img src="${profile.avatar}" style="width:48px;height:48px;border-radius:50%;border:3px solid var(--pink);" />
      <div>
        <div style="font-weight:800;color:var(--hot-pink);font-size:15px;cursor:pointer" onclick="renderProfile('${profile.id}');closeModal('post-modal')">${profile.blogName}</div>
        <div style="font-size:12px;color:var(--text-light)">${formatDate(post.date)}${post.mood ? ` · ${moodEmojis[post.mood]||''} ${post.mood}` : ''}</div>
      </div>
    </div>
    <h2 style="font-family:var(--font-head);font-size:22px;color:var(--text);margin-bottom:14px;">${post.title}</h2>
    ${post.image ? `<img src="${post.image}" style="width:100%;border-radius:12px;margin-bottom:14px;max-height:350px;object-fit:cover;" />` : ''}
    <div style="line-height:1.8;font-size:15px;font-family:var(--font-hand);white-space:pre-wrap;">${escapeHtml(post.body)}</div>
    ${post.tags && post.tags.length ? `
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:14px;">
        ${post.tags.map(t => `<span class="post-tag">#${t}</span>`).join('')}
      </div>
    ` : ''}
    <div style="display:flex;gap:10px;margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
      <button class="post-action-btn" onclick="toggleLike('${post.id}',this)">
        ${post.liked ? '❤️' : '🤍'} ${formatNum(post.likes)}
      </button>
      <button class="post-action-btn" onclick="sharePost('${post.id}')">🔗 Share</button>
    </div>
  `;

  // Load comments
  const stored = JSON.parse(localStorage.getItem('comments_' + postId) || '[]');
  renderComments(stored);

  showModal('post-modal');
}

function renderComments(comments) {
  const container = document.getElementById('post-modal-comments');
  if (!container) return;

  if (comments.length === 0) {
    container.innerHTML = '<div style="color:var(--text-light);font-size:13px;font-style:italic;">No comments yet. Be the first! ✨</div>';
    return;
  }

  container.innerHTML = comments.map(c => `
    <div class="comment">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span class="comment-name">${escapeHtml(c.name)}</span>
        <span class="comment-date">${formatDate(c.date)}</span>
      </div>
      <div class="comment-text">${escapeHtml(c.text)}</div>
    </div>
  `).join('');
}

function addComment() {
  if (!currentOpenPostId) return;

  const nameEl = document.getElementById('comment-author');
  const textEl = document.getElementById('comment-text');
  const name = nameEl.value.trim();
  const text = textEl.value.trim();

  if (!name) { showToast('⚠️ Please enter your name!'); return; }
  if (!text) { showToast('⚠️ Please write a comment!'); return; }

  const comments = JSON.parse(localStorage.getItem('comments_' + currentOpenPostId) || '[]');
  const newComment = { name, text, date: new Date().toISOString() };
  comments.push(newComment);
  localStorage.setItem('comments_' + currentOpenPostId, JSON.stringify(comments));

  nameEl.value = '';
  textEl.value = '';
  renderComments(comments);

  // Update comment count
  const post = allPosts.find(p => p.id === currentOpenPostId);
  if (post) { post.comments++; }

  showToast('💌 Comment posted! Thanks! ✨');
}

function toggleLike(postId, btn) {
  const post = allPosts.find(p => p.id === postId);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  // Update all instances of the like button for this post
  document.querySelectorAll(`[onclick*="toggleLike('${postId}'"]`).forEach(b => {
    const likeCount = b.querySelector('.like-count');
    if (post.liked) {
      b.classList.add('liked');
      b.innerHTML = b.innerHTML.replace('🤍', '❤️');
    } else {
      b.classList.remove('liked');
      b.innerHTML = b.innerHTML.replace('❤️', '🤍');
    }
    if (likeCount) likeCount.textContent = formatNum(post.likes);
  });

  showToast(post.liked ? '❤️ Liked!' : '💔 Unliked');
}

function sharePost(postId) {
  const post = allPosts.find(p => p.id === postId);
  if (!post) return;
  const text = `Check out "${post.title}" on MyRetroBlog! 🌟`;
  if (navigator.share) {
    navigator.share({ title: post.title, text, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('🔗 Link copied to clipboard!');
    });
  }
}

/* ══════════════════════════════════════════
   FEED
══════════════════════════════════════════ */

function initFeed() {
  allPosts = [...SAMPLE_POSTS, ...loadUserPosts()];
  renderFeed();
}

function loadUserPosts() {
  return JSON.parse(localStorage.getItem('userPosts') || '[]');
}

function filterFeed(type) {
  currentFeedFilter = type;
  feedPage = 0;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderFeed();
}

function filterByTag(tag) {
  showToast(`🏷️ Showing posts tagged #${tag}`);
}

function renderFeed() {
  const container = document.getElementById('posts-feed');
  if (!container) return;

  let filtered = allPosts;
  if (currentFeedFilter !== 'all') {
    filtered = allPosts.filter(p => p.type === currentFeedFilter);
  }

  const paginated = filtered.slice(0, (feedPage + 1) * POSTS_PER_PAGE);
  container.innerHTML = paginated.map(p => renderPost(p)).join('');
}

function loadMorePosts() {
  feedPage++;
  renderFeed();
  showToast('✨ Loading more posts...');
}

function loadRandomBlog() {
  const random = SAMPLE_PROFILES[Math.floor(Math.random() * SAMPLE_PROFILES.length)];
  renderProfile(random.id);
  showToast(`🎲 Taking you to ${random.blogName}!`);
}

/* ══════════════════════════════════════════
   DISCOVER
══════════════════════════════════════════ */

function initDiscover() {
  renderDiscoverGrid(SAMPLE_PROFILES);
}

function filterCategory(cat) {
  currentCategoryFilter = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  const filtered = cat === 'all'
    ? SAMPLE_PROFILES
    : SAMPLE_PROFILES.filter(p => p.category === cat);
  renderDiscoverGrid(filtered);
}

function searchBlogs(query) {
  if (!query || query.trim() === '') {
    renderDiscoverGrid(SAMPLE_PROFILES);
    return;
  }
  const q = query.toLowerCase();
  const filtered = SAMPLE_PROFILES.filter(p =>
    p.username.toLowerCase().includes(q) ||
    p.blogName.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    p.interests.toLowerCase().includes(q)
  );
  renderDiscoverGrid(filtered);
}

function renderDiscoverGrid(profiles) {
  const container = document.getElementById('discover-grid');
  if (!container) return;
  if (profiles.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light)">😔 No blogs found. Try a different search!</div>';
    return;
  }
  container.innerHTML = profiles.map(renderBlogCard).join('');
}

/* ══════════════════════════════════════════
   POST EDITOR
══════════════════════════════════════════ */

function setPostType(type) {
  currentPostType = type;
  document.querySelectorAll('.post-type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === type);
  });

  const photoArea = document.getElementById('photo-upload-area');
  if (photoArea) {
    photoArea.classList.toggle('hidden', type !== 'photo');
  }
}

function formatText(cmd) {
  document.execCommand(cmd, false, null);
}

function insertEmoji(emoji) {
  const ta = document.getElementById('post-content');
  if (!ta) return;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  ta.value = ta.value.substring(0, start) + emoji + ta.value.substring(end);
  ta.selectionStart = ta.selectionEnd = start + emoji.length;
  ta.focus();
}

function toggleEmojiPicker() {
  const picker = document.getElementById('emoji-picker');
  if (!picker) return;
  picker.classList.toggle('hidden');
  if (!picker.innerHTML) {
    const emojis = ['😊','😂','😭','😍','🥺','😎','🤔','😴','🥳','😤',
                    '💖','❤️','💔','💌','💫','⭐','🌟','✨','🌈','🌸',
                    '🎵','🎶','🎸','🎹','🎨','📷','📖','📝','💻','🎮',
                    '🌙','☀️','🌺','🍕','🍰','☕','🌍','✈️','🏠','🦋'];
    picker.innerHTML = emojis.map(e => `<span onclick="insertEmoji('${e}')">${e}</span>`).join('');
  }
}

function handlePhotoUpload(event) {
  const files = Array.from(event.target.files);
  const previews = document.getElementById('photo-previews');
  if (!previews) return;

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedPhotos.push(e.target.result);
      const div = document.createElement('div');
      div.className = 'photo-preview';
      const idx = uploadedPhotos.length - 1;
      div.innerHTML = `
        <img src="${e.target.result}" alt="Preview" />
        <button class="remove-photo" onclick="removePhoto(${idx}, this.parentElement)">✕</button>
      `;
      previews.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

function removePhoto(idx, el) {
  uploadedPhotos[idx] = null;
  el.remove();
}

function publishPost() {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  const mood = document.getElementById('post-mood').value;
  const tagsRaw = document.getElementById('post-tags').value;

  if (!title) { showToast('⚠️ Give your post a title!'); return; }
  if (!content && currentPostType !== 'photo') { showToast('⚠️ Write something first!'); return; }

  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
  const settings = loadSettings();

  const newPost = {
    id: 'user_' + Date.now(),
    authorId: 'me',
    authorName: settings.name || 'Me',
    authorAvatar: settings.avatar || 'https://i.pravatar.cc/150?img=5',
    blogName: settings.blogTitle || 'My Blog',
    title,
    body: content,
    type: currentPostType,
    mood,
    tags,
    image: uploadedPhotos.filter(Boolean)[0] || null,
    likes: 0,
    comments: 0,
    date: new Date().toISOString(),
    liked: false,
  };

  // Save to localStorage
  const stored = JSON.parse(localStorage.getItem('userPosts') || '[]');
  stored.unshift(newPost);
  localStorage.setItem('userPosts', JSON.stringify(stored));

  // Add to allPosts
  allPosts.unshift(newPost);
  myPosts.unshift(newPost);

  // Clear form
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';
  document.getElementById('post-mood').value = '';
  document.getElementById('post-tags').value = '';
  document.getElementById('photo-previews').innerHTML = '';
  uploadedPhotos = [];

  // Update counts
  updateMyStats();
  renderMyPostsList();

  showToast('🚀 Post published! Amazing! ✨');

  // Switch to my posts tab
  setTimeout(() => switchBlogTab('my-posts'), 800);
}

function saveDraft() {
  const title = document.getElementById('post-title').value.trim();
  if (!title) { showToast('⚠️ Add a title to save draft!'); return; }
  localStorage.setItem('draft', JSON.stringify({
    title: document.getElementById('post-title').value,
    content: document.getElementById('post-content').value,
    mood: document.getElementById('post-mood').value,
    tags: document.getElementById('post-tags').value,
    type: currentPostType,
  }));
  showToast('💾 Draft saved!');
}

function loadDraft() {
  const draft = JSON.parse(localStorage.getItem('draft') || 'null');
  if (!draft) return;
  document.getElementById('post-title').value = draft.title || '';
  document.getElementById('post-content').value = draft.content || '';
  document.getElementById('post-mood').value = draft.mood || '';
  document.getElementById('post-tags').value = draft.tags || '';
  if (draft.type) setPostType(draft.type);
}

/* ══════════════════════════════════════════
   MY POSTS LIST
══════════════════════════════════════════ */

function renderMyPostsList() {
  const container = document.getElementById('my-posts-list');
  if (!container) return;

  if (myPosts.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-light)">
        <div style="font-size:40px;margin-bottom:12px;">📝</div>
        <div style="font-weight:700;">No posts yet!</div>
        <div style="font-size:13px;margin-top:6px;">Switch to "Write Post" to create your first entry 🚀</div>
      </div>
    `;
    return;
  }

  container.innerHTML = myPosts.map((p, i) => `
    <div class="my-post-item">
      <div class="my-post-item-info">
        <div class="my-post-item-title">${p.title}</div>
        <div class="my-post-item-date">${formatDate(p.date)} · ${p.type} · ❤️ ${p.likes} · 💬 ${p.comments}</div>
      </div>
      <div class="my-post-item-actions">
        <button class="btn-edit" onclick="openPost('${p.id}')">👁️ View</button>
        <button class="btn-delete" onclick="deleteMyPost('${p.id}', ${i})">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteMyPost(postId, index) {
  if (!confirm('Delete this post? This cannot be undone!')) return;
  myPosts.splice(index, 1);
  allPosts = allPosts.filter(p => p.id !== postId);
  const stored = JSON.parse(localStorage.getItem('userPosts') || '[]');
  const updated = stored.filter(p => p.id !== postId);
  localStorage.setItem('userPosts', JSON.stringify(updated));
  renderMyPostsList();
  updateMyStats();
  showToast('🗑️ Post deleted!');
}

/* ══════════════════════════════════════════
   GUESTBOOK
══════════════════════════════════════════ */

function initGuestbook() {
  guestbookEntries = JSON.parse(localStorage.getItem('guestbook') || '[]');
  renderGuestbook();
}

function addGuestbookMessage() {
  const name = document.getElementById('guest-name').value.trim();
  const message = document.getElementById('guest-message').value.trim();
  if (!name) { showToast('⚠️ Enter your name!'); return; }
  if (!message) { showToast('⚠️ Write a message!'); return; }

  const entry = { name, message, date: new Date().toISOString() };
  guestbookEntries.unshift(entry);
  localStorage.setItem('guestbook', JSON.stringify(guestbookEntries));

  document.getElementById('guest-name').value = '';
  document.getElementById('guest-message').value = '';
  renderGuestbook();
  showToast('✉️ Guestbook signed! Thank you! ✨');
}

function renderGuestbook() {
  const container = document.getElementById('guestbook-entries');
  if (!container) return;

  if (guestbookEntries.length === 0) {
    container.innerHTML = '<div style="color:var(--text-light);font-style:italic;font-size:13px;">No entries yet. Be the first to sign! 📖</div>';
    return;
  }

  container.innerHTML = guestbookEntries.map(e => `
    <div class="guestbook-entry">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span class="guestbook-entry-name">✍️ ${escapeHtml(e.name)}</span>
        <span class="guestbook-entry-date">${formatDate(e.date)}</span>
      </div>
      <div class="guestbook-entry-msg">${escapeHtml(e.message)}</div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════ */

function loadSettings() {
  return JSON.parse(localStorage.getItem('mySettings') || '{}');
}

function initSettings() {
  const s = loadSettings();
  const fields = ['blog-title','name','desc','music','movies','interests','location','avatar','theme'];
  fields.forEach(f => {
    const el = document.getElementById('setting-' + f);
    if (el && s[f]) el.value = s[f];
  });
}

function saveSettings() {
  const s = {
    blogTitle: document.getElementById('setting-blog-title').value.trim() || 'My Blog',
    name: document.getElementById('setting-name').value.trim() || 'Blogger',
    desc: document.getElementById('setting-desc').value.trim() || 'Welcome to my world ✨',
    music: document.getElementById('setting-music').value.trim(),
    movies: document.getElementById('setting-movies').value.trim(),
    interests: document.getElementById('setting-interests').value.trim(),
    location: document.getElementById('setting-location').value.trim(),
    avatar: document.getElementById('setting-avatar').value.trim() || 'https://i.pravatar.cc/150?img=5',
    theme: document.getElementById('setting-theme').value,
  };
  localStorage.setItem('mySettings', JSON.stringify(s));
  applyTheme(s.theme);
  updateMyProfile(s);
  showToast('💾 Settings saved! Looking great! ✨');
}

function updateMyProfile(s) {
  const nameEl = document.getElementById('my-blog-name');
  const descEl = document.getElementById('my-blog-desc');
  const avatarEl = document.getElementById('my-avatar');

  if (nameEl) nameEl.textContent = s.blogTitle;
  if (descEl) descEl.textContent = s.desc;
  if (avatarEl && s.avatar) avatarEl.src = s.avatar;

  const infoBox = document.getElementById('my-info-box');
  if (infoBox) {
    infoBox.innerHTML = `
      ${s.name ? `<div>👤 <strong>${s.name}</strong></div>` : ''}
      ${s.location ? `<div>📍 ${s.location}</div>` : ''}
      ${s.music ? `<div>🎵 ${s.music}</div>` : ''}
      ${s.movies ? `<div>🎬 ${s.movies}</div>` : ''}
      ${s.interests ? `<div>❤️ ${s.interests}</div>` : ''}
    `;
  }
}

function updateMyStats() {
  const posts = myPosts.length;
  const followers = parseInt(localStorage.getItem('myFollowers') || '0');
  const views = parseInt(localStorage.getItem('myViews') || '0') + 1;
  localStorage.setItem('myViews', views);

  const el = id => document.getElementById(id);
  if (el('my-posts-count')) el('my-posts-count').textContent = posts;
  if (el('my-followers-count')) el('my-followers-count').textContent = followers;
  if (el('my-views-count')) el('my-views-count').textContent = formatNum(views);
}

/* ══════════════════════════════════════════
   GALLERY / ALBUMS
══════════════════════════════════════════ */

function initGallery() {
  albums = JSON.parse(localStorage.getItem('albums') || '[]');
  if (albums.length === 0) {
    // Add some demo albums
    albums = [
      { id: 'a1', name: 'Summer Vibes ☀️', desc: 'Best summer ever!', photos: [], emoji: '☀️' },
      { id: 'a2', name: 'My Art 🎨', desc: 'Paintings and sketches', photos: [], emoji: '🎨' },
      { id: 'a3', name: 'Friends 💖', desc: 'The best people in my life', photos: [], emoji: '💖' },
    ];
  }
  renderAlbumsGrid();
}

function renderAlbumsGrid() {
  const container = document.getElementById('albums-grid');
  if (!container) return;

  if (albums.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-light);grid-column:1/-1;">
        <div style="font-size:40px;margin-bottom:12px;">📸</div>
        <div>No albums yet! Create your first album above.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = albums.map(album => `
    <div class="album-card" onclick="openAlbum('${album.id}')">
      <div class="album-cover">
        ${album.photos.length > 0 
          ? `<img src="${album.photos[0]}" alt="${album.name}" />`
          : `<span>${album.emoji || '📸'}</span>`
        }
        <span class="album-photo-count">${album.photos.length} photos</span>
      </div>
      <div class="album-info">
        <div class="album-name">${album.name}</div>
        <div class="album-desc">${album.desc}</div>
      </div>
    </div>
  `).join('');
}

function openAlbum(albumId) {
  const album = albums.find(a => a.id === albumId);
  if (!album) return;

  document.getElementById('albums-grid').classList.add('hidden');
  const viewer = document.getElementById('album-viewer');
  viewer.classList.remove('hidden');
  document.getElementById('album-title-display').textContent = album.name;

  const photosGrid = document.getElementById('album-photos-grid');
  if (album.photos.length === 0) {
    photosGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:30px;color:var(--text-light)">
        <div style="font-size:40px;margin-bottom:10px;">📷</div>
        <div>No photos yet!</div>
        <label style="display:inline-block;margin-top:12px;cursor:pointer;background:var(--pink);color:white;padding:8px 18px;border-radius:16px;font-weight:700;">
          📸 Upload Photos
          <input type="file" accept="image/*" multiple style="display:none" onchange="addPhotosToAlbum('${albumId}', event)" />
        </label>
      </div>
    `;
  } else {
    photosGrid.innerHTML = album.photos.map((src, i) => `
      <div class="album-photo" onclick="viewAlbumPhoto('${albumId}', ${i})">
        <img src="${src}" alt="Photo ${i+1}" loading="lazy" />
      </div>
    `).join('') + `
      <div class="album-photo" style="border:2px dashed var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--lavender);">
        <label style="cursor:pointer;text-align:center;color:var(--text-light);padding:20px;">
          <div style="font-size:28px;">+</div>
          <div style="font-size:12px;">Add photos</div>
          <input type="file" accept="image/*" multiple style="display:none" onchange="addPhotosToAlbum('${albumId}', event)" />
        </label>
      </div>
    `;
  }
}

function addPhotosToAlbum(albumId, event) {
  const album = albums.find(a => a.id === albumId);
  if (!album) return;

  const files = Array.from(event.target.files);
  let loaded = 0;

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      album.photos.push(e.target.result);
      loaded++;
      if (loaded === files.length) {
        saveAlbums();
        openAlbum(albumId);
        showToast(`📸 ${files.length} photo(s) added!`);
      }
    };
    reader.readAsDataURL(file);
  });
}

function viewAlbumPhoto(albumId, photoIndex) {
  const album = albums.find(a => a.id === albumId);
  if (!album) return;

  // Simple lightbox
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:5000;
    display:flex;align-items:center;justify-content:center;
  `;

  let currentIdx = photoIndex;

  const update = () => {
    overlay.innerHTML = `
      <button onclick="this.parentElement.remove()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.1);border:none;color:white;width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:18px;">✕</button>
      <button onclick="changePhoto(-1)" style="position:absolute;left:16px;background:rgba(255,255,255,0.1);border:none;color:white;width:48px;height:48px;border-radius:50%;cursor:pointer;font-size:22px;">‹</button>
      <img src="${album.photos[currentIdx]}" style="max-width:90vw;max-height:85vh;border-radius:8px;object-fit:contain;" />
      <button onclick="changePhoto(1)" style="position:absolute;right:16px;background:rgba(255,255,255,0.1);border:none;color:white;width:48px;height:48px;border-radius:50%;cursor:pointer;font-size:22px;">›</button>
      <div style="position:absolute;bottom:16px;color:rgba(255,255,255,0.6);font-size:12px;">${currentIdx+1} / ${album.photos.length}</div>
    `;
  };

  window.changePhoto = (dir) => {
    currentIdx = (currentIdx + dir + album.photos.length) % album.photos.length;
    update();
  };

  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
  update();
}

function closeAlbum() {
  document.getElementById('albums-grid').classList.remove('hidden');
  document.getElementById('album-viewer').classList.add('hidden');
}

function createAlbum() {
  const name = document.getElementById('album-name-input').value.trim();
  const desc = document.getElementById('album-desc-input').value.trim();

  if (!name) { showToast('⚠️ Give your album a name!'); return; }

  const emojis = ['📸','🌸','🌊','🎨','🌟','💖','🎵','✈️','🎮','🍕'];
  const album = {
    id: 'album_' + Date.now(),
    name, desc,
    photos: [],
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
  };

  albums.push(album);
  saveAlbums();
  closeModal('new-album-modal');
  renderAlbumsGrid();
  showToast('📁 Album created! Upload your photos! ✨');
}

function saveAlbums() {
  // Only save non-base64 heavy data to avoid quota issues
  try {
    const lightAlbums = albums.map(a => ({
      ...a, photos: a.photos.slice(0, 20) // limit stored photos
    }));
    localStorage.setItem('albums', JSON.stringify(lightAlbums));
  } catch(e) {
    console.warn('Storage quota hit, clearing old photos');
  }
}

/* ══════════════════════════════════════════
   BLOG TABS
══════════════════════════════════════════ */

function switchBlogTab(tab) {
  document.querySelectorAll('.blog-tab').forEach((b, i) => {
    const tabs = ['write','my-posts','guestbook','settings'];
    b.classList.toggle('active', tabs[i] === tab);
  });
  document.querySelectorAll('.blog-tab-content').forEach(c => c.classList.remove('active'));
  const content = document.getElementById('tab-' + tab);
  if (content) content.classList.add('active');

  if (tab === 'my-posts') renderMyPostsList();
  if (tab === 'guestbook') initGuestbook();
  if (tab === 'settings') initSettings();
}

/* ══════════════════════════════════════════
   UTILITY
══════════════════════════════════════════ */

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
