// ===== Ryvon Landing Page — Interactive Enhancements =====

document.addEventListener('DOMContentLoaded', () => {

  // --- Smooth parallax on background ---
  const bgImg = document.querySelector('.bg-container img');
  if (bgImg) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      bgImg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      bgImg.style.transition = 'transform 0.3s ease-out';
    });
  }

  // --- Card hover tilt effect ---
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // --- CTA button ripple effect ---
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(1, 117, 255, 0.4);
        width: 100px;
        height: 100px;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleAnim 0.6s ease-out forwards;
        pointer-events: none;
        left: ${e.clientX - this.getBoundingClientRect().left}px;
        top: ${e.clientY - this.getBoundingClientRect().top}px;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // --- Next button interaction ---
  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('mouseenter', () => {
      nextBtn.style.transform = 'scale(1.03)';
      nextBtn.style.transition = 'transform 0.2s ease';
    });
    nextBtn.addEventListener('mouseleave', () => {
      nextBtn.style.transform = '';
    });
  }

  // --- Hamburger Mobile Nav Toggle ---
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

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
