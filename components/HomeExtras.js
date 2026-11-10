"use client";
import { fmt, discountPct } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function HomeExtras({ accessories }) {
  const { add } = useCart();
  return (
    <section className="section wrap">
      <h2>Complete the kit</h2>
      <p className="sec-sub">Small things that make a good pair last longer.</p>
      <div className="acc-grid">
        {accessories.map((a) => (
          <div className="acc" key={a.slug}>
            <b>{a.name}</b>
            <p>{a.line}</p>
            <div className="acc-foot">
              <span><b style={{ display: "inline" }}>{fmt(a.price)}</b> <s style={{ color: "#6e6e73" }}>{fmt(a.mrp)}</s> <span style={{ color: "#128c4b", fontWeight: 700, fontSize: 13 }}>{discountPct(a)}% OFF</span></span>
              <button className="btn btn-dark" style={{ padding: "8px 16px", fontSize: 13.5 }} onClick={() => add(a.slug)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
