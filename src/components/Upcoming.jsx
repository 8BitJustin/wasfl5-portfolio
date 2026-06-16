import { UPCOMING } from "../data/config";
import "./Upcoming.css";

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

export default Upcoming;
