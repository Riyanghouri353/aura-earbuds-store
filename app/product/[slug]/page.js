import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, REVIEWS, getProduct, fmt } from "@/lib/products";
import BuyBox from "@/components/BuyBox";
import ProductCard from "@/components/ProductCard";
import { Stars } from "@/components/ui";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.name} — ${fmt(p.price)} in Pakistan | AURA`, description: `${p.line} ${p.battery} hours battery, ${p.ip}, COD nationwide, 1-year warranty.` };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const others = PRODUCTS.filter((x) => x.slug !== p.slug);
  const compareSet = [p, ...others.filter((x) => Math.abs(x.price - p.price) < 12000).slice(0, 2)];
  const related = others.filter((x) => x.use.some((u) => p.use.includes(u))).slice(0, 4);
  const reviews = REVIEWS.filter((r) => r.product === p.name);
  const shownReviews = reviews.length ? reviews : REVIEWS.slice(0, 3);

  const specRows = [
    ["Active noise cancelling", p.anc > 0 ? `${p.anc} dB (hybrid, lab-tested)` : "No — ENC for calls only"],
    ["Driver", `${p.driver} mm dynamic driver`],
    ["Codecs", p.codec],
    ["Battery — buds", `Up to ${p.batteryBuds} hrs (ANC on, 50% volume)`],
    ["Battery — with case", `Up to ${p.battery} hrs total`],
    ["Fast charge", "10 min ≈ 2–5 hrs playback (model dependent)"],
    ["Bluetooth", `${p.bt}${p.multipoint ? " · multipoint (2 devices)" : ""}`],
    ["Microphones", `${p.mics} with AI noise reduction`],
    ["Latency (game mode)", `${p.latency} ms`],
    ["Water resistance", `${p.ip} (buds) — sweat and rain, not submersion`],
    ["Charging", `USB-C${p.wirelessCharge ? " + Qi wireless" : ""}`],
    ["In the box", "Buds, charging case, USB-C cable, 3 tip sizes, warranty card, quick guide"],
  ];

  return (
    <>
      <BuyBox p={p} />
      {p.features.map((f, i) => (
        <section key={f.title} className={`chapter ${i % 3 === 1 ? "dark" : i % 3 === 2 ? "alt" : ""}`}>
          <div className="stat">{f.stat}</div>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </section>
      ))}

      <section className="section wrap">
        <h2>Compare the family</h2>
        <p className="sec-sub">Honest rows. What the cheaper pair leaves out, shown in the open.</p>
        <div className="compare-wrap">
          <table className="compare-table">
            <thead><tr><th></th>{compareSet.map((x) => <th key={x.slug}><Link href={`/product/${x.slug}`}>{x.name}</Link></th>)}</tr></thead>
            <tbody>
              {[["Price", (x) => fmt(x.price)], ["ANC", (x) => (x.anc ? `${x.anc} dB` : "— No ANC")], ["Total battery", (x) => `${x.battery} hrs`], ["Driver", (x) => `${x.driver} mm`], ["Codec", (x) => x.codec], ["Water resistance", (x) => x.ip], ["Multipoint", (x) => (x.multipoint ? "Yes" : "— No")], ["Wireless charging", (x) => (x.wirelessCharge ? "Yes" : "— No")]].map(([label, fn]) => (
                <tr key={label}><th>{label}</th>{compareSet.map((x) => <td key={x.slug}>{fn(x)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: 18 }}><Link href="/compare" className="btn btn-ghost">Compare all models</Link></p>
      </section>

      <section className="section wrap">
        <h2>Tech specs</h2>
        <p className="sec-sub">{p.blurb}</p>
        <table className="spec-table"><tbody>
          {specRows.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
        <p style={{ color: "#6e6e73", fontSize: 12.5, maxWidth: 820, margin: "14px auto 0" }}>
          Footnotes: battery tested at 50% volume with the stated codec. ANC depth is a laboratory maximum across the cancellation band. IP ratings apply to the buds, not the case, unless stated.
        </p>
      </section>

      <section className="section wrap">
        <h2>What buyers say</h2>
        <p className="sec-sub">Verified reviews from Pakistani customers.</p>
        <div className="reviews-grid">
          {shownReviews.map((r) => (
            <div className="review" key={r.name + r.product}>
              <Stars n={r.stars} size={15} />
              <p>“{r.text}”</p>
              <p className="who"><b>{r.name}</b> · {r.city} · Verified buyer</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section wrap" style={{ paddingBottom: 26 }}>
          <h2>You may also like</h2>
          <p className="sec-sub">Same job, different budget.</p>
          <div className="grid">{related.map((x) => <ProductCard key={x.slug} p={x} />)}</div>
        </section>
      )}
    </>
  );
}
