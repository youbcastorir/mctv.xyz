// ═══════════════════════════════════════════════
//  MyRetroBlog — profiles.js
//  Sample profiles, blog cards, discovery data
// ═══════════════════════════════════════════════

'use strict';

/* ── SAMPLE PROFILES ── */
const SAMPLE_PROFILES = [
  {
    id: 'pixiedust',
    username: 'PixieDust_Dreams',
    blogName: '✨ Pixie\'s Wonderland',
    desc: 'Living in a fairytale 🧚 | Music lover | Cat mom | Dreamer',
    bio: 'Hey there! I\'m Layla, 19 years old and obsessed with all things magical. I love spending afternoons listening to music, drawing in my sketchbook, and daydreaming about adventures. This is my little corner of the internet where I share my thoughts, diary entries, and random life moments! 💖',
    avatar: 'https://i.pravatar.cc/150?img=47',
    banner: '🌸',
    location: 'Paris, France',
    music: 'Paramore, Taylor Swift, My Chemical Romance',
    movies: 'The Princess Diaries, Amélie, Harry Potter',
    interests: 'Drawing, Photography, Anime, Baking, Journaling',
    posts: 142,
    followers: 1204,
    following: 88,
    views: 28409,
    joined: 'March 2006',
    online: true,
    theme: 'default',
    category: 'lifestyle',
    badges: ['🌟 Featured', '💯 Active', '🎨 Artist'],
  },
  {
    id: 'nightowl',
    username: 'NightOwl_Diary',
    blogName: '🌙 Night Thoughts',
    desc: 'Insomniac | Writer | Coffee addict ☕',
    bio: 'I write when the world sleeps. Stories, poetry, and the occasional existential 3am crisis. Welcome to my brain dump. No filter, pure feelings.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    banner: '🌙',
    location: 'London, UK',
    music: 'The Cure, Joy Division, Radiohead, Portishead',
    movies: 'Donnie Darko, Fight Club, Eternal Sunshine',
    interests: 'Writing, Philosophy, Night Photography, Vinyl Records',
    posts: 267,
    followers: 3891,
    following: 44,
    views: 112034,
    joined: 'January 2006',
    online: false,
    theme: 'dark',
    category: 'art',
    badges: ['🏆 Top Blog', '📝 Writer', '🌙 Night Owl'],
  },
  {
    id: 'gamergirl_kiki',
    username: 'GamerGirl_Kiki',
    blogName: '🎮 Kiki\'s Game Zone',
    desc: 'Gaming is life 🎮 | Pokémon master | DDR champion',
    bio: 'Hi! I\'m Kiki, your friendly neighborhood gamer girl. I play everything from Final Fantasy to Dance Dance Revolution. I also post about anime, manga, and my cosplay projects!',
    avatar: 'https://i.pravatar.cc/150?img=32',
    banner: '🎮',
    location: 'Tokyo, Japan',
    music: 'Linkin Park, Evanescence, Game OSTs',
    movies: 'The Matrix, Ghost in the Shell, Spirited Away',
    interests: 'Gaming, Anime, Cosplay, Manga, Origami',
    posts: 89,
    followers: 654,
    following: 201,
    views: 9876,
    joined: 'July 2006',
    online: true,
    theme: 'purple',
    category: 'gaming',
    badges: ['🎮 Gamer', '🌸 Kawaii', '⭐ Rising Star'],
  },
  {
    id: 'sunflower_soul',
    username: 'SunflowerSoul',
    blogName: '🌻 Fields of Gold',
    desc: 'Country girl at heart 🌻 | Recipe blogger | Farm life',
    bio: 'Growing up on a farm taught me to appreciate the simple things: fresh bread, golden sunsets, and good company. I share recipes, farm life stories, and photos of my garden!',
    avatar: 'https://i.pravatar.cc/150?img=44',
    banner: '🌻',
    location: 'Texas, USA',
    music: 'Shania Twain, Faith Hill, Dixie Chicks',
    movies: 'Steel Magnolias, Fried Green Tomatoes, Sweet Home Alabama',
    interests: 'Cooking, Gardening, Horseback Riding, Canning, Knitting',
    posts: 334,
    followers: 2108,
    following: 156,
    views: 67320,
    joined: 'April 2006',
    online: false,
    theme: 'sunset',
    category: 'food',
    badges: ['👩‍🍳 Chef', '🌻 Nature Lover', '💚 Eco Friendly'],
  },
  {
    id: 'dj_chrome',
    username: 'DJ_Chrome_',
    blogName: '🎧 Chrome Frequencies',
    desc: 'Music is the answer 🎧 | DJ | Producer | Beat maker',
    bio: 'Underground music scene. I produce electronic music, DJ at local clubs, and blog about new releases. Everything from trance to hip-hop. Turn it up! 🔊',
    avatar: 'https://i.pravatar.cc/150?img=15',
    banner: '🎧',
    location: 'Berlin, Germany',
    music: 'Daft Punk, Aphex Twin, Chemical Brothers, Boards of Canada',
    movies: 'Hackers, Strange Days, Pi',
    interests: 'Music Production, DJing, Skateboarding, Graffiti Art',
    posts: 198,
    followers: 1876,
    following: 92,
    views: 43221,
    joined: 'February 2006',
    online: true,
    theme: 'dark',
    category: 'music',
    badges: ['🎵 Music Pro', '🎧 DJ', '🔥 Hot Blog'],
  },
  {
    id: 'wanderlust_mia',
    username: 'WanderlustMia',
    blogName: '✈️ Mia\'s Map',
    desc: 'Passport: full 🌍 | Backpacker | Photo storyteller',
    bio: 'I quit my 9-5 to see the world. Solo female traveler sharing stories from 40+ countries. Budget tips, hidden gems, and the beautiful chaos of wandering.',
    avatar: 'https://i.pravatar.cc/150?img=56',
    banner: '✈️',
    location: 'Currently: Bali, Indonesia',
    music: 'World music, Bob Marley, Café del Mar',
    movies: 'Eat Pray Love, The Beach, Into the Wild',
    interests: 'Travel, Photography, Languages, Street Food, Yoga',
    posts: 412,
    followers: 8923,
    following: 134,
    views: 234500,
    joined: 'June 2006',
    online: false,
    theme: 'mint',
    category: 'travel',
    badges: ['✈️ World Traveler', '📸 Photographer', '⭐ Top 10'],
  },
  {
    id: 'artsy_remi',
    username: 'Artsy_Remi',
    blogName: '🎨 Remi\'s Canvas',
    desc: 'I see art everywhere 🎨 | Painter | Illustrator',
    bio: 'Art student sharing my journey, finished pieces, and work-in-progress shots. I paint portraits, landscapes, and the occasional surreal piece when the mood strikes.',
    avatar: 'https://i.pravatar.cc/150?img=23',
    banner: '🎨',
    location: 'Barcelona, Spain',
    music: 'Classical, Jazz, Radiohead, PJ Harvey',
    movies: 'Frida, Moulin Rouge, The Hours',
    interests: 'Painting, Sketching, Art History, Sculpture, Museums',
    posts: 156,
    followers: 3201,
    following: 78,
    views: 89034,
    joined: 'May 2006',
    online: true,
    theme: 'rainbow',
    category: 'art',
    badges: ['🎨 Artist', '🌟 Featured', '🏆 Award Winner'],
  },
  {
    id: 'fashionista_jade',
    username: 'Fashionista_Jade',
    blogName: '👗 Jade\'s Closet',
    desc: 'Style is self-expression 👗 | Fashion lover | Thrift queen',
    bio: 'Fashion doesn\'t have to be expensive! I share outfit ideas, thrift hauls, DIY fashion hacks, and style inspiration. Budget fashion for real girls!',
    avatar: 'https://i.pravatar.cc/150?img=41',
    banner: '👗',
    location: 'New York, USA',
    music: 'Beyoncé, Destiny\'s Child, Gwen Stefani, No Doubt',
    movies: 'Devil Wears Prada, Clueless, Mean Girls',
    interests: 'Fashion, Thrifting, DIY, Makeup, Photography',
    posts: 223,
    followers: 4567,
    following: 312,
    views: 120045,
    joined: 'August 2006',
    online: false,
    theme: 'default',
    category: 'fashion',
    badges: ['👗 Style Icon', '✂️ DIY Queen', '💖 Community Fave'],
  },
];

