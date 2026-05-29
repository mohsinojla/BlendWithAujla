// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initScrollSpy();
});

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('blender-theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeBtn.textContent = '☀️';
}
themeBtn.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('blender-theme', isLight ? 'dark' : 'light');
});

// ===== SHORTCUT TABS =====
function showShortcutTab(id) {
  document.querySelectorAll('.sc-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sc-tab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById('sc-' + id);
  if (panel) panel.classList.add('active');
  event.currentTarget.classList.add('active');
}

// ===== ACCORDION =====
function initAccordions() {
  document.querySelectorAll('.acc-header').forEach(header => {
    header.addEventListener('click', () => toggleAcc(header));
  });
}
function toggleAcc(header) {
  const body = header.nextElementSibling;
  const isOpen = header.classList.contains('open');
  // Close siblings
  const parent = header.closest('.accordion');
  if (parent) {
    parent.querySelectorAll('.acc-header.open').forEach(h => {
      h.classList.remove('open');
      h.nextElementSibling.classList.remove('open');
    });
  }
  if (!isOpen) {
    header.classList.add('open');
    body.classList.add('open');
  }
}

// ===== SCROLL TO SECTION =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== BACK TO TOP + PROGRESS BAR =====
const backToTop = document.getElementById('backToTop');
const progress = document.getElementById('readProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (scrolled / total) * 100 : 0;
  if (progress) progress.style.width = pct + '%';
  if (backToTop) backToTop.classList.toggle('visible', scrolled > 400);
});

// ===== SCROLL SPY =====
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
}

