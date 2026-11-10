import Link from "next/link";
import { PRODUCTS, fmt } from "@/lib/products";
import BudVisual from "@/components/BudVisual";
import { Stars } from "@/components/ui";

export const metadata = { title: "Compare all AURA earbuds | AURA Pakistan" };

export default function ComparePage() {
  const rows = [
    ["Price", (p) => fmt(p.price)],
    ["Rating", (p) => `${p.rating} ★ (${p.reviews.toLocaleString()})`],
    ["ANC", (p) => (p.anc ? `${p.anc} dB` : "—")],
    ["Battery (buds)", (p) => `${p.batteryBuds} hrs`],
    ["Battery (total)", (p) => `${p.battery} hrs`],
    ["Driver", (p) => `${p.driver} mm`],
    ["Codec", (p) => p.codec],
    ["Microphones", (p) => `${p.mics}`],
    ["Bluetooth", (p) => p.bt],
    ["Multipoint", (p) => (p.multipoint ? "Yes" : "—")],
    ["Latency", (p) => `${p.latency} ms`],
    ["Water resistance", (p) => p.ip],
    ["Wireless charging", (p) => (p.wirelessCharge ? "Yes" : "—")],
    ["Monthly × 12", (p) => fmt(Math.round(p.price / 12))],
  ];
  return (
    <div className="wrap">
      <div className="shop-head">
        <h1>Compare all models</h1>
        <p>Every AURA pair, side by side. The dashes are honest — what a model leaves out is part of its price.</p>
      </div>
      <div className="compare-wrap" style={{ paddingBottom: 40 }}>
        <table className="compare-table">
          <thead>
            <tr><th></th>{PRODUCTS.map((p) => (
              <th key={p.slug} style={{ minWidth: 150 }}>
                <BudVisual color={p.colors[0].hex} caseColor={p.colors[0].case} size={92} /><br />
                <Link href={`/product/${p.slug}`}>{p.name}</Link><br />
                <span style={{ color: "#6e6e73", fontWeight: 400 }}>{p.tag}</span>
              </th>))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, fn]) => (
              <tr key={label}><th>{label}</th>{PRODUCTS.map((p) => <td key={p.slug}>{fn(p)}</td>)}</tr>
            ))}
            <tr><th></th>{PRODUCTS.map((p) => <td key={p.slug}><Link className="btn btn-blue" style={{ padding: "7px 16px", fontSize: 13.5 }} href={`/product/${p.slug}`}>View</Link></td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
