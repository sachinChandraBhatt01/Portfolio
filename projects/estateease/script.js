/* =====================================================
   EstateEase - Sample Real Estate Website (v3)
   script.js
   -----------------------------------------------------
   TABLE OF CONTENTS
   1. SETTINGS          <- edit your phone number & details here
   2. PROPERTY DATA     <- edit / add / remove properties here
   3. State & helpers   (prices, storage, images, messages)
   4. Property cards, filters, sorting & search
   5. Hero slideshow
   6. Cities (area tiles)
   7. Compare
   8. Popups (property details & compare)
   9. Loan calculator
   10. Client stories
   11. Navigation, theme & currency
   12. Contact form
   13. Small extras (toasts, back to top, images)
   14. Start everything
   ===================================================== */

'use strict';


/* =====================================================
   1. SETTINGS - CUSTOMISE THESE FIRST
   ===================================================== */
const CONFIG = {
  businessName: 'EstateEase',

  // WhatsApp number: country code + number, DIGITS ONLY (no +, spaces or dashes).
  // Example for India: '919876543210'  |  Example for the UK: '447123456789'
  whatsappNumber: '910000000000',          // <-- REPLACE WITH YOUR CLIENT'S NUMBER

  // Shown on the page and used for the "Call us" links
  phoneDisplay: '+91 00000 00000',         // <-- REPLACE (what visitors see)
  phoneTel: '+910000000000',               // <-- REPLACE (used for tap-to-call)

  email: 'hello@estateease.example',       // <-- REPLACE
  address: '100 Sample Street, Demo City, India',
  hours: 'Mon to Sat, 9:30 AM to 7:00 PM',

  // Prices in the data below are in Indian rupees.
  // The $ button on the website converts them using this rate (rupees per 1 US dollar).
  usdRate: 83,

  // Assumptions for the "Estimated EMI" shown in property popups
  emiLoanShare: 0.8,       // 80% of the price is borrowed
  emiRate: 8.5,            // interest per year (%)
  emiYears: 20
};


/* =====================================================
   2. PROPERTY DATA - ALL FICTIONAL SAMPLE LISTINGS
   -----------------------------------------------------
   category:   'buy', 'rent' or 'commercial'
   price:      always in rupees (the $ switch converts it)
   priceSuffix: '' for sale prices, '/month' for rent or lease
   beds:       use 0 for commercial spaces
   images:     the first image is the main photo. Add or replace
               with any public image URLs (use photo() for Unsplash IDs).
   ===================================================== */
function photo(unsplashId, width) {
  return 'https://images.unsplash.com/photo-' + unsplashId + '?auto=format&fit=crop&w=' + width + '&q=80';
}

const properties = [
  {
    id: 1,
    ref: 'EE-101',
    title: 'Skyline Residency 3 BHK Apartment',
    category: 'buy',
    listingLabel: 'For sale',
    location: 'Whitefield, Bengaluru',
    city: 'Bengaluru',
    price: 18500000,
    priceSuffix: '',
    beds: 3,
    baths: 3,
    area: 1850,
    parking: 2,
    images: [photo('1545324418-cc1a3fa10c00', 900), photo('1600607687939-ce8a6c25118c', 900), photo('1556909114-f6e7ad7d3136', 900)],
    description: 'A bright apartment on a high floor with open city views, a spacious living area and a fully fitted kitchen. A good fit for families who want comfort close to tech parks and schools.',
    features: ['Clubhouse and gym', 'Covered parking', '24/7 security', 'Power backup', 'Balcony with a view', "Children's play area"]
  },
  {
    id: 2,
    ref: 'EE-102',
    title: 'Palm Grove Private Villa',
    category: 'buy',
    listingLabel: 'For sale',
    location: 'Assagao, Goa',
    city: 'Goa',
    price: 45000000,
    priceSuffix: '',
    beds: 4,
    baths: 5,
    area: 3600,
    parking: 3,
    images: [photo('1512917774080-9991f1c4c750', 900), photo('1600585154340-be6161a56a0c', 900), photo('1600596542815-ffad4c1539a9', 900)],
    description: 'A villa with a private pool, landscaped garden and generous indoor and outdoor living spaces. Equally good as a permanent home or a holiday retreat.',
    features: ['Private pool', 'Landscaped garden', 'Modular kitchen', 'Staff quarters', 'Smart home wiring', 'Gated community']
  },
  {
    id: 3,
    ref: 'EE-103',
    title: 'Garden View 2 BHK Flat',
    category: 'rent',
    listingLabel: 'For rent',
    location: 'Baner, Pune',
    city: 'Pune',
    price: 38000,
    priceSuffix: '/month',
    beds: 2,
    baths: 2,
    area: 1150,
    parking: 1,
    images: [photo('1522708323590-d24dbb6b0267', 900), photo('1560448204-e02f11c3d0e2', 900), photo('1556909114-f6e7ad7d3136', 900)],
    description: 'A well-lit, semi-furnished flat overlooking a green courtyard. Cafes, markets and the main road are a short walk away, in a quiet and friendly neighbourhood.',
    features: ['Semi-furnished', 'Lift access', 'Reserved parking', 'Water supply 24/7', 'Pet friendly', 'Near public transport']
  },
  {
    id: 4,
    ref: 'EE-104',
    title: 'Urban Loft Studio',
    category: 'rent',
    listingLabel: 'For rent',
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    price: 55000,
    priceSuffix: '/month',
    beds: 1,
    baths: 1,
    area: 620,
    parking: 0,
    images: [photo('1502672260266-1c1ef2d93688', 900), photo('1560448204-e02f11c3d0e2', 900), photo('1600607687939-ce8a6c25118c', 900)],
    description: 'A stylish, fully furnished studio with high ceilings and smart storage. Made for young professionals who want to live close to the action.',
    features: ['Fully furnished', 'High-speed internet', 'Air conditioning', 'Modern kitchenette', 'Gym access', 'Secure entry']
  },
  {
    id: 5,
    ref: 'EE-105',
    title: 'Corporate Suite, Grade A Office',
    category: 'commercial',
    listingLabel: 'Commercial lease',
    location: 'Cyber City, Gurugram',
    city: 'Gurugram',
    price: 210000,
    priceSuffix: '/month',
    beds: 0,
    baths: 4,
    area: 3200,
    parking: 8,
    images: [photo('1497366216548-37526070297c', 900), photo('1524758631624-e2822e304c36', 900), photo('1486406146926-c627a92ad1ab', 900)],
    description: 'A bright, open-plan office floor with meeting rooms, a reception area and dedicated parking, in a business district with excellent connectivity.',
    features: ['Open-plan workspace', 'Three meeting rooms', 'Reception area', 'Power backup', 'Cafeteria nearby', 'Metro access']
  },
  {
    id: 6,
    ref: 'EE-106',
    title: 'High Street Retail Showroom',
    category: 'commercial',
    listingLabel: 'Commercial sale',
    location: 'C-Scheme, Jaipur',
    city: 'Jaipur',
    price: 32000000,
    priceSuffix: '',
    beds: 0,
    baths: 2,
    area: 2400,
    parking: 6,
    images: [photo('1441986300917-64674bd600d8', 900), photo('1486406146926-c627a92ad1ab', 900), photo('1524758631624-e2822e304c36', 900)],
    description: 'A ground-floor showroom with a wide frontage on a busy shopping street. High footfall, a double-height ceiling and plenty of display space for retail or branded outlets.',
    features: ['Wide street frontage', 'Double-height ceiling', 'High footfall area', 'Customer parking', 'Storage room', 'Loading access']
  }
];

