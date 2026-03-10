/* ===== Page 7 — Thank You ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Simple entrance animation
  const heading = document.querySelector('.headings-group');
  const bodyText = document.querySelector('.body-text');
  const explore = document.querySelector('.explore-section');

  if (heading) {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(30px)';
    heading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      heading.style.opacity = '1';
      heading.style.transform = 'translateY(0)';
    }, 200);
  }

  if (bodyText) {
    bodyText.style.opacity = '0';
    bodyText.style.transform = 'translateY(20px)';
    bodyText.style.transition = 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s';
    setTimeout(() => {
      bodyText.style.opacity = '1';
      bodyText.style.transform = 'translateY(0)';
    }, 200);
  }

  if (explore) {
    explore.style.opacity = '0';
    explore.style.transition = 'opacity 0.7s ease 0.8s';
    setTimeout(() => {
      explore.style.opacity = '1';
    }, 200);
  }

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
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

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
