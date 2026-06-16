import { MODS, SHOW_PRICES } from "../data/config";
import "./BuildList.css";

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
              {/* {SHOW_PRICES && (
                <div className="mod-cost">
                  ${m.cost.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
              )} */}
            </div>
          ))}
        </div>
      ))}
      {/* {SHOW_PRICES && (
        <div className="total-bar" style={{ display: "flex", flexDirection: "column" }}>
          <span className="total-lbl">Total Invested</span>
          <span className="total-lbl">  (minus installations)</span>
          <span className="total-amt">
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      )} */}
    </section>
  );
}

export default BuildList;
