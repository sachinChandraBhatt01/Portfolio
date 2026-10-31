/* Studio Mitti - script.js
   1 CONFIG (edit first)  2 DATA  3 Room illustration  4 Hero palettes  5 Projects & modal
   6 Estimator  7 Contact form  8 Theme & extras */
'use strict';

/* 1. CONFIG: replace with your client's details */
const CONFIG = {
  name: 'Studio Mitti',
  whatsapp: '910000000000',          // country code + number, digits only
  phone: '+91 00000 00000',
  email: 'hello@studiomitti.example',
  address: '100 Sample Street, Demo City, India',
  weeksPer1000sqft: 5                // used by the budget estimator
};

/* 2. DATA: add, remove or edit projects here. pal = [wall, floor, sofa, accent] */
const PALETTES = [
  { n: 'Moss and brass', pal: ['#cdd8c6', '#8c6f50', '#3f5a47', '#c9a86a'] },
  { n: 'Plum dusk',      pal: ['#d9cbd3', '#5b4350', '#7a4a63', '#e0a96d'] },
  { n: 'Coastal blue',   pal: ['#d3e0e6', '#b69a74', '#2f5b73', '#e8c872'] },
  { n: 'Charcoal warm',  pal: ['#cfc9c1', '#46423e', '#2b2a29', '#c7794d'] }
];
const PROJECTS = [
  { name: 'Lodhi Road Penthouse', type: 'Full home', loc: 'New Delhi', sqft: 2400, cost: '58 L', weeks: 14, pal: PALETTES[3].pal, text: 'A dark, calm palette for a family that hosts often. Open kitchen, walnut panelling and hidden storage along every wall.' },
  { name: 'Dwarka 3BHK', type: 'Full home', loc: 'Dwarka', sqft: 1450, cost: '24 L', weeks: 8, pal: PALETTES[0].pal, text: 'Moss green and brass to make a standard builder flat feel custom. Wardrobes were redesigned to gain 30% more storage.' },
  { name: 'Vasant Kunj Lounge', type: 'Living', loc: 'Vasant Kunj', sqft: 420, cost: '9.5 L', weeks: 4, pal: PALETTES[2].pal, text: 'A living room rebuilt around a blue velvet sofa and layered lighting for evening gatherings.' },
  { name: 'Sector 50 Master Suite', type: 'Bedroom', loc: 'Gurugram', sqft: 300, cost: '6.8 L', weeks: 3, pal: PALETTES[1].pal, text: 'Plum headboard wall, concealed wardrobe doors and warm cove lighting for better sleep.' },
  { name: 'Greater Kailash Kitchen', type: 'Kitchen', loc: 'New Delhi', sqft: 160, cost: '7.2 L', weeks: 4, pal: ['#d8d9cf', '#6f7a68', '#31453b', '#d1a45c'], text: 'A modular kitchen with a deep pantry, quartz counters and a breakfast ledge that replaced an unused corner.' },
  { name: 'Noida Studio Flat', type: 'Living', loc: 'Noida', sqft: 520, cost: '8.4 L', weeks: 5, pal: ['#e0d9cc', '#a38868', '#556a77', '#c27d58'], text: 'A 1BHK made to feel bigger with a fold-down desk, light curtains and one bold rug.' }
];
const TYPES = ['All', 'Full home', 'Living', 'Bedroom', 'Kitchen'];
const FINISH = {
  1500: ['Essential', 'Laminate finishes, standard hardware, ready-made lighting.'],
  2400: ['Signature', 'Veneer and acrylic finishes, soft-close hardware, designed lighting.'],
  3800: ['Luxe', 'Premium veneers, stone, custom furniture and automation.']
};

const $ = (s, el = document) => el.querySelector(s);
const toast = (m) => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2600); };

