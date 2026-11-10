"use client";
import { useState } from "react";
import Link from "next/link";
import { fmt, discountPct, monthly, WA_NUMBER, ACCESSORIES } from "@/lib/products";
import { useCart } from "@/lib/cart";
import BudVisual from "./BudVisual";
import { Stars } from "./ui";

export default function BuyBox({ p }) {
  const { add } = useCart();
  const [ci, setCi] = useState(0);
  const color = p.colors[ci];
  const waText = encodeURIComponent(`Assalam-o-Alaikum, I want to order ${p.name} (${color.name}) — ${fmt(p.price)}. Please confirm delivery time for my city.`);
  return (
    <>
      <div className="subnav">
        <div className="subnav-in">
          <b>{p.name}</b>
          <div className="sn-right"><span>{fmt(p.price)}</span><button className="btn btn-blue" style={{ padding: "7px 18px", fontSize: 14 }} onClick={() => add(p.slug, color.name)}>Buy</button></div>
        </div>
      </div>
      <div className="pdp">
        <div className="pdp-visual">
          <span className="tag">{p.tag}</span>
          <BudVisual color={color.hex} caseColor={color.case} size={330} />
          <p style={{ color: "#6e6e73", fontSize: 13.5, marginTop: 8 }}>{color.name} · Shown with charging case</p>
          <p style={{ fontSize: 13, marginTop: 4 }}><Stars n={p.rating} /> {p.rating} · {p.reviews.toLocaleString()} reviews · {p.sold} sold</p>
        </div>
        <div className="buybox">
          <p className="eyebrow blue" style={{ fontSize: 13.5 }}>New</p>
          <h1>{p.name}</h1>
          <p className="line">{p.line}</p>
          <p className="rate"><Stars n={p.rating} /> <span>{p.rating} ({p.reviews.toLocaleString()} verified reviews)</span></p>
          <div className="spec-strip">
            <div className="spec-cell"><b>{p.anc > 0 ? `${p.anc}dB` : "ENC"}</b><span>{p.anc > 0 ? "Active ANC" : "Call ENC"}</span></div>
            <div className="spec-cell"><b>{p.battery} hrs</b><span>Total battery</span></div>
            <div className="spec-cell"><b>{p.ip}</b><span>Water resist</span></div>
            <div className="spec-cell"><b>BT {p.bt}</b><span>Bluetooth</span></div>
          </div>
          <div className="price-row"><span className="price-big">{fmt(p.price)}</span><s>{fmt(p.mrp)}</s><em>{discountPct(p)}% OFF — you save {fmt(p.mrp - p.price)}</em></div>
          <p className="monthly">or {fmt(monthly(p))}/month × 12 on credit cards · GST included</p>
          <p className="color-name">Finish — <b>{color.name}</b></p>
          <div className="color-row">
            {p.colors.map((c, i) => (
              <button key={c.name} className={`color-btn ${i === ci ? "sel" : ""}`} onClick={() => setCi(i)} aria-label={c.name} title={c.name}><i style={{ background: c.hex }} /></button>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <p style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 4 }}>Complete the kit <span style={{ color: "#6e6e73", fontWeight: 400 }}>(optional)</span></p>
            {ACCESSORIES.slice(0, 2).map((a) => (
              <div className="addon" key={a.slug}><span>{a.name} — <b>{fmt(a.price)}</b></span>
                <button className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => add(a.slug)}>Add</button></div>
            ))}
          </div>
          <div className="buy-actions">
            <button className="btn btn-blue btn-lg" onClick={() => add(p.slug, color.name)}>Add to Bag</button>
            <a className="btn btn-wa btn-lg" target="_blank" rel="noreferrer" href={`https://wa.me/${WA_NUMBER}?text=${waText}`}>Order on WhatsApp</a>
          </div>
          <div className="buy-trust">
            <span><b>Cash on Delivery</b> available — pay at your door</span>
            <span><b>Delivery:</b> 1–2 days Karachi / Lahore / Islamabad, 2–5 days nationwide via TCS & Leopards</span>
            <span>{p.price >= 5000 ? <><b>FREE delivery</b> on this order (orders over Rs 5,000 ship free)</> : <>Delivery Rs 250 — add {fmt(5000 - p.price)} more to unlock <b>free delivery</b></>}</span>
            <span><b>1-year warranty</b> in Pakistan · <b>7-day replacement</b> for faults</span>
            <span><b>100% original</b>, sealed pack with verifiable serial</span>
          </div>
        </div>
      </div>
      <div className="sticky-buy">
        <div className="sb-mid"><b>{p.name}</b><span>{fmt(p.price)} · COD available</span></div>
        <button className="btn btn-blue" onClick={() => add(p.slug, color.name)}>Add to Bag</button>
      </div>
    </>
  );
}