// The three properties shown in the hero slideshow (use property ids)
const HERO_IDS = [2, 1, 5];

// Sample client stories
const stories = [
  {
    text: 'We told them our budget on a Monday and had three honest options by Wednesday. Nobody pushed us, and the numbers never changed after we said yes.',
    name: 'Aarav Mehta',
    role: 'Bought a 3-bedroom apartment (sample story)'
  },
  {
    text: 'I moved cities for work and found a rental in six days. The agent explained the agreement line by line, which nobody had ever done for me.',
    name: 'Priya Nair',
    role: 'Renter in Pune (sample story)'
  },
  {
    text: 'Our new office was ready before the old lease ended. The advice on location saved the whole team a long commute.',
    name: 'Rohan Kapoor',
    role: 'Runs a design studio (sample story)'
  }
];


/* =====================================================
   3. STATE & HELPERS
   ===================================================== */

// Small wrapper so the site still works if the browser blocks storage
const store = {
  get: function (key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  },
  set: function (key, value) {
    try { localStorage.setItem(key, value); } catch (error) { /* ignore */ }
  }
};

// Everything the page "remembers" while it is open
const state = {
  currency: store.get('estateease-currency', 'INR') === 'USD' ? 'USD' : 'INR',
  category: 'all',
  keyword: '',
  minBeds: 0,
  sort: 'featured',
  view: 'grid',
  savedOnly: false
};

const saved = new Set();
try {
  JSON.parse(store.get('estateease-saved', '[]')).forEach(function (id) { saved.add(id); });
} catch (error) { /* ignore a broken saved list */ }

const compare = []; // ids of properties picked for comparison (max 3)

function $(id) {
  return document.getElementById(id);
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function findProperty(id) {
  return properties.find(function (p) { return p.id === id; });
}

function icon(name) {
  return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
}

/* ----- Prices ----- */
const RUPEE = '₹';

function trimNumber(n) {
  return parseFloat(n.toFixed(2)).toString();
}

// Short price for big numbers: "Rs 1.85 Cr", "$223K"
function formatShort(inr, currency) {
  currency = currency || state.currency;
  if (currency === 'USD') {
    const usd = inr / CONFIG.usdRate;
    if (usd >= 1000000) return '$' + trimNumber(usd / 1000000) + 'M';
    if (usd >= 1000) return '$' + Math.round(usd / 1000).toLocaleString('en-US') + 'K';
    return '$' + Math.round(usd).toLocaleString('en-US');
  }
  if (inr >= 10000000) return RUPEE + trimNumber(inr / 10000000) + ' Cr';
  if (inr >= 100000) return RUPEE + trimNumber(inr / 100000) + ' Lakh';
  return RUPEE + Math.round(inr).toLocaleString('en-IN');
}

// Full price: "Rs 38,000", "$458"
function formatFull(inr, currency) {
  currency = currency || state.currency;
  if (currency === 'USD') return '$' + Math.round(inr / CONFIG.usdRate).toLocaleString('en-US');
  return RUPEE + Math.round(inr).toLocaleString('en-IN');
}

// Small amounts such as price per square foot ("$0.40" needs decimals)
function formatUnit(inr, currency) {
  currency = currency || state.currency;
  if (currency === 'USD') {
    const usd = inr / CONFIG.usdRate;
    return usd < 10 ? '$' + usd.toFixed(2) : '$' + Math.round(usd).toLocaleString('en-US');
  }
  return RUPEE + Math.round(inr).toLocaleString('en-IN');
}

function priceText(p, currency) {
  return p.priceSuffix ? formatFull(p.price, currency) : formatShort(p.price, currency);
}

function priceHTML(p) {
  return priceText(p) + (p.priceSuffix ? ' <small>' + p.priceSuffix + '</small>' : '');
}

function perSqftText(p) {
  return formatUnit(p.price / p.area) + (p.priceSuffix ? ' per sq ft a month' : ' per sq ft');
}

// Monthly payment (EMI) for a loan
function emiFor(principal, ratePercent, years) {
  const monthlyRate = ratePercent / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  const growth = Math.pow(1 + monthlyRate, months);
  return principal * monthlyRate * growth / (growth - 1);
}

/* ----- WhatsApp ----- */
function whatsappLink(message) {
  return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(message);
}

function propertyMessage(p) {
  return 'Hello ' + CONFIG.businessName + ', I am interested in "' + p.title + '" (' + p.location +
         '), listed at ' + priceText(p, 'INR') + (p.priceSuffix || '') + '. Ref: ' + p.ref +
         '. Could you please share more details?';
}

/* ----- Card details ----- */
function getStats(p) {
  const stats = [];
  if (p.beds > 0) stats.push({ icon: 'bed', text: p.beds + (p.beds === 1 ? ' bed' : ' beds') });
  stats.push({ icon: 'bath', text: p.baths + (p.baths === 1 ? ' bath' : ' baths') });
  stats.push({ icon: 'area', text: p.area.toLocaleString('en-IN') + ' sq ft' });
  if (p.parking > 0) stats.push({ icon: 'car', text: p.parking + ' parking' });
  return stats;
}

function statsHTML(stats) {
  return stats.map(function (s) {
    return '<li>' + icon(s.icon) + '<span>' + s.text + '</span></li>';
  }).join('');
}

/* ----- Images ----- */
// Shown if a photo fails to load. It is built into the code, so it works offline.
const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#145650"/><stop offset="1" stop-color="#0c3b38"/>' +
  '</linearGradient></defs>' +
  '<rect width="800" height="600" fill="url(#g)"/>' +
  '<g fill="none" stroke="#f2a62c" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M300 400V300a100 100 0 0 1 200 0v100z"/><path d="M350 400V320a50 50 0 0 1 100 0v80"/></g>' +
  '<text x="400" y="480" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#f2a62c">Photo unavailable</text>' +
  '</svg>'
);

