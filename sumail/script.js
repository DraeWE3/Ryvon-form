// ===== Page 2 — Selectable Service Cards =====

document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.service-card');
  const nextBtn = document.querySelector('.next-btn');
  const hint = document.getElementById('select-hint');

  // Restore previously selected cards from localStorage
  const saved = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
  const savedServices = Array.isArray(saved.services) ? saved.services : [];

  cards.forEach((card) => {
    const value = card.getAttribute('data-value');

    // Mark as selected if previously chosen
    if (savedServices.includes(value)) {
      card.classList.add('selected');
    }

    // Toggle selection on click
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      // Hide hint once user makes a selection
      if (hint) hint.style.display = 'none';
      saveSelections();
    });

    // Keep hover tilt effect
    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('selected')) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -4;
      const rotateY = ((x - rect.width / 2) / rect.width) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('selected')) {
        card.style.transform = '';
      }
    });
  });

  function saveSelections() {
    const selected = Array.from(document.querySelectorAll('.service-card.selected'))
      .map(c => c.getAttribute('data-value'));
    const formData = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
    formData.services = selected;
    localStorage.setItem('ryvonLead', JSON.stringify(formData));
  }

  // No longer requiring selection to proceed
  if (nextBtn) {
    // We can remove the entire block or just the event listener
    // Keeping it empty or removing it entirely
  }

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

// Shake + selected card animations
const style = document.createElement('style');
style.textContent = `
  .service-card {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .service-card.selected {
    border-color: rgba(1, 117, 255, 0.8) !important;
    box-shadow: 0 0 20px rgba(1, 117, 255, 0.25), 0 0 0 2px rgba(1, 117, 255, 0.4) !important;
    transform: translateY(-3px) !important;
  }
  .select-hint {
    color: rgba(255, 100, 100, 0.85);
    font-size: 0.82rem;
    text-align: center;
    margin-top: 8px;
    letter-spacing: 0.02em;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);
