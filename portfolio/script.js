const U = n => `assets/cases/${n}.webp`;
const seq = (p, n) => Array.from({ length: n }, (_, i) => U(`${p}_${String(i + 1).padStart(2, '0')}`));

// Edit project content here.
const PROJECTS = [
  { slug: 'safe-her', title: 'SAFE HER', tint: '#ece7fb', thumb: U('safeher_01'),
    line: 'A smart ring and app that call for help without reaching for your phone.',
    category: 'Women safety · UX case study', disciplines: ['UX Research', 'Product Design', 'Interaction Design', 'Visual Design'],
    behance: 'https://www.behance.net/gallery/250526161/Women-Safety-UX-Case-Study',
    gist: [['The problem', 'In a risky moment, digging out your phone is the last thing you can safely do.'],
           ['The idea', 'A wearable ring plus an app. One tap or gesture shares your live location with trusted contacts.'],
           ['What I did', 'Survey, interviews, competitor analysis, personas, journey map, IA, flows, sketches to hi-fi screens.']],
    imgs: seq('safeher', 16) },
  { slug: 'smart-canteen', title: 'Smart Canteen', tint: '#fbf1cf', thumb: U('canteen_01'),
    line: 'Skip the queue, keep the samosa. A canteen app for students and staff.',
    category: 'Food ordering · Indus University', disciplines: ['UX Research', 'Interaction Design', 'Visual Design'],
    behance: 'https://www.behance.net/gallery/250523551/Smart-Canteen-Solutions-%28Indus-University%29',
    gist: [['The problem', 'Long queues, payment delays and pickup confusion at peak canteen hours.'],
           ['The idea', 'A faster ordering flow for students, plus tools for canteen staff to run the rush.'],
           ['What I did', 'Research, personas, journey maps for students and staff, IA, flows, wireframes, final screens.']],
    imgs: seq('canteen', 12) },
  { slug: 'blinkit-for-kids', title: 'Blinkit for Kids', tint: '#fdf3b8', thumb: U('blinkit_01'),
    line: 'Grocery shopping where kids get the fun and parents keep the final say.',
    category: 'App redesign · Concept', disciplines: ['UX Research', 'UI Design', 'Design Systems'],
    behance: 'https://www.behance.net/gallery/250526855/Blinkit-Redesign-for-Kids',
    gist: [['The problem', 'Grocery apps are built for adults: cluttered screens, accidental taps, sneaky snack temptations.'],
           ['The idea', 'A playful, mascot-led app with healthy nudges and a parent approval step before anything is bought.'],
           ['What I did', 'Research, personas, empathy maps, IA, user flow, wireframes, a kid-friendly design system, hi-fi screens.']],
    imgs: seq('blinkit', 12) },
  { slug: 'edible-cup', title: 'Edible Cup', tint: '#e4eefb', thumb: U('cup_04'),
    line: 'A paper cup with a biscuit sleeve you can actually eat.',
    category: 'Product & packaging design', disciplines: ['Product Design', 'UX Research', 'Ideation'],
    behance: 'https://www.behance.net/gallery/250533413/Edible-Cup-Product-design',
    gist: [['The problem', 'Hot paper cups are slippery, too warm to hold and easy to spill, especially in crowded canteens and tea stalls.'],
           ['The idea', 'A textured edible sleeve for grip and insulation, with a finger indent. Eat it or recycle it afterwards.'],
           ['What I did', 'Observed how people hold cups, listed pain points, explored ideas, landed on one final solution.']],
    imgs: seq('cup', 4) }
];

const $ = (s, r = document) => r.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

$('#grid').innerHTML = PROJECTS.map((p, i) => `
  <a class="card" data-r href="#/work/${p.slug}" style="--tint:${p.tint}">
    <div class="shot"><img src="${p.thumb}" alt="${esc(p.title)} case study preview" ${i ? 'loading="lazy"' : ''}><span class="peek">Open case study</span></div>
    <h3>${esc(p.title)}</h3><p>${esc(p.line)}</p>
    <div class="tags"><span>${esc(p.category)}</span></div>
  </a>`).join('');

const home = $('#home'), cs = $('#case');
function renderCase(p) {
  const i = PROJECTS.indexOf(p), nx = PROJECTS[(i + 1) % PROJECTS.length];
  cs.style.setProperty('--tint', p.tint);
  cs.innerHTML = `
    <a class="back" href="#work">← All work</a>
    <header class="cs-head"><h1>${esc(p.title)}</h1><p class="lead">${esc(p.line)}</p>
      <div class="tags"><span>${esc(p.category)}</span>${p.disciplines.map(d => `<span>${esc(d)}</span>`).join('')}</div></header>
    <div class="facts">${p.gist.map(([h, t]) => `<div class="fact"><h2>${h}</h2><p>${esc(t)}</p></div>`).join('')}</div>
    <p class="story-note">The full story, from research to final screens:</p>
    <div class="story">${p.imgs.map((s, k) => `<img src="${s}" alt="${esc(p.title)} case study, part ${k + 1} of ${p.imgs.length}" loading="${k < 2 ? 'eager' : 'lazy'}">`).join('')}</div>
    <div class="next"><a class="btn" href="${p.behance}" target="_blank" rel="noopener">See it on Behance <span class="arr" aria-hidden="true">↗</span></a>
      <a class="btn solid" href="#/work/${nx.slug}">Next: ${esc(nx.title)} <span class="arr" aria-hidden="true">→</span></a></div>`;
}

function route() {
  const m = location.hash.match(/^#\/work\/([\w-]+)/), p = m && PROJECTS.find(x => x.slug === m[1]);
  if (p) { renderCase(p); home.hidden = true; cs.hidden = false; document.title = `${p.title} | Vrushti Lakhupota`; window.scrollTo(0, 0); }
  else {
    const wasCase = !cs.hidden; cs.hidden = true; home.hidden = false; document.title = 'Vrushti Lakhupota | UI/UX Designer';
    const id = location.hash.slice(1);
    if (wasCase) requestAnimationFrame(() => (id && !id.startsWith('/') && document.getElementById(id) || document.body).scrollIntoView());
  }
  closeMenu();
}
addEventListener('hashchange', route); route();

// nav
const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
const onScroll = () => nav.classList.toggle('solid', scrollY > 24); addEventListener('scroll', onScroll, { passive: true }); onScroll();
function closeMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); }
burger.onclick = () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
addEventListener('keydown', e => e.key === 'Escape' && closeMenu());
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { if (!cs.hidden) { /* hashchange handles it */ } closeMenu(); }));

// scroll reveal
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .12 }) : null;
document.querySelectorAll('[data-r]').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// copy email
$('#copy').onclick = async () => {
  const t = $('#copied');
  try { await navigator.clipboard.writeText('vrushtilakhupota@gmail.com'); t.textContent = 'Copied!'; } catch { t.textContent = 'Press Ctrl+C'; }
  setTimeout(() => t.textContent = 'Copy', 1800);
};
$('#yr').textContent = new Date().getFullYear();
fetch($('#cv').getAttribute('href'), { method: 'HEAD' }).then(r => { if (!r.ok) console.warn('Add your CV at assets/Vrushti-Lakhupota-CV.pdf'); }).catch(() => {});