function applyImageFallback(img) {
  if (img.dataset.fallbackApplied) return; // only once, to avoid loops
  img.dataset.fallbackApplied = 'true';
  img.src = FALLBACK_IMAGE;
}

function largeImage(url) {
  return url.replace('w=900', 'w=1100');
}


/* =====================================================
   4. PROPERTY CARDS, FILTERS, SORTING & SEARCH
   ===================================================== */
const grid = $('propertyGrid');
const resultsCount = $('resultsCount');
const emptyState = $('emptyState');
const filterButtons = document.querySelectorAll('.filter-btn');
const finderTabs = document.querySelectorAll('.finder-tab');
const searchLocation = $('searchLocation');
const searchBeds = $('searchBeds');
const sortSelect = $('sortSelect');
const savedToggle = $('savedToggle');
const savedCount = $('savedCount');

function createCard(p, index) {
  const stats = getStats(p).slice(0, 3); // the first three facts fit on the card
  const isSaved = saved.has(p.id);
  const isCompared = compare.indexOf(p.id) !== -1;

  return '' +
    '<article class="card" style="animation-delay:' + (index * 60) + 'ms">' +
      '<div class="card-media">' +
        '<img src="' + p.images[0] + '" alt="' + p.title + ' (sample photo)" loading="lazy" width="900" height="1035">' +
        '<span class="badge badge-sample">Sample</span>' +
        '<span class="badge badge-type badge-' + p.category + '">' + p.listingLabel + '</span>' +
        '<button type="button" class="fav-btn" data-fav="' + p.id + '" aria-pressed="' + isSaved + '" aria-label="Save ' + p.title + '">' + icon('heart') + '</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-head">' +
          '<p class="price">' + priceHTML(p) + '</p>' +
          '<button type="button" class="compare-toggle" data-compare="' + p.id + '" aria-pressed="' + isCompared + '" aria-label="Compare ' + p.title + '">' + icon('compare') + ' Compare</button>' +
        '</div>' +
        '<h3 class="card-title">' + p.title + '</h3>' +
        '<p class="location">' + icon('pin') + '<span>' + p.location + '</span></p>' +
        '<ul class="card-stats">' + statsHTML(stats) + '</ul>' +
        '<div class="card-actions">' +
          '<button type="button" class="btn btn-ghost" data-details="' + p.id + '">View details</button>' +
          '<a class="btn btn-whatsapp" href="' + whatsappLink(propertyMessage(p)) + '" target="_blank" rel="noopener" aria-label="Enquire about ' + p.title + ' on WhatsApp">' +
            icon('whatsapp') + ' Enquire' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</article>';
}

// Work out which properties match the current filters, then draw them
function applyFilters() {
  const keyword = state.keyword.trim().toLowerCase();

  const matches = properties.filter(function (p) {
    const searchable = (p.title + ' ' + p.location + ' ' + p.city + ' ' + p.listingLabel + ' ' +
                        p.category + ' ' + p.description + ' ' + p.features.join(' ')).toLowerCase();
    const categoryOk = state.category === 'all' || p.category === state.category;
    const keywordOk = keyword === '' || searchable.indexOf(keyword) !== -1;
    const bedsOk = p.beds >= state.minBeds;
    const savedOk = !state.savedOnly || saved.has(p.id);
    return categoryOk && keywordOk && bedsOk && savedOk;
  });

  // Sorting. Sale prices and monthly rents are never mixed: sale listings come first.
  if (state.sort === 'price-asc' || state.sort === 'price-desc') {
    const direction = state.sort === 'price-asc' ? 1 : -1;
    matches.sort(function (a, b) {
      if (a.priceSuffix !== b.priceSuffix) return a.priceSuffix ? 1 : -1;
      return (a.price - b.price) * direction;
    });
  } else if (state.sort === 'area-desc') {
    matches.sort(function (a, b) { return b.area - a.area; });
  }

  grid.innerHTML = matches.map(createCard).join('');
  emptyState.hidden = matches.length > 0;

  let summary = 'Showing ' + matches.length + ' of ' + properties.length + ' sample properties';
  if (keyword) summary += ' matching "' + state.keyword.trim() + '"';
  if (state.savedOnly) summary += ' in your saved list';
  resultsCount.textContent = summary;
}

