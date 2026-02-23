/* ===================================================
   ROCKET — MAIN JAVASCRIPT
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollAnimations();
  initNavbarScroll();

  // Only init rotating words on home page
  if (document.querySelector('.rotating-words-wrapper')) {
    initRotatingWords();
  }
});

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.navbar-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* --- Navbar scroll effect --- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  /* window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 14, 26, 0.95)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
      navbar.style.background = 'rgba(10, 14, 26, 0.85)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  }); */
}

/* --- Scroll-triggered fade-in animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Rotating Words Animation --- */
function initRotatingWords() {
  const words = document.querySelectorAll('.rotating-word');
  if (!words.length) return;

  let currentIndex = 0;

  function activate(index) {
    words.forEach(w => w.classList.remove('active'));
    words[index].classList.add('active');
  }

  // Start with first word active
  activate(0);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    activate(currentIndex);
  }, 2000);
}
