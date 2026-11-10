"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fmt } from "@/lib/products";

export default function TrackPage() {
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState("");
  const [found, setFound] = useState(null);
  useEffect(() => {
    try { setOrders(JSON.parse(localStorage.getItem("aura-orders") || "[]")); } catch {}
  }, []);
  const search = (e) => {
    e.preventDefault();
    const hit = orders.find((o) => o.id.toLowerCase() === q.trim().toLowerCase());
    setFound(hit || "none");
  };
  return (
    <div className="wrap" style={{ maxWidth: 720, paddingBottom: 40 }}>
      <div className="shop-head"><h1>Track your order</h1><p>Enter the order ID from your confirmation (it looks like AURA-123456).</p></div>
      <form onSubmit={search} style={{ display: "flex", gap: 10, margin: "22px 0" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="AURA-______" required
          style={{ flex: 1, border: "1px solid #c7c7cc", borderRadius: 12, padding: "12px 14px", font: "inherit", fontSize: 15 }} />
        <button className="btn btn-blue" type="submit">Track</button>
      </form>
      {found === "none" && <div className="order-box">No order with that ID on this device. Orders placed here are stored in this browser — or message us on WhatsApp and we will trace it by your phone number.</div>}
      {found && found !== "none" && (
        <div className="order-box">
          <span><b>Order:</b> {found.id} · {fmt(found.total)}</span>
          <span><b>Items:</b> {found.items}</span>
          <span><b>Status:</b> {found.status}</span>
          <span><b>Next:</b> confirmation call, then dispatch via TCS / Leopards with a tracking ID on SMS and WhatsApp. Delivery: 1–2 days major cities, 2–5 days nationwide.</span>
        </div>
      )}
      {orders.length > 0 && (
        <>
          <h3 style={{ margin: "26px 0 10px" }}>Orders placed on this device</h3>
          {orders.map((o) => (
            <div className="order-box" key={o.id} style={{ margin: "10px 0" }}>
              <span><b>{o.id}</b> · {fmt(o.total)} · {o.status}</span><span>{o.items}</span>
            </div>
          ))}
        </>
      )}
      <p style={{ color: "#6e6e73", fontSize: 14, marginTop: 24 }}>Still stuck? <Link href="/support" style={{ color: "#0066cc" }}>Support & FAQs</Link> — or use the green WhatsApp button, bottom right.</p>
    </div>
  );
}