// Keeps the category buttons in the hero and the list in sync
function setCategory(category) {
  state.category = category;
  filterButtons.forEach(function (btn) {
    const active = btn.dataset.filter === category;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  finderTabs.forEach(function (tab) {
    const active = tab.dataset.finderTab === category;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
}

function setView(view) {
  state.view = view;
  grid.classList.toggle('is-list', view === 'list');
  document.querySelectorAll('[data-view]').forEach(function (btn) {
    const active = btn.dataset.view === view;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function resetFilters() {
  state.keyword = '';
  state.minBeds = 0;
  state.sort = 'featured';
  state.savedOnly = false;
  searchLocation.value = '';
  searchBeds.value = '0';
  sortSelect.value = 'featured';
  savedToggle.setAttribute('aria-pressed', 'false');
  setCategory('all');
  applyFilters();
}

function updateSavedCount() {
  savedCount.textContent = saved.size;
}

function toggleSaved(id) {
  const p = findProperty(id);
  if (saved.has(id)) {
    saved.delete(id);
    showToast('Removed from your saved list.');
  } else {
    saved.add(id);
    showToast('Saved "' + p.title + '".');
  }
  store.set('estateease-saved', JSON.stringify(Array.from(saved)));
  updateSavedCount();

  if (state.savedOnly) {
    applyFilters(); // the list changes when only saved homes are showing
  } else {
    const button = grid.querySelector('[data-fav="' + id + '"]');
    if (button) button.setAttribute('aria-pressed', String(saved.has(id)));
  }
}

function showAllMatching(options) {
  state.keyword = options.keyword || '';
  state.minBeds = options.minBeds || 0;
  state.savedOnly = false;
  savedToggle.setAttribute('aria-pressed', 'false');
  searchLocation.value = state.keyword;
  searchBeds.value = String(state.minBeds);
  setCategory(options.category || 'all');
  applyFilters();
}

function initFilters() {
  // Category buttons above the list
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setCategory(btn.dataset.filter);
      applyFilters();
    });
  });

  // Category tabs in the hero search
  finderTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setCategory(tab.dataset.finderTab);
      applyFilters();
    });
  });

  // Hero search form
  $('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    state.keyword = searchLocation.value;
    state.minBeds = parseInt(searchBeds.value, 10) || 0;
    applyFilters();
    scrollToSection('properties');
  });

  $('resetSearch').addEventListener('click', resetFilters);
  $('clearFilters').addEventListener('click', resetFilters);

  sortSelect.addEventListener('change', function () {
    state.sort = sortSelect.value;
    applyFilters();
  });

  savedToggle.addEventListener('click', function () {
    state.savedOnly = !state.savedOnly;
    savedToggle.setAttribute('aria-pressed', String(state.savedOnly));
    applyFilters();
  });

  document.querySelectorAll('[data-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setView(btn.dataset.view);
      store.set('estateease-view', btn.dataset.view);
    });
  });

  // Footer links such as "Properties to buy"
  document.querySelectorAll('[data-quick-filter]').forEach(function (link) {
    link.addEventListener('click', function () {
      showAllMatching({ category: link.dataset.quickFilter });
    });
  });

  // One listener for every button inside the grid
  grid.addEventListener('click', function (event) {
    const fav = event.target.closest('[data-fav]');
    if (fav) { toggleSaved(parseInt(fav.dataset.fav, 10)); return; }

    const cmp = event.target.closest('[data-compare]');
    if (cmp) { toggleCompare(parseInt(cmp.dataset.compare, 10)); return; }

    const details = event.target.closest('[data-details]');
    if (details) openProperty(parseInt(details.dataset.details, 10));
  });

  updateSavedCount();
}


/* =====================================================
   5. HERO SLIDESHOW
   ===================================================== */
const heroSlides = $('heroSlides');
const heroCaption = $('heroCaption');
const heroDots = $('heroDots');
let heroIndex = 0;
let heroTimer = null;

function renderHeroCaption() {
  const p = findProperty(HERO_IDS[heroIndex]);
  heroCaption.innerHTML =
    '<div><strong>' + priceHTML(p).replace(' <small>', ' <small style="font-size:.6em;font-weight:500">') + '</strong>' +
    '<span>' + p.title + '</span><span>' + p.location + '</span></div>' +
    '<button type="button" class="btn btn-accent" data-hero-open="' + p.id + '">View details</button>';
}

function showSlide(index) {
  heroIndex = (index + HERO_IDS.length) % HERO_IDS.length;
  heroSlides.querySelectorAll('.slide').forEach(function (slide, i) {
    slide.classList.toggle('active', i === heroIndex);
    slide.setAttribute('aria-hidden', String(i !== heroIndex));
  });
  heroDots.querySelectorAll('.hero-dot').forEach(function (dot, i) {
    dot.classList.toggle('active', i === heroIndex);
    dot.setAttribute('aria-current', i === heroIndex ? 'true' : 'false');
  });
  renderHeroCaption();
}

function startHeroTimer() {
  stopHeroTimer();
  if (prefersReducedMotion()) return;
  heroTimer = setInterval(function () {
    if (!document.hidden) showSlide(heroIndex + 1);
  }, 6500);
}

