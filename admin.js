/* ═══════════════════════════════════════════════════════════
   AMELIYA ADMIN PANEL – JavaScript
   Full CRUD with localStorage persistence
   ═══════════════════════════════════════════════════════════ */

// ─── AUTHENTICATION ───
// Default credentials (change these for production)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'ameliya2026'
};

function isAuthenticated() {
  return sessionStorage.getItem('ameliya_admin_auth') === 'true';
}

function checkAuth() {
  const loginScreen = document.getElementById('login-screen');
  if (!loginScreen) return;

  if (isAuthenticated()) {
    loginScreen.style.display = 'none';
  } else {
    loginScreen.style.display = '';
    // Auto-focus username field
    setTimeout(() => {
      const usernameInput = document.getElementById('login-username');
      if (usernameInput) usernameInput.focus();
    }, 300);
  }
}

function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');

  // Clear previous errors
  errorEl.classList.add('hidden');
  usernameInput.classList.remove('error');
  passwordInput.classList.remove('error');

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Success – save session & hide login
    sessionStorage.setItem('ameliya_admin_auth', 'true');

    const loginScreen = document.getElementById('login-screen');
    loginScreen.classList.add('fade-out');
    setTimeout(() => {
      loginScreen.style.display = 'none';
      loginScreen.classList.remove('fade-out');
    }, 500);

    showToast('Welcome back, Admin!', 'success');
  } else {
    // Failed – show error with shake animation
    errorEl.classList.remove('hidden');
    usernameInput.classList.add('error');
    passwordInput.classList.add('error');

    // Remove shake class after animation completes so it can be replayed
    setTimeout(() => {
      usernameInput.classList.remove('error');
      passwordInput.classList.remove('error');
    }, 500);
  }
}

function handleLogout() {
  sessionStorage.removeItem('ameliya_admin_auth');

  const loginScreen = document.getElementById('login-screen');
  loginScreen.style.display = '';
  loginScreen.style.opacity = '0';
  requestAnimationFrame(() => {
    loginScreen.style.transition = 'opacity 0.3s ease';
    loginScreen.style.opacity = '1';
  });

  // Clear form
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').classList.add('hidden');

  setTimeout(() => {
    loginScreen.style.transition = '';
    document.getElementById('login-username').focus();
  }, 350);
}

function togglePasswordVisibility() {
  const pwInput = document.getElementById('login-password');
  const eyeIcon = document.getElementById('eye-icon');
  const eyeOffIcon = document.getElementById('eye-off-icon');

  if (pwInput.type === 'password') {
    pwInput.type = 'text';
    eyeIcon.classList.add('hidden');
    eyeOffIcon.classList.remove('hidden');
  } else {
    pwInput.type = 'password';
    eyeIcon.classList.remove('hidden');
    eyeOffIcon.classList.add('hidden');
  }
}


// ─── DEFAULT DATA ───
const DEFAULT_SAFARIS = [
  {
    id: 'minneriya',
    name: 'Minneriya National Park Safari',
    price: 14000,
    description: 'Witness the legendary "Gathering" – one of Asia\'s greatest wildlife spectacles. Herds of 150+ elephants converge at the ancient Minneriya reservoir during the dry season.',
    image: 'images/minneriya.png',
    badge: 'Most Popular',
    badgeColor: 'earth',
    type: 'Jeep Safari',
    duration: '4–5 Hours',
    capacity: 'Up to 6',
    active: true
  },
  {
    id: 'kaudulla',
    name: 'Kaudulla National Park Safari',
    price: 17000,
    description: 'Explore the untouched wilderness of Kaudulla. Home to diverse wildlife including elephants, deer, crocodiles, and over 160 species of birds in their natural habitat.',
    image: 'images/kaudulla.png',
    badge: 'Premium',
    badgeColor: 'forest',
    type: 'Jeep Safari',
    duration: '4–5 Hours',
    capacity: 'Up to 6',
    active: true
  },
  {
    id: 'pidurangala',
    name: 'Pidurangala Mountain Hiking',
    price: 16000,
    description: 'Conquer the iconic Pidurangala Rock at sunrise for breathtaking 360° panoramic views of Sigiriya, misty jungles, and the ancient Cultural Triangle stretching to the horizon.',
    image: 'images/pidurangala.png',
    badge: 'Adventure',
    badgeColor: 'amber',
    type: 'Guided Hike',
    duration: '3–4 Hours',
    capacity: 'Sunrise',
    active: true
  }
];

const DEFAULT_TRANSFERS = [
  { id: 't1', route: 'Sigiriya ↔ Airport', subtitle: 'Drop & Pickup', price: 25000, active: true },
  { id: 't2', route: 'Sigiriya → Trincomalee', subtitle: 'One Way Transfer', price: 22000, active: true },
  { id: 't3', route: 'Sigiriya → Polonnaruwa', subtitle: 'One Way Transfer', price: 18000, active: true },
  { id: 't4', route: 'Sigiriya → Anuradhapura', subtitle: 'One Way Transfer', price: 21000, active: true },
  { id: 't5', route: 'Sigiriya → Nuwara', subtitle: 'One Way Transfer', price: 22000, active: true },
  { id: 't6', route: 'Sigiriya → Ella', subtitle: 'One Way Transfer', price: 27000, active: true },
  { id: 't7', route: 'Sigiriya → Nuwara Eliya', subtitle: 'One Way Transfer', price: 30000, active: true }
];

const DEFAULT_VEHICLES = [
  { id: 'v1', name: 'Mini Van', type: '🚐 Mini Van', passengers: 4, features: 'AC / Comfortable', description: 'Perfect for small groups and families. Air-conditioned comfort for scenic road trips across Sri Lanka.', image: 'images/vehicles.png', active: true },
  { id: 'v2', name: 'Double Cab', type: '🛻 Double Cab', passengers: 4, features: '4WD / Rugged', description: 'Built for adventure. Ideal for off-road terrain and safari trails – your all-weather adventure companion.', image: 'images/vehicles.png', active: true }
];

const DEFAULT_TESTIMONIALS = [
  { id: 'r1', name: 'James & Sarah', country: 'United Kingdom', initial: 'J', color: 'from-earth-500 to-earth-600', rating: 5, text: 'Absolutely incredible! Our guide knew exactly where to find the elephants. We saw over 200 elephants at the Gathering. A once-in-a-lifetime experience. Highly recommended!', active: true },
  { id: 'r2', name: 'Maria Fischer', country: 'Germany', initial: 'M', color: 'from-forest-600 to-forest-700', rating: 5, text: 'The Pidurangala sunrise hike was magical. Our guide was knowledgeable, friendly, and made sure we were safe every step of the way. The view from the top was breathtaking!', active: true },
  { id: 'r3', name: 'Takeshi Yamada', country: 'Japan', initial: 'T', color: 'from-amber-500 to-amber-600', rating: 5, text: 'Best safari in Sri Lanka! The jeep was comfortable, the driver was an expert, and we saw elephants, crocodiles, eagles, and even a leopard. Worth every rupee. ありがとう!', active: true },
  { id: 'r4', name: 'Emily Watson', country: 'Australia', initial: 'E', color: 'from-earth-600 to-earth-800', rating: 5, text: 'From airport pickup to the safari and back — everything was seamless. The team at Ameliya is professional, warm, and truly passionate about wildlife. Can\'t wait to return!', active: true }
];


// ─── DATA MANAGEMENT ───
function getData(key, defaults) {
  try {
    const stored = localStorage.getItem(`ameliya_${key}`);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error(`Error reading ${key}:`, e);
  }
  return [...defaults];
}

function saveData(key, data) {
  try {
    localStorage.setItem(`ameliya_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key}:`, e);
  }
}

function getSafaris() { return getData('safaris', DEFAULT_SAFARIS); }
function getTransfers() { return getData('transfers', DEFAULT_TRANSFERS); }
function getVehicles() { return getData('vehicles', DEFAULT_VEHICLES); }
function getTestimonials() { return getData('testimonials', DEFAULT_TESTIMONIALS); }

