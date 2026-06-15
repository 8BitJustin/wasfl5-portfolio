import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
//  IMAGE PATHS
//  All images live in /public/images/.
//  To swap an image, just change the filename here.
//  No need to dig through the component code below.
// ============================================================
const IMAGES = {
  // Hero background — shown fullscreen at the top of the page
  hero: "/images/hero-live.jpg",

  // Before/After slider
  // "stock"   = right side  (how it looked when you got it)
  // "current" = left side   (how it looks now)
  stock:   "/images/stock.jpg",
  current: "/images/current.jpg",

  // Gallery photos — add or remove entries to update the gallery.
  // Each entry: { src: "/images/filename.jpg", caption: "Description" }
  gallery: [
    { src: "/images/car001.jpg", caption: "Rear three-quarter" },
    { src: "/images/car002.jpg", caption: "Front three-quarter" },
    { src: "/images/car003.jpg", caption: "Front three-quarter" },
    { src: "/images/car004.jpg", caption: "Front three-quarter" },
    { src: "/images/car005.jpg", caption: "Front three-quarter" },
    { src: "/images/car006.jpg", caption: "Front three-quarter" },
    { src: "/images/car007.jpg", caption: "Front three-quarter" },
    { src: "/images/car008.jpg", caption: "Front three-quarter" },
  ],
};

// ============================================================
//  BUILD LIST CONFIG
//  Set SHOW_PRICES to false to hide all pricing publicly.
//  Add mods under the relevant category, or add a new category.
//  Each mod: { name, brand, desc, cost }
// ============================================================
const SHOW_PRICES = true;

const MODS = {
  "Suspension": [
    { name: "Lowering Springs",
      brand: "Eibach",
      desc: "Pro-Kit · Installed by CTech",
      cost: 465.48
    },
    // { name: "Springs Installation",
    //   brand: "CTech Motorsports",
    //   desc: "Labor",
    //   cost: 420.00
    // },
    // { name: "Alignment",
    //   brand: "BSP Motorsports",
    //   desc: "Post-install alignment",
    //   cost: 247.97
    // },
  ],
  "Wheels & Tires": [
    { name: "Wheel Spacers",
      brand: "Bonoss",
      desc: "15mm front · 20mm rear",
      cost: 258.00
    },
  ],
  "Exterior": [
    { name: "Front Lip Splitter",
      brand: "BayOptics",
      desc: "Gloss Black",
      cost: 150.00
    },
    { name: "Side Skirts",
      brand: "Aeroflow Dynamics",
      desc: "Gloss Black",
      cost: 350.00
    },
  ],
  "Exterior Lighting": [
    { name: "Underglow Kit",
      brand: "ELGlow",
      desc: "Universal RGB underglow",
      cost: 245.00 },
  ],
};

// ============================================================
//  UPCOMING MODS
//  Add planned mods here. They show as cards in the Upcoming section.
//  cat options: "Performance" | "Wheels & Tires" | "Exterior" | "Interior"
// ============================================================
const UPCOMING = [
  { name: "Exhaust System",      note: "Cat-back or axle-back, brand TBD",           cat: "Performance"    },
  { name: "Intercooler Upgrade", note: "Target heat soak under hard driving",         cat: "Performance"    },
  { name: "Wheel Upgrade",       note: "Lightweight forged set, TBD",                cat: "Wheels & Tires" },
  { name: "Window Tint",         note: "Ceramic tint all around",                    cat: "Exterior"       },
  { name: "Short Shifter",       note: "Tighten up the 6-speed throws",              cat: "Interior"       },
  { name: "Intake",              note: "Cold air or short ram, under consideration", cat: "Performance"    },
];