function stopHeroTimer() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = null;
}

function initHero() {
  heroSlides.innerHTML = HERO_IDS.map(function (id, i) {
    const p = findProperty(id);
    return '<div class="slide' + (i === 0 ? ' active' : '') + '" aria-hidden="' + (i !== 0) + '">' +
      '<img src="' + largeImage(p.images[0]) + '" alt="' + p.title + ' (sample photo)" width="1100" height="1375"' + (i === 0 ? '' : ' loading="lazy"') + '>' +
      '</div>';
  }).join('');

  heroDots.innerHTML = HERO_IDS.map(function (id, i) {
    return '<button type="button" class="hero-dot' + (i === 0 ? ' active' : '') + '" data-slide="' + i + '" aria-label="Show featured property ' + (i + 1) + '"></button>';
  }).join('');

  renderHeroCaption();

  $('heroPrev').addEventListener('click', function () { showSlide(heroIndex - 1); startHeroTimer(); });
  $('heroNext').addEventListener('click', function () { showSlide(heroIndex + 1); startHeroTimer(); });

  heroDots.addEventListener('click', function (event) {
    const dot = event.target.closest('[data-slide]');
    if (dot) { showSlide(parseInt(dot.dataset.slide, 10)); startHeroTimer(); }
  });

  heroCaption.addEventListener('click', function (event) {
    const open = event.target.closest('[data-hero-open]');
    if (open) openProperty(parseInt(open.dataset.heroOpen, 10));
  });

  // Pause while the visitor is interacting with the slideshow
  const visual = document.querySelector('.hero-visual');
  visual.addEventListener('mouseenter', stopHeroTimer);
  visual.addEventListener('mouseleave', startHeroTimer);
  visual.addEventListener('focusin', stopHeroTimer);
  visual.addEventListener('focusout', startHeroTimer);

  startHeroTimer();
}


/* =====================================================
   6. CITIES (AREA TILES)
   ===================================================== */
function initAreas() {
  const row = $('areaRow');
  const cities = [];
  properties.forEach(function (p) {
    if (cities.indexOf(p.city) === -1) cities.push(p.city);
  });

  row.innerHTML = cities.map(function (city) {
    const inCity = properties.filter(function (p) { return p.city === city; });
    return '<button type="button" class="area" data-city="' + city + '">' +
      '<div class="area-img"><img src="' + inCity[0].images[0] + '" alt="" loading="lazy" width="600" height="800"></div>' +
      '<strong>' + city + '</strong>' +
      '<span>' + inCity.length + ' sample ' + (inCity.length === 1 ? 'listing' : 'listings') + '</span>' +
      '</button>';
  }).join('');

  row.addEventListener('click', function (event) {
    const tile = event.target.closest('[data-city]');
    if (!tile) return;
    showAllMatching({ keyword: tile.dataset.city });
    scrollToSection('properties');
  });
}


/* =====================================================
   7. COMPARE
   ===================================================== */
const compareBar = $('compareBar');
const compareItems = $('compareItems');

function updateCompareUI() {
  grid.querySelectorAll('[data-compare]').forEach(function (btn) {
    btn.setAttribute('aria-pressed', String(compare.indexOf(parseInt(btn.dataset.compare, 10)) !== -1));
  });

  compareBar.hidden = compare.length === 0;
  document.body.classList.toggle('has-compare', compare.length > 0);
  $('compareCount').textContent = '(' + compare.length + ')';

  compareItems.innerHTML = compare.map(function (id) {
    const p = findProperty(id);
    return '<span class="compare-chip">' +
      '<img src="' + p.images[0] + '" alt="" width="30" height="30">' +
      '<span>' + p.title + '</span>' +
      '<button type="button" data-remove-compare="' + id + '" aria-label="Remove ' + p.title + ' from comparison">' + icon('close') + '</button>' +
      '</span>';
  }).join('');
}

function toggleCompare(id) {
  const position = compare.indexOf(id);
  if (position !== -1) {
    compare.splice(position, 1);
  } else if (compare.length >= 3) {
    showToast('You can compare up to three properties at a time.');
    return;
  } else {
    compare.push(id);
  }
  updateCompareUI();
}

function buildCompareTable() {
  const picks = compare.map(findProperty);

  const rows = [
    ['Type', function (p) { return p.listingLabel; }],
    ['Location', function (p) { return p.location; }],
    ['Price', function (p) { return '<strong>' + priceHTML(p) + '</strong>'; }],
    ['Price per sq ft', function (p) { return perSqftText(p); }],
    ['Bedrooms', function (p) { return p.beds > 0 ? p.beds : 'Not applicable'; }],
    ['Bathrooms', function (p) { return p.baths; }],
    ['Area', function (p) { return p.area.toLocaleString('en-IN') + ' sq ft'; }],
    ['Parking', function (p) { return p.parking > 0 ? p.parking + (p.parking === 1 ? ' space' : ' spaces') : 'None'; }]
  ];

  let html = '<table class="compare-table"><thead><tr><th scope="col"><span class="sr-only">Feature</span></th>';
  picks.forEach(function (p) {
    html += '<th scope="col" class="compare-head"><img src="' + p.images[0] + '" alt="' + p.title + ' (sample photo)" width="180" height="135"><strong>' + p.title + '</strong></th>';
  });
  html += '</tr></thead><tbody>';

  rows.forEach(function (row) {
    html += '<tr><th scope="row">' + row[0] + '</th>';
    picks.forEach(function (p) { html += '<td>' + row[1](p) + '</td>'; });
    html += '</tr>';
  });

  html += '<tr><th scope="row">Enquire</th>';
  picks.forEach(function (p) {
    html += '<td><a class="btn btn-whatsapp" href="' + whatsappLink(propertyMessage(p)) + '" target="_blank" rel="noopener">' + icon('whatsapp') + ' WhatsApp</a></td>';
  });
  html += '</tr></tbody></table>';

  $('compareTable').innerHTML = html;
}

