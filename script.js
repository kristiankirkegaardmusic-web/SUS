const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');

const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 40);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

if (year) year.textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}
