import { addPropertyControls, ControlType } from "framer"
import React, { useState, useEffect, useRef, CSSProperties } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Inline SVG components ───────────────────────────────────────────────────

const ChevronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 8L17 12L13 16M7 8L11 12L7 16" stroke="url(#chevGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="chevGrad" x1="12" y1="8" x2="12" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="#999" />
      </linearGradient>
    </defs>
  </svg>
)

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.04 16.53V7.47C6.04 6.72 6.04 6.35 6.20 6.12C6.34 5.93 6.55 5.80 6.78 5.77C7.05 5.74 7.38 5.92 8.04 6.27L16.54 10.8C17.27 11.19 17.64 11.38 17.76 11.64C17.86 11.87 17.86 12.13 17.76 12.36C17.64 12.62 17.27 12.81 16.54 13.20L8.04 17.73C7.38 18.09 7.05 18.26 6.78 18.23C6.55 18.20 6.34 18.07 6.20 17.88C6.04 17.65 6.04 17.28 6.04 16.53Z" stroke="url(#playGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="playGrad" x1="11.94" y1="5.77" x2="11.94" y2="18.23" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="#999" />
      </linearGradient>
    </defs>
  </svg>
)

const UnionIcon = () => (
  <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.4664 0.234662C16.0083 -0.0782259 16.6763 -0.0782153 17.2183 0.234662L23.565 3.8997C24.1069 4.21261 24.4409 4.79052 24.441 5.4163V12.677C24.441 13.3033 24.1066 13.8819 23.564 14.1946L16.4009 18.3235L24.4478 22.969L18.4332 26.4417C17.8913 26.7544 17.224 26.7544 16.6822 26.4417L1.41264 17.6263L7.38725 14.139C7.93026 13.8221 8.60158 13.8207 9.14604 14.1351L16.4009 18.3226V9.6204C16.4009 9.30749 16.2334 9.01807 15.9624 8.86162L8.2437 4.40458L15.4664 0.234662Z" fill="white" />
  </svg>
)

const LineSep = () => (
  <svg width="6" height="33" viewBox="0 0 6 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.62 28.87V1.21" stroke="white" strokeWidth="2.42" strokeLinecap="round" />
  </svg>
)

// ─── Injected global CSS ──────────────────────────────────────────────────────

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700&display=swap');

.rv-wrap { font-family: 'Inter', sans-serif; }
.rv-wrap *, .rv-wrap *::before, .rv-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }

@keyframes rv-shake {
  0%,100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
.rv-shake { animation: rv-shake 0.4s ease !important; }

/* Conic border via ::before */
.rv-conic-border { position: relative; overflow: visible; }
.rv-conic-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(from 0deg at 50% 50%,
    rgba(255,255,255,0.12) 0deg, rgba(255,255,255,0.12) 65deg,
    rgba(255,255,255,0.5) 70deg, rgba(255,255,255,0.5) 110deg,
    rgba(255,255,255,0.12) 115deg, rgba(255,255,255,0.12) 245deg,
    rgba(255,255,255,0.5) 250deg, rgba(255,255,255,0.5) 290deg,
    rgba(255,255,255,0.12) 295deg, rgba(255,255,255,0.12) 360deg);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  transition: background 0.25s ease;
}
.rv-conic-border:hover::before { background: rgba(255,255,255,0.5); }

