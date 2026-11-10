import { FAQS, REVIEWS } from "@/lib/products";
import { Stars } from "@/components/ui";

export const metadata = { title: "Support, Warranty & Returns | AURA Pakistan" };

export default function SupportPage() {
  return (
    <div className="wrap" style={{ maxWidth: 860, paddingBottom: 40 }}>
      <div className="shop-head"><h1>Support</h1><p>Plain words, no fine-print games. Helpline 03-111-287-287, 9am–9pm, or WhatsApp anytime.</p></div>

      <section className="section" style={{ paddingTop: 30 }}>
        <h2 style={{ textAlign: "left", fontSize: 30 }}>Warranty, in four steps</h2>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
          <div className="why-item"><b>1 · Message us</b><p>WhatsApp your order number and a short video of the fault. No forms, no courier trips.</p></div>
          <div className="why-item"><b>2 · Video verification</b><p>Most claims are approved on a short video call within 24 hours.</p></div>
          <div className="why-item"><b>3 · Replacement or repair</b><p>Faults in the first 7 days are replaced outright. Later warranty faults are repaired or replaced within 5–7 working days.</p></div>
          <div className="why-item"><b>4 · What is not covered</b><p>Water damage, lost buds (replacements are sold separately) and physical breakage are not covered — stated here, not hidden in a PDF.</p></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 34 }}>
        <h2 style={{ textAlign: "left", fontSize: 30 }}>Delivery across Pakistan</h2>
        <p style={{ color: "#6e6e73", lineHeight: 1.6, marginTop: 12, fontSize: 15.5 }}>
          Karachi, Lahore and Islamabad / Rawalpindi: 1–2 working days. Other major cities: 2–3 days. Remote areas: 3–5 days.
          We ship with TCS and Leopards. Delivery is free over Rs 5,000 and a flat Rs 250 below that.
          Every COD order is confirmed by phone call before dispatch — if we cannot reach you, the order waits, it never silently ships or silently cancels.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 34 }}>
        <h2>Frequently asked questions</h2>
        <div className="faq" style={{ marginTop: 24 }}>
          {FAQS.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 34 }}>
        <h2>Recent reviews</h2>
        <div className="reviews-grid" style={{ marginTop: 24 }}>
          {REVIEWS.slice(3).map((r) => (
            <div className="review" key={r.name}><Stars n={r.stars} size={15} /><p>“{r.text}”</p><p className="who"><b>{r.name}</b> · {r.city} · {r.product}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