/* ── SAMPLE POSTS ── */
const SAMPLE_POSTS = [
  {
    id: 'p001',
    authorId: 'pixiedust',
    title: 'I finally saw the northern lights and I\'m still crying 😭✨',
    body: `Okay so if you\'ve been following my blog you know I\'ve been OBSESSED with seeing the northern lights since I was like 8 years old. I had a poster of them on my wall. I wrote about them in every diary since forever.

AND LAST NIGHT. IT HAPPENED. 🌌

We drove 3 hours north of the city into pitch black countryside and honestly I was so nervous the whole way there. What if it didn\'t show? What if it was cloudy? But then...

The sky just... EXPLODED into green and purple ribbons. I literally sat down in the snow and cried. My friend had to come find me. I don\'t even care that my jeans were soaked. WORTH IT.

If there is ONE thing you do this year — put the northern lights on your list. Promise me? 🙏`,
    type: 'diary',
    mood: 'excited',
    tags: ['travel', 'dreams', 'northernlights', 'life'],
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80',
    likes: 847,
    comments: 134,
    date: '2006-09-14T21:30:00',
    liked: false,
  },
  {
    id: 'p002',
    authorId: 'nightowl',
    title: 'Why does 3am feel like the only honest hour',
    body: `Something about the dark makes everything clearer. During the day, you perform. You perform happiness, competence, calmness. But at 3am there\'s no audience.

I\'ve been thinking about how we spend so much energy managing how others perceive us. Like we are all actors who forgot we are actors.

Maybe that\'s why I can only write at night. The character I play in daytime can\'t hold a pen properly.

Anyway. I made tea. It\'s chamomile. Very dramatic.`,
    type: 'diary',
    mood: 'nostalgic',
    tags: ['thoughts', 'writing', 'philosophy', '3am'],
    likes: 1203,
    comments: 289,
    date: '2006-09-13T03:14:00',
    liked: false,
  },
  {
    id: 'p003',
    authorId: 'gamergirl_kiki',
    title: '🎮 FINAL FANTASY XII REVIEW — is it worth the hype??',
    body: `Okay okay okay. I finally finished FF12 and I have THOUGHTS.

The good: The world is absolutely gorgeous. I spent way too many hours just walking around Rabanastre. The Gambit system is genius once you understand it. And the lore? Chef\'s kiss.

The bad: Vaan is... a choice. He really gives "random NPC who wandered into the main quest." The story takes forever to pick up.

Verdict: 8.5/10. A beautiful, ambitious game that stumbles with its protagonist. Still 100% worth playing if you haven\'t yet!

Playing next: Okami (so hyped!)

What\'s everyone else playing right now? 👾`,
    type: 'story',
    mood: 'excited',
    tags: ['gaming', 'finalfantasy', 'review', 'rpg'],
    likes: 412,
    comments: 76,
    date: '2006-09-12T19:00:00',
    liked: false,
  },
  {
    id: 'p004',
    authorId: 'sunflower_soul',
    title: 'Grandma\'s Apple Pie Recipe (finally writing it down! 🍎)',
    body: `Y\'all I have been making this pie for YEARS from memory and my sister finally convinced me to write it down properly. So here it is, Grandma Ruthie\'s Apple Pie ❤️

The secret is TWO types of apple. Always. Granny Smith for tart, Honeycrisp for sweet. And a tablespoon of apple cider vinegar in the crust — sounds weird, tastes magical.

Also: warm spices. Don\'t be shy with the cinnamon. Life is too short for bland pie.

Full recipe is in my cooking section! Let me know if you try it 🥧`,
    type: 'story',
    mood: 'happy',
    tags: ['cooking', 'recipe', 'applepie', 'family'],
    image: 'https://images.unsplash.com/photo-1568571780765-9276d5bca8d1?w=600&q=80',
    likes: 634,
    comments: 91,
    date: '2006-09-11T15:30:00',
    liked: false,
  },
  {
    id: 'p005',
    authorId: 'artsy_remi',
    title: '📸 New painting: "The Forgotten Garden" (WIP shots inside)',
    body: `Finally posting progress shots of this piece I\'ve been working on for 3 weeks! Oil on canvas, 80x100cm.

The concept: a garden that no one tends anymore but somehow still blooms. I wanted to explore the idea that beauty can be stubborn — that it persists even when no one is watching.

The blues in the shadow areas were killing me. I repainted them four times. FOUR. 

Still need to work on the foreground flowers but I think the light is finally reading correctly. What do you think? 🎨`,
    type: 'photo',
    mood: 'nostalgic',
    tags: ['art', 'painting', 'oilpainting', 'wip'],
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    likes: 987,
    comments: 143,
    date: '2006-09-10T11:00:00',
    liked: false,
  },
  {
    id: 'p006',
    authorId: 'wanderlust_mia',
    title: 'Things nobody tells you about solo travel (the real stuff)',
    body: `Everyone shows you the Instagram version. The solo dinner overlooking a sunset. The peaceful morning in a café. And yes, those moments exist.

But also:

• You WILL get lost. Badly. I once wandered through an unfamiliar city for 4 hours with a dead phone. It became one of my best memories.

• Loneliness is real. Some nights you just want someone to share the experience with.

• You become incredibly resourceful. When you\'re alone, you figure things out.

• You meet more people, not fewer. When you\'re alone, you\'re more approachable.

• You learn exactly who you are when no one who knows you is watching.

That last one? Changes everything. 🌍`,
    type: 'story',
    mood: 'grateful',
    tags: ['travel', 'solotravel', 'life', 'adventure'],
    likes: 2341,
    comments: 412,
    date: '2006-09-09T08:00:00',
    liked: false,
  },
  {
    id: 'p007',
    authorId: 'dj_chrome',
    title: '🎧 My top 10 albums of 2006 (so far)',
    body: `Halfway through the year, time to take stock. Here\'s what\'s been on heavy rotation:

1. Thom Yorke - The Eraser (haunting perfection)
2. The Knife - Silent Shout (I cannot stop listening)
3. Joanna Newsom - Ys (an experience)
4. TV on the Radio - Return to Cookie Mountain
5. Hot Chip - The Warning (dance banger)
6. Beirut - Gulag Orkestar
7. Grizzly Bear - Yellow House
8. Destroyer - Destroyer\'s Rubies
9. Islands - Return to the Sea
10. Sunset Rubdown - Shut Up I Am Dreaming

Honorable mention: Keane\'s new stuff is weirdly growing on me. Don\'t @ me.

What am I missing?? 🎵`,
    type: 'story',
    mood: 'happy',
    tags: ['music', 'albums', 'review', '2006'],
    likes: 567,
    comments: 98,
    date: '2006-09-08T20:00:00',
    liked: false,
  },
  {
    id: 'p008',
    authorId: 'fashionista_jade',
    title: '💰 $30 THRIFT HAUL — what I found at Goodwill this week',
    body: `OKAY. Best thrift session of the year. I went in expecting nothing and left with an armful. $30 total for everything 🤯

The highlights:
→ Vintage Levi\'s denim jacket (barely worn, $7)
→ 90s floral slip dress (the dream, $4)
→ Cream structured blazer ($6)
→ Patent leather kitten heels, barely worn ($5)
→ Three band tees (Nirvana, Blondie, Talking Heads, $2 each)

The secret: go on Monday mornings. Weekend donations get put out Monday. 📅

Styling posts coming all week! Which piece do you want to see first? 👗`,
    type: 'photo',
    mood: 'excited',
    tags: ['fashion', 'thrifting', 'ootd', 'budgetstyle'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    likes: 1102,
    comments: 234,
    date: '2006-09-07T14:00:00',
    liked: false,
  },
];

/* ── PROFILE RENDERER ── */
function renderProfile(profileId) {
  const profile = SAMPLE_PROFILES.find(p => p.id === profileId) || SAMPLE_PROFILES[0];
  const container = document.getElementById('profile-container');
  if (!container) return;

  const profilePosts = SAMPLE_POSTS.filter(p => p.authorId === profileId);

  container.innerHTML = `
    <div class="profile-page">
      <div class="profile-banner">
        <div class="profile-banner-emoji">${profile.banner}</div>
      </div>
      <div class="profile-main-card">
        <div class="profile-avatar-area">
          <img src="${profile.avatar}" alt="${profile.username}" class="profile-pic" />
          <div>
            <div class="profile-username">${profile.blogName}</div>
            <div class="profile-tagline">${profile.desc}</div>
          </div>
          <div class="profile-actions">
            ${profile.online ? '<span style="color:#2ecc71;font-weight:700;font-size:12px;">🟢 Online</span>' : '<span style="color:#aaa;font-size:12px;">⚫ Offline</span>'}
            <button class="btn-follow" onclick="toggleFollow('${profile.id}', this)">+ Follow</button>
            <button class="btn-message" onclick="showToast('💌 Message feature coming soon!')">✉ Message</button>
          </div>
        </div>

        <div class="profile-stats-bar">
          <div class="stat-item"><strong>${profile.posts}</strong><span>Posts</span></div>
          <div class="stat-item"><strong>${formatNum(profile.followers)}</strong><span>Followers</span></div>
          <div class="stat-item"><strong>${profile.following}</strong><span>Following</span></div>
          <div class="stat-item"><strong>${formatNum(profile.views)}</strong><span>Views</span></div>
          <div class="stat-item"><strong>${profile.joined}</strong><span>Joined</span></div>
        </div>

        <p class="profile-bio">${profile.bio}</p>

        <div class="profile-interests">
          ${profile.interests.split(',').map(i => `<span class="interest-tag">${i.trim()}</span>`).join('')}
        </div>

        <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px;">
          ${(profile.badges||[]).map(b => `<span class="badge" style="background:linear-gradient(135deg,var(--pink),var(--purple));color:white;">${b}</span>`).join('')}
        </div>
      </div>

      <div class="profile-bottom">
        <div class="widget">
          <div class="widget-title">💖 Favorites</div>
          <ul class="profile-fav-list">
            <li>🎵 <strong>Music:</strong> ${profile.music}</li>
            <li>🎬 <strong>Movies:</strong> ${profile.movies}</li>
            <li>📍 <strong>Location:</strong> ${profile.location}</li>
          </ul>
        </div>

        <div class="widget">
          <div class="widget-title">📝 Recent Posts</div>
          ${profilePosts.slice(0,3).map(p => `
            <div style="padding:8px 0;border-bottom:1px dotted var(--border);cursor:pointer;" onclick="openPost('${p.id}')">
              <div style="font-weight:800;font-size:13px;color:var(--hot-pink)">${p.title}</div>
              <div style="font-size:11px;color:var(--text-light)">${formatDate(p.date)} · ❤️ ${p.likes}</div>
            </div>
          `).join('')}
          ${profilePosts.length === 0 ? '<div style="font-size:13px;color:var(--text-light)">No posts yet!</div>' : ''}
        </div>
      </div>
    </div>
  `;

  showView('profile');
}

/* ── BLOG CARD RENDERER ── */
function renderBlogCard(profile) {
  return `
    <div class="blog-card" onclick="renderProfile('${profile.id}')">
      <div class="blog-card-cover" style="background:linear-gradient(135deg,var(--pink),var(--purple))">
        <span style="font-size:40px;">${profile.banner}</span>
      </div>
      <img src="${profile.avatar}" alt="${profile.username}" class="blog-card-avatar" />
      <div class="blog-card-body">
        <div class="blog-card-name">${profile.blogName}</div>
        <div class="blog-card-desc">${profile.desc.substring(0,60)}...</div>
        <div class="blog-card-stats">
          <span><strong>${profile.posts}</strong><br>posts</span>
          <span><strong>${formatNum(profile.followers)}</strong><br>followers</span>
        </div>
        <button class="blog-card-follow" onclick="event.stopPropagation();toggleFollow('${profile.id}', this)">+ Follow</button>
      </div>
    </div>
  `;
}

/* ── HELPER FUNCTIONS ── */
function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function toggleFollow(profileId, btn) {
  const isFollowing = btn.dataset.following === 'true';
  if (isFollowing) {
    btn.textContent = '+ Follow';
    btn.style.background = '';
    btn.dataset.following = 'false';
    showToast('Unfollowed 👋');
  } else {
    btn.textContent = '✓ Following';
    btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    btn.dataset.following = 'true';
    showToast('🎉 Now following ' + (SAMPLE_PROFILES.find(p=>p.id===profileId)?.username || 'user') + '!');
  }
}
