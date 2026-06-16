import IgIcon from "./IgIcon";
import { IMAGES } from "../data/config";
import "./Hero.css";

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

export default Hero;
