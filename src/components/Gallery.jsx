import { useState, useEffect } from "react";
import { IMAGES } from "../data/config";
import "./Gallery.css";

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

export default Gallery;
