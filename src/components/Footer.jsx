import IgIcon from "./IgIcon";
import "./Footer.css";

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

export default Footer;
