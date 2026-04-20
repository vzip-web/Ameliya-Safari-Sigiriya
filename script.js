/* ═══════════════════════════════════════════════════════════
   AMELIYA ELEPHANT SAFARI – INTERACTIVE SCRIPTS
   Premium Wildlife & Adventure Theme
   With Dynamic Data from localStorage (Admin Panel Integration)
   ═══════════════════════════════════════════════════════════ */

// ─── DEFAULT DATA (fallback when no localStorage data exists) ───
const DEFAULT_SAFARIS = [
  {
    id: 'minneriya', name: 'Minneriya National Park Safari', price: 14000,
    description: 'Witness the legendary "Gathering" – one of Asia\'s greatest wildlife spectacles. Herds of 150+ elephants converge at the ancient Minneriya reservoir during the dry season.',
    image: 'images/minneriya.png', badge: 'Most Popular', badgeColor: 'earth',
    type: 'Jeep Safari', duration: '4–5 Hours', capacity: 'Up to 6', active: true
  },
  {
    id: 'kaudulla', name: 'Kaudulla National Park Safari', price: 17000,
    description: 'Explore the untouched wilderness of Kaudulla. Home to diverse wildlife including elephants, deer, crocodiles, and over 160 species of birds in their natural habitat.',
    image: 'images/kaudulla.png', badge: 'Premium', badgeColor: 'forest',
    type: 'Jeep Safari', duration: '4–5 Hours', capacity: 'Up to 6', active: true
  },
  {
    id: 'pidurangala', name: 'Pidurangala Mountain Hiking', price: 16000,
    description: 'Conquer the iconic Pidurangala Rock at sunrise for breathtaking 360° panoramic views of Sigiriya, misty jungles, and the ancient Cultural Triangle stretching to the horizon.',
    image: 'images/pidurangala.png', badge: 'Adventure', badgeColor: 'amber',
    type: 'Guided Hike', duration: '3–4 Hours', capacity: 'Sunrise', active: true
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

// ─── DATA HELPERS ───
function getData(key, defaults) {
  try {
    const stored = localStorage.getItem(`ameliya_${key}`);
    if (stored) return JSON.parse(stored).filter(item => item.active !== false);
  } catch (e) { /* use defaults */ }
  return defaults.filter(item => item.active !== false);
}

const mapPinSVG = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
const airplaneSVG = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`;
const personsSVG = `<svg class="w-5 h-5 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
const checkSVG = `<svg class="w-5 h-5 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;


// ─── DYNAMIC RENDERING ───
function renderSafariCards() {
  const container = document.getElementById('safaris-grid');
  if (!container) return;

  const safaris = getData('safaris', DEFAULT_SAFARIS);
  const badgeColors = { earth: '', forest: 'bg-forest-600', amber: 'bg-amber-600', blue: 'bg-blue-600' };
  const typeIcons = { 'Jeep Safari': '🚙', 'Guided Hike': '🥾', 'Boat Safari': '🚤' };

  container.innerHTML = safaris.map((s, i) => {
    const icon = typeIcons[s.type] || '🌿';
    const lastIcon = s.type === 'Guided Hike' ? '🌅' : '👥';
    const badgeClass = badgeColors[s.badgeColor] || '';
    return `
      <div class="safari-card section-reveal" style="--delay: ${(i + 1) * 0.1}s" id="card-${s.id}">
        <div class="safari-card-inner">
          <div class="safari-card-image">
            <img src="${s.image}" alt="${s.name}" class="w-full h-64 object-cover" onerror="this.src='images/hero.png'">
            ${s.badge ? `<div class="safari-card-badge ${badgeClass}">${s.badge}</div>` : ''}
            <div class="safari-card-overlay"></div>
          </div>
          <div class="safari-card-body"${i === safaris.length - 1 ? ' id="hiking"' : ''}>
            <h3 class="font-display text-xl lg:text-2xl font-bold text-white mb-2">${s.name}</h3>
            <p class="text-safari-cream/60 text-sm font-heading mb-4 leading-relaxed">${s.description}</p>
            <div class="flex items-center gap-2 text-xs text-safari-cream/50 mb-5 font-heading">
              <span class="flex items-center gap-1">${icon} ${s.type || 'Safari'}</span>
              <span>•</span>
              <span>⏱ ${s.duration || ''}</span>
              <span>•</span>
              <span>${lastIcon} ${s.capacity || ''}</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-earth-400 text-sm font-heading">Starting from</span>
                <div class="text-2xl lg:text-3xl font-heading font-bold text-earth-500">${Number(s.price).toLocaleString()} <span class="text-base font-normal text-earth-400">LKR</span></div>
              </div>
              <a href="#contact" class="btn-card-book">Book Now</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderVehicleCards() {
  const container = document.getElementById('vehicles-grid');
  if (!container) return;

  const vehicles = getData('vehicles', DEFAULT_VEHICLES);

  container.innerHTML = vehicles.map((v, i) => `
    <div class="vehicle-card section-reveal" style="--delay: ${(i + 1) * 0.1}s" id="card-vehicle-${v.id}">
      <div class="vehicle-card-inner">
        <div class="relative overflow-hidden rounded-t-2xl">
          <img src="${v.image}" alt="${v.name}" class="w-full h-56 object-cover${i % 2 !== 0 ? ' object-right' : ''}" onerror="this.src='images/hero.png'">
          <div class="absolute inset-0 bg-gradient-to-t from-safari-darker via-transparent to-transparent"></div>
          <div class="absolute top-4 right-4 ${i % 2 === 0 ? 'bg-earth-500/90' : 'bg-forest-600/90'} backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-heading font-semibold">
            ${v.type || v.name}
          </div>
        </div>
        <div class="p-6 lg:p-8">
          <h3 class="font-display text-2xl font-bold text-white mb-3">${v.name}</h3>
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center gap-2 text-safari-cream/60 text-sm font-heading">
              ${personsSVG}
              ${v.passengers} Persons
            </span>
            <span class="text-safari-cream/30">|</span>
            <span class="flex items-center gap-2 text-safari-cream/60 text-sm font-heading">
              ${checkSVG}
              ${v.features || ''}
            </span>
          </div>
          <p class="text-safari-cream/50 text-sm font-heading mb-6">${v.description || ''}</p>
          <a href="#contact" class="btn-card-book w-full text-center block">Inquire Now</a>
        </div>
      </div>
    </div>
  `).join('');
}

function renderTransferCards() {
  const container = document.getElementById('transfers-grid');
  if (!container) return;

  const transfers = getData('transfers', DEFAULT_TRANSFERS);

  container.innerHTML = transfers.map((t, i) => {
    const isAirport = t.route.toLowerCase().includes('airport');
    const icon = isAirport ? airplaneSVG : mapPinSVG;
    return `
      <div class="transfer-card section-reveal" style="--delay: ${(i + 1) * 0.05}s" id="transfer-${t.id}">
        <div class="transfer-card-inner">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-earth-500/15 flex items-center justify-center text-earth-500 shrink-0">
              ${icon}
            </div>
            <div>
              <h3 class="font-heading font-semibold text-white text-sm">${t.route}</h3>
              <span class="text-xs text-safari-cream/50">${t.subtitle || 'Transfer'}</span>
            </div>
          </div>
          <div class="text-2xl font-heading font-bold text-earth-500">${Number(t.price).toLocaleString()} <span class="text-sm font-normal text-earth-400">LKR</span></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderTestimonialCards() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  const testimonials = getData('testimonials', DEFAULT_TESTIMONIALS);

  container.innerHTML = testimonials.map((t, i) => `
    <div class="testimonial-card section-reveal" style="--delay: ${(i + 1) * 0.1}s" id="testimonial-${t.id}">
      <div class="testimonial-card-inner">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br ${t.color || 'from-earth-500 to-earth-600'} flex items-center justify-center text-white font-heading font-bold text-lg">
            ${t.initial || t.name.charAt(0)}
          </div>
          <div>
            <h4 class="font-heading font-semibold text-white text-sm">${t.name}</h4>
            <span class="text-xs text-safari-cream/50">${t.country}</span>
          </div>
        </div>
        <div class="flex gap-0.5 mb-3">
          ${'<span class="text-earth-500">★</span>'.repeat(t.rating || 5)}${'<span class="text-safari-cream/20">★</span>'.repeat(5 - (t.rating || 5))}
        </div>
        <p class="text-safari-cream/60 text-sm font-heading leading-relaxed italic">"${t.text}"</p>
      </div>
    </div>
  `).join('');
}

function populateBookingSelect() {
  const select = document.getElementById('package');
  if (!select) return;

  const safaris = getData('safaris', DEFAULT_SAFARIS);
  const transfers = getData('transfers', DEFAULT_TRANSFERS);

  // Keep the first placeholder option
  select.innerHTML = '<option value="">Choose your adventure...</option>';

  safaris.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} – ${Number(s.price).toLocaleString()} LKR`;
    select.appendChild(opt);
  });

  transfers.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = `${t.route} – ${Number(t.price).toLocaleString()} LKR`;
    select.appendChild(opt);
  });

  // Static options
  const vehicleOpt = document.createElement('option');
  vehicleOpt.value = 'vehicle';
  vehicleOpt.textContent = 'Vehicle Hire';
  select.appendChild(vehicleOpt);

  const customOpt = document.createElement('option');
  customOpt.value = 'custom';
  customOpt.textContent = 'Custom Package';
  select.appendChild(customOpt);
}


