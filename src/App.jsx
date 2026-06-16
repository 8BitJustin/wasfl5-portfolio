import "./index.css";
import Nav         from "./components/Nav";
import Hero        from "./components/Hero";
import BeforeAfter from "./components/BeforeAfter";
import BuildList   from "./components/BuildList";
import Upcoming    from "./components/Upcoming";
import Gallery     from "./components/Gallery";
import Footer      from "./components/Footer";

// ── APP ROOT ─────────────────────────────────────────────────
// Composes all sections in page order.
// To reorder sections, move the components around here.
export default function App() {
  return (
    <>
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
