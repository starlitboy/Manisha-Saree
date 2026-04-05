import { useState, useEffect, useRef } from "react";
import "./App.css";
import logoImg from "./assets/hero.png";

/* ─────────────────────────────────────────────
   PRODUCT DATA — real saree Unsplash images
───────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Panchampally Saree",
    bengali: "পাঞ্চামপল্লী শাড়ি",
    price: "₹1,299",
    originalPrice: "₹1,800",
    tag: "Bestseller",
    tagColor: "#b5451b",
    desc: "Geometric ikat weaves — bold patterns, vibrant hues.",
    accent: "#c2440f",
    image: "https://images.unsplash.com/photo-1610276580899-53d1af1a1359?q=80&w=453&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Pure Silk Saree",
    bengali: "বিশুদ্ধ সিল্ক শাড়ি",
    price: "₹3,499",
    originalPrice: "₹4,500",
    tag: "Premium",
    tagColor: "#7b5ea7",
    desc: "Lustrous silk with zari border — perfect for weddings.",
    accent: "#7b3fa0",
    image: "https://images.unsplash.com/photo-1698657169232-f337f50d1ff5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Cotton Handloom",
    bengali: "তাঁতের সুতির শাড়ি",
    price: "₹799",
    originalPrice: "₹1,100",
    tag: "Daily Wear",
    tagColor: "#1a6a40",
    desc: "Authentic Santipur handloom — breathable and elegant.",
    accent: "#1a6a40",
    image: "https://images.unsplash.com/photo-1610189000544-1f0885c4bbeb?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Designer Saree",
    bengali: "ডিজাইনার শাড়ি",
    price: "₹2,199",
    originalPrice: "₹2,999",
    tag: "New Arrival",
    tagColor: "#c2185b",
    desc: "Contemporary designs blending tradition with modern style.",
    accent: "#c2185b",
    image: "https://images.unsplash.com/photo-1694243382431-90d1934d6c3c?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Tant Saree",
    bengali: "তাঁত শাড়ি",
    price: "₹649",
    originalPrice: "₹950",
    tag: "Local Weave",
    tagColor: "#8b5e2d",
    desc: "Classic Bengal tant — lightweight with temple border work.",
    accent: "#8b5e2d",
    image: "https://images.unsplash.com/photo-1610189337543-1c5d8e64f574?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Jamdani Saree",
    bengali: "জামদানি শাড়ি",
    price: "₹4,200",
    originalPrice: "₹5,500",
    tag: "Heritage",
    tagColor: "#2c5f8a",
    desc: "UNESCO heritage — finest muslin with intricate motifs.",
    accent: "#2c5f8a",
    image: "https://images.unsplash.com/photo-1610189026297-df356264479c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

/* ─────────────────────────────────────────────
   HERO GRID — saree / model images
───────────────────────────────────────────── */
const HERO_GRID = [
  { label: "Panchampally", img: "https://images.unsplash.com/photo-1710440189404-e95fabead2a3?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { label: "Pure Silk", img: "https://plus.unsplash.com/premium_photo-1669977749936-1343d0b0b4d9?q=80&w=474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { label: "Cotton Tant", img: "https://plus.unsplash.com/premium_photo-1720798650953-1bb37db7241c?q=80&w=449&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { label: "Designer", img: "https://images.unsplash.com/photo-1740674570259-a47d713a2976?q=80&w=419&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

/* ─────────────────────────────────────────────
   SCROLLER — models wearing full sarees
   Using portrait-mode saree fashion photos
───────────────────────────────────────────── */
const SCROLLER_ITEMS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1654764746225-e63f5e90facd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Kanjivaram Silk",
    label: "Wedding Special",
    color: "#c2185b",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Panchampally Ikat",
    label: "Bestseller",
    color: "#b5451b",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1609748340041-f5d61e061ebc?q=80&w=409&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Pure Silk Zari",
    label: "Premium",
    color: "#7b3fa0",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Designer Festive",
    label: "New Arrival",
    color: "#c2185b",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1610030469839-f909584b43f1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cotton Handloom",
    label: "Daily Wear",
    color: "#1a6a40",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1609748341932-f0206c09412b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Tant Classic",
    label: "Local Weave",
    color: "#8b5e2d",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1609748340878-c690e3e4706b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Jamdani Heritage",
    label: "UNESCO Craft",
    color: "#2c5f8a",
  },
];

