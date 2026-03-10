/* ===== Page 4 — What Are You Exploring? ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved interests from localStorage
  const saved = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
  if (saved.interests && Array.isArray(saved.interests)) {
    saved.interests.forEach(val => {
      const cb = document.querySelector(`.option-row input[value="${val}"]`);
      if (cb) cb.checked = true;
    });
  }
  // Add ripple effect on checkbox toggle
  const optionRows = document.querySelectorAll('.option-row');
  optionRows.forEach(row => {
    row.addEventListener('click', () => {
      // Brief scale animation
      row.style.transform = 'scale(0.98)';
      setTimeout(() => {
        row.style.transform = '';
      }, 150);
    });
  });

  // Next button validation + save to localStorage
  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      const checked = document.querySelectorAll('.option-row input:checked');
      if (checked.length > 0) {
        // Save interests to localStorage
        const selections = Array.from(checked).map(c => c.value);
        const formData = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
        formData.interests = selections;
        localStorage.setItem('ryvonLead', JSON.stringify(formData));
        console.log('Selected interests:', selections);
      } else {
        e.preventDefault();
        // Shake the form card if nothing is selected
        const card = document.querySelector('.form-card');
        if (card) {
          card.style.animation = 'shake 0.4s ease';
          setTimeout(() => card.style.animation = '', 400);
        }
      }
    });
  }
  /* ----- Hamburger Mobile Nav Toggle ----- */
  var hamburger = document.getElementById('hamburger');
  var headerEl = document.querySelector('.header');
  var navLinksEl = document.getElementById('nav-links');
  if (hamburger && headerEl && navLinksEl) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      headerEl.classList.toggle('nav-open');
      var isOpen = headerEl.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinksEl.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        headerEl.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', function(e) {
      if (headerEl.classList.contains('nav-open') && !navLinksEl.contains(e.target) && !hamburger.contains(e.target)) {
        headerEl.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
});

/* Shake animation */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  .option-row {
    transition: transform 0.15s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
`;
document.head.appendChild(style);
