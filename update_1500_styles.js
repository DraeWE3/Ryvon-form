const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/user/Downloads/Ryvon-Form-Lead-main/Ryvon-Form-Lead-main';
const pages = ["page1", "page2", "page3", "page4", "page5", "page6", "page7"];

const stylesBelow1500 = `
/* ===== Desktop PC Enhancements (<= 1500px) ===== */
@media (max-width: 1500px) and (min-width: 1024px) {
  /* Smaller fonts for optimal pc view */
  .hero-heading, .section-heading {
    font-size: clamp(32px, 4vw, 55px);
  }
  .hero-subtitle, .form-title, .body-text, .card-label {
    font-size: clamp(18px, 2vw, 22px);
  }
  .nav-links li a {
    font-size: 16px;
    height: 44px;
  }
  .header {
    height: 76px;
    padding: 0 40px;
  }
  .nav-links {
    gap: 30px;
  }
  .logo-text {
    font-size: 18px;
  }
  
  /* Form adjustments */
  .form-card {
    width: 600px;
    padding: 16px 30px 24px;
    gap: 12px;
  }
  .input-field input, .input-field select {
    font-size: 16px;
    padding: 12px 18px;
  }
  .fields-group {
    width: 100%;
    gap: 16px;
  }
  
  /* Adjusting heights/sizes to avoid overflow */
  .hero-icon, .hero-icon-spacer {
    width: clamp(100px, 12vw, 180px);
    height: clamp(113px, 14vw, 204px);
  }
  .service-card {
    height: 90px;
  }
  .service-card::before {
    height: 90px;
  }
  .card-icon {
    width: 65px;
    height: 65px;
  }
  .card-icon.has-svg-circle img {
    width: 65px;
    height: 65px;
  }
  .card-label {
    left: 80px;
    font-size: clamp(18px, 2vw, 22px); /* ensure specificity */
  }
  
  .btn-primary, .btn-secondary, .next-btn, .submit-btn {
    font-size: 16px;
    padding: 12px 16px;
  }
  .btn-secondary {
    width: auto;
    height: auto;
  }
  
  /* Options Grid scaling */
  .options-grid {
    gap: 16px;
  }
  .option-label {
    font-size: 14px;
    padding: 12px 16px;
  }
  .check-icon {
    width: 20px;
    height: 20px;
  }
  .check-icon svg {
    width: 12px;
    height: 12px;
  }
  
  .heading-thankyou {
    font-size: clamp(35px, 6vw, 75px) !important;
  }
  .heading-connected {
    font-size: clamp(16px, 2.5vw, 30px) !important;
  }
}
`;

for (const page of pages) {
    const cssPath = path.join(baseDir, page, 'style.css');
    if (fs.existsSync(cssPath)) {
        const content = fs.readFileSync(cssPath, 'utf8');

        if (!content.includes('Desktop PC Enhancements (<= 1500px)')) {
            fs.appendFileSync(cssPath, stylesBelow1500, 'utf8');
            console.log("Updated " + cssPath + " with 1500px styles.");
        } else {
            console.log("Already updated " + cssPath);
        }
    } else {
        console.log("File not found: " + cssPath);
    }
}
