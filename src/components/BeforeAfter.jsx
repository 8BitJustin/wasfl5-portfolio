import { useState, useEffect, useRef, useCallback } from "react";
import { IMAGES } from "../data/config";
import "./BeforeAfter.css";

// ── BEFORE / AFTER SLIDER ────────────────────────────────────
// Stock image sits on the right as the base layer.
// Current build clips in from the left as you drag right.
// Each label lives inside a clipping div matching its side —
// it vanishes naturally when that side collapses to zero width.
function BeforeAfter() {
  const [pct, setPct] = useState(5); // slider position as % from left
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

export default BeforeAfter;
