/* ===== Page 1 — Hero Landing Page ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* ----- Fade-in animation on load ----- */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      });
    });
  }

  /* ----- Staggered children animation ----- */
  const heroChildren = document.querySelectorAll('.hero > *');
  heroChildren.forEach((child, i) => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(15px)';
    child.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      });
    });
  });

  /* ----- Button hover pulse ----- */
  const btns = document.querySelectorAll('.btn-primary, .btn-secondary');
  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease';
    });
  });



  /* ----- Hamburger Mobile Nav Toggle ----- */
  const hamburger = document.getElementById('hamburger');
  const header = document.querySelector('.header');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && header && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      header.classList.toggle('nav-open');
      const isOpen = header.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);

      // Prevent body scroll when nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (header.classList.contains('nav-open') &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)) {
        header.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
});