/* 3. ROOM ILLUSTRATION: one drawing, coloured by CSS variables */
function room(kind = 'living', bare = false) {
  const base = `<defs><radialGradient id="g"><stop offset="0" stop-color="#ffd27a" stop-opacity=".85"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>
  <rect width="400" height="228" fill="var(--w)"/><rect y="228" width="400" height="72" fill="var(--f)"/>
  <path d="M285 228V112a42 42 0 0 1 84 0V228z" fill="#fff" opacity=".55"/><path d="M327 70v158M285 150h84" stroke="var(--w)" stroke-width="3"/>`;
  const sets = {
    living: `<rect x="78" y="46" width="78" height="56" rx="3" fill="var(--a)"/><circle cx="117" cy="74" r="15" fill="var(--s)" opacity=".85"/>
  <ellipse cx="150" cy="262" rx="124" ry="16" fill="var(--a)" opacity=".75"/>
  <rect x="38" y="140" width="190" height="42" rx="16" fill="var(--s)"/><rect x="28" y="162" width="206" height="54" rx="16" fill="var(--s)"/>
  <rect x="62" y="166" width="62" height="30" rx="10" fill="var(--a)" opacity=".9"/><path d="M52 216v14M210 216v14" stroke="var(--f)" stroke-width="6" stroke-linecap="round"/>
  <path d="M256 228V120" stroke="var(--a)" stroke-width="4"/><path d="M238 128l9-28h18l9 28z" fill="var(--a)"/>
  <path d="M376 228l-4-26h24l-4 26z" fill="var(--a)"/><g fill="var(--s)"><ellipse cx="384" cy="184" rx="7" ry="20" transform="rotate(-18 384 184)"/><ellipse cx="396" cy="190" rx="6" ry="17" transform="rotate(20 396 190)"/><ellipse cx="376" cy="192" rx="6" ry="16" transform="rotate(-40 376 192)"/></g>`,
    bed: `<ellipse cx="170" cy="262" rx="140" ry="16" fill="var(--a)" opacity=".7"/>
  <rect x="50" y="64" width="230" height="110" rx="14" fill="var(--s)"/><rect x="40" y="168" width="250" height="56" rx="10" fill="var(--s)"/>
  <rect x="40" y="186" width="250" height="38" rx="8" fill="var(--a)" opacity=".9"/><rect x="66" y="144" width="86" height="32" rx="12" fill="#fff" opacity=".85"/><rect x="170" y="144" width="86" height="32" rx="12" fill="#fff" opacity=".85"/>
  <rect x="300" y="180" width="40" height="48" rx="4" fill="var(--s)"/><path d="M320 180v-28" stroke="var(--a)" stroke-width="4"/><path d="M306 156l8-22h12l8 22z" fill="var(--a)"/>
  <rect x="310" y="46" width="60" height="44" rx="3" fill="var(--a)" opacity="0"/>`,
    kitchen: `<rect x="20" y="40" width="250" height="62" rx="6" fill="var(--s)"/><path d="M95 40v62M170 40v62" stroke="var(--w)" stroke-width="3"/>
  <rect x="20" y="146" width="250" height="82" rx="4" fill="var(--s)"/><rect x="14" y="138" width="262" height="12" rx="3" fill="var(--a)"/><path d="M95 150v78M170 150v78" stroke="var(--w)" stroke-width="3"/>
  <path d="M110 18v36M190 18v36" stroke="var(--a)" stroke-width="3"/><circle cx="110" cy="60" r="14" fill="var(--a)"/><circle cx="190" cy="60" r="14" fill="var(--a)"/>
  <g fill="var(--a)"><rect x="60" y="214" width="26" height="8" rx="3"/><rect x="190" y="214" width="26" height="8" rx="3"/></g><path d="M73 222v30M203 222v30" stroke="var(--f)" stroke-width="5"/>`
  };
  const fill = bare ? '<path d="M0 228h400" stroke="#0002" stroke-width="3"/><path d="M60 40l50 70M120 120l-40 60" stroke="#0001" stroke-width="2"/>' : sets[kind] + '<rect class="dim" width="400" height="300" fill="#10141f"/><circle class="glow" cx="200" cy="120" r="190" fill="url(#g)"/>';
  return `<svg viewBox="0 0 400 300" role="img" aria-label="${bare ? 'Empty room before design' : 'Illustrated ' + kind + ' room'}">${base}${fill}</svg>`;
}
const kindOf = (p) => p.type === 'Bedroom' ? 'bed' : p.type === 'Kitchen' ? 'kitchen' : 'living';
const vars = (p) => `--w:${p[0]};--f:${p[1]};--s:${p[2]};--a:${p[3]}`;

/* 4. HERO PALETTES */
const stage = $('#stage'), pals = $('#pals');
stage.innerHTML = room();
function setPalette(i) {
  stage.style.cssText = vars(PALETTES[i].pal);
  [...pals.children].forEach((b, n) => b.setAttribute('aria-pressed', n === i));
}
PALETTES.forEach((p, i) => {
  const b = document.createElement('button');
  b.className = 'pal'; b.type = 'button';
  b.innerHTML = `<i>${p.pal.map(c => `<b style="background:${c}"></b>`).join('')}</i>${p.n}`;
  b.onclick = () => setPalette(i);
  pals.append(b);
});
setPalette(0);
$('#light').onclick = e => { const on = stage.classList.toggle('eve'); e.currentTarget.setAttribute('aria-pressed', on); e.currentTarget.textContent = on ? 'Lights on' : 'Lights off'; };