/* Checkbox */
.rv-opt input[type="checkbox"] { display: none; }
.rv-cb {
  width: 20px; height: 20px; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.3);
  background: transparent; flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s;
  position: relative;
}
.rv-opt input[type="checkbox"]:checked ~ .rv-cb { background: #0175ff; border-color: #0175ff; }
.rv-opt input[type="checkbox"]:checked ~ .rv-cb::after {
  content: '';
  position: absolute;
  left: 4px; top: 1px;
  width: 6px; height: 10px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
}

/* Waitlist glow */
.rv-waitlist-glow {
  position: absolute; inset: 0; border-radius: inherit;
  box-shadow: inset -3.19px 2.39px 7.17px 0px #0175ff, inset 2.39px -1.59px 6.37px 0px #0ef;
  pointer-events: none;
  transition: box-shadow 0.3s ease, background 0.3s ease;
}
.rv-waitlist:hover .rv-waitlist-glow {
  box-shadow: inset -3.19px 2.39px 7.17px 0px #0175ff, inset 2.39px -1.59px 6.37px 0px #0ef,
    inset 0px -4px 10px 0px rgba(0,238,255,0.9), 0px 6px 20px 0px rgba(0,238,255,0.4);
}

/* Input focus */
.rv-input:focus { border-color: rgba(55,175,249,0.5) !important; box-shadow: 0 0 12px rgba(0,149,255,0.15) !important; outline: none; }

/* Responsive layout adjustments */
@media (max-width: 1024px) {
  .rv-main-layout { padding-left: 40px !important; padding-right: 40px !important; }
  .rv-header { padding-left: 40px !important; padding-right: 40px !important; }
}

/* Mobile nav */
@media (max-width: 1023px) {
  .rv-desktop-cta { display: none !important; }
  .rv-hamburger { display: flex !important; }
  .rv-mobile-cta-li { display: flex !important; }
  .rv-nav-overlay {
    position: fixed !important; top: 0; left: 0;
    width: 100%; height: 100vh;
    background: rgba(0,0,0,0.97);
    backdrop-filter: blur(20px);
    display: flex !important; align-items: center; justify-content: center;
    z-index: 1000;
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity 0.35s ease, visibility 0.35s ease;
  }
  .rv-nav-overlay.open { opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
  .rv-nav-links { flex-direction: column !important; gap: 0 !important; align-items: center !important; }
  .rv-nav-links a { font-size: 22px !important; padding: 18px 30px !important; height: auto !important; }
}

@media (max-width: 768px) {
  .rv-main-layout { padding-left: 20px !important; padding-right: 20px !important; }
  .rv-header { padding-left: 20px !important; padding-right: 20px !important; height: 74px !important; }
  .rv-form-card { padding: 16px 20px 28px !important; }
  .rv-hero-btns { flex-direction: column !important; align-items: center !important; }
  .rv-cards-row { flex-direction: column !important; }
  .rv-two-col { flex-direction: column !important; }
  .rv-opts-grid { flex-direction: column !important; }
  .rv-field-row { width: 100% !important; }
  .rv-input { font-size: 16px !important; padding: 14px 18px !important; }
}

@media (max-width: 480px) {
  .rv-main-layout { padding-left: 15px !important; padding-right: 15px !important; }
  .rv-header { padding-left: 15px !important; padding-right: 15px !important; }
  .rv-form-card { padding: 16px 15px 24px !important; }
  .rv-opt { padding: 12px 14px !important; gap: 10px !important; }
  .rv-cb { width: 18px !important; height: 18px !important; }
  .rv-cb-label { font-size: 16px !important; }
}
`

// ─── Helpers ─────────────────────────────────────────────────────────────────

type FormData = {
  firstName: string; lastName: string; company: string; industry: string;
  email: string; phone: string; interests: string[]; timeline: string[]; budget: string[]; message: string;
}

const emptyForm = (): FormData => ({
  firstName: "", lastName: "", company: "", industry: "",
  email: "", phone: "", interests: [], timeline: [], budget: [], message: ""
})

function toggleArr(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
}

// ─── Shared Header ────────────────────────────────────────────────────────────

function Header({ navOpen, onToggleNav }: { navOpen: boolean; onToggleNav: () => void }) {
  const s: Record<string, CSSProperties> = {
    header: { position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: 94, padding: "0 50px", marginTop: 15 },
    logo: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
    logoText: { fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 22, color: "#fff", letterSpacing: 6, textTransform: "uppercase" as const },
    waitlist: { position: "absolute" as const, right: 23, top: "50%", transform: "translateY(-50%)", height: 37.5, width: 154, background: "#000", border: "none", borderRadius: 38, cursor: "pointer", overflow: "hidden" },
    waitlistLabel: { position: "absolute" as const, left: "calc(50% + 1px)", top: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", whiteSpace: "nowrap" as const },
    hamburger: { display: "none", flexDirection: "column" as const, justifyContent: "center", alignItems: "center", gap: 5, width: 40, height: 40, background: "none", border: "none", cursor: "pointer", zIndex: 1001, padding: 4, flexShrink: 0 },
    bar: { display: "block", width: 24, height: 2.5, background: "#fff", borderRadius: 2, transition: "transform 0.35s ease, opacity 0.25s ease" },
    bar2open: { opacity: 0 },
    bar1open: { transform: "translateY(7.5px) rotate(45deg)" },
    bar3open: { transform: "translateY(-7.5px) rotate(-45deg)" },
    navWrap: { position: "absolute" as const, left: "50%", transform: "translateX(calc(-50% - 11.55px))" },
    ul: { display: "flex", alignItems: "center", gap: 50, listStyle: "none", filter: "drop-shadow(0px 3.6px 3.6px rgba(0,0,0,0.25))" },
    a: { fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 18, color: "#fff", textDecoration: "none", letterSpacing: 0.36, display: "flex", alignItems: "center", height: 59, padding: "0 8px" },
  }

  const navItems = ["Home", "About", "Product", "Features"]

  return (
    <header className="rv-header" style={s.header}>
      <div style={s.logo}>
        <UnionIcon />
        <LineSep />
        <span style={s.logoText}>RYVON</span>
      </div>

      <div className={`rv-nav-overlay ${navOpen ? "open" : ""}`}>
        <ul className="rv-nav-links" style={s.ul}>
          {navItems.map(item => (
            <li key={item}><a href={`#${item.toLowerCase()}`} style={s.a}>{item}</a></li>
          ))}
          <li className="rv-mobile-cta-li" style={{ display: "none", justifyContent: "center", marginTop: 30 }}>
            <button className="rv-waitlist" style={{ ...s.waitlist, position: "relative", right: "auto", top: "auto", transform: "none", width: 180, height: 45 }}>
              <span style={s.waitlistLabel}>Join Waitlist</span>
              <span className="rv-waitlist-glow" />
            </button>
          </li>
        </ul>
      </div>

      <button className="rv-desktop-cta rv-waitlist" style={s.waitlist}>
        <span style={s.waitlistLabel}>Join Waitlist</span>
        <span className="rv-waitlist-glow" />
      </button>

      <button
        className="rv-hamburger"
        style={s.hamburger}
        onClick={onToggleNav}
        aria-label="Toggle navigation"
      >
        <span className="rv-ham-bar" style={{ ...s.bar, ...(navOpen ? s.bar1open : {}) }} />
        <span className="rv-ham-bar" style={{ ...s.bar, ...(navOpen ? s.bar2open : {}) }} />
        <span className="rv-ham-bar" style={{ ...s.bar, ...(navOpen ? s.bar3open : {}) }} />
      </button>
    </header>
  )
}

