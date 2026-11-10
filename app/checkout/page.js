"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { fmt, WA_NUMBER, FREE_DELIVERY_ABOVE, DELIVERY_FLAT } from "@/lib/products";
import BudVisual from "@/components/BudVisual";

const PAYMENTS = [
  { id: "cod", name: "Cash on Delivery", note: "Pay the rider in cash at your door. The way Pakistan prefers." },
  { id: "jazzcash", name: "JazzCash", note: "Pay now from your JazzCash mobile account. We WhatsApp you the payment number after ordering." },
  { id: "easypaisa", name: "Easypaisa", note: "Pay now from your Easypaisa account. Payment details arrive on WhatsApp after ordering." },
  { id: "card", name: "Debit / Credit Card", note: "Visa and Mastercard, all Pakistani banks. Installments (3/6/12 months) available at bank rates." },
  { id: "bank", name: "Bank Transfer", note: "Direct transfer — and an extra 2% comes off your total automatically at confirmation call." },
];
const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Hyderabad", "Sialkot", "Gujranwala", "Bahawalpur", "Sargodha", "Abbottabad", "Other"];

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", city: "Karachi", address: "", note: "" });
  const [pay, setPay] = useState("cod");
  const [done, setDone] = useState(null);
  const delivery = subtotal >= FREE_DELIVERY_ABOVE || subtotal === 0 ? 0 : DELIVERY_FLAT;
  const total = subtotal + delivery;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const place = (e) => {
    e.preventDefault();
    if (!lines.length) return;
    const id = "AURA-" + Math.floor(100000 + Math.random() * 900000);
    const order = { id, total, pay, city: form.city, items: lines.map((l) => `${l.qty} x ${l.item.name}`).join(", ") };
    try {
      const prev = JSON.parse(localStorage.getItem("aura-orders") || "[]");
      prev.push({ ...order, name: form.name, phone: form.phone, status: "Confirmed — being packed", placed: new Date().toISOString() });
      localStorage.setItem("aura-orders", JSON.stringify(prev));
    } catch {}
    setDone(order);
    clear();
  };

  if (done) {
    const wa = encodeURIComponent(`Assalam-o-Alaikum, I just placed order ${done.id} (${done.items}) — total ${fmt(done.total)}, payment: ${PAYMENTS.find(p => p.id === done.pay).name}. Please confirm.`);
    return (
      <div className="success">
        <div className="tick">✓</div>
        <h1>Order placed. Shukriya!</h1>
        <p>We will call <b>you</b> shortly to confirm — standard practice in Pakistan, so fake orders never ship and real ones never wait. A confirmation also lands on your WhatsApp.</p>
        <div className="order-box">
          <span><b>Order ID:</b> {done.id}</span>
          <span><b>Items:</b> {done.items}</span>
          <span><b>Payment:</b> {PAYMENTS.find((p) => p.id === done.pay).name}</span>
          <span><b>Total:</b> {fmt(done.total)}{done.pay === "cod" ? " (pay at your door)" : ""}</span>
          <span><b>Delivery to:</b> {done.city} — 1–2 days for major cities, 2–5 nationwide</span>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn btn-wa" target="_blank" rel="noreferrer" href={`https://wa.me/${WA_NUMBER}?text=${wa}`}>Confirm on WhatsApp</a>
          <Link className="btn btn-ghost" href="/track">Track this order</Link>
          <Link className="btn btn-dark" href="/shop">Continue shopping</Link>
        </div>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="success">
        <h1>Your bag is empty</h1>
        <p>Add a pair first — COD is on us to arrange, the choosing is on you.</p>
        <div style={{ marginTop: 20 }}><Link className="btn btn-blue btn-lg" href="/shop">Shop earbuds</Link></div>
      </div>
    );
  }

  return (
    <form className="co" onSubmit={place}>
      <div>
        <h1>Checkout</h1>
        <p style={{ color: "#6e6e73", marginBottom: 22 }}>No account, no fuss. We confirm every order by call before dispatch.</p>
        <div className="field"><label>Full name</label><input required value={form.name} onChange={set("name")} placeholder="e.g. Muhammad Ali" /></div>
        <div className="field-row">
          <div className="field"><label>Mobile number (WhatsApp)</label><input required pattern="0[0-9]{10}" title="Enter an 11-digit Pakistani mobile number starting with 0" value={form.phone} onChange={set("phone")} placeholder="03XX-XXXXXXX" /></div>
          <div className="field"><label>City</label><select value={form.city} onChange={set("city")}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
        </div>
        <div className="field"><label>Complete address</label><textarea required rows={3} value={form.address} onChange={set("address")} placeholder="House, street, area, nearest landmark" /></div>
        <div className="field"><label>Note for rider (optional)</label><input value={form.note} onChange={set("note")} placeholder="e.g. Call before arriving" /></div>
        <h3 style={{ fontSize: 19, margin: "10px 0 10px" }}>How will you pay?</h3>
        <div className="pay-opts">
          {PAYMENTS.map((p) => (
            <label key={p.id} className={`pay-opt ${pay === p.id ? "sel" : ""}`}>
              <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} style={{ marginTop: 3 }} />
              <span><b>{p.name}</b><small>{p.note}</small></span>
            </label>
          ))}
        </div>
        <button className="btn btn-blue btn-lg btn-block" type="submit">Place Order · {fmt(total)}</button>
        <p style={{ fontSize: 12.5, color: "#6e6e73", textAlign: "center", marginTop: 10 }}>By ordering you agree to our delivery, replacement and warranty terms on the Support page.</p>
      </div>
      <aside className="summary">
        <h3>Order summary</h3>
        {lines.map((l) => (
          <div className="sum-line" key={l.key}>
            <BudVisual color={l.item.colors?.[0]?.hex || "#eee"} caseColor="#e3e3e6" size={52} />
            <div className="sl-mid"><b>{l.item.name}</b><small>{l.color || l.item.kind || ""} · Qty {l.qty}</small></div>
            <b>{fmt(l.total)}</b>
          </div>
        ))}
        <div className="row" style={{ marginTop: 14 }}><span>Subtotal</span><b>{fmt(subtotal)}</b></div>
        <div className="row"><span>Delivery</span><b>{delivery === 0 ? "FREE" : fmt(delivery)}</b></div>
        <div className="row row-total" style={{ marginTop: 6 }}><span>Total</span><b>{fmt(total)}</b></div>
        <p style={{ fontSize: 12.5, color: "#6e6e73", marginTop: 12, lineHeight: 1.5 }}>Sealed pack · 1-year warranty · 7-day replacement on faults. Tracking ID by SMS and WhatsApp after dispatch.</p>
      </aside>
    </form>
  );
}
