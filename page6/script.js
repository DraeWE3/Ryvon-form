/* ===== Page 6 — Request AI Consultation ===== */

// ─── Paste your Google Apps Script Web App URL here ─────────────────────────
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwilOxRYvnENVf5YN4hfOkGH_8BBWmbBeJ6C6NNMe4kN0SNKizMM26c2f90AO0qDc_fYg/exec';
// ────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Textarea auto-grow
  const textarea = document.getElementById('message');
  if (textarea) {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(157, textarea.scrollHeight) + 'px';
    });
  }

  // Submit button — collect all localStorage data and send to Google Sheets
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const message = textarea ? textarea.value.trim() : '';

      // Require a message before submitting
      if (!message) {
        const wrapper = document.querySelector('.textarea-wrapper');
        if (wrapper) {
          wrapper.style.animation = 'shake 0.4s ease';
          setTimeout(() => (wrapper.style.animation = ''), 400);
        }
        return;
      }

      // Animate button while submitting
      submitBtn.style.transform = 'scale(0.96)';
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.7';

      // Gather all data collected across pages from localStorage
      const formData = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
      formData.message = message;

      try {
        // Google Apps Script requires no-cors mode
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        // no-cors always returns opaque response — treat reaching here as success
        localStorage.removeItem('ryvonLead');
        window.location.href = '../page7/index.html';

      } catch (err) {
        console.error('Submission failed:', err);

        submitBtn.style.transform = '';
        submitBtn.style.pointerEvents = '';
        submitBtn.style.opacity = '';

        const card = document.querySelector('.form-card');
        if (card) {
          card.style.animation = 'shake 0.4s ease';
          setTimeout(() => (card.style.animation = ''), 400);
        }
        alert('Submission failed. Please check your internet connection and try again.');
      }
    });
  }

  /* ----- Hamburger Mobile Nav Toggle ----- */
  var hamburger = document.getElementById('hamburger');
  var headerEl = document.querySelector('.header');
  var navLinksEl = document.getElementById('nav-links');
  if (hamburger && headerEl && navLinksEl) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      headerEl.classList.toggle('nav-open');
      var isOpen = headerEl.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinksEl.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        headerEl.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', function (e) {
      if (
        headerEl.classList.contains('nav-open') &&
        !navLinksEl.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
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
`;
document.head.appendChild(style);