// ─── GlassButton / NextBtn ────────────────────────────────────────────────────

function GlassBtn({ onClick, children, style: extra }: { onClick?: (e: React.MouseEvent) => void; children: React.ReactNode; style?: CSSProperties }) {
  const s: CSSProperties = {
    position: "relative", display: "inline-flex", alignItems: "center", gap: 12,
    padding: "17px 20px", borderRadius: 100, background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(18px)", border: "none", color: "#fff",
    fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 20,
    textDecoration: "none", cursor: "pointer",
    transition: "transform 0.25s ease, background 0.25s ease",
    ...extra,
  }
  return (
    <motion.button
      className="rv-conic-border"
      style={s}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  )
}

// ─── Page 1 – Hero ────────────────────────────────────────────────────────────

function PageHero({ onNext }: { onNext: () => void }) {
  const s: Record<string, CSSProperties> = {
    main: { position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", minHeight: "calc(100vh - 160px)", padding: "0 75px 66px" },
    spacer: { width: 226, height: 256, flexShrink: 0 },
    heading: {
      maxWidth: 881, textAlign: "center", fontFamily: "'Inter',sans-serif", fontWeight: 700,
      fontSize: "clamp(28px,5vw,75px)", letterSpacing: 1.5, lineHeight: 1.2,
      background: "linear-gradient(180deg,#fff 0%,rgba(180,200,255,0.8) 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    },
    sub: { maxWidth: 1031, textAlign: "center", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "clamp(15px,2.2vw,26px)", color: "#fff", lineHeight: "140%" },
    btns: { display: "flex", gap: 29, alignItems: "flex-start", marginTop: 5 },
  }
  return (
    <main className="rv-main-layout" style={s.main}>
      <div style={s.spacer} />
      <motion.h1
        style={s.heading}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Build AI Employees for<br />Your Business
      </motion.h1>
      <motion.p
        style={s.sub}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Discover how AI automation can streamline your operations, reduce manual workload, and scale your business faster.
      </motion.p>
      <motion.div
        className="rv-hero-btns"
        style={s.btns}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlassBtn onClick={onNext}>
          <span>Get Started</span>
          <span style={{ display: "flex", alignItems: "center", width: 24, height: 24 }}><ChevronIcon /></span>
        </GlassBtn>
        <GlassBtn style={{ width: 203, height: 57, padding: "0 20px" }}>
          <span>Watch Demo</span>
          <span style={{ display: "flex", alignItems: "center", width: 24, height: 24 }}><PlayIcon /></span>
        </GlassBtn>
      </div>
    </main>
  )
}

// ─── Page 2 – Services ────────────────────────────────────────────────────────

function PageServices({ onNext }: { onNext: () => void }) {
  const cardS: CSSProperties = {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
    padding: "24px 20px", borderRadius: 16, background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)",
    flex: "1 1 200px", minWidth: 180,
  }
  const services = [
    { label: "AI SaaS Products", icon: "🤖" },
    { label: "AI Customer Support Bots", icon: "💬" },
    { label: "AI Agents for Business Workflows", icon: "⚙️" },
    { label: "AI Automation Systems", icon: "🔗" },
  ]
  return (
    <main className="rv-main-layout" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%", padding: "0 75px", minHeight: "calc(100vh - 160px)", justifyContent: "center" }}>
      <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(36px,5vw,75px)", textAlign: "center", letterSpacing: 1.5, background: "linear-gradient(180deg,#fff 0%,#fcf8f8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>What We Build</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 700 }}>
        <div className="rv-cards-row" style={{ display: "flex", gap: 16 }}>
          {services.slice(0, 2).map((s, i) => (
            <motion.div
              key={s.label}
              style={cardS}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -5, background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.3)" }}
            >
              <span style={{ fontSize: 36 }}>{s.icon}</span>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, color: "#fff", textAlign: "center" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="rv-cards-row" style={{ display: "flex", gap: 16 }}>
          {services.slice(2).map((s, i) => (
            <motion.div
              key={s.label}
              style={cardS}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -5, background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.3)" }}
            >
              <span style={{ fontSize: 36 }}>{s.icon}</span>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, color: "#fff", textAlign: "center" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <GlassBtn onClick={onNext}>
        <span>Next</span>
        <span style={{ display: "flex", alignItems: "center", width: 24, height: 24 }}><ChevronIcon /></span>
      </GlassBtn>
    </main>
  )
}

// ─── Form Card wrapper ────────────────────────────────────────────────────────

function FormCard({ children, shaking }: { children: React.ReactNode; shaking: boolean }) {
  return (
    <div
      className={`rv-conic-border rv-form-card ${shaking ? "rv-shake" : ""}`}
      style={{
        position: "relative", display: "flex", flexDirection: "column", alignItems: "center",
        gap: 15, width: 700, maxWidth: "100%", padding: "16px 40px 28px", borderRadius: 20,
        background: "rgba(0,0,0,0)", boxShadow: "0px 4px 33.5px 0px rgba(0,149,255,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
      }}
    >
      {children}
    </div>
  )
}

// ─── Shared input style ───────────────────────────────────────────────────────

const inputS: CSSProperties = {
  width: "100%", padding: "16px 22px", borderRadius: 9, background: "rgba(0,0,0,0)",
  border: "1px solid rgba(255,255,255,0.1)", color: "#fff",
  fontFamily: "'Inter',sans-serif", fontWeight: 200, fontSize: 18, letterSpacing: "-0.21px",
}

// ─── Page 3 – Personal Info ───────────────────────────────────────────────────

function PageStep1({ fd, onChange, onNext, onBack }: { fd: FormData; onChange: (k: keyof FormData, v: string) => void; onNext: () => void; onBack: () => void }) {
  const [shaking, setShaking] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const validate = () => {
    const e: Record<string, boolean> = {}
    if (!fd.firstName.trim()) e.firstName = true
    if (!fd.lastName.trim()) e.lastName = true
    if (!fd.email.trim()) e.email = true
    if (Object.keys(e).length) { setErrors(e); setShaking(true); setTimeout(() => setShaking(false), 500); return; }
    onNext()
  }

  const errBorder = (k: string): CSSProperties => errors[k] ? { borderColor: "rgba(255,80,80,0.6)", boxShadow: "0 0 10px rgba(255,80,80,0.15)" } : {}

  const row2: CSSProperties = { display: "flex", gap: 24, width: "100%" }

  return (
    <main className="rv-main-layout" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%", padding: "0 75px", minHeight: "calc(100vh - 160px)", justifyContent: "center" }}>
      <motion.h1
        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(28px,5vw,60px)", textAlign: "center", background: "linear-gradient(180deg,#fff 0%,#fcf8f8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        Request AI Consultation
      </motion.h1>
      <motion.p
        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, color: "#fff", textAlign: "center" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
      >
        Step 01/03
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}>
        <FormCard shaking={shaking}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 26, color: "#fff", textAlign: "center", width: "100%" }}>Let's Get Introduced</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
            <div className="rv-two-col" style={row2}>
              <input className="rv-input" style={{ ...inputS, ...errBorder("firstName") }} placeholder="First Name" value={fd.firstName} onChange={e => { onChange("firstName", e.target.value); setErrors(p => ({ ...p, firstName: false })) }} />
              <input className="rv-input" style={{ ...inputS, ...errBorder("lastName") }} placeholder="Last Name" value={fd.lastName} onChange={e => { onChange("lastName", e.target.value); setErrors(p => ({ ...p, lastName: false })) }} />
            </div>
            <div className="rv-two-col" style={row2}>
              <input className="rv-input" style={inputS} placeholder="Company" value={fd.company} onChange={e => onChange("company", e.target.value)} />
              <div style={{ position: "relative", flex: 1 }}>
                <select className="rv-input" style={{ ...inputS, appearance: "none", cursor: "pointer", color: fd.industry ? "#fff" : "rgba(255,255,255,0.7)", paddingRight: 40 }} value={fd.industry} onChange={e => onChange("industry", e.target.value)}>
                  <option value="" disabled>Industry</option>
                  {["Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Retail", "Other"].map(o => <option key={o} value={o.toLowerCase()} style={{ background: "#0a1428", color: "#fff" }}>{o}</option>)}
                </select>
                <span style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%) rotate(45deg)", width: 8, height: 8, borderRight: "1.5px solid rgba(255,255,255,0.7)", borderBottom: "1.5px solid rgba(255,255,255,0.7)", pointerEvents: "none" }} />
              </div>
            </div>
            <input className="rv-input" style={{ ...inputS, ...errBorder("email") }} placeholder="Email" type="email" value={fd.email} onChange={e => { onChange("email", e.target.value); setErrors(p => ({ ...p, email: false })) }} />
            <input className="rv-input" style={inputS} placeholder="Phone Number" type="tel" value={fd.phone} onChange={e => onChange("phone", e.target.value)} />
          </div>
        </FormCard>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
        <GlassBtn onClick={validate}>
          <span>Next</span>
          <span style={{ display: "flex", alignItems: "center", width: 24, height: 24 }}><ChevronIcon /></span>
        </GlassBtn>
      </motion.div>
      <motion.p
        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 20, textAlign: "center", color: "#fff", lineHeight: "130%", maxWidth: 770, marginTop: 20 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
      >
        Tell us about your company and we'll explore how AI can help grow your business.
      </motion.p>
    </main>
  )
}

// ─── Page 4 – Interests ───────────────────────────────────────────────────────

function CheckOpt({ label, name, value, checked, onChange }: { label: string; name: string; value: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="rv-opt" style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer", padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", transition: "border-color 0.2s", borderColor: checked ? "rgba(1,117,255,0.5)" : "rgba(255,255,255,0.08)" }}>
      <input type="checkbox" name={name} value={value} checked={checked} onChange={onChange} />
      <span className="rv-cb" />
      <span className="rv-cb-label" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 18, color: "#fff" }}>{label}</span>
    </label>
  )
}

