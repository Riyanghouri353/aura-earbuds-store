"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { fmt, WA_NUMBER } from "@/lib/products";
import BudVisual from "./BudVisual";

export function Stars({ n = 5, size = 13 }) {
  return <span className="stars" style={{ fontSize: size }}>{"★".repeat(Math.round(n))}<span className="stars-off">{"★".repeat(5 - Math.round(n))}</span></span>;
}

export function TopBar() {
  return (
    <div className="topbar">
      <span>Cash on Delivery — all over Pakistan</span>
      <span className="topbar-dot">•</span><span>Free delivery over Rs 5,000</span>
      <span className="topbar-dot">•</span><span>11.11 Sale — up to 37% off</span>
    </div>
  );
}

export function Nav() {
  const { count, setOpen } = useCart();
  return (
    <header className="nav">
      <div className="nav-in">
        <Link href="/" className="logo">AURA<span className="logo-dot">.</span></Link>
        <nav className="nav-links">
          <Link href="/shop">Shop</Link>
          <Link href="/shop?use=anc">ANC</Link>
          <Link href="/shop?use=gaming">Gaming</Link>
          <Link href="/shop?max=5000">Under Rs 5,000</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/support">Support</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/track" className="nav-track">Track Order</Link>
          <button className="bag-btn" onClick={() => setOpen(true)} aria-label="Open bag">
            Bag{count > 0 && <span className="bag-count">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

export function CartDrawer() {
  const { lines, subtotal, setQty, remove, open, setOpen } = useCart();
  const free = subtotal >= 5000;
  const delivery = lines.length === 0 ? 0 : free ? 0 : 250;
  const missing = 5000 - subtotal;
  return (
    <>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={`drawer ${open ? "drawer-open" : ""}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h3>Your Bag</h3>
          <button className="x-btn" onClick={() => setOpen(false)} aria-label="Close bag">✕</button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your bag is empty.</p>
            <Link href="/shop" className="btn btn-blue" onClick={() => setOpen(false)}>Shop earbuds</Link>
          </div>
        ) : (
          <>
            {!free && <div className="free-bar"><div className="free-bar-fill" style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }} /><span>Add {fmt(missing)} more for FREE delivery</span></div>}
            {free && <div className="free-ok">You unlocked FREE delivery</div>}
            <div className="drawer-lines">
              {lines.map((l) => (
                <div className="dline" key={l.key}>
                  <div className="dline-img"><BudVisual color={l.color ? (l.item.colors?.find(c => c.name === l.color)?.hex || "#f2f2f4") : (l.item.colors?.[0]?.hex || "#eee")} caseColor="#e3e3e6" size={70} /></div>
                  <div className="dline-mid">
                    <p className="dline-name">{l.item.name}</p>
                    {l.color && <p className="dline-color">{l.color}</p>}
                    <div className="qty">
                      <button onClick={() => setQty(l.key, l.qty - 1)}>−</button>
                      <span>{l.qty}</span>
                      <button onClick={() => setQty(l.key, l.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="dline-right">
                    <p>{fmt(l.total)}</p>
                    <button className="rm" onClick={() => remove(l.key)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="row"><span>Subtotal</span><b>{fmt(subtotal)}</b></div>
              <div className="row"><span>Delivery</span><b>{delivery === 0 ? "FREE" : fmt(delivery)}</b></div>
              <div className="row row-total"><span>Total</span><b>{fmt(subtotal + delivery)}</b></div>
              <p className="drawer-note">Cash on Delivery available — pay at your door.</p>
              <Link href="/checkout" className="btn btn-blue btn-block" onClick={() => setOpen(false)}>Checkout</Link>
              <a className="btn btn-wa btn-block" target="_blank" rel="noreferrer"
                 href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Assalam-o-Alaikum, I want to order: " + lines.map(l => `${l.qty} x ${l.item.name}`).join(", ") + ` — Total ${fmt(subtotal + delivery)}`)}`}>
                Order on WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function WhatsAppFloat() {
  return (
    <a className="wa-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
       href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Assalam-o-Alaikum, I have a question about AURA earbuds.")}`}>
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.1 1c.3.2.5.3.6.4 0 .1 0 .7-.2 1.2Z"/></svg>
    </a>
  );
}

export function TrustStrip() {
  const items = [
    ["Cash on Delivery", "Pay at your door, nationwide"],
    ["1-Year Warranty", "Claimable in Pakistan"],
    ["7-Day Replacement", "Fault? Replaced free"],
    ["100% Original", "Sealed pack, serial verified"],
    ["TCS / Leopards", "1–5 day delivery, tracked"],
    ["JazzCash · Easypaisa", "Plus cards & bank transfer"],
  ];
  return (
    <section className="trust">
      {items.map(([t, s]) => (
        <div className="trust-item" key={t}><b>{t}</b><span>{s}</span></div>
      ))}
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div>
          <p className="logo">AURA<span className="logo-dot">.</span></p>
          <p className="foot-note">Pakistan's earbuds store. Designed for silence, priced for Pakistan.</p>
          <p className="foot-note">Karachi · Lahore · Islamabad</p>
          <p className="foot-note">Helpline 03-111-287-287 (9am–9pm)</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link href="/shop">All earbuds</Link>
          <Link href="/shop?use=anc">Noise cancelling</Link>
          <Link href="/shop?use=gaming">Gaming</Link>
          <Link href="/shop?max=5000">Under Rs 5,000</Link>
          <Link href="/compare">Compare models</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link href="/track">Track your order</Link>
          <Link href="/support">Warranty & returns</Link>
          <Link href="/support">Delivery info</Link>
          <Link href="/support">FAQs</Link>
        </div>
        <div>
          <h4>Pay with</h4>
          <p className="foot-note">Cash on Delivery</p>
          <p className="foot-note">JazzCash · Easypaisa</p>
          <p className="foot-note">Debit / Credit cards</p>
          <p className="foot-note">Bank transfer · Installments</p>
        </div>
      </div>
      <p className="foot-legal">Prices include GST. Battery and ANC figures are lab-tested under stated conditions and vary with volume, codec and environment. © 2026 AURA Pakistan.</p>
    </footer>
  );
}
