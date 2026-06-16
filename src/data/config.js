// ============================================================
//  IMAGE PATHS
//  All images live in /public/images/.
//  To swap an image, just change the filename here.
//  No need to dig through the component code below.
// ============================================================
export const IMAGES = {
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
export const SHOW_PRICES = true;

export const MODS = {
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
      cost: 245.00
    },
  ],
};

// ============================================================
//  UPCOMING MODS
//  Add planned mods here. They show as cards in the Upcoming section.
//  cat options: "Performance" | "Wheels & Tires" | "Exterior" | "Interior"
// ============================================================
export const UPCOMING = [
  { name: "Exhaust System",      note: "Cat-back or axle-back, brand TBD",           cat: "Performance"    },
  { name: "Intercooler Upgrade", note: "Target heat soak under hard driving",         cat: "Performance"    },
  { name: "Wheel Upgrade",       note: "Lightweight forged set, TBD",                cat: "Wheels & Tires" },
  { name: "Window Tint",         note: "Ceramic tint all around",                    cat: "Exterior"       },
  { name: "Short Shifter",       note: "Tighten up the 6-speed throws",              cat: "Interior"       },
  { name: "Intake",              note: "Cold air or short ram, under consideration", cat: "Performance"    },
];