function saveSafaris(data) { saveData('safaris', data); }
function saveTransfers(data) { saveData('transfers', data); }
function saveVehicles(data) { saveData('vehicles', data); }
function saveTestimonials(data) { saveData('testimonials', data); }

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}


// ─── SIDEBAR TOGGLE ───
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}


// ─── TAB NAVIGATION ───
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

  // Show target tab
  const tab = document.getElementById(`tab-${tabName}`);
  if (tab) tab.classList.add('active');

  // Highlight sidebar
  const link = document.querySelector(`.sidebar-link[data-tab="${tabName}"]`);
  if (link) link.classList.add('active');

  // Update title
  const titles = {
    dashboard: 'Dashboard',
    safaris: 'Safari Packages',
    transfers: 'Transfer Routes',
    vehicles: 'Vehicle Hire',
    testimonials: 'Testimonials'
  };
  document.getElementById('page-title').textContent = titles[tabName] || 'Dashboard';

  // Render the tab content
  renderTab(tabName);

  // Close mobile sidebar
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth < 1024 && !sidebar.classList.contains('-translate-x-full')) {
    toggleSidebar();
  }
}

// Setup sidebar navigation
document.querySelectorAll('.sidebar-link[data-tab]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab(link.dataset.tab);
  });
});


// ─── RENDER FUNCTIONS ───
function renderTab(tabName) {
  switch (tabName) {
    case 'dashboard': renderDashboard(); break;
    case 'safaris': renderSafaris(); break;
    case 'transfers': renderTransfers(); break;
    case 'vehicles': renderVehicles(); break;
    case 'testimonials': renderTestimonials(); break;
  }
}

function renderDashboard() {
  const safaris = getSafaris();
  const transfers = getTransfers();
  const vehicles = getVehicles();
  const testimonials = getTestimonials();

  document.getElementById('stat-safaris').textContent = safaris.length;
  document.getElementById('stat-transfers').textContent = transfers.length;
  document.getElementById('stat-vehicles').textContent = vehicles.length;
  document.getElementById('stat-testimonials').textContent = testimonials.length;

  // Safari preview
  const preview = document.getElementById('dashboard-packages-preview');
  if (safaris.length === 0) {
    preview.innerHTML = renderEmptyState('No safari packages yet', 'Add your first safari package to get started');
    return;
  }

  preview.innerHTML = safaris.map(s => `
    <div class="data-row">
      <img src="${s.image}" alt="${s.name}" class="data-row-img" onerror="this.style.display='none'">
      <div class="data-row-info">
        <h4>${s.name}</h4>
        <p>${s.description ? s.description.substring(0, 80) + '...' : ''}</p>
      </div>
      <div class="data-row-price">${Number(s.price).toLocaleString()} <span>LKR</span></div>
      <span class="admin-badge ${s.active ? 'active' : 'draft'}">${s.active ? 'Active' : 'Draft'}</span>
    </div>
  `).join('');
}