// ─── INITIALIZE DYNAMIC CONTENT + INTERACTIONS ───
document.addEventListener('DOMContentLoaded', () => {

  // Render all dynamic sections
  renderSafariCards();
  renderVehicleCards();
  renderTransferCards();
  renderTestimonialCards();
  populateBookingSelect();


  // ─── NAVBAR SCROLL EFFECT ───
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleNavScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // ─── MOBILE MENU ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  const toggleMobile = () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMobile);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });


  // ─── HERO PARALLAX ───
  const heroParallax = document.querySelector('.hero-parallax');

  if (heroParallax) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const heroHeight = window.innerHeight;

          if (scrolled < heroHeight) {
            heroParallax.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // ─── SECTION REVEAL ON SCROLL ───
  const revealElements = document.querySelectorAll('.section-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (!target) return;

      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString() + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString() + '+';
        }
      };

      updateCounter();
    });

    countersAnimated = true;
  };

  const counterSection = document.getElementById('about');
  if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
  }


  // ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: position,
          behavior: 'smooth'
        });
      }
    });
  });


  // ─── 3D TILT EFFECT ON CARDS (applied to dynamically rendered content) ───
  const tiltCards = document.querySelectorAll('.safari-card-inner, .vehicle-card-inner, .transfer-card-inner, .testimonial-card-inner');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ─── LAZY LOAD IMAGES ───
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          imgObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '50px' });

    lazyImages.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
      imgObserver.observe(img);
    });
  } else {
    lazyImages.forEach(img => img.classList.add('loaded'));
  }

  // Ensure non-lazy images are visible
  document.querySelectorAll('img:not([loading="lazy"])').forEach(img => {
    img.style.opacity = '1';
  });


  // ─── BOOKING FORM SUBMISSION ───
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData);

      // Show success state
      bookingForm.innerHTML = `
        <div class="form-success">
          <div class="form-success-icon">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3>Thank You, ${data.name || 'Adventurer'}!</h3>
          <p>Your safari inquiry has been received. Our team will get back to you within 2 hours with a personalized itinerary.</p>
          <p style="margin-top: 1rem; color: rgba(230, 126, 34, 0.8);">
            Or reach us directly on WhatsApp: +94 77 123 4567
          </p>
        </div>
      `;

      bookingForm.style.animation = 'none';
      bookingForm.offsetHeight;
      bookingForm.style.animation = 'heroFadeIn 0.6s ease forwards';
    });
  }


  // ─── GALLERY LIGHTBOX (SIMPLE) ───
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');

      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: zoom-out;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 2rem;
      `;

      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 1rem;
        transform: scale(0.9);
        transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      `;

      const lightboxCaption = document.createElement('p');
      lightboxCaption.textContent = caption ? caption.textContent : '';
      lightboxCaption.style.cssText = `
        margin-top: 1rem;
        color: rgba(253, 246, 236, 0.7);
        font-family: 'Outfit', sans-serif;
        font-size: 1rem;
      `;

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '✕';
      closeBtn.style.cssText = `
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      `;

      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(lightboxCaption);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      // Animate in
      requestAnimationFrame(() => {
        lightbox.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      });

      // Close handlers
      const closeLightbox = () => {
        lightbox.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }, 300);
      };

      lightbox.addEventListener('click', closeLightbox);
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
      }, { once: true });
    });
  });


  // ─── FORM INPUT 3D FOCUS EFFECT ───
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.transform = 'translateY(-2px) rotateX(1deg)';
    });
    input.addEventListener('blur', () => {
      input.style.transform = '';
    });
  });

});
