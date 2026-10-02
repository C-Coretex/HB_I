const palette = ['#f7c968', '#3dd5a0', '#f2f0e8', '#ee7187', '#8aa9ff'];

function launchConfetti(count = 90) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'confetti';
    el.style.left = `${Math.random() * 100}vw`;
    el.style.background = palette[Math.floor(Math.random() * palette.length)];
    el.style.width = `${5 + Math.random() * 6}px`;
    el.style.height = `${8 + Math.random() * 9}px`;
    el.style.animationDuration = `${2.2 + Math.random() * 2.8}s`;
    el.style.animationDelay = `${Math.random() * 0.45}s`;
    el.style.setProperty('--x', `${-180 + Math.random() * 360}px`);
    el.style.setProperty('--r', `${360 + Math.random() * 1000}deg`);
    el.style.transform = `rotate(${Math.random() * 180}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 6000);
  }
}

function launchScrollConfetti(element, count = 34) {
  if (prefersReducedMotion) return;

  const rect = element.getBoundingClientRect();
  const originX = Math.max(24, Math.min(window.innerWidth - 24, rect.left + rect.width / 2));
  const originY = Math.max(80, Math.min(window.innerHeight - 80, rect.top + Math.min(rect.height * 0.25, 160)));

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'scroll-confetti';
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.background = palette[Math.floor(Math.random() * palette.length)];
    el.style.width = `${5 + Math.random() * 8}px`;
    el.style.height = `${8 + Math.random() * 11}px`;
    el.style.setProperty('--dx', `${-240 + Math.random() * 480}px`);
    el.style.setProperty('--dy', `${50 + Math.random() * 390}px`);
    el.style.setProperty('--rot', `${-540 + Math.random() * 1080}deg`);
    el.style.animationDelay = `${Math.random() * 110}ms`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1750);
  }
}

const progressBar = document.querySelector('.scroll-progress span');
const hero = document.querySelector('.hero-parallax');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.transform = `scaleX(${progress})`;

  if (!prefersReducedMotion && hero) {
    const shift = Math.min(window.scrollY * 0.2, 180);
    hero.style.setProperty('--parallax-y', `${shift}px`);
    document.documentElement.style.setProperty('--bg-shift', `${Math.min(window.scrollY * -0.035, 70)}px`);
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollEffects();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      launchScrollConfetti(entry.target, entry.target.classList.contains('hero') ? 22 : 38);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

updateScrollEffects();

window.addEventListener('load', () => setTimeout(() => launchConfetti(65), 450));
