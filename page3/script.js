/* ===== Page 3 — Request AI Consultation Step 01/03 ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved data from localStorage
  const saved = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
  if (saved.firstName) document.getElementById('firstName').value = saved.firstName;
  if (saved.lastName) document.getElementById('lastName').value = saved.lastName;
  if (saved.company) document.getElementById('company').value = saved.company;
  if (saved.industry) {
    const sel = document.getElementById('industry');
    sel.value = saved.industry;
    if (sel.value) { sel.style.color = '#fff'; sel.style.fontWeight = '400'; }
  }
  if (saved.email) document.getElementById('email').value = saved.email;
  if (saved.phone) document.getElementById('phone').value = saved.phone;
  // Focus glow effect on input fields
  const inputs = document.querySelectorAll('.input-field input, .input-field select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.01)';
      input.parentElement.style.transition = 'transform 0.2s ease';
    });
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = '';
    });
  });

  // Industry select — change color on selection
  const industrySelect = document.getElementById('industry');
  if (industrySelect) {
    industrySelect.addEventListener('change', () => {
      if (industrySelect.value) {
        industrySelect.style.color = '#fff';
        industrySelect.style.fontWeight = '400';
      }
    });
  }

  // Next button validation + save to localStorage
  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const company = document.getElementById('company').value.trim();
      const industry = document.getElementById('industry').value;
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!firstName || !lastName || !email) {
        e.preventDefault();
        // Shake the form card
        const card = document.querySelector('.form-card');
        if (card) {
          card.style.animation = 'shake 0.4s ease';
          setTimeout(() => card.style.animation = '', 400);
        }
        // Highlight empty required fields
        if (!firstName) highlightField('firstName');
        if (!lastName) highlightField('lastName');
        if (!email) highlightField('email');
      } else {
        // Save form data to localStorage
        const formData = JSON.parse(localStorage.getItem('ryvonLead') || '{}');
        formData.firstName = firstName;
        formData.lastName = lastName;
        formData.company = company;
        formData.industry = industry;
        formData.email = email;
        formData.phone = phone;
        localStorage.setItem('ryvonLead', JSON.stringify(formData));
      }
    });
  }

  function highlightField(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.borderColor = 'rgba(255, 80, 80, 0.6)';
      el.style.boxShadow = '0 0 10px rgba(255, 80, 80, 0.15)';
      setTimeout(() => {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }, 2000);
    }
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
`;
document.head.appendChild(style);
