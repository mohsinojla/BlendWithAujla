// ===== THEME =====
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('bwa-theme') || 'dark';
if (saved === 'light') { document.documentElement.setAttribute('data-theme','light'); if(themeBtn) themeBtn.textContent='☀️'; }
if (themeBtn) themeBtn.addEventListener('click', () => {
  const light = document.documentElement.getAttribute('data-theme') === 'light';
  document.documentElement.setAttribute('data-theme', light ? 'dark' : 'light');
  themeBtn.textContent = light ? '🌙' : '☀️';
  localStorage.setItem('bwa-theme', light ? 'dark' : 'light');
});

// ===== NAV ACTIVE =====
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-pages a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const btt = document.getElementById('backToTop');
const prog = document.getElementById('readProgress');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  if (navbar) navbar.classList.toggle('scrolled', y > 10);
  if (btt)   btt.classList.toggle('visible', y > 400);
  if (prog && total > 0) prog.style.width = (y/total*100)+'%';
}, { passive: true });

// ===== ACCORDION =====
// NOTE: acc-heads use inline onclick="toggleAcc(this)" — do NOT add a second addEventListener here
function toggleAcc(el) {
  const body = el.nextElementSibling;
  const open = el.classList.contains('open');
  // Close all other open items in the same accordion
  el.closest('.acc')?.querySelectorAll('.acc-head.open').forEach(h => {
    h.classList.remove('open');
    h.nextElementSibling.classList.remove('open');
  });
  // Open this one if it was closed
  if (!open) { el.classList.add('open'); body.classList.add('open'); }
}

// ===== REVEAL ON SCROLL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const raw = el.dataset.target;
  if (!raw) return;
  const suffix = el.dataset.suffix || '';
  if (raw === '∞') { el.textContent = '∞'; return; }
  const target = parseInt(raw);
  const duration = 1600;
  const steps = 60;
  const increment = target / steps;
  let current = 0; let frame = 0;
  const timer = setInterval(() => {
    frame++;
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current) + suffix;
    if (frame >= steps) { el.textContent = target + suffix; clearInterval(timer); }
  }, duration / steps);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ===== PAGE ENTER =====
document.body.classList.add('page-enter');