function PageStep2({ fd, onToggle, onNext, onBack }: { fd: FormData; onToggle: (val: string) => void; onNext: () => void; onBack: () => void }) {
  const options = [
    { value: "ai-saas", label: "AI SaaS product development" },
    { value: "ai-automation", label: "AI automation for operations" },
    { value: "ai-chatbot", label: "AI chatbot / support AI" },
    { value: "investment", label: "Investment / Partnership" },
  ]
  return (
    <main className="rv-main-layout" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%", padding: "0 75px", minHeight: "calc(100vh - 160px)", justifyContent: "center" }}>
      <motion.button onClick={onBack} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ alignSelf: "flex-start", background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 16 }}>← back</motion.button>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, color: "#fff", textAlign: "center" }}>Step 02/03</motion.p>

      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 120 }}>
        <FormCard shaking={false}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 26, color: "#fff", textAlign: "center", width: "100%" }}>What are you exploring?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            {options.map((o, i) => (
              <motion.div key={o.value} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}>
                <CheckOpt label={o.label} name="interest" value={o.value} checked={fd.interests.includes(o.value)} onChange={() => onToggle(o.value)} />
              </motion.div>
            ))}
          </div>
        </FormCard>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <GlassBtn onClick={onNext}>
          <span>Next</span>
          <span style={{ display: "flex", alignItems: "center", width: 24, height: 24 }}><ChevronIcon /></span>
        </GlassBtn>
      </motion.div>
    </main>
  )
}

