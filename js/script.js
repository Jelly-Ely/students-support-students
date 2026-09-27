/* STUDENTS SUPPORT STUDENTS — Global JavaScript */
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const dropdowns = [...document.querySelectorAll('.dropdown')];

function closeDropdowns(except = null) {
  dropdowns.forEach((dropdown) => {
    if (dropdown === except) return;
    dropdown.classList.remove('open');
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
}

function closeMenu() {
  if (!menuButton || !navLinks) return;
  navLinks.classList.remove('nav-open');
  menuButton.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  closeDropdowns();
}

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    menuButton.classList.toggle('menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = !dropdown.classList.contains('open');
    closeDropdowns(dropdown);
    dropdown.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  });

  dropdown.addEventListener('mouseenter', () => {
    if (window.innerWidth <= 900) return;
    closeDropdowns(dropdown);
    dropdown.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  });

  dropdown.addEventListener('mouseleave', () => {
    if (window.innerWidth <= 900) return;
    dropdown.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('click', (event) => {
  const insideNav = navLinks && navLinks.contains(event.target);
  const clickedButton = menuButton && menuButton.contains(event.target);
  if (!insideNav && !clickedButton) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (menuButton && window.innerWidth <= 900) menuButton.focus();
  }
});

const header = document.querySelector('.site-header');
function updateHeader() { if (header) header.classList.toggle('header-scrolled', window.scrollY > 20); }
window.addEventListener('scroll', updateHeader, { passive:true });
updateHeader();

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  const linkPage = (link.getAttribute('href') || '').split('#')[0];
  link.classList.toggle('active', linkPage === currentPage);
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.path-card,.service-card,.step-card,.support-card,.reason,.mission-vision-card,.hexagon,.audience-card,.mentor-card,.topic-pill');
if (!reduceMotion && 'IntersectionObserver' in window) {
  revealElements.forEach((el) => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold:.1 });
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('visible'));
}

const scrollButton = document.createElement('button');
scrollButton.className = 'scroll-top';
scrollButton.type = 'button';
scrollButton.innerHTML = '↑';
scrollButton.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollButton);
function updateScrollButton() { scrollButton.classList.toggle('scroll-top-visible', window.scrollY > 500); }
window.addEventListener('scroll', updateScrollButton, { passive:true });
updateScrollButton();
scrollButton.addEventListener('click', () => window.scrollTo({ top:0, behavior:reduceMotion ? 'auto' : 'smooth' }));

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();