const TESTIMONIALS = [
  { name: "Priya Sarkar", city: "Kolkata", stars: 5, text: "আমি এখানে বিয়ের শাড়ি কিনেছিলাম। অসাধারণ মান এবং দাম! Highly recommended." },
  { name: "Rekha Devi", city: "Santipur", stars: 5, text: "Manisha didi's collection is the best in Nadia district. My whole family shops here." },
  { name: "Supriya Ghosh", city: "Krishnanagar", stars: 5, text: "Ordered via WhatsApp — delivery was quick and the saree was exactly as shown. Perfect!" },
];

const WHY_US = [
  { icon: "volunteer_activism", title: "Authentic Weaves", desc: "Directly sourced from Santipur master weavers with decades of expertise." },
  { icon: "sell", title: "Best Price", desc: "Wholesale & retail pricing. Bulk orders get special discounts." },
  { icon: "local_shipping", title: "Quick Delivery", desc: "Pan-India shipping. WhatsApp order confirmed within the hour." },
  { icon: "support_agent", title: "Personal Service", desc: "Talk directly with Manisha didi — no bots, no middlemen." },
  { icon: "autorenew", title: "Easy Returns", desc: "Hassle-free exchanges within 7 days of delivery." },
  { icon: "diversity_3", title: "Women-led", desc: "Proudly women-owned and operated since 2010 in Santipur." },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function Icon({ name, size = 20, color, style = {} }) {
  return (
    <span
      className="material-symbols-rounded"
      style={{ fontSize: size, color, lineHeight: 1, display: "inline-flex", alignItems: "center", userSelect: "none", ...style }}
    >
      {name}
    </span>
  );
}

function StarRating({ count }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={16} color={i < count ? "#e8a020" : "#ddd"} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SAREE LOOKBOOK  — Transform-based slider
   Active card is ALWAYS mathematically centered.
   Mobile: exactly 3 cards visible at once.
   Desktop: wider cards, same centering logic.
───────────────────────────────────────────── */
const CARD_GAP = 16; // gap between cards in px

function SareeScroller() {
  const [active, setActive] = useState(Math.floor(SCROLLER_ITEMS.length / 2));
  const viewportRef = useRef(null);
  const [vpW, setVpW] = useState(900);
  const [cardW, setCardW] = useState(200);

  /* ── Measure viewport & compute responsive card width ──
     Mobile  (≤540): exactly 3 cards fill the viewport
                     cardW = (vpW − 2×gap) / 3
     Tablet  (≤900): 160px
     Desktop       : 200px                                 */
  useEffect(() => {
    const measure = () => {
      const el = viewportRef.current;
      if (!el) return;
      const vw = el.clientWidth;
      setVpW(vw);
      if (window.innerWidth <= 540) {
        // Mobile: arrows hidden, centre card = 65% vw, max 240px (height ≤ 432px)
        setCardW(Math.max(80, Math.min(240, Math.floor(vw * 0.65))));
      } else if (window.innerWidth <= 900) {
        setCardW(170);
      } else {
        setCardW(200);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── translateX so the active card is always centred ──
     offset = (vpW/2 − cardW/2) − active×(cardW+gap)       */
  const offset = vpW / 2 - cardW / 2 - active * (cardW + CARD_GAP);

  /* ── Navigation ── */
  const go = (dir) =>
    setActive(i => Math.max(0, Math.min(SCROLLER_ITEMS.length - 1, i + dir)));

  /* ── Drag (pointer events cover both mouse & touch) ── */
  const drag = useRef({ on: false, startX: 0, startIdx: 0 });

  const onDragStart = (e) => {
    drag.current = {
      on: true,
      startX: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
      startIdx: active,
    };
    if (e.type === "mousedown") e.preventDefault();
  };

  const onDragMove = (e) => {
    if (!drag.current.on) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const delta = drag.current.startX - x;
    const step = cardW + CARD_GAP;
    if (delta > step * 0.3 && drag.current.startIdx < SCROLLER_ITEMS.length - 1) {
      drag.current.startIdx += 1;
      drag.current.startX = x;
      setActive(drag.current.startIdx);
    } else if (delta < -step * 0.3 && drag.current.startIdx > 0) {
      drag.current.startIdx -= 1;
      drag.current.startX = x;
      setActive(drag.current.startIdx);
    }
  };

  const onDragEnd = () => { drag.current.on = false; };

  return (
    <div className="scroller-section">
      <div className="scroller-heading">
        <p className="section-label">Our Lookbook</p>
        <h2 className="section-title scroller-title">Saree Collection — Full Drape</h2>
        <p className="section-sub">Swipe or tap arrows — the draped saree is always centre-stage.</p>
      </div>

      <div className="scroller-stage">
        {/* Left arrow */}
        <button
          className="scroller-arrow"
          onClick={() => go(-1)}
          aria-label="Previous"
          disabled={active === 0}
        >
          <Icon name="chevron_left" size={24} color="#c2185b" />
        </button>

        {/* Overflow-hidden viewport — NO scrollbar, pure transform */}
        <div
          className="scroller-viewport"
          ref={viewportRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          {/* Moving track — translateX centres the active card */}
          <div
            className="scroller-track"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {SCROLLER_ITEMS.map((item, i) => {
              const dist = Math.abs(i - active);
              const isActive = dist === 0;
              const isSide = dist === 1;
              return (
                <div
                  key={item.id}
                  className={`scroller-card${isActive ? " is-active" : ""}${isSide ? " is-side" : ""}`}
                  style={{ width: cardW, height: Math.round(cardW * 1.8) }}
                  onClick={() => setActive(i)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="scroller-card-img"
                    draggable={false}
                  />
                  <div className="scroller-card-overlay" />
                  <div className="scroller-card-info">
                    <span className="scroller-card-label" style={{ background: item.color }}>
                      {item.label}
                    </span>
                    <div className="scroller-card-name">{item.name}</div>
                    <a
                      href={`https://wa.me/917602767952?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(item.name)}%20saree`}
                      target="_blank" rel="noopener noreferrer"
                      className="scroller-card-btn"
                      onClick={e => e.stopPropagation()}
                    >
                      <Icon name="chat" size={13} color="white" />
                      Order Now
                    </a>
                  </div>
                  {isActive && <div className="scroller-active-ring" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right arrow */}
        <button
          className="scroller-arrow"
          onClick={() => go(1)}
          aria-label="Next"
          disabled={active === SCROLLER_ITEMS.length - 1}
        >
          <Icon name="chevron_right" size={24} color="#c2185b" />
        </button>
      </div>

      {/* Dots */}
      <div className="scroller-dots">
        {SCROLLER_ITEMS.map((_, i) => (
          <button
            key={i}
            className={`scroller-dot${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function UnlockModal({ onClose }) {
  return (
    <div onClick={onClose} className="modal-backdrop">
      <div onClick={(e) => e.stopPropagation()} className="modal-box">
        <div className="modal-icon-wrap">
          <Icon name="rocket_launch" size={28} color="#c2185b" />
        </div>
        <h2 className="modal-title">Want the Full Website?</h2>
        <p className="modal-sub">
          This is a demo. Get the complete website with cart, checkout, orders & more — contact the developer on WhatsApp!
        </p>
        <div className="modal-info">
          <Icon name="info" size={16} color="#c2185b" />
          <span>Demo Version — contact developer to buy</span>
        </div>
        <a
          href="https://wa.me/918509755844?text=Hi!%20I%20saw%20the%20Manisha%20Saree%20Palace%20demo%20website%20and%20I%20want%20to%20buy%20the%20full%20version!"
          target="_blank" rel="noopener noreferrer"
          className="btn-whatsapp-block"
        >
          <Icon name="chat" size={18} color="white" />
          Contact Developer on WhatsApp
        </a>
        <button onClick={onClose} className="btn-close-modal">Close Preview</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ product, onUnlock }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? "0 16px 40px rgba(194,24,91,0.18)" : "0 2px 12px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        <span className="product-tag" style={{ background: product.tagColor }}>{product.tag}</span>
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-bengali">{product.bengali}</p>
        <p className="product-desc">{product.desc}</p>
        <div className="product-price-row">
          <span className="product-price" style={{ color: product.accent }}>{product.price}</span>
          <span className="product-old-price">{product.originalPrice}</span>
        </div>
        <div className="product-actions">
          <button onClick={onUnlock} className="btn-cart" style={{ background: product.accent }}>
            <Icon name="shopping_cart" size={15} color="white" />
            Add to Cart
          </button>
          <a
            href={`https://wa.me/917602767952?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-wa-icon"
          >
            <Icon name="chat" size={18} color="white" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING SHORTS PLAYER
───────────────────────────────────────────── */
const SHORTS_IDS = [
  "gBBhokcdK-Q",
  "BmPfG-8taS4",
  "Beg06RXfSJw",
  "7k_VECbYtvM",
  "5vDsk9QWHbI",
  "i6pHl1ix9Ss",
  "zx00GxeZIXE"
];

function FloatingShorts() {
  const [closed, setClosed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [pos, setPos] = useState({ x: 0, y: 0 }); // offset from bottom right
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, isDragging: false });

  if (closed) return null;

  const playlist = SHORTS_IDS.slice(1).join(",") + "," + SHORTS_IDS[0];

  const onPointerDown = (e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragRef.current.startY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    dragRef.current.initialX = pos.x;
    dragRef.current.initialY = pos.y;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const dx = x - dragRef.current.startX;
    const dy = y - dragRef.current.startY;
    setPos({
      x: dragRef.current.initialX + dx,
      y: dragRef.current.initialY + dy
    });
  };

  const onPointerUp = (e) => {
    dragRef.current.isDragging = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      className="floating-shorts"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      <button className="shorts-close shorts-btn-left" onClick={() => setIsMuted(!isMuted)}>
        <Icon name={isMuted ? "volume_off" : "volume_up"} size={14} color="#000" />
      </button>
      <button className="shorts-close" onClick={() => setClosed(true)}>
        <Icon name="close" size={14} color="#000" />
      </button>
      <div 
        className="shorts-video-wrapper"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="shorts-drag-overlay" />
        <iframe
          src={`https://www.youtube.com/embed/${SHORTS_IDS[0]}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${playlist}&controls=0`}
          title="YouTube Shorts"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const categories = ["All", "Handloom", "Silk", "Designer", "Cotton"];

  return (
    <div className="app-root">

      {/* ── Sticky Nav ── */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="nav-logo">
          <img src={logoImg} alt="Manisha Saree Palace Logo" className="nav-logo-img" />
          <div>
            <div className="nav-brand">Manisha's Saree Palace</div>
            <div className="nav-sub">Santipur · Since 2010</div>
          </div>
        </div>

        <div className="nav-links">
          {["Home", "Collection", "Lookbook", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
          <a href="https://wa.me/917602767952" target="_blank" rel="noopener noreferrer" className="btn-wa-nav">
            <Icon name="chat" size={15} color="white" />
            Order Now
          </a>
        </div>

        <button className="nav-hamburger" onClick={() => setMenuOpen(m => !m)}>
          <Icon name={menuOpen ? "close" : "menu"} size={26} color="#880e4f" />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {["Home", "Collection", "Lookbook", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="mobile-link" onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <a href="https://wa.me/917602767952" target="_blank" rel="noopener noreferrer" className="btn-wa-nav" style={{ justifyContent: "center" }}>
            <Icon name="chat" size={15} color="white" /> Order on WhatsApp
          </a>
        </div>
      )}

      {/* ── Hero ── */}
      <section id="home" className="hero-section">
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <Icon name="diamond" size={13} color="#c2185b" />
              <span>Wholesale &amp; Retail · Santipur Handloom</span>
            </div>
            <h1 className="hero-h1">
              Elegance<br />
              <span className="hero-h1-accent">Woven in</span><br />
              Tradition
            </h1>
            <p className="hero-sub">
              পাইকারি এবং খুচরো বিক্রয় কেন্দ্র — Authentic handloom sarees from the heart of Santipur, Nadia.
            </p>
            <div className="hero-btns">
              <a href="#collection" className="btn-primary">Browse Collection</a>
              <a href="https://wa.me/917602767952" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Icon name="chat" size={16} color="#c2185b" /> WhatsApp Order
              </a>
            </div>
            <div className="hero-stats">
              {[["500+", "Products"], ["15+", "Years"], ["4.9", "Rating"], ["Always", "Open"]].map(([v, l]) => (
                <div key={l} className="hero-stat">
                  <div className="hero-stat-val">{v}</div>
                  <div className="hero-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-grid">
            {HERO_GRID.map((card, i) => (
              <div key={i} className="hero-card" style={{ height: i % 2 === 0 ? "140px" : "172px" }}>
                <img src={card.img} alt={card.label} className="hero-card-img" />
                <span className="hero-card-label">{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {Array(5).fill(["Wholesale Available", "New Collection Arrived", "Order via WhatsApp", "Pan India Delivery", "Authentic Handloom", "Women-led Business"]).flat().map((t, i) => (
            <span key={i} className="marquee-item">
              <Icon name="fiber_manual_record" size={7} color="rgba(255,255,255,0.45)" style={{ marginRight: 8 }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── SAREE LOOKBOOK SCROLLER (before products) ── */}
      <div id="lookbook">
        <SareeScroller />
      </div>

      {/* ── Collection ── */}
      <section id="collection" className="collection-section">
        <div className="section-header">
          <p className="section-label">Our Products</p>
          <h2 className="section-title">Curated Saree Collections</h2>
          <p className="section-sub">From Santipur's finest looms to your doorstep — each piece tells a story of craft and heritage.</p>
          <div className="filter-pills">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`filter-pill ${filter === cat ? "active" : ""}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="products-grid">
          {PRODUCTS.map(p => (
            <ProductCard key={p.id} product={p} onUnlock={() => setShowModal(true)} />
          ))}
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="why-section">
        <div className="why-inner">
          <h2 className="section-title" style={{ marginBottom: "48px", textAlign: "center" }}>
            Why Choose <span style={{ color: "#c2185b", fontStyle: "italic" }}>Manisha's?</span>
          </h2>
          <div className="why-grid">
            {WHY_US.map((item, i) => (
              <div key={i} className="why-card">
                <div className="why-icon-wrap">
                  <Icon name={item.icon} size={26} color="#c2185b" />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testi-section">
        <div className="testi-inner">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>What Our Customers Say</h2>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card">
                <StarRating count={t.stars} />
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-city">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-icon-wrap">
            <Icon name="chat" size={36} color="#25D366" />
          </div>
          <h2 className="cta-title">Order Directly on WhatsApp</h2>
          <p className="cta-sub">Fast response · Easy ordering · Bulk discounts available</p>
          <p className="cta-time">
            <Icon name="schedule" size={14} color="#f48fb1" style={{ marginRight: 5 }} />
            Available 11:00 AM – 11:00 PM daily
          </p>
          <div className="cta-btns">
            <a href="https://wa.me/917602767952?text=Hi%20Manisha%20Saree%20Palace!%20I%20want%20to%20browse%20your%20collection."
              target="_blank" rel="noopener noreferrer" className="btn-wa-big">
              <Icon name="chat" size={20} color="white" /> Chat on WhatsApp
            </a>
            <a href="tel:+919002542653" className="btn-call-big">
              <Icon name="call" size={20} color="#f48fb1" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── About + Contact ── */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div className="about-text">
            <p className="section-label">About Us</p>
            <h2 className="section-title">Santipur's Beloved Saree Destination</h2>
            <p className="about-p">Manisha's Saree Palace has been serving saree lovers across Bengal and beyond for over 15 years. Located in the saree-weaving capital of Santipur, we bring you the finest handloom creations directly from the loom to your home.</p>
            <p className="about-p">Whether you're an individual buyer or a wholesale buyer stocking up your store — we have the right collection and the right price for you.</p>
            <div className="social-pills">
              {[
                { icon: "thumb_up", label: "Facebook", href: "https://www.facebook.com/share/1BboSH6D5r/" },
                { icon: "play_circle", label: "YouTube", href: "https://https://www.youtube.com/channel/UCYsUXUewtNn41oHLejSWVmQ.youtube.com" },
                { icon: "chat", label: "WhatsApp", href: "https://wa.me/917602767952" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-pill">
                  <Icon name={s.icon} size={14} color="#c2185b" /> {s.label}
                </a>
              ))}
            </div>
          </div>

          <div id="contact" className="contact-card">
            <h3 className="contact-title">Contact &amp; Location</h3>
            {[
              { icon: "chat", label: "WhatsApp", value: "+91 76027 67952", href: "https://wa.me/917602767952" },
              { icon: "call", label: "Call", value: "+91 90025 42653", href: "tel:+919002542653" },
              { icon: "schedule", label: "Timing", value: "11:00 AM – 11:00 PM", href: null },
              { icon: "mail", label: "Email", value: "manishasareepalace708mb760@gmail.com", href: "mailto:manishasareepalace708mb760@gmail.com" },
              { icon: "location_on", label: "Address", value: "Ghoralia, Santipur, Nadia, WB – 741404 (Near Bathana Railway Station)", href: null },
            ].map((c, i) => (
              <div key={i} className={`contact-row ${i < 4 ? "bordered" : ""}`}>
                <Icon name={c.icon} size={17} color="#c2185b" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="contact-label">{c.label}</div>
                  {c.href
                    ? <a href={c.href} className="contact-val link">{c.value}</a>
                    : <div className="contact-val">{c.value}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo Banner ── */}
      <div className="demo-banner">
        <div className="demo-banner-title">
          <Icon name="lock" size={15} color="#c2185b" />
          Demo Version — Want the Full Website?
        </div>
        <p className="demo-sub">Cart, checkout &amp; full features available. Contact the developer to get your own site!</p>
        <button onClick={() => setShowModal(true)} className="btn-unlock">
          <Icon name="rocket_launch" size={15} color="white" /> Buy Full Website
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">Manisha's Saree Palace</div>
            <p className="footer-tagline">Authentic handloom sarees from the heart of Santipur, Nadia, West Bengal.</p>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            {["Home", "Collection", "Lookbook", "About", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
            ))}
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-contact-item"><Icon name="chat" size={13} color="#f48fb1" style={{ marginRight: 6 }} /> +91 76027 67952</div>
            <div className="footer-contact-item"><Icon name="call" size={13} color="#f48fb1" style={{ marginRight: 6 }} /> +91 90025 42653</div>
            <div className="footer-contact-item"><Icon name="location_on" size={13} color="#f48fb1" style={{ marginRight: 6 }} /> Ghoralia, Santipur</div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Manisha's Saree Palace · Santipur, Nadia, West Bengal · Ghoralia – 741404
        </div>
      </footer>

      {showModal && <UnlockModal onClose={() => setShowModal(false)} />}
      <FloatingShorts />
    </div>
  );
}