// ─── Page 5 – Timeline & Budget ───────────────────────────────────────────────

function PageStep3({ fd, onToggleTimeline, onToggleBudget, onNext, onBack }: { fd: FormData; onToggleTimeline: (v: string) => void; onToggleBudget: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const timelines = [{ v: "immediately", l: "Immediately" }, { v: "1-3-months", l: "1-3 Months" }, { v: "3-6-months", l: "3-6 Months" }, { v: "exploring", l: "Exploring" }]
  const budgets = [{ v: "5k-10k", l: "$5k–$10k (MVP)" }, { v: "10k-50k", l: "$10k–$50k (Standard)" }, { v: "50k-plus", l: "$50k+ (Enterprise)" }]
  return (
    <main className="rv-main-layout" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%", padding: "0 75px", minHeight: "calc(100vh - 160px)", justifyContent: "center" }}>
      <motion.button onClick={onBack} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ alignSelf: "flex-start", background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 16 }}>← back</motion.button>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, color: "#fff", textAlign: "center" }}>Step 03/03</motion.p>

      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 120 }} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <FormCard shaking={false}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 22, color: "#fff", textAlign: "center", width: "100%" }}>When are you planning to implement AI?</p>
          <div className="rv-opts-grid" style={{ display: "flex", gap: 12, width: "100%", flexWrap: "wrap" as const }}>
            {timelines.map((t, i) => (
              <motion.div key={t.v} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.05) }} style={{ flex: "1 1 200px" }}>
                <CheckOpt label={t.l} name="timeline" value={t.v} checked={fd.timeline.includes(t.v)} onChange={() => onToggleTimeline(t.v)} />
              </motion.div>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 22, color: "#fff", textAlign: "center", width: "100%", marginTop: 8 }}>Budget range</p>
          <div className="rv-opts-grid" style={{ display: "flex", gap: 12, width: "100%", flexWrap: "wrap" as const }}>
            {budgets.map((b, i) => (
              <motion.div key={b.v} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + (i * 0.05) }} style={{ flex: "1 1 200px" }}>
                <CheckOpt label={b.l} name="budget" value={b.v} checked={fd.budget.includes(b.v)} onChange={() => onToggleBudget(b.v)} />
              </motion.div>
            ))}
          </div>
        </FormCard>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <GlassBtn onClick={onNext}>
          <span>Next</span>
          <span style={{ display: "flex", alignItems: "center", width: 24, height: 24 }}><ChevronIcon /></span>
        </GlassBtn>
      </motion.div>
    </main>
  )
}

