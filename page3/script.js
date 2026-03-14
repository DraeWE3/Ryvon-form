/* ===== Page 3 — Step 01/03: Contact Info ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved data
  const saved = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
  if (saved.firstName) document.getElementById('firstName').value = saved.firstName;
  if (saved.lastName) document.getElementById('lastName').value = saved.lastName;
  if (saved.company) document.getElementById('company').value = saved.company;
  if (saved.email) document.getElementById('email').value = saved.email;
  if (saved.phone) document.getElementById('phone').value = saved.phone;
  if (saved.industry) {
    const sel = document.getElementById('industry');
    sel.value = saved.industry;
    if (sel.value) { sel.style.color = '#fff'; sel.style.fontWeight = '400'; }
  }

  // ── Save to localStorage on every change (real-time) ──────────────────────
  function saveFields() {
    const formData = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
    formData.firstName = document.getElementById('firstName').value.trim();
    formData.lastName = document.getElementById('lastName').value.trim();
    formData.company = document.getElementById('company').value.trim();
    formData.industry = document.getElementById('industry').value;
    formData.email = document.getElementById('email').value.trim();
    formData.phone = document.getElementById('phone').value.trim();
    localStorage.setItem('ryvonLead', JSON.stringify(formData));
  }

  document.querySelectorAll('.input-field input, .input-field select')
    .forEach(el => {
      el.addEventListener('input', saveFields);
      el.addEventListener('change', saveFields);

      // Focus glow effect
      el.addEventListener('focus', () => {
        el.parentElement.style.transform = 'scale(1.01)';
        el.parentElement.style.transition = 'transform 0.2s ease';
      });
      el.addEventListener('blur', () => {
        el.parentElement.style.transform = '';
      });
    });

  // Industry select colour
  const industrySelect = document.getElementById('industry');
  if (industrySelect) {
    industrySelect.addEventListener('change', () => {
      if (industrySelect.value) {
        industrySelect.style.color = '#fff';
        industrySelect.style.fontWeight = '400';
      }
    });
  }

  // Next button — validate required fields
  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      saveFields(); // ensure latest values are saved
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!firstName || !lastName || !email) {
        e.preventDefault();
        const card = document.querySelector('.form-card');
        if (card) {
          card.style.animation = 'shake 0.4s ease';
          setTimeout(() => (card.style.animation = ''), 400);
        }
        if (!firstName) highlightField('firstName');
        if (!lastName) highlightField('lastName');
        if (!email) highlightField('email');
      }
    });
  }

  function highlightField(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.borderColor = 'rgba(255, 80, 80, 0.6)';
      el.style.boxShadow = '0 0 10px rgba(255, 80, 80, 0.15)';
      setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 2000);
    }
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
`;
document.head.appendChild(style);