function initCompare() {
  $('compareOpen').addEventListener('click', function () {
    if (compare.length < 2) {
      showToast('Pick at least two properties to compare.');
      return;
    }
    buildCompareTable();
    openModal($('compareModal'));
  });

  $('compareClear').addEventListener('click', function () {
    compare.length = 0;
    updateCompareUI();
  });

  compareItems.addEventListener('click', function (event) {
    const remove = event.target.closest('[data-remove-compare]');
    if (remove) toggleCompare(parseInt(remove.dataset.removeCompare, 10));
  });
}


/* =====================================================
   8. POPUPS (PROPERTY DETAILS & COMPARE)
   ===================================================== */
const propertyModal = $('propertyModal');
const compareModal = $('compareModal');
const modalImage = $('modalImage');
const modalThumbs = $('modalThumbs');
let activeModal = null;
let lastFocused = null;
let currentProperty = null;
let photoIndex = 0;

function openModal(modal) {
  lastFocused = document.activeElement;
  modal.hidden = false;
  activeModal = modal;
  document.body.classList.add('no-scroll');
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  if (!activeModal) return;
  activeModal.hidden = true;
  activeModal = null;
  document.body.classList.remove('no-scroll');
  if (lastFocused && document.contains(lastFocused)) lastFocused.focus({ preventScroll: true });
}

function showPhoto(index) {
  const images = currentProperty.images;
  photoIndex = (index + images.length) % images.length;

  delete modalImage.dataset.fallbackApplied;
  modalImage.src = images[photoIndex];
  modalImage.alt = currentProperty.title + ' (sample photo ' + (photoIndex + 1) + ' of ' + images.length + ')';
  $('galCount').textContent = (photoIndex + 1) + ' / ' + images.length;

  modalThumbs.querySelectorAll('.thumb-btn').forEach(function (btn, i) {
    btn.classList.toggle('active', i === photoIndex);
    btn.setAttribute('aria-pressed', String(i === photoIndex));
  });
}

// Price and EMI text (also refreshed when the currency changes)
function updatePropertyPrice() {
  const p = currentProperty;
  if (!p) return;

  $('modalPrice').innerHTML = priceHTML(p);

  let note = perSqftText(p) + '.';
  if (!p.priceSuffix) {
    const emi = emiFor(p.price * CONFIG.emiLoanShare, CONFIG.emiRate, CONFIG.emiYears);
    note += ' Estimated EMI about ' + formatFull(emi) + ' a month (' + Math.round(CONFIG.emiLoanShare * 100) + '% loan, ' +
            CONFIG.emiRate + '% interest, ' + CONFIG.emiYears + ' years). ' +
            '<button type="button" class="link-btn" data-open-calc="' + p.id + '">Try it in the loan calculator</button>';
  }
  $('modalPriceNote').innerHTML = note;
}

function openProperty(id) {
  const p = findProperty(id);
  if (!p) return;
  currentProperty = p;

  modalThumbs.innerHTML = p.images.map(function (url, i) {
    return '<button type="button" class="thumb-btn" data-photo="' + i + '" aria-label="Show photo ' + (i + 1) + '"><img src="' + url + '" alt="" width="66" height="50"></button>';
  }).join('');
  modalThumbs.hidden = p.images.length < 2;
  $('galPrev').hidden = $('galNext').hidden = p.images.length < 2;
  showPhoto(0);

  const badge = $('modalBadge');
  badge.textContent = p.listingLabel;
  badge.className = 'badge badge-' + p.category;

  $('modalTitle').textContent = p.title;
  $('modalLocation').innerHTML = icon('pin') + '<span>' + p.location + '</span>';
  $('modalLocation').className = 'location';
  $('modalStats').innerHTML = statsHTML(getStats(p));
  $('modalDescription').textContent = p.description;
  $('modalFeatures').innerHTML = p.features.map(function (feature) {
    return '<li>' + icon('check') + '<span>' + feature + '</span></li>';
  }).join('');
  $('modalWhatsapp').href = whatsappLink(propertyMessage(p));
  updatePropertyPrice();

  openModal(propertyModal);
}

// Share the property using the phone's share sheet, or copy a link
function shareProperty() {
  const p = currentProperty;
  const url = window.location.href.split('#')[0] + '#properties';
  const text = p.title + ' in ' + p.location + ' (sample listing)';

  if (navigator.share) {
    navigator.share({ title: p.title, text: text, url: url }).catch(function () { /* the visitor cancelled */ });
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text + ' ' + url).then(function () {
      showToast('Link copied. Paste it anywhere to share.');
    }).catch(function () {
      showToast('Could not copy the link. Copy it from the address bar instead.');
    });
  } else {
    showToast('Copy the link from the address bar to share this page.');
  }
}

// "Book a viewing" inside the popup jumps to the form with the property selected
function scheduleViewing(id) {
  closeModal();
  $('contactProperty').value = String(id);
  scrollToSection('contact');
  showToast('Pick a date and time, then send it on WhatsApp.');
}

function openCalculatorFor(id) {
  closeModal();
  $('calcProperty').value = String(id);
  $('calcProperty').dispatchEvent(new Event('change'));
  scrollToSection('calculator');
}

