/* ===== Page 5 — Step 03/03: Timeline & Budget ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved timeline & budget
  const saved = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
  if (saved.timeline && Array.isArray(saved.timeline)) {
    saved.timeline.forEach(val => {
      const cb = document.querySelector(`input[name="timeline"][value="${val}"]`);
      if (cb) cb.checked = true;
    });
  }
  if (saved.budget && Array.isArray(saved.budget)) {
    saved.budget.forEach(val => {
      const cb = document.querySelector(`input[name="budget"][value="${val}"]`);
      if (cb) cb.checked = true;
    });
  }

  // ── Save on every checkbox change (real-time) ─────────────────────────────
  function saveSelections() {
    const formData = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
    formData.timeline = Array.from(document.querySelectorAll('input[name="timeline"]:checked')).map(c => c.value);
    formData.budget = Array.from(document.querySelectorAll('input[name="budget"]:checked')).map(c => c.value);
    localStorage.setItem('ryvonLead', JSON.stringify(formData));
  }

  document.querySelectorAll('input[name="timeline"], input[name="budget"]')
    .forEach(cb => cb.addEventListener('change', saveSelections));

  // Scale animation on click
  document.querySelectorAll('.option-row').forEach(row => {
    row.addEventListener('click', () => {
      row.style.transform = 'scale(0.98)';
      setTimeout(() => (row.style.transform = ''), 150);
    });
  });

  // Next button — require at least one timeline AND one budget
  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      saveSelections();
      const timelineChecked = document.querySelectorAll('input[name="timeline"]:checked');
      const budgetChecked = document.querySelectorAll('input[name="budget"]:checked');
      if (timelineChecked.length === 0 || budgetChecked.length === 0) {
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
