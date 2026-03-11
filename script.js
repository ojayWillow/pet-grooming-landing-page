/* ==============================================
   THEME TOGGLE
============================================== */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Load saved preference
const savedTheme = localStorage.getItem('pawlux-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('pawlux-theme', next);
});

/* ==============================================
   CUSTOM CURSOR
============================================== */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let lastPawTime = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';

  // Delayed trail
  setTimeout(() => {
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
  }, 80);

  // Paw particles — throttled
  const now = Date.now();
  if (now - lastPawTime > 180) {
    spawnPaw(mouseX, mouseY);
    lastPawTime = now;
  }
});

function spawnPaw(x, y) {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const paw = document.createElement('div');
  paw.className = 'paw-particle';
  paw.textContent = isDark ? '✂️' : '🐾';
  paw.style.left = x + 'px';
  paw.style.top = y + 'px';
  paw.style.fontSize = (0.6 + Math.random() * 0.5) + 'rem';
  paw.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg)`;
  document.body.appendChild(paw);
  setTimeout(() => paw.remove(), 800);
}

// Cursor grow on hoverable elements
document.querySelectorAll('a, button, .svc-card, .gal-item, .review-card, .contact-card, .process-step').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

/* ==============================================
   NAVBAR SCROLL
============================================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ==============================================
   MOBILE MENU
============================================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ==============================================
   SMOOTH SCROLL
============================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ==============================================
   FORM SUBMIT
============================================== */
function handleSubmit(e) {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
  e.target.reset();
}

/* ==============================================
   SCROLL ANIMATIONS
============================================== */
const animTargets = document.querySelectorAll(
  '.svc-card, .process-step, .review-card, .gal-item, .why-card, .contact-card'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
  observer.observe(el);
});

/* ==============================================
   ACTIVE NAV LINK
============================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--coral)' : '';
  });
});