// ─── Page 6 – Message & Submit ────────────────────────────────────────────────

function PageMessage({ fd, onChange, onSubmit, submitting, onBack }: { fd: FormData; onChange: (v: string) => void; onSubmit: () => void; submitting: boolean; onBack: () => void }) {
  const [shaking, setShaking] = useState(false)

  const handleSubmit = () => {
    if (!fd.message.trim()) { setShaking(true); setTimeout(() => setShaking(false), 500); return; }
    onSubmit()
  }

  return (
    <main className="rv-main-layout" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%", padding: "0 75px", minHeight: "calc(100vh - 160px)", justifyContent: "center" }}>
      <motion.button onClick={onBack} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ alignSelf: "flex-start", background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 16 }}>← back</motion.button>
      <motion.h1
        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(28px,5vw,60px)", textAlign: "center", background: "linear-gradient(180deg,#fff 0%,#fcf8f8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
      >
        Request AI Consultation
      </motion.h1>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <FormCard shaking={shaking}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 26, color: "#fff", textAlign: "center", width: "100%" }}>Leave a text!</p>
          <textarea
            className="rv-input"
            style={{ ...inputS, width: "100%", minHeight: 157, resize: "vertical" as const, padding: "16px 22px", borderRadius: 9 }}
            placeholder="Tell us about your AI idea or workflow challenge"
            value={fd.message}
            onChange={e => onChange(e.target.value)}
          />
        </FormCard>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <GlassBtn onClick={handleSubmit} style={submitting ? { opacity: 0.6, pointerEvents: "none" } : {}}>
          <span>{submitting ? "Submitting…" : "Submit"}</span>
          <span style={{ display: "flex", alignItems: "center", width: 24, height: 24 }}><ChevronIcon /></span>
        </GlassBtn>
      </motion.div>
    </main>
  )
}