function renderSafaris() {
  const safaris = getSafaris();
  const container = document.getElementById('safaris-list');

  if (safaris.length === 0) {
    container.innerHTML = renderEmptyState('No Safari Packages', 'Click "Add Package" to create your first safari experience');
    return;
  }

  container.innerHTML = safaris.map(s => `
    <div class="data-row" data-id="${s.id}">
      <img src="${s.image}" alt="${s.name}" class="data-row-img" onerror="this.style.display='none'">
      <div class="data-row-info">
        <h4>${s.name}</h4>
        <p>${s.type || 'Safari'} • ${s.duration || ''} • ${s.capacity || ''}</p>
      </div>
      <div class="data-row-price">${Number(s.price).toLocaleString()} <span>LKR</span></div>
      <span class="admin-badge ${s.active ? 'active' : 'draft'}">${s.active ? 'Active' : 'Draft'}</span>
      <div class="data-row-actions">
        <button class="action-btn edit" onclick="openEditModal('safari', '${s.id}')" title="Edit">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </button>
        <button class="action-btn delete" onclick="deleteItem('safari', '${s.id}', '${s.name}')" title="Delete">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function renderTransfers() {
  const transfers = getTransfers();
  const container = document.getElementById('transfers-list');

  if (transfers.length === 0) {
    container.innerHTML = renderEmptyState('No Transfer Routes', 'Click "Add Route" to create a transfer route');
    return;
  }

  container.innerHTML = transfers.map(t => `
    <div class="data-row" data-id="${t.id}">
      <div class="stat-icon bg-earth-500/15 text-earth-500 !w-10 !h-10" style="width:2.5rem;height:2.5rem;min-width:2.5rem;">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      </div>
      <div class="data-row-info">
        <h4>${t.route}</h4>
        <p>${t.subtitle || 'Transfer'}</p>
      </div>
      <div class="data-row-price">${Number(t.price).toLocaleString()} <span>LKR</span></div>
      <span class="admin-badge ${t.active ? 'active' : 'draft'}">${t.active ? 'Active' : 'Draft'}</span>
      <div class="data-row-actions">
        <button class="action-btn edit" onclick="openEditModal('transfer', '${t.id}')" title="Edit">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </button>
        <button class="action-btn delete" onclick="deleteItem('transfer', '${t.id}', '${t.route}')" title="Delete">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function renderVehicles() {
  const vehicles = getVehicles();
  const container = document.getElementById('vehicles-list');

  if (vehicles.length === 0) {
    container.innerHTML = renderEmptyState('No Vehicles', 'Click "Add Vehicle" to add a rental vehicle');
    return;
  }

  container.innerHTML = vehicles.map(v => `
    <div class="data-row" data-id="${v.id}">
      <img src="${v.image}" alt="${v.name}" class="data-row-img" onerror="this.style.display='none'">
      <div class="data-row-info">
        <h4>${v.name}</h4>
        <p>${v.passengers} Persons • ${v.features || ''}</p>
      </div>
      <span class="admin-badge ${v.active ? 'active' : 'draft'}">${v.active ? 'Active' : 'Draft'}</span>
      <div class="data-row-actions">
        <button class="action-btn edit" onclick="openEditModal('vehicle', '${v.id}')" title="Edit">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </button>
        <button class="action-btn delete" onclick="deleteItem('vehicle', '${v.id}', '${v.name}')" title="Delete">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const testimonials = getTestimonials();
  const container = document.getElementById('testimonials-list');

  if (testimonials.length === 0) {
    container.innerHTML = renderEmptyState('No Testimonials', 'Click "Add Testimonial" to add guest reviews');
    return;
  }

  container.innerHTML = testimonials.map(t => `
    <div class="data-row" data-id="${t.id}">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br ${t.color || 'from-earth-500 to-earth-600'} flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0">
        ${t.initial || t.name.charAt(0)}
      </div>
      <div class="data-row-info">
        <h4>${t.name}</h4>
        <p>${t.country} • ${'★'.repeat(t.rating || 5)}</p>
      </div>
      <span class="admin-badge ${t.active ? 'active' : 'draft'}">${t.active ? 'Active' : 'Draft'}</span>
      <div class="data-row-actions">
        <button class="action-btn edit" onclick="openEditModal('testimonial', '${t.id}')" title="Edit">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </button>
        <button class="action-btn delete" onclick="deleteItem('testimonial', '${t.id}', '${t.name}')" title="Delete">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function renderEmptyState(title, message) {
  return `
    <div class="empty-state">
      <div class="empty-state-icon">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
      </div>
      <h3>${title}</h3>
      <p>${message}</p>
    </div>
  `;
}


// ─── MODAL FORMS ───
let currentModal = { type: null, id: null };

function openAddModal(type) {
  currentModal = { type, id: null };
  document.getElementById('modal-title').textContent = `Add ${capitalize(type)}`;
  document.getElementById('modal-body').innerHTML = getFormHTML(type, null);
  document.getElementById('modal').classList.remove('hidden');
}

function openEditModal(type, id) {
  let item;
  switch (type) {
    case 'safari': item = getSafaris().find(s => s.id === id); break;
    case 'transfer': item = getTransfers().find(t => t.id === id); break;
    case 'vehicle': item = getVehicles().find(v => v.id === id); break;
    case 'testimonial': item = getTestimonials().find(t => t.id === id); break;
  }
  if (!item) return;

  currentModal = { type, id };
  document.getElementById('modal-title').textContent = `Edit ${capitalize(type)}`;
  document.getElementById('modal-body').innerHTML = getFormHTML(type, item);
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  currentModal = { type: null, id: null };
}

function getFormHTML(type, item) {
  const isEdit = !!item;

  switch (type) {
    case 'safari':
      return `
        <form onsubmit="handleSave(event)">
          <div class="admin-form-group">
            <label class="admin-label">Package Name</label>
            <input type="text" class="admin-input" name="name" value="${item?.name || ''}" placeholder="e.g. Minneriya National Park Safari" required>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-label">Price (LKR)</label>
              <input type="number" class="admin-input" name="price" value="${item?.price || ''}" placeholder="14000" required>
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Badge Label</label>
              <input type="text" class="admin-input" name="badge" value="${item?.badge || ''}" placeholder="Most Popular">
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-label">Type</label>
              <input type="text" class="admin-input" name="type" value="${item?.type || ''}" placeholder="Jeep Safari">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Duration</label>
              <input type="text" class="admin-input" name="duration" value="${item?.duration || ''}" placeholder="4–5 Hours">
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-label">Capacity / Info</label>
              <input type="text" class="admin-input" name="capacity" value="${item?.capacity || ''}" placeholder="Up to 6">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Badge Color</label>
              <select class="admin-input" name="badgeColor">
                <option value="earth" ${item?.badgeColor === 'earth' ? 'selected' : ''}>Orange</option>
                <option value="forest" ${item?.badgeColor === 'forest' ? 'selected' : ''}>Green</option>
                <option value="amber" ${item?.badgeColor === 'amber' ? 'selected' : ''}>Amber</option>
                <option value="blue" ${item?.badgeColor === 'blue' ? 'selected' : ''}>Blue</option>
              </select>
            </div>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Image Path</label>
            <input type="text" class="admin-input" name="image" value="${item?.image || ''}" placeholder="images/minneriya.png">
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Description</label>
            <textarea class="admin-input" name="description" placeholder="Describe this safari experience...">${item?.description || ''}</textarea>
          </div>
          <div class="admin-form-group">
            <label class="admin-label flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="active" ${item?.active !== false ? 'checked' : ''} class="w-4 h-4 rounded accent-earth-500">
              <span>Active (visible on website)</span>
            </label>
          </div>
          <button type="submit" class="admin-btn-submit">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            ${isEdit ? 'Update Package' : 'Add Package'}
          </button>
        </form>
      `;

    case 'transfer':
      return `
        <form onsubmit="handleSave(event)">
          <div class="admin-form-group">
            <label class="admin-label">Route Name</label>
            <input type="text" class="admin-input" name="route" value="${item?.route || ''}" placeholder="e.g. Sigiriya → Ella" required>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-label">Subtitle</label>
              <input type="text" class="admin-input" name="subtitle" value="${item?.subtitle || ''}" placeholder="One Way Transfer">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Price (LKR)</label>
              <input type="number" class="admin-input" name="price" value="${item?.price || ''}" placeholder="25000" required>
            </div>
          </div>
          <div class="admin-form-group">
            <label class="admin-label flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="active" ${item?.active !== false ? 'checked' : ''} class="w-4 h-4 rounded accent-earth-500">
              <span>Active (visible on website)</span>
            </label>
          </div>
          <button type="submit" class="admin-btn-submit">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            ${isEdit ? 'Update Route' : 'Add Route'}
          </button>
        </form>
      `;

    case 'vehicle':
      return `
        <form onsubmit="handleSave(event)">
          <div class="admin-form-group">
            <label class="admin-label">Vehicle Name</label>
            <input type="text" class="admin-input" name="name" value="${item?.name || ''}" placeholder="e.g. Mini Van" required>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-label">Type Label</label>
              <input type="text" class="admin-input" name="type" value="${item?.type || ''}" placeholder="🚐 Mini Van">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Passengers</label>
              <input type="number" class="admin-input" name="passengers" value="${item?.passengers || ''}" placeholder="4" required>
            </div>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Features</label>
            <input type="text" class="admin-input" name="features" value="${item?.features || ''}" placeholder="AC / Comfortable">
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Image Path</label>
            <input type="text" class="admin-input" name="image" value="${item?.image || ''}" placeholder="images/vehicles.png">
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Description</label>
            <textarea class="admin-input" name="description" placeholder="Describe this vehicle...">${item?.description || ''}</textarea>
          </div>
          <div class="admin-form-group">
            <label class="admin-label flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="active" ${item?.active !== false ? 'checked' : ''} class="w-4 h-4 rounded accent-earth-500">
              <span>Active (visible on website)</span>
            </label>
          </div>
          <button type="submit" class="admin-btn-submit">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            ${isEdit ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </form>
      `;

    case 'testimonial':
      return `
        <form onsubmit="handleSave(event)">
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-label">Guest Name</label>
              <input type="text" class="admin-input" name="name" value="${item?.name || ''}" placeholder="e.g. James & Sarah" required>
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Country</label>
              <input type="text" class="admin-input" name="country" value="${item?.country || ''}" placeholder="e.g. United Kingdom" required>
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-label">Initial Letter</label>
              <input type="text" class="admin-input" name="initial" value="${item?.initial || ''}" placeholder="J" maxlength="2">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Rating (1–5)</label>
              <select class="admin-input" name="rating">
                <option value="5" ${(item?.rating || 5) === 5 ? 'selected' : ''}>★★★★★ (5)</option>
                <option value="4" ${item?.rating === 4 ? 'selected' : ''}>★★★★☆ (4)</option>
                <option value="3" ${item?.rating === 3 ? 'selected' : ''}>★★★☆☆ (3)</option>
              </select>
            </div>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Avatar Color</label>
            <select class="admin-input" name="color">
              <option value="from-earth-500 to-earth-600" ${item?.color === 'from-earth-500 to-earth-600' ? 'selected' : ''}>Orange</option>
              <option value="from-forest-600 to-forest-700" ${item?.color === 'from-forest-600 to-forest-700' ? 'selected' : ''}>Green</option>
              <option value="from-amber-500 to-amber-600" ${item?.color === 'from-amber-500 to-amber-600' ? 'selected' : ''}>Amber</option>
              <option value="from-earth-600 to-earth-800" ${item?.color === 'from-earth-600 to-earth-800' ? 'selected' : ''}>Dark Orange</option>
              <option value="from-blue-500 to-blue-600" ${item?.color === 'from-blue-500 to-blue-600' ? 'selected' : ''}>Blue</option>
            </select>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Review Text</label>
            <textarea class="admin-input" name="text" rows="4" placeholder="Write the guest's review..." required>${item?.text || ''}</textarea>
          </div>
          <div class="admin-form-group">
            <label class="admin-label flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="active" ${item?.active !== false ? 'checked' : ''} class="w-4 h-4 rounded accent-earth-500">
              <span>Active (visible on website)</span>
            </label>
          </div>
          <button type="submit" class="admin-btn-submit">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            ${isEdit ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
        </form>
      `;

    default:
      return '<p class="text-safari-cream/50">Unknown type</p>';
  }
}


// ─── SAVE HANDLER ───
function handleSave(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Handle checkbox (not included if unchecked)
  data.active = form.querySelector('[name="active"]')?.checked ?? true;

  // Convert price/passengers to numbers
  if (data.price) data.price = parseInt(data.price);
  if (data.passengers) data.passengers = parseInt(data.passengers);
  if (data.rating) data.rating = parseInt(data.rating);

  const { type, id } = currentModal;

  switch (type) {
    case 'safari': {
      const items = getSafaris();
      if (id) {
        const idx = items.findIndex(s => s.id === id);
        if (idx !== -1) items[idx] = { ...items[idx], ...data };
      } else {
        data.id = generateId();
        items.push(data);
      }
      saveSafaris(items);
      break;
    }
    case 'transfer': {
      const items = getTransfers();
      if (id) {
        const idx = items.findIndex(t => t.id === id);
        if (idx !== -1) items[idx] = { ...items[idx], ...data };
      } else {
        data.id = generateId();
        items.push(data);
      }
      saveTransfers(items);
      break;
    }
    case 'vehicle': {
      const items = getVehicles();
      if (id) {
        const idx = items.findIndex(v => v.id === id);
        if (idx !== -1) items[idx] = { ...items[idx], ...data };
      } else {
        data.id = generateId();
        items.push(data);
      }
      saveVehicles(items);
      break;
    }
    case 'testimonial': {
      const items = getTestimonials();
      if (id) {
        const idx = items.findIndex(t => t.id === id);
        if (idx !== -1) items[idx] = { ...items[idx], ...data };
      } else {
        data.id = generateId();
        if (!data.initial) data.initial = data.name ? data.name.charAt(0) : '?';
        items.push(data);
      }
      saveTestimonials(items);
      break;
    }
  }

  closeModal();
  renderTab(type === 'safari' ? 'safaris' : type + 's');
  // Also re-render dashboard if visible
  if (document.getElementById('tab-dashboard').classList.contains('active')) {
    renderDashboard();
  }

  showToast(`${capitalize(type)} ${id ? 'updated' : 'added'} successfully!`, 'success');
}


// ─── DELETE ───
let pendingDelete = { type: null, id: null };

function deleteItem(type, id, name) {
  pendingDelete = { type, id };
  document.getElementById('confirm-title').textContent = `Delete ${capitalize(type)}?`;
  document.getElementById('confirm-message').textContent = `Are you sure you want to delete "${name}"? This action cannot be undone.`;
  document.getElementById('confirm-dialog').classList.remove('hidden');
}

function closeConfirm() {
  document.getElementById('confirm-dialog').classList.add('hidden');
  pendingDelete = { type: null, id: null };
}

function confirmAction() {
  const { type, id } = pendingDelete;

  switch (type) {
    case 'safari': {
      const items = getSafaris().filter(s => s.id !== id);
      saveSafaris(items);
      break;
    }
    case 'transfer': {
      const items = getTransfers().filter(t => t.id !== id);
      saveTransfers(items);
      break;
    }
    case 'vehicle': {
      const items = getVehicles().filter(v => v.id !== id);
      saveVehicles(items);
      break;
    }
    case 'testimonial': {
      const items = getTestimonials().filter(t => t.id !== id);
      saveTestimonials(items);
      break;
    }
  }

  closeConfirm();
  renderTab(type === 'safari' ? 'safaris' : type + 's');
  if (document.getElementById('tab-dashboard').classList.contains('active')) {
    renderDashboard();
  }
  showToast(`${capitalize(type)} deleted successfully`, 'success');
}


// ─── RESET ALL DATA ───
function resetAllData() {
  pendingDelete = { type: 'reset', id: null };
  document.getElementById('confirm-title').textContent = 'Reset All Data?';
  document.getElementById('confirm-message').textContent = 'This will restore all packages, transfers, vehicles, and testimonials to their default values.';
  document.getElementById('confirm-action-btn').textContent = 'Reset';
  document.getElementById('confirm-dialog').classList.remove('hidden');

  // Override confirm action for reset
  const originalConfirm = window.confirmAction;
  window.confirmAction = function () {
    localStorage.removeItem('ameliya_safaris');
    localStorage.removeItem('ameliya_transfers');
    localStorage.removeItem('ameliya_vehicles');
    localStorage.removeItem('ameliya_testimonials');
    closeConfirm();
    document.getElementById('confirm-action-btn').textContent = 'Delete';
    window.confirmAction = originalConfirm;
    renderDashboard();
    showToast('All data reset to defaults', 'info');
  };
}


// ─── TOAST NOTIFICATIONS ───
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const icons = {
    success: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
    error: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
    info: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type] || ''}${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// ─── UTILITIES ───
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// ─── INITIALIZE ───
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  renderDashboard();
  renderSafaris();
  renderTransfers();
  renderVehicles();
  renderTestimonials();
});
