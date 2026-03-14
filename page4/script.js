/* ===== Page 4 — Step 02/03: Interests ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved interests
  const saved = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
  if (saved.interests && Array.isArray(saved.interests)) {
    saved.interests.forEach(val => {
      const cb = document.querySelector(`.option-row input[value="${val}"]`);
      if (cb) cb.checked = true;
    });
  }

  // ── Save on every checkbox change (real-time) ─────────────────────────────
  function saveInterests() {
    const checked = document.querySelectorAll('.option-row input:checked');
    const formData = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
    formData.interests = Array.from(checked).map(c => c.value);
    localStorage.setItem('ryvonLead', JSON.stringify(formData));
  }

  document.querySelectorAll('.option-row input[name="interest"]')
    .forEach(cb => cb.addEventListener('change', saveInterests));

  // Scale animation on click
  document.querySelectorAll('.option-row').forEach(row => {
    row.addEventListener('click', () => {
      row.style.transform = 'scale(0.98)';
      setTimeout(() => (row.style.transform = ''), 150);
    });
  });

  // Next button — require at least one selection
  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      saveInterests();
      const checked = document.querySelectorAll('.option-row input:checked');
      if (checked.length === 0) {
        e.preventDefault();
        const card = document.querySelector('.form-card');
        if (card) {
          card.style.animation = 'shake 0.4s ease';
          setTimeout(() => (card.style.animation = ''), 400);
        }
      }
    });
  }

  /* ----- Hamburger Mobile Nav Toggle ----- */
  const hamburger = document.getElementById('hamburger');
  const headerEl = document.querySelector('.header');
  const navLinksEl = document.getElementById('nav-links');
  if (hamburger && headerEl && navLinksEl) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      headerEl.classList.toggle('nav-open');
      const isOpen = headerEl.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        headerEl.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', (e) => {
      if (headerEl.classList.contains('nav-open') &&
        !navLinksEl.contains(e.target) && !hamburger.contains(e.target)) {
        headerEl.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
});

const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  .option-row { transition: transform 0.15s ease, background 0.25s ease, border-color 0.25s ease; }
`;
document.head.appendChild(style);