// ============================================================
//  GLOBAL STYLES
//  All CSS lives here as a template string injected via <style>.
//  When splitting into separate files, move each block to its
//  corresponding component's .css file.
// ============================================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --red: #C8102E; --red-dim: #8B0B20; --obsidian: #080809;
    --surface: #111113; --surface2: #1A1A1E; --surface3: #222228;
    --platinum: #C8C8CC; --chrome: #8A8A96; --muted: #55555E;
    --border: rgba(200,200,204,0.08); --bh: rgba(200,200,204,0.18);
  }
  html { scroll-behavior: smooth; }
  body { background: var(--obsidian); color: var(--platinum); font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.6; overflow-x: hidden; }

  /* NAV — fixed top bar, frosts on scroll */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; justify-content: space-between; align-items: center; padding: 18px 48px; transition: background .3s, backdrop-filter .3s; }
  .nav.scrolled { background: rgba(8,8,9,.9); backdrop-filter: blur(12px); border-bottom: .5px solid var(--border); }
  .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: .06em; color: #fff; }
  .nav-logo span { color: var(--red); }
  .nav-right { display: flex; align-items: center; gap: 24px; }
  .nav-links { display: flex; gap: 24px; list-style: none; }
  .nav-links a { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--chrome); text-decoration: none; transition: color .2s; }
  .nav-links a:hover { color: #fff; }
  .nav-ig { display: flex; align-items: center; gap: 5px; color: var(--muted); text-decoration: none; font-size: 12px; transition: color .2s; }
  .nav-ig:hover { color: var(--platinum); }
  .nav-ig svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; }
  .nav-hamburger {
    display: none; /* desktop hidden */
    flex-direction: column;
    gap: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px;
  }

  .nav-hamburger span {
    width: 22px;
    height: 2px;
    background: #fff;
    display: block;
  }
  .mobile-menu {
    display: none; /* 👈 ADD THIS */
  }

  /* HERO — fullscreen opening section */
  .hero { position: relative; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
  .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 40%; }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(8,8,9,.15) 0%, rgba(8,8,9,.05) 25%, rgba(8,8,9,.55) 65%, rgba(8,8,9,.97) 100%); }
  .scan-line { position: absolute; left: 0; right: 0; height: 1px; background: var(--red); opacity: 0; animation: scan 2.4s ease-out .3s forwards; }
  @keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: .8; } 85% { opacity: .4; } 100% { top: 100%; opacity: 0; } }
  .hero-content { position: relative; z-index: 2; padding: 0 48px 56px; max-width: 960px; margin: 0 auto; text-align: center; }
  .hero-eyebrow {
    display: inline-block;
    font-size: 11px;
    letter-spacing: .25em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--red);
    background: rgba(8, 8, 9, 0.55);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,.08);
    box-shadow: 0 8px 24px rgba(0,0,0,.25);
    padding: 10px 14px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px, 10vw, 116px); line-height: .9; letter-spacing: .01em; color: #fff; margin-bottom: 22px; }
  .hero-title span { color: var(--red); }
  .hero-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    background: rgba(8, 8, 9, 0.55);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,.08);
    box-shadow: 0 8px 24px rgba(0,0,0,.25);
    padding: 18px 28px;
    border-radius: 10px;
    width: fit-content;
    margin: 0 auto;
  }
  .hero-stat { display: flex; flex-direction: column; gap: 2px; }
  .hs-label { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--chrome); }
  .hs-val { font-size: 13px; font-weight: 500; color: var(--platinum); }
  .hs-div { width: 1px; background: var(--bh); align-self: stretch; margin: 4px 0; }
  .hero-ig { display: flex; align-items: center; gap: 6px; text-decoration: none; color: var(--chrome); font-size: 13px; font-weight: 500; transition: color .2s; padding-top: 2px; }
  .hero-ig:hover { color: var(--platinum); }
  .hero-ig svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; flex-shrink: 0; }

  /* SHARED SECTION STYLES */
  .section { padding: 80px 48px; max-width: 1020px; margin: 0 auto; }
  .eyebrow { font-size: 10px; letter-spacing: .25em; text-transform: uppercase; color: var(--red); margin-bottom: 8px; font-weight: 500; }
  .sec-title { font-family: 'Bebas Neue', sans-serif; font-size: 44px; letter-spacing: .03em; color: #fff; margin-bottom: 40px; font-weight: 400; }

  /* BEFORE/AFTER SLIDER */
  .ba-section { padding: 80px 0; background: var(--surface); border-top: .5px solid var(--border); border-bottom: .5px solid var(--border); }
  .ba-inner { max-width: 1020px; margin: 0 auto; padding: 0 48px; }
  .ba-desc { font-size: 13px; color: var(--muted); margin-bottom: 28px; }
  .ba-wrap { position: relative; width: 100%; max-width: 900px; border-radius: 8px; overflow: hidden; user-select: none; touch-action: pan-y; cursor: col-resize; line-height: 0; }
  .ba-base { display: block; width: 100%; height: auto; pointer-events: none; }
  .ba-current-clip { position: absolute; top: 0; left: 0; height: 100%; overflow: hidden; }

  .ba-current-clip img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: none;
    height: 100%;
    object-fit: cover;
    object-position: left center;
    pointer-events: none;
  }

  .ba-divider { position: absolute; top: 0; bottom: 0; width: 2px; background: #fff; transform: translateX(-50%); pointer-events: none; z-index: 3; }
  .ba-handle { position: absolute; top: 50%; width: 40px; height: 40px; background: #fff; border-radius: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; z-index: 4; box-shadow: 0 2px 12px rgba(0,0,0,.5); pointer-events: none; }
  .ba-handle svg { width: 18px; height: 18px; stroke: #080809; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  /* Labels clipped inside their own half — vanish when that side collapses */
  .ba-current-label-wrap { position: absolute; top: 0; left: 0; bottom: 0; overflow: hidden; pointer-events: none; z-index: 5; }
  .ba-stock-label-wrap   { position: absolute; top: 0; bottom: 0; overflow: hidden; pointer-events: none; z-index: 5; }
  .ba-lbl { position: absolute; bottom: 14px; font-size: 14px; letter-spacing: .18em; text-transform: uppercase; font-weight: 600; padding: 10px 10px; border-radius: 3px; font-family: 'Inter', sans-serif; white-space: nowrap; }
  .ba-lbl-current { left: 14px;  background: rgba(200,16,46,.15); color: var(--red);    border: .5px solid rgba(200,16,46,.3); }
  .ba-lbl-stock   { right: 14px; background: rgba(8,8,9,.7);      color: var(--chrome); border: .5px solid var(--bh); }

  /* BUILD LIST */
  .mod-cat { margin-bottom: 44px; }
  .cat-lbl { font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: var(--chrome); padding-bottom: 12px; border-bottom: .5px solid var(--border); margin-bottom: 4px; }
  .mod-item { display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: start; padding: 14px 0; border-bottom: .5px solid var(--border); transition: border-color .2s; }
  .mod-item:hover { border-color: var(--bh); }
  .mod-item:last-child { border-bottom: none; }
  .mod-name  { font-size: 14px; font-weight: 500; color: var(--platinum); margin-bottom: 2px; }
  .mod-brand { font-size: 12px; color: var(--chrome); }
  .mod-desc  { font-size: 12px; color: var(--muted); margin-top: 3px; }
  .mod-cost  { font-size: 13px; font-weight: 500; color: var(--platinum); white-space: nowrap; text-align: right; }
  .total-bar { display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; background: var(--surface2); border: .5px solid var(--border); border-radius: 6px; margin-top: 32px; }
  .total-lbl { font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: var(--chrome); }
  .total-amt { font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: .04em; color: #fff; }

  /* UPCOMING */
  .up-section { padding: 80px 0; }
  .up-inner { max-width: 1020px; margin: 0 auto; padding: 0 48px; }
  .up-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  .up-card { padding: 20px; background: var(--surface2); border: .5px solid var(--border); border-radius: 6px; transition: border-color .25s, background .25s; }
  .up-card:hover { border-color: var(--red-dim); background: var(--surface3); }
  .up-icon { width: 26px; height: 26px; margin-bottom: 12px; opacity: .5; }
  .up-icon svg { width: 100%; height: 100%; }
  .up-name { font-size: 14px; font-weight: 500; color: var(--platinum); margin-bottom: 4px; }
  .up-note { font-size: 12px; color: var(--muted); }
  .up-pill { display: inline-block; margin-top: 10px; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; padding: 3px 8px; background: rgba(200,16,46,.1); color: var(--red); border-radius: 3px; border: .5px solid rgba(200,16,46,.25); }

  /* GALLERY */
  .gal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
  .gal-cell { aspect-ratio: 4/3; background: var(--surface2); border: .5px solid var(--border); border-radius: 6px; overflow: hidden; cursor: pointer; }
  .gal-cell img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
  .gal-cell:hover img { transform: scale(1.04); }
  .lightbox { position: fixed; inset: 0; z-index: 200; background: rgba(8,8,9,.95); display: flex; align-items: center; justify-content: center; }
  .lightbox img { max-width: 92vw; max-height: 88vh; object-fit: contain; border-radius: 4px; }
  .lb-close { position: fixed; top: 18px; right: 24px; font-size: 32px; color: var(--chrome); cursor: pointer; background: none; border: none; line-height: 1; transition: color .2s; z-index: 201; }
  .lb-close:hover { color: #fff; }

  /* FOOTER */
  .footer { border-top: .5px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; color: var(--muted); font-size: 12px; max-width: 1020px; margin: 0 auto; }
  .footer-ig { display: flex; align-items: center; gap: 6px; color: var(--muted); text-decoration: none; transition: color .2s; }
  .footer-ig:hover { color: var(--platinum); }
  .footer-ig svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; }
  .footer-mark { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: .08em; color: var(--surface3); }

  /* MOBILE */
  @media (max-width: 768px) {

  .nav {
    padding: 14px 20px;
  }

  .nav-links {
    display: none;
  }

  .nav-ig span {
    display: none;
  }

  /* 🔥 ADD THIS */
  .nav-hamburger {
    display: flex;
  }

  /* 📱 MOBILE MENU PANEL */
  .mobile-menu {
    position: fixed;
    top: 64px;
    left: 20px;
    right: 20px;

    background: rgba(8,8,9,.95);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 12px;

    padding: 18px;

    display: flex;
    flex-direction: column;
    gap: 14px;

    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;

    transition: all .25s ease;
  }

  .mobile-menu.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .mobile-menu a {
    color: var(--chrome);
    text-decoration: none;
    font-size: 12px;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .mobile-menu a:hover {
    color: #fff;
  }
}
  @media (max-width: 480px) {
    .up-grid  { grid-template-columns: 1fr; }
    .gal-grid { grid-template-columns: 1fr; }
  }
`;

// Reusable Instagram icon used in Nav, Hero, and Footer
const IgIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

// ── NAV ─────────────────────────────────────────────────────
// Fixed top navigation. Gains a frosted background on scroll.
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 👈 ADD THIS

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>

      <div className="nav-logo">
        WASFL5 · <span>TYPE S</span>
      </div>

      <div className="nav-right">

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className="nav-links">
          <li><a href="#before-after">Before/After</a></li>
          <li><a href="#mods">Build List</a></li>
          <li><a href="#upcoming">Upcoming</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>

        <a
          href="https://instagram.com/wasfl5"
          target="_blank"
          rel="noreferrer"
          className="nav-ig"
        >
          <IgIcon />
          <span>wasfl5</span>
        </a>
      </div>

      <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
        <a href="#before-after" onClick={() => setMenuOpen(false)}>Before/After</a>
        <a href="#mods" onClick={() => setMenuOpen(false)}>Build List</a>
        <a href="#upcoming" onClick={() => setMenuOpen(false)}>Upcoming</a>
        <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
      </div>

    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────
// Fullscreen opener with background image, animated scan line,
// and car spec stats pinned to the bottom.
function Hero() {
  return (
    <div className="hero">
      <img className="hero-img" src={IMAGES.hero} alt="2025 Acura Integra Type S" />
      <div className="hero-overlay" />
      <div className="scan-line" />
      <div className="hero-content">
        <div className="hero-eyebrow">Personal Build · Collin County, TX</div>
        <h1 className="hero-title">2025<br />INTEGRA<br /><span>TYPE S</span></h1>
        <div className="hero-meta">
          <div className="hero-stat"><div className="hs-label">Color</div><div className="hs-val">Majestic Black Pearl</div></div>
          <div className="hs-div" />
          <div className="hero-stat"><div className="hs-label">Engine</div><div className="hs-val">2.0L Turbo K20C4</div></div>
          <div className="hs-div" />
          <div className="hero-stat"><div className="hs-label">Output</div><div className="hs-val">320 hp · 310 lb-ft</div></div>
          <div className="hs-div" />
          <div className="hero-stat"><div className="hs-label">Trans</div><div className="hs-val">6-Speed Manual</div></div>
          <div className="hs-div" />
          <div className="hero-stat"><div className="hs-label">Purchased</div><div className="hs-val">September 2025</div></div>
          {/* <div className="hs-div" /> */}
          {/* <div className="hero-stat">
            <div className="hs-label">Instagram</div>
            <a href="https://instagram.com/wasfl5" target="_blank" rel="noreferrer" className="hero-ig">
              <IgIcon />@wasfl5
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

// ── BEFORE / AFTER SLIDER ────────────────────────────────────
// Stock image sits on the right as the base layer.
// Current build clips in from the left as you drag right.
// Each label lives inside a clipping div matching its side —
// it vanishes naturally when that side collapses to zero width.
function BeforeAfter() {
  const [pct, setPct] = useState(50); // slider position as % from left
  const dragging = useRef(false);
  const wrapRef  = useRef(null);

  const setFromX = useCallback((clientX) => {
    const rect = wrapRef.current.getBoundingClientRect();
    setPct(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e) => { if (dragging.current) setFromX(e.clientX); };
    const up   = ()  => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [setFromX]);

  const currentWidth = `${pct}%`;       // left side  = current build
  const stockWidth   = `${100 - pct}%`; // right side = stock

  return (
    <section className="ba-section" id="before-after">
      <div className="ba-inner">
        <div className="eyebrow">The Transformation</div>
        <h2 className="sec-title">Before / After</h2>
        <p className="ba-desc">Drag to compare stock to current build.</p>
        <div
          className="ba-wrap"
          ref={wrapRef}
          onMouseDown={(e) => { dragging.current = true; setFromX(e.clientX); }}
          onTouchStart={(e) => { dragging.current = true; setFromX(e.touches[0].clientX); }}
          onTouchMove={(e)  => { if (dragging.current) setFromX(e.touches[0].clientX); }}
          onTouchEnd={()    => { dragging.current = false; }}
        >
          {/* Stock — base image that sets the slider height */}
          <img className="ba-base" src={IMAGES.stock} alt="Stock" draggable={false} />

          {/* Current — clips in from the left as pct increases */}
          <div className="ba-current-clip" style={{ width: currentWidth }}>
            <img src={IMAGES.current} alt="Current build" draggable={false} />
          </div>

          {/* Divider line + drag handle */}
          <div className="ba-divider" style={{ left: `${pct}%` }} />
          <div className="ba-handle"  style={{ left: `${pct}%` }}>
            <svg viewBox="0 0 24 24"><path d="M8 9l-4 3 4 3M16 9l4 3-4 3" /></svg>
          </div>

          {/* "Current" label — clipped to left half, hides when dragged far right */}
          <div className="ba-current-label-wrap" style={{ width: currentWidth }}>
            <span className="ba-lbl ba-lbl-current">Current</span>
          </div>

          {/* "Stock" label — clipped to right half, hides when dragged far left */}
          <div className="ba-stock-label-wrap" style={{ width: stockWidth, left: `${pct}%` }}>
            <span className="ba-lbl ba-lbl-stock">Stock</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── BUILD LIST ───────────────────────────────────────────────
// Renders MODS grouped by category with optional pricing.
// Total is shown at the bottom when SHOW_PRICES is true.
function BuildList() {
  const total = Object.values(MODS).flat().reduce((s, m) => s + m.cost, 0);
  return (
    <section className="section" id="mods">
      <div className="eyebrow">Current Modifications</div>
      <h2 className="sec-title">Build List</h2>
      {Object.entries(MODS).map(([cat, items]) => (
        <div className="mod-cat" key={cat}>
          <div className="cat-lbl">{cat}</div>
          {items.map((m, i) => (
            <div className="mod-item" key={i}>
              <div>
                <div className="mod-name">{m.name}</div>
                <div className="mod-brand">{m.brand}</div>
                {m.desc && <div className="mod-desc">{m.desc}</div>}
              </div>
              {SHOW_PRICES && (
                <div className="mod-cost">
                  ${m.cost.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      {SHOW_PRICES && (
        <div className="total-bar" style={{ display: "flex", flexDirection: "column" }}>
          <span className="total-lbl">Total Invested</span>
          <span className="total-lbl">  (minus installations)</span>
          <span className="total-amt">
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}
    </section>
  );
}

// Icon map for upcoming mod categories
const UP_ICONS = {
  "Performance":    <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  "Wheels & Tires": <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></svg>,
  "Exterior":       <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  "Interior":       <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>,
};

// ── UPCOMING ─────────────────────────────────────────────────
// Renders UPCOMING as a card grid with category icons and pills.
function Upcoming() {
  return (
    <div className="up-section" id="upcoming">
      <div className="up-inner">
        <div className="eyebrow">On Deck</div>
        <h2 className="sec-title">Upcoming Plans</h2>
        <div className="up-grid">
          {UPCOMING.map((u, i) => (
            <div className="up-card" key={i}>
              <div className="up-icon">{UP_ICONS[u.cat] || UP_ICONS["Exterior"]}</div>
              <div className="up-name">{u.name}</div>
              <div className="up-note">{u.note}</div>
              <span className="up-pill">{u.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── GALLERY ──────────────────────────────────────────────────
// Renders IMAGES.gallery as a grid. Click to open lightbox.
// Press Escape or click outside the image to close.
function Gallery() {
  const [lb, setLb] = useState(null); // index of open image, or null
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setLb(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  return (
    <section className="section" id="gallery">
      <div className="eyebrow">Photos</div>
      <h2 className="sec-title">Gallery</h2>
      <div className="gal-grid">
        {IMAGES.gallery.map((img, i) => (
          <div className="gal-cell" key={i} onClick={() => setLb(i)}>
            <img src={img.src} alt={img.caption} loading="lazy" />
          </div>
        ))}
      </div>
      {lb !== null && (
        <div className="lightbox" onClick={() => setLb(null)}>
          <button className="lb-close" onClick={() => setLb(null)}>&times;</button>
          <img
            src={IMAGES.gallery[lb].src}
            alt={IMAGES.gallery[lb].caption}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer" style={{ display: "flex", columnGap: '20px' }}>
      <div>2025 Acura Integra Type S</div>
      <a href="https://instagram.com/wasfl5" target="_blank" rel="noreferrer" className="footer-ig">
        <IgIcon />wasfl5
      </a>
      <div className="footer-mark">ITS</div>
    </footer>
  );
}

// ── APP ROOT ─────────────────────────────────────────────────
// Composes all sections in page order.
// To reorder sections, move the components around here.
export default function App() {
  return (
    <>
      <style>{css}</style>
      <Nav />
      <Hero />
      <BeforeAfter />
      <BuildList />
      <Upcoming />
      <Gallery />
      <Footer />
    </>
  );
}