function initModals() {
  document.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  $('galPrev').addEventListener('click', function () { showPhoto(photoIndex - 1); });
  $('galNext').addEventListener('click', function () { showPhoto(photoIndex + 1); });

  modalThumbs.addEventListener('click', function (event) {
    const thumb = event.target.closest('[data-photo]');
    if (thumb) showPhoto(parseInt(thumb.dataset.photo, 10));
  });

  // Swipe left or right on the photo (phones and tablets)
  let touchStartX = null;
  $('modalMedia').addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  $('modalMedia').addEventListener('touchend', function (event) {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 45) showPhoto(photoIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });

  $('modalSchedule').addEventListener('click', function () { scheduleViewing(currentProperty.id); });
  $('modalShare').addEventListener('click', shareProperty);

  $('modalPriceNote').addEventListener('click', function (event) {
    const open = event.target.closest('[data-open-calc]');
    if (open) openCalculatorFor(parseInt(open.dataset.openCalc, 10));
  });

  document.addEventListener('keydown', function (event) {
    if (!activeModal) return;

    if (event.key === 'Escape') closeModal();

    if (activeModal === propertyModal) {
      if (event.key === 'ArrowLeft') showPhoto(photoIndex - 1);
      if (event.key === 'ArrowRight') showPhoto(photoIndex + 1);
    }

    // Keep keyboard focus inside the popup while it is open
    if (event.key === 'Tab') {
      const focusable = Array.prototype.filter.call(
        activeModal.querySelectorAll('button, a[href], input, select, textarea'),
        function (el) { return !el.hidden && el.offsetParent !== null; }
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}


/* =====================================================
   9. LOAN CALCULATOR
   ===================================================== */
function initCalculator() {
  const amount = $('loanAmount');
  const rate = $('loanRate');
  const years = $('loanYears');
  const propertySelect = $('calcProperty');

  // Options for "start from a sample property" (only properties that are for sale)
  function fillPropertyOptions() {
    const current = propertySelect.value;
    let html = '<option value="">Enter my own amount</option>';
    properties.filter(function (p) { return !p.priceSuffix; }).forEach(function (p) {
      html += '<option value="' + p.id + '">' + p.title + ' (' + formatShort(p.price) + ')</option>';
    });
    propertySelect.innerHTML = html;
    propertySelect.value = current;
  }

  function paintSlider(input) {
    const percent = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--fill', percent + '%');
  }

  function calculate() {
    const principal = Number(amount.value);
    const months = Number(years.value) * 12;
    const emi = emiFor(principal, Number(rate.value), Number(years.value));
    const total = emi * months;

    $('loanAmountOut').textContent = formatShort(principal);
    $('loanRateOut').textContent = Number(rate.value).toFixed(1) + '%';
    $('loanYearsOut').textContent = years.value + (years.value === '1' ? ' year' : ' years');
    $('emiValue').textContent = formatFull(emi);
    $('principalValue').textContent = formatFull(principal);
    $('interestValue').textContent = formatFull(total - principal);
    $('totalValue').textContent = formatFull(total);
    $('splitBar').style.setProperty('--principal', ((principal / total) * 100).toFixed(1) + '%');

    [amount, rate, years].forEach(paintSlider);
  }

  [amount, rate, years].forEach(function (input) {
    input.addEventListener('input', function () {
      propertySelect.value = ''; // the visitor is now using their own numbers
      calculate();
    });
  });

  // Picking a sample property sets the loan to 80% of its price
  propertySelect.addEventListener('change', function () {
    const p = findProperty(parseInt(propertySelect.value, 10));
    if (p) {
      const loan = Math.round((p.price * CONFIG.emiLoanShare) / 100000) * 100000;
      amount.value = Math.min(Math.max(loan, Number(amount.min)), Number(amount.max));
    }
    calculate();
  });

  // Called again whenever the currency changes
  window.refreshCalculator = function () {
    fillPropertyOptions();
    calculate();
  };

  fillPropertyOptions();
  calculate();
}


/* =====================================================
   10. CLIENT STORIES
   ===================================================== */
function initStories() {
  const box = $('quote');
  let index = 0;

  function render() {
    const story = stories[index];
    $('quoteText').textContent = '“' + story.text + '”';
    $('quoteWho').innerHTML = '<strong></strong><span></span>';
    $('quoteWho').querySelector('strong').textContent = story.name;
    $('quoteWho').querySelector('span').textContent = story.role;
    $('quoteCount').textContent = (index + 1) + ' / ' + stories.length;
  }

  function go(step) {
    index = (index + step + stories.length) % stories.length;
    if (prefersReducedMotion()) { render(); return; }
    box.classList.add('is-changing');
    setTimeout(function () {
      render();
      box.classList.remove('is-changing');
    }, 250);
  }

  $('quotePrev').addEventListener('click', function () { go(-1); });
  $('quoteNext').addEventListener('click', function () { go(1); });
  render();
}


/* =====================================================
   11. NAVIGATION, THEME & CURRENCY
   ===================================================== */
const navbar = $('navbar');
const navMenu = $('navMenu');
const navToggle = $('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sectionIds = ['home', 'properties', 'areas', 'services', 'process', 'about', 'calculator', 'agents', 'testimonials', 'contact', 'faq'];

function scrollToSection(id) {
  const target = $(id);
  if (!target) return;
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

function updateNavbar() {
  const menuOpen = navMenu.classList.contains('open');
  navbar.classList.toggle('solid', window.scrollY > 24 || menuOpen);
}

function openMenu() {
  navMenu.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
  updateNavbar();
}

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  updateNavbar();
}

// Highlight the nav link for the section currently on screen
function updateActiveLink() {
  const position = window.scrollY + navbar.offsetHeight + 160;
  let current = sectionIds[0];

  sectionIds.forEach(function (id) {
    const section = $(id);
    if (section && section.offsetTop <= position) current = id;
  });

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
    current = 'contact';
  }

  navLinks.forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  store.set('estateease-theme', theme);
  $('themeToggle').setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

function setCurrency(currency) {
  state.currency = currency;
  store.set('estateease-currency', currency);

  document.querySelectorAll('[data-currency]').forEach(function (btn) {
    const active = btn.dataset.currency === currency;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  // Redraw everything that shows a price
  applyFilters();
  renderHeroCaption();
  populateContactOptions();
  if (window.refreshCalculator) window.refreshCalculator();
  if (activeModal === propertyModal) updatePropertyPrice();
  if (activeModal === compareModal) buildCompareTable();
}

function initNavigation() {
  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('open')) closeMenu(); else openMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', function (event) {
    if (!navbar.contains(event.target)) closeMenu();
  });

  // Every in-page link (#home, #contact ...) scrolls smoothly
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const id = link.getAttribute('href').slice(1);
      if (!id || !$(id)) return;
      event.preventDefault();
      closeMenu();
      scrollToSection(id);
      history.replaceState(null, '', '#' + id);
    });
  });

  $('themeToggle').addEventListener('click', function () {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  document.querySelectorAll('[data-currency]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (state.currency === btn.dataset.currency) return;
      setCurrency(btn.dataset.currency);
      showToast(btn.dataset.currency === 'USD'
        ? 'Prices now shown in US dollars (1 USD = ' + RUPEE + CONFIG.usdRate + ').'
        : 'Prices now shown in Indian rupees.');
    });
  });

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateNavbar();
      updateActiveLink();
      toggleBackToTop();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 992) closeMenu();
  });

  setTheme(document.documentElement.getAttribute('data-theme') || 'light');
  updateNavbar();
  updateActiveLink();
}