/* 5. PROJECTS & MODAL */
const grid = $('#grid'), filters = $('#filters'), pm = $('#pm');
let active = 'All';
function renderProjects() {
  const list = PROJECTS.filter(p => active === 'All' || p.type === active);
  grid.innerHTML = list.length ? '' : '<p class="empty">No projects in this category yet.</p>';
  list.forEach(p => {
    const c = document.createElement('button');
    c.className = 'card'; c.type = 'button'; c.style.cssText = vars(p.pal);
    c.innerHTML = `<div class="art">${room(kindOf(p))}</div><div class="info"><h3>${p.name}</h3><p>${p.type}, ${p.loc}, ${p.sqft} sq ft</p></div>`;
    c.onclick = () => openProject(p);
    grid.append(c);
  });
}
TYPES.forEach(t => {
  const b = document.createElement('button');
  b.className = 'chip'; b.type = 'button'; b.textContent = t;
  b.setAttribute('aria-pressed', t === active);
  b.onclick = () => { active = t; [...filters.children].forEach(x => x.setAttribute('aria-pressed', x === b)); renderProjects(); };
  filters.append(b);
});
function openProject(p) {
  $('#pmArt').innerHTML = `<div class="ba" style="--x:50%"><div class="ba-b" style="--w:#d9d7d2;--f:#b8b4ad">${room('living', true)}</div><div class="ba-a" style="${vars(p.pal)}">${room(kindOf(p))}</div><span class="tag l">Before</span><span class="tag r">After</span><input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after"></div>`;
  $('#pmArt input').oninput = e => $('#pmArt .ba').style.setProperty('--x', e.target.value + '%');
  $('#pmTitle').textContent = p.name; $('#pmText').textContent = p.text;
  $('#pmFacts').innerHTML = [['Location', p.loc], ['Area', p.sqft + ' sq ft'], ['Cost', '₹' + p.cost], ['Duration', p.weeks + ' weeks']].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  pm.showModal();
}
$('#pmClose').onclick = () => pm.close();
pm.addEventListener('click', e => { if (e.target === pm) pm.close(); });
$('#pmCta').onclick = () => { pm.close(); $('textarea').value = 'I like the ' + $('#pmTitle').textContent + ' project. '; };
renderProjects();

/* 6. BUDGET ESTIMATOR (Indian format: lakh and crore) */
const inr = n => n >= 1e7 ? '₹' + (n / 1e7).toFixed(2) + ' Cr' : '₹' + (n / 1e5).toFixed(1) + ' L';
function estimate() {
  const sq = +$('#sqft').value, rate = +$('input[name=fin]:checked').value;
  const mid = sq * rate, lo = mid * 0.9, hi = mid * 1.1;
  $('#sqftOut').textContent = sq.toLocaleString('en-IN') + ' sq ft';
  $('#range').textContent = inr(lo) + ' to ' + inr(hi);
  $('#weeks').textContent = 'About ' + Math.max(3, Math.round(sq / 1000 * CONFIG.weeksPer1000sqft + 2)) + ' weeks on site';
  $('#finNote').textContent = FINISH[rate][0] + ': ' + FINISH[rate][1];
  return `${sq} sq ft, ${FINISH[rate][0]} finish, estimate ${inr(lo)} to ${inr(hi)}`;
}
document.querySelectorAll('#sqft,input[name=fin]').forEach(el => el.addEventListener('input', estimate));
$('#shareEst').onclick = () => { $('textarea').value = 'My budget estimate: ' + estimate() + '. '; };
estimate();

/* 7. CONTACT FORM: opens WhatsApp with the details filled in */
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target), name = f.get('name').trim(), phone = f.get('phone').trim();
  if (!name) return ($('#err').textContent = 'Enter your name so we know who to call.');
  if (!/^[+\d][\d\s-]{8,14}$/.test(phone)) return ($('#err').textContent = 'Enter a valid phone number, for example 98765 43210.');
  $('#err').textContent = '';
  const text = `Hi ${CONFIG.name}, I am ${name} (${phone}). Project: ${f.get('type')}. ${f.get('msg')}`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  toast('Opening WhatsApp');
});

/* 8. THEME & EXTRAS */
$('#theme').onclick = () => {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('mitti-theme', t); } catch (e) {}
};
$('#wa').href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hi ' + CONFIG.name + ', I would like to discuss my interiors.')}`;
$('#wa').target = '_blank'; $('#wa').rel = 'noopener';
$('#contactLine').textContent = `${CONFIG.phone}  |  ${CONFIG.email}  |  ${CONFIG.address}`;
