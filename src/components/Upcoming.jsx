import { UPCOMING } from "../data/config";
import "./Upcoming.css";

// Icon map for upcoming mod categories
// Icons located at https://heroicons.com/
const UP_ICONS = {
  "Performance":    <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  "Wheels & Tires": <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></svg>,
  "Exterior":       <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  "Interior":       <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>,
  "Color":    <svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" strokeWidth="1.5"><path d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" /></svg>,
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