// ─── Page 7 – Thank You ───────────────────────────────────────────────────────

function PageThankYou({ onRestart }: { onRestart: () => void }) {
  return (
    <main className="rv-main-layout" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, width: "100%", minHeight: "calc(100vh - 160px)", padding: "0 75px" }}>
      <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: "spring" }} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(40px,7vw,96px)", textAlign: "center", background: "linear-gradient(180deg,#fff 0%,rgba(100,160,255,0.8) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0, lineHeight: 1 }}>Thank You !!</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "clamp(18px,3vw,36px)", textAlign: "center", color: "#fff", margin: 0 }}>You're now connected with <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: 4 }}>RYVON</span></motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 20, textAlign: "center", color: "rgba(255,255,255,0.8)", marginTop: 16 }}>Our team will review your request and reach out shortly.</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 16 }}>Meanwhile, explore our AI systems</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, type: "spring", stiffness: 200 }}>
        <GlassBtn onClick={onRestart}>
          <span>View Ryvon Demo</span>
          <span style={{ display: "flex", alignItems: "center", width: 24, height: 24 }}><ChevronIcon /></span>
        </GlassBtn>
      </motion.div>
    </main>
  )
}

// ─── Background per step ──────────────────────────────────────────────────────

const BG_GRADIENTS = [
  "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(30,60,180,0.35) 0%, rgba(0,0,0,0) 70%), linear-gradient(180deg,#020818 0%,#000 100%)",
  "radial-gradient(ellipse 70% 60% at 60% 20%, rgba(0,80,200,0.3) 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg,#010a1a 0%,#000 100%)",
  "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(0,60,160,0.4) 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg,#010b20 0%,#000 100%)",
  "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(0,60,160,0.4) 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg,#010b20 0%,#000 100%)",
  "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(0,60,160,0.4) 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg,#010b20 0%,#000 100%)",
  "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(0,60,160,0.4) 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg,#010b20 0%,#000 100%)",
  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(10,20,80,0.7) 0%, rgba(0,0,10,0) 70%), linear-gradient(180deg,#00020f 0%,#000 100%)",
]

// ─── Root Component ───────────────────────────────────────────────────────────

