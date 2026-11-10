"use client";
import Link from "next/link";
import { fmt, discountPct, monthly } from "@/lib/products";
import { useCart } from "@/lib/cart";
import BudVisual from "./BudVisual";
import { Stars } from "./ui";

export default function ProductCard({ p }) {
  const { add } = useCart();
  return (
    <article className="card">
      <Link href={`/product/${p.slug}`} className="card-img">
        {p.tag && <span className="card-tag">{p.tag}</span>}
        <BudVisual color={p.colors[0].hex} caseColor={p.colors[0].case} size={190} />
      </Link>
      <div className="card-body">
        <div className="card-swatches">
          {p.colors.map((c) => <span key={c.name} className="sw" style={{ background: c.hex }} title={c.name} />)}
        </div>
        <Link href={`/product/${p.slug}`} className="card-name">{p.name}</Link>
        <p className="card-line">{p.anc > 0 ? `${p.anc}dB ANC · ` : ""}{p.battery} hrs · {p.ip}</p>
        <p className="card-rate"><Stars n={p.rating} /> <span>{p.rating} ({p.reviews.toLocaleString()})</span></p>
        <p className="card-price"><b>{fmt(p.price)}</b> <s>{fmt(p.mrp)}</s> <em>{discountPct(p)}% OFF</em></p>
        <p className="card-monthly">or {fmt(monthly(p))}/mo × 12 · COD available</p>
        <div className="card-actions">
          <button className="btn btn-dark" onClick={() => add(p.slug, p.colors[0].name)}>Add to Bag</button>
          <Link href={`/product/${p.slug}`} className="btn btn-ghost">Learn more</Link>
        </div>
      </div>
    </article>
  );
}