// ===== SEARCH DATA =====
const SEARCH_DATA = [
  {key:'Ctrl+Z',desc:'Undo',cat:'Universal',page:'shortcuts.html'},
  {key:'Ctrl+Shift+Z',desc:'Redo',cat:'Universal',page:'shortcuts.html'},
  {key:'Ctrl+S',desc:'Save file',cat:'Universal',page:'shortcuts.html'},
  {key:'F3',desc:'Search commands/operators',cat:'Universal',page:'shortcuts.html'},
  {key:'F9',desc:'Adjust last operator settings',cat:'Universal',page:'shortcuts.html'},
  {key:'A',desc:'Select all',cat:'Universal',page:'shortcuts.html'},
  {key:'Alt+A',desc:'Deselect all',cat:'Universal',page:'shortcuts.html'},
  {key:'B',desc:'Box select',cat:'Universal',page:'shortcuts.html'},
  {key:'C',desc:'Circle select',cat:'Universal',page:'shortcuts.html'},
  {key:'H',desc:'Hide selected',cat:'Universal',page:'shortcuts.html'},
  {key:'Alt+H',desc:'Unhide all',cat:'Universal',page:'shortcuts.html'},
  {key:'Z',desc:'Viewport shading pie menu',cat:'Universal',page:'shortcuts.html'},
  {key:'Alt+Z',desc:'Toggle X-Ray mode',cat:'Universal',page:'shortcuts.html'},
  {key:'/',desc:'Local view / isolate',cat:'Universal',page:'shortcuts.html'},
  {key:'N',desc:'Toggle sidebar panel',cat:'Universal',page:'shortcuts.html'},
  {key:'T',desc:'Toggle toolbar',cat:'Universal',page:'shortcuts.html'},
  {key:'Q',desc:'Quick Favorites menu',cat:'Universal',page:'shortcuts.html'},
  {key:'Numpad 0',desc:'Camera view',cat:'Navigation',page:'shortcuts.html'},
  {key:'Numpad 1',desc:'Front view',cat:'Navigation',page:'shortcuts.html'},
  {key:'Numpad 3',desc:'Right view',cat:'Navigation',page:'shortcuts.html'},
  {key:'Numpad 7',desc:'Top view',cat:'Navigation',page:'shortcuts.html'},
  {key:'Numpad 5',desc:'Toggle ortho/perspective',cat:'Navigation',page:'shortcuts.html'},
  {key:'Numpad .',desc:'Frame selected object',cat:'Navigation',page:'shortcuts.html'},
  {key:'~',desc:'Viewport pie menu (all views)',cat:'Navigation',page:'shortcuts.html'},
  {key:'G',desc:'Grab / move object',cat:'Object Mode',page:'shortcuts.html'},
  {key:'R',desc:'Rotate object',cat:'Object Mode',page:'shortcuts.html'},
  {key:'S',desc:'Scale object',cat:'Object Mode',page:'shortcuts.html'},
  {key:'G X/Y/Z',desc:'Move on axis',cat:'Object Mode',page:'shortcuts.html'},
  {key:'Shift+D',desc:'Duplicate object',cat:'Object Mode',page:'shortcuts.html'},
  {key:'Alt+D',desc:'Duplicate linked (instance)',cat:'Object Mode',page:'shortcuts.html'},
  {key:'Ctrl+J',desc:'Join selected objects',cat:'Object Mode',page:'shortcuts.html'},
  {key:'Ctrl+A',desc:'Apply transforms menu',cat:'Object Mode',page:'shortcuts.html'},
  {key:'Shift+A',desc:'Add object menu',cat:'Object Mode',page:'shortcuts.html'},
  {key:'Ctrl+P',desc:'Set parent',cat:'Object Mode',page:'shortcuts.html'},
  {key:'Alt+P',desc:'Clear parent',cat:'Object Mode',page:'shortcuts.html'},
  {key:'M',desc:'Move to collection',cat:'Object Mode',page:'shortcuts.html'},
  {key:'Tab',desc:'Toggle Object/Edit Mode',cat:'Object Mode',page:'shortcuts.html'},
  {key:'1',desc:'Vertex select mode',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'2',desc:'Edge select mode',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'3',desc:'Face select mode',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'E',desc:'Extrude',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'I',desc:'Inset faces',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'Ctrl+B',desc:'Bevel edges (scroll for segments)',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'Ctrl+R',desc:'Loop cut (scroll for count)',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'K',desc:'Knife tool',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'F',desc:'Fill / create face or edge',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'G G',desc:'Edge slide',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'Alt+Click edge',desc:'Select edge loop',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'O',desc:'Toggle proportional editing',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'Shift+N',desc:'Recalculate normals outside',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'Ctrl+X',desc:'Dissolve selected elements',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'Shift+E',desc:'Set crease for SubDiv',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'U',desc:'UV Unwrap menu',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'Ctrl+T',desc:'Triangulate faces — fixes black face issues in some renders/engines',cat:'Edit Mode',page:'shortcuts.html'},
  {key:'F',desc:'Resize sculpt brush',cat:'Sculpting',page:'sculpting.html'},
  {key:'Shift+F',desc:'Change brush strength',cat:'Sculpting',page:'sculpting.html'},
  {key:'Ctrl+R',desc:'Voxel remesh',cat:'Sculpting',page:'sculpting.html'},
  {key:'I',desc:'Insert keyframe',cat:'Animation',page:'animation.html'},
  {key:'Space',desc:'Play/Pause animation',cat:'Animation',page:'animation.html'},
  {key:'F12',desc:'Render image',cat:'Render',page:'rendering.html'},
  {key:'Ctrl+F12',desc:'Render animation',cat:'Render',page:'rendering.html'},
  {key:'F11',desc:'Show last render',cat:'Render',page:'rendering.html'},
  {key:'Shift+A',desc:'Add node (in Node Editor)',cat:'Nodes',page:'materials.html'},
  {key:'Ctrl+Shift+T',desc:'Node Wrangler PBR setup',cat:'Nodes',page:'materials.html'},
  {key:'Ctrl+G',desc:'Group selected nodes',cat:'Nodes',page:'materials.html'},
];

const searchInput = document.getElementById('searchInput');
const searchDrop  = document.getElementById('searchResults');
if (searchInput && searchDrop) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q || q.length < 2) { searchDrop.innerHTML=''; searchDrop.classList.remove('open'); return; }
    const hits = SEARCH_DATA.filter(d =>
      d.key.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) || d.cat.toLowerCase().includes(q)
    ).slice(0,10);
    if (!hits.length) { searchDrop.innerHTML='<div class="search-result"><span class="sr-desc">No results found</span></div>'; }
    else searchDrop.innerHTML = hits.map(d =>
      `<div class="search-result" onclick="location.href='${d.page}'">
        <kbd class="sr-key">${d.key}</kbd>
        <span class="sr-desc">${d.desc}</span>
        <span class="sr-cat">${d.cat}</span>
      </div>`).join('');
    searchDrop.classList.add('open');
  });
  document.addEventListener('click', e => { if (!e.target.closest('.nav-search')) { searchDrop.classList.remove('open'); } });
  searchInput.addEventListener('keydown', e => { if (e.key==='Escape') { searchDrop.classList.remove('open'); searchInput.blur(); } });
}