// ===== SEARCH =====
const SEARCH_DATA = [
  // Universal
  { key: 'Ctrl+Z', desc: 'Undo', cat: 'Universal' },
  { key: 'Ctrl+Shift+Z', desc: 'Redo', cat: 'Universal' },
  { key: 'Ctrl+S', desc: 'Save file', cat: 'Universal' },
  { key: 'F3', desc: 'Search commands/operators', cat: 'Universal' },
  { key: 'F9', desc: 'Adjust last operator settings', cat: 'Universal' },
  { key: 'A', desc: 'Select all', cat: 'Universal' },
  { key: 'Alt+A', desc: 'Deselect all', cat: 'Universal' },
  { key: 'B', desc: 'Box select', cat: 'Universal' },
  { key: 'C', desc: 'Circle select', cat: 'Universal' },
  { key: 'H', desc: 'Hide selected', cat: 'Universal' },
  { key: 'Alt+H', desc: 'Unhide all', cat: 'Universal' },
  { key: 'Z', desc: 'Viewport shading pie menu', cat: 'Universal' },
  { key: 'Alt+Z', desc: 'Toggle X-Ray mode', cat: 'Universal' },
  { key: '/', desc: 'Local view / isolate selection', cat: 'Universal' },
  { key: 'N', desc: 'Toggle sidebar panel', cat: 'Universal' },
  { key: 'T', desc: 'Toggle toolbar', cat: 'Universal' },
  { key: 'Q', desc: 'Quick Favorites menu', cat: 'Universal' },
  // Viewport navigation
  { key: 'Numpad 0', desc: 'Camera view', cat: 'Navigation' },
  { key: 'Numpad 1', desc: 'Front view', cat: 'Navigation' },
  { key: 'Numpad 3', desc: 'Right view', cat: 'Navigation' },
  { key: 'Numpad 7', desc: 'Top view', cat: 'Navigation' },
  { key: 'Numpad 5', desc: 'Toggle orthographic/perspective', cat: 'Navigation' },
  { key: 'Numpad .', desc: 'Frame/focus selected object', cat: 'Navigation' },
  { key: 'Numpad Home', desc: 'Frame all objects', cat: 'Navigation' },
  { key: '~', desc: 'Viewport pie menu (all views)', cat: 'Navigation' },
  { key: 'Middle Mouse', desc: 'Orbit the view', cat: 'Navigation' },
  { key: 'Shift+MMB', desc: 'Pan the view', cat: 'Navigation' },
  { key: 'Ctrl+Alt+Numpad 0', desc: 'Align camera to current view', cat: 'Navigation' },
  // Object Mode
  { key: 'G', desc: 'Grab / move selected object', cat: 'Object Mode' },
  { key: 'R', desc: 'Rotate selected object', cat: 'Object Mode' },
  { key: 'S', desc: 'Scale selected object', cat: 'Object Mode' },
  { key: 'G X', desc: 'Move on X axis', cat: 'Object Mode' },
  { key: 'G Y', desc: 'Move on Y axis', cat: 'Object Mode' },
  { key: 'G Z', desc: 'Move on Z axis', cat: 'Object Mode' },
  { key: 'Shift+D', desc: 'Duplicate object', cat: 'Object Mode' },
  { key: 'Alt+D', desc: 'Duplicate linked (instance)', cat: 'Object Mode' },
  { key: 'Ctrl+J', desc: 'Join selected objects into one', cat: 'Object Mode' },
  { key: 'Ctrl+A', desc: 'Apply transforms (location/rotation/scale)', cat: 'Object Mode' },
  { key: 'Alt+G', desc: 'Clear location / reset to origin', cat: 'Object Mode' },
  { key: 'Alt+R', desc: 'Clear rotation', cat: 'Object Mode' },
  { key: 'Alt+S', desc: 'Clear scale', cat: 'Object Mode' },
  { key: 'Shift+A', desc: 'Add object menu', cat: 'Object Mode' },
  { key: 'X / Del', desc: 'Delete selected', cat: 'Object Mode' },
  { key: 'Ctrl+P', desc: 'Set parent', cat: 'Object Mode' },
  { key: 'Alt+P', desc: 'Clear parent', cat: 'Object Mode' },
  { key: 'M', desc: 'Move to collection', cat: 'Object Mode' },
  { key: 'Tab', desc: 'Toggle Object / Edit Mode', cat: 'Object Mode' },
  // Edit Mode
  { key: '1', desc: 'Vertex select mode (in Edit Mode)', cat: 'Edit Mode' },
  { key: '2', desc: 'Edge select mode (in Edit Mode)', cat: 'Edit Mode' },
  { key: '3', desc: 'Face select mode (in Edit Mode)', cat: 'Edit Mode' },
  { key: 'E', desc: 'Extrude selected', cat: 'Edit Mode' },
  { key: 'I', desc: 'Inset faces', cat: 'Edit Mode' },
  { key: 'Ctrl+B', desc: 'Bevel edges (scroll for segments)', cat: 'Edit Mode' },
  { key: 'Ctrl+R', desc: 'Loop cut (scroll for count)', cat: 'Edit Mode' },
  { key: 'K', desc: 'Knife tool', cat: 'Edit Mode' },
  { key: 'F', desc: 'Fill / create face or edge', cat: 'Edit Mode' },
  { key: 'M', desc: 'Merge vertices menu', cat: 'Edit Mode' },
  { key: 'J', desc: 'Connect vertices with edge', cat: 'Edit Mode' },
  { key: 'G G', desc: 'Edge slide', cat: 'Edit Mode' },
  { key: 'Alt+Click edge', desc: 'Select edge loop', cat: 'Edit Mode' },
  { key: 'Ctrl+Alt+Click', desc: 'Select edge ring', cat: 'Edit Mode' },
  { key: 'L', desc: 'Select linked (hover)', cat: 'Edit Mode' },
  { key: 'O', desc: 'Toggle proportional editing', cat: 'Edit Mode' },
  { key: 'P', desc: 'Separate selection to new object', cat: 'Edit Mode' },
  { key: 'Shift+N', desc: 'Recalculate normals outside', cat: 'Edit Mode' },
  { key: 'Ctrl+X', desc: 'Dissolve selected elements', cat: 'Edit Mode' },
  { key: 'Alt+S', desc: 'Shrink/fatten along normals', cat: 'Edit Mode' },
  { key: 'Shift+E', desc: 'Set crease (sharpens in SubDiv)', cat: 'Edit Mode' },
  { key: 'Ctrl+E', desc: 'Edge context menu', cat: 'Edit Mode' },
  { key: 'Ctrl+F', desc: 'Face context menu', cat: 'Edit Mode' },
  { key: 'Ctrl+V', desc: 'Vertex context menu', cat: 'Edit Mode' },
  { key: 'U', desc: 'UV Unwrap menu', cat: 'Edit Mode' },
  // Sculpt
  { key: 'F', desc: 'Resize sculpt brush', cat: 'Sculpt Mode' },
  { key: 'Shift+F', desc: 'Change brush strength', cat: 'Sculpt Mode' },
  { key: 'Ctrl (hold)', desc: 'Invert brush direction', cat: 'Sculpt Mode' },
  { key: 'Shift (hold)', desc: 'Smooth brush temporarily', cat: 'Sculpt Mode' },
  { key: 'Ctrl+R', desc: 'Voxel remesh', cat: 'Sculpt Mode' },
  // Animation
  { key: 'I', desc: 'Insert keyframe', cat: 'Animation' },
  { key: 'Space', desc: 'Play/Pause animation', cat: 'Animation' },
  { key: 'Left Arrow', desc: 'Previous frame', cat: 'Animation' },
  { key: 'Right Arrow', desc: 'Next frame', cat: 'Animation' },
  { key: 'Shift+Left', desc: 'Jump to first frame', cat: 'Animation' },
  { key: 'Shift+Right', desc: 'Jump to last frame', cat: 'Animation' },
  // Render
  { key: 'F12', desc: 'Render image', cat: 'Render' },
  { key: 'Ctrl+F12', desc: 'Render animation', cat: 'Render' },
  { key: 'F11', desc: 'Show last render', cat: 'Render' },
  { key: 'Esc', desc: 'Cancel render', cat: 'Render' },
  // Nodes
  { key: 'Shift+A', desc: 'Add node (in Node Editor)', cat: 'Nodes' },
  { key: 'Ctrl+Shift+T', desc: 'Node Wrangler: PBR texture setup', cat: 'Nodes' },
  { key: 'Ctrl+G', desc: 'Group selected nodes', cat: 'Nodes' },
  { key: 'M', desc: 'Mute/bypass node', cat: 'Nodes' },
  { key: 'Ctrl+X', desc: 'Delete node and reconnect', cat: 'Nodes' },
  { key: 'Ctrl+Shift+Click', desc: 'Preview node output in viewport', cat: 'Nodes' },
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q || q.length < 2) {
    searchResults.innerHTML = '';
    searchResults.classList.remove('open');
    return;
  }
  const matches = SEARCH_DATA.filter(item =>
    item.key.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q) ||
    item.cat.toLowerCase().includes(q)
  ).slice(0, 12);

  if (!matches.length) {
    searchResults.innerHTML = '<div class="search-result"><span class="sr-desc">No results found</span></div>';
  } else {
    searchResults.innerHTML = matches.map(m =>
      `<div class="search-result">
        <kbd class="sr-key">${m.key}</kbd>
        <span class="sr-desc">${m.desc}</span>
        <span class="sr-cat">${m.cat}</span>
      </div>`
    ).join('');
  }
  searchResults.classList.add('open');
});

document.addEventListener('click', e => {
  if (!e.target.closest('.nav-search')) {
    searchResults.classList.remove('open');
  }
});
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchResults.classList.remove('open');
    searchInput.blur();
  }
});

// ===== FADE IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.basics-card, .workflow-card, .tip-card, .level-card, .editor-card');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.basics-card, .workflow-card, .tip-card, .level-card, .editor-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  fadeObserver.observe(el);
});