/* =====================================================
   12. CONTACT DETAILS & FORM
   ===================================================== */

// Fills phone, email, WhatsApp and address from CONFIG
function applyContactDetails() {
  document.querySelectorAll('[data-text]').forEach(function (el) {
    el.textContent = CONFIG[el.dataset.text];
  });
  document.querySelectorAll('[data-tel]').forEach(function (el) {
    el.setAttribute('href', 'tel:' + CONFIG.phoneTel);
  });
  document.querySelectorAll('[data-mail]').forEach(function (el) {
    el.setAttribute('href', 'mailto:' + CONFIG.email);
  });
  document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
    const message = el.dataset.message || 'Hello ' + CONFIG.businessName + ', I would like some information.';
    el.setAttribute('href', whatsappLink(message));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
}

function populateContactOptions() {
  const select = $('contactProperty');
  const current = select.value;
  let html = '<option value="">General enquiry</option>';
  properties.forEach(function (p) {
    html += '<option value="' + p.id + '">' + p.title + ' (' + priceText(p) + (p.priceSuffix || '') + ')</option>';
  });
  select.innerHTML = html;
  select.value = current;
}

function initContactForm() {
  const form = $('contactForm');
  const status = $('formStatus');
  const dateInput = $('contactDate');

  // The earliest date a visitor can pick is today
  const today = new Date();
  const pad = function (n) { return String(n).padStart(2, '0'); };
  dateInput.min = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity(); // shows the browser's own helpful messages
      return;
    }

    const data = new FormData(form);
    const p = findProperty(parseInt(data.get('property'), 10));
    const when = data.get('date')
      ? new Date(data.get('date') + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + data.get('slot')
      : 'Flexible, ' + data.get('slot');

    let message = 'Hello ' + CONFIG.businessName + ',\n' +
      'My name is ' + data.get('name') + '.\n' +
      (p ? 'I would like to view "' + p.title + '" (' + p.ref + ').\n' : 'I have a general enquiry.\n') +
      'Preferred time: ' + when + '.\n';
    if (String(data.get('message')).trim()) message += 'Notes: ' + String(data.get('message')).trim() + '\n';
    message += 'Phone: ' + data.get('phone');

    const url = whatsappLink(message);
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.opener = null;
    } else {
      window.location.href = url; // popup blocked: open in the same tab instead
    }

    status.textContent = 'WhatsApp is opening with your message. Press send to finish.';
    showToast('Your message is ready in WhatsApp.');
    form.reset();
  });
}


/* =====================================================
   13. SMALL EXTRAS
   ===================================================== */

// Short messages at the bottom of the screen
function showToast(message) {
  const box = $('toasts');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  box.appendChild(toast);

  // Keep at most two on screen
  while (box.children.length > 2) box.removeChild(box.firstChild);

  setTimeout(function () {
    toast.classList.add('leaving');
    setTimeout(function () { toast.remove(); }, 320);
  }, 3000);
}

const backToTop = $('backToTop');

function toggleBackToTop() {
  backToTop.classList.toggle('show', window.scrollY > 700);
}

function initBackToTop() {
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
  toggleBackToTop();
}

// If any photo fails to load, show the built-in placeholder instead
function initImageFallbacks() {
  // 'error' events do not bubble, so we listen in the capture phase
  document.addEventListener('error', function (event) {
    if (event.target instanceof HTMLImageElement) applyImageFallback(event.target);
  }, true);

  // Catch images that already failed before this script started
  window.addEventListener('load', function () {
    document.querySelectorAll('img').forEach(function (img) {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) applyImageFallback(img);
    });
  });
}


/* =====================================================
   14. START EVERYTHING
   ===================================================== */
initImageFallbacks();
applyContactDetails();
populateContactOptions();
setView(store.get('estateease-view', 'grid') === 'list' ? 'list' : 'grid');
setCategory('all');
applyFilters();
initFilters();
initHero();
initAreas();
initCompare();
initModals();
initCalculator();
initStories();
initNavigation();
initContactForm();
initBackToTop();
setCurrency(state.currency); // draws prices in the saved currency
$('year').textContent = new Date().getFullYear();