export default function RyvonFunnel({ apiEndpoint }: { apiEndpoint: string }) {
  const [step, setStep] = useState(0)
  const [fd, setFd] = useState<FormData>(emptyForm())
  const [navOpen, setNavOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const styleInjected = useRef(false)

  // Inject global CSS once
  useEffect(() => {
    if (styleInjected.current) return
    styleInjected.current = true
    const el = document.createElement("style")
    el.textContent = GLOBAL_CSS
    document.head.appendChild(el)
    return () => { try { document.head.removeChild(el) } catch { } }
  }, [])

  const updateFd = (k: keyof FormData, v: string) => {
    setFd(prev => ({ ...prev, [k]: v }))
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fd),
      })
      const json = await res.json()
      if (json.success) {
        setFd(emptyForm())
        setStep(6)
      } else {
        throw new Error(json.message)
      }
    } catch (err) {
      alert("Could not save your data. Please check the server is running.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="rv-wrap"
      style={{
        width: "100%", minHeight: "100vh", background: "#000",
        overflow: "hidden", display: "flex", flexDirection: "column",
      }}
    >
      {/* Dynamic background */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0,
          background: BG_GRADIENTS[step] || BG_GRADIENTS[0],
          transition: "background 0.6s ease",
          pointerEvents: "none",
        }}
      />

      {/* Hero cube (page 1 only) */}
      {step === 0 && (
        <div style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          top: "calc(50vh - 280px)", width: "clamp(120px,15vw,226px)", height: "clamp(136px,17vw,256px)",
          borderRadius: "0 0 70px 0", overflow: "hidden", mixBlendMode: "plus-lighter",
          zIndex: 3, pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(0,150,255,0.5) 0%, rgba(0,60,200,0.3) 50%, rgba(0,200,255,0.4) 100%)",
        }} />
      )}

      {/* Header */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Header navOpen={navOpen} onToggleNav={() => setNavOpen(o => !o)} />
      </div>

      {/* Page content */}
      <div style={{ position: "relative", zIndex: 5, flex: 1, display: "flex", flexDirection: "column" }}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", flex: 1, display: "flex" }}>
              <PageHero onNext={() => setStep(1)} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="step-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", flex: 1, display: "flex" }}>
              <PageServices onNext={() => setStep(2)} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step-2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", flex: 1, display: "flex" }}>
              <PageStep1 fd={fd} onChange={updateFd} onNext={() => setStep(3)} onBack={() => setStep(1)} />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step-3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", flex: 1, display: "flex" }}>
              <PageStep2 fd={fd} onToggle={v => setFd(p => ({ ...p, interests: toggleArr(p.interests, v) }))} onNext={() => setStep(4)} onBack={() => setStep(2)} />
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="step-4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", flex: 1, display: "flex" }}>
              <PageStep3 fd={fd} onToggleTimeline={v => setFd(p => ({ ...p, timeline: toggleArr(p.timeline, v) }))} onToggleBudget={v => setFd(p => ({ ...p, budget: toggleArr(p.budget, v) }))} onNext={() => setStep(5)} onBack={() => setStep(3)} />
            </motion.div>
          )}
          {step === 5 && (
            <motion.div key="step-5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", flex: 1, display: "flex" }}>
              <PageMessage fd={fd} onChange={v => updateFd("message", v)} onSubmit={submit} submitting={submitting} onBack={() => setStep(4)} />
            </motion.div>
          )}
          {step === 6 && (
            <motion.div key="step-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", flex: 1, display: "flex" }}>
              <PageThankYou onRestart={() => setStep(0)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 10, padding: "22px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "clamp(14px,1.5vw,22px)", color: "#fff", letterSpacing: 0.44, whiteSpace: "nowrap" }}>
          AI Bharat Expo - Connect with&nbsp;<span style={{ fontWeight: 700, letterSpacing: 4 }}>Ryvon</span>
        </p>
      </footer>
    </div>
  )
}

addPropertyControls(RyvonFunnel, {
  apiEndpoint: {
    type: ControlType.String,
    title: "API Endpoint",
    defaultValue: "https://ryvon-form-lead.onrender.com/api/leads",
  },
})
