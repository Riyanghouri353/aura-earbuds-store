"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const USES = [
  { key: "", label: "All" },
  { key: "anc", label: "Noise Cancelling" },
  { key: "gaming", label: "Gaming" },
  { key: "calls", label: "Calls & Work" },
  { key: "sport", label: "Sport" },
  { key: "bass", label: "Bass" },
  { key: "music", label: "Hi-Res Music" },
  { key: "daily", label: "Everyday" },
];
const BANDS = [
  { key: "", label: "Any price" },
  { key: "0-5000", label: "Under Rs 5,000" },
  { key: "5000-10000", label: "Rs 5,000 – 10,000" },
  { key: "10000-20000", label: "Rs 10,000 – 20,000" },
  { key: "20000-999999", label: "Rs 20,000+" },
];

function ShopInner() {
  const sp = useSearchParams();
  const initUse = sp.get("use") || "";
  const initBand = sp.get("max") ? `0-${sp.get("max")}` : sp.get("min") ? `${sp.get("min")}-999999` : "";
  const [use, setUse] = useState(initUse);
  const [band, setBand] = useState(initBand);
  const [sort, setSort] = useState("popular");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    let out = PRODUCTS.filter((p) => {
      if (use && !p.use.includes(use)) return false;
      if (band) { const [lo, hi] = band.split("-").map(Number); if (p.price < lo || p.price > hi) return false; }
      if (query && !(p.name + " " + p.line).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === "price-low") out.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") out.sort((a, b) => b.price - a.price);
    else if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
    else if (sort === "anc") out.sort((a, b) => b.anc - a.anc);
    else out.sort((a, b) => b.reviews - a.reviews);
    return out;
  }, [use, band, sort, query]);

  return (
    <div className="wrap">
      <div className="shop-head">
        <h1>Shop Earbuds</h1>
        <p>Sealed, original and warrantied in Pakistan. COD everywhere, free delivery over Rs 5,000.</p>
      </div>
      <div className="filters">
        {USES.map((u) => (
          <button key={u.key} className={`chip ${use === u.key ? "on" : ""}`} onClick={() => setUse(u.key)}>{u.label}</button>
        ))}
      </div>
      <div className="filters" style={{ paddingTop: 4 }}>
        {BANDS.map((b) => (
          <button key={b.key} className={`chip ${band === b.key ? "on" : ""}`} onClick={() => setBand(b.key)}>{b.label}</button>
        ))}
      </div>
      <div className="shop-tools">
        <span className="results-count">{list.length} product{list.length !== 1 ? "s" : ""}</span>
        <input aria-label="Search earbuds" placeholder="Search earbuds…" value={query} onChange={(e) => setQuery(e.target.value)}
          style={{ border: "1px solid #d2d2d7", borderRadius: 10, padding: "9px 13px", font: "inherit", fontSize: 14, flex: "1 1 200px", maxWidth: 340 }} />
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="anc">Strongest ANC</option>
        </select>
      </div>
      {list.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6e6e73", padding: "40px 0 60px" }}>No earbuds match that mix. Try a wider price band.</p>
      ) : (
        <div className="grid" style={{ paddingBottom: 30 }}>{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div className="wrap" style={{ padding: 60 }}>Loading…</div>}><ShopInner /></Suspense>;
}
