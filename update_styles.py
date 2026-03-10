import os

base_dir = r"C:\Users\user\Downloads\Ryvon-Form-Lead-main\Ryvon-Form-Lead-main"
const pages = ["page1", "page2", "page3", "page4", "page5", "page6", "page7"];

responsive_css = """

/* ===== Universal Responsive & Animation Fixes ===== */
@media (max-width: 1023px) {
  .cards-row {
    flex-direction: column;
    gap: 30px;
  }
  .options-grid, .rv-opts-grid {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
}
@media (max-width: 768px) {
  .hero-buttons {
    flex-direction: column;
    width: 100%;
  }
  .field-row.two-col, .rv-two-col {
    flex-direction: column;
    gap: 16px;
  }
  .form-card {
    width: 100%;
    padding: 24px 20px;
  }
  .section-heading, .hero-heading {
    font-size: clamp(32px, 8vw, 50px);
  }
  .service-card {
    width: 100%;
  }
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.hero-heading, .section-heading, .form-title {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity;
}
.hero-subtitle, .step-label {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
  will-change: transform, opacity;
}
.form-card, .cards-container, .hero-buttons, .body-text {
  opacity: 0;
  animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
  will-change: transform, opacity;
}
.next-btn, .btn-primary, .btn-secondary, .submit-btn {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
  will-change: transform, opacity;
}

/* Enhancing Hover Effects for interactiveness */
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(1, 117, 255, 0.2);
}
"""

for page in pages:
    css_path = os.path.join(base_dir, page, "style.css")
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        if "Universal Responsive & Animation Fixes" not in content:
            with open(css_path, "a", encoding="utf-8") as f:
                f.write(responsive_css)
            print(f"Updated {css_path}")
        else:
            print(f"Already updated {css_path}")
    else:
        print(f"File not found: {css_path}")
