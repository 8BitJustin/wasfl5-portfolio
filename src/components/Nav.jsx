import { useState, useEffect } from "react";
import IgIcon from "./IgIcon";
import "./Nav.css";

// ── NAV ─────────────────────────────────────────────────────
// Fixed top navigation. Gains a frosted background on scroll.
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>

      <div className="nav-logo">
        <a href="#home">WASFL5 · <span>TYPE S</span></a>
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

export default Nav;
