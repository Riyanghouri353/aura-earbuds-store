import Link from "next/link";
import { PRODUCTS, ACCESSORIES, REVIEWS, FAQS, fmt, discountPct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import BudVisual from "@/components/BudVisual";
import { TrustStrip, Stars } from "@/components/ui";
import HomeExtras from "@/components/HomeExtras";

export default function Home() {
  const hero = PRODUCTS[0];
  const best = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const featured = PRODUCTS.find((p) => p.slug === "aura-buds-studio");
  return (
    <>
      <section className="hero">
        <p className="eyebrow">New · 11.11 Sale is live</p>
        <h1>{hero.name}</h1>
        <p className="sub">{hero.line} Designed for Pakistan's streets, priced for Pakistan's pockets.</p>
        <div className="hero-visual"><BudVisual color={hero.colors[0].hex} caseColor={hero.colors[0].case} size={360} /></div>
        <p className="hero-price"><b>{fmt(hero.price)}</b> <s>{fmt(hero.mrp)}</s> <em>Save {discountPct(hero)}%</em> · or {fmt(Math.round(hero.price / 12))}/mo × 12</p>
        <div className="hero-cta">
          <Link href={`/product/${hero.slug}`} className="btn btn-blue btn-lg">Buy Pods Pro 2</Link>
          <Link href="/shop" className="btn btn-ghost btn-lg">Shop all earbuds</Link>
        </div>
        <p className="hero-rate"><Stars n={5} /> 4.8 from 2,314 verified buyers · 18,000+ sold in Pakistan</p>
      </section>

      <TrustStrip />

      <section className="section wrap">
        <h2>Shop by budget</h2>
        <p className="sec-sub">Pakistan shops price-band first. So do we.</p>
        <div className="budget-grid">
          <Link className="budget-tile" href="/shop?max=5000"><b>Under Rs 5,000</b><span>Everyday heroes from Rs 3,499</span></Link>
          <Link className="budget-tile" href="/shop?min=5000&max=10000"><b>Rs 5,000 – 10,000</b><span>Gaming, sport and real ANC</span></Link>
          <Link className="budget-tile" href="/shop?min=10000&max=20000"><b>Rs 10,000 – 20,000</b><span>Call pros and hi-res sound</span></Link>
          <Link className="budget-tile" href="/shop?min=20000"><b>Rs 20,000+</b><span>Flagship silence, studio detail</span></Link>
        </div>
      </section>

      <section className="section wrap">
        <h2>Best sellers</h2>
        <p className="sec-sub">The pairs Pakistan actually bought this month — with ratings, not slogans.</p>
        <div className="grid">{best.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="section wrap">
        <h2>Shop by what you do</h2>
        <p className="sec-sub">One pair rarely fits a whole life. Start from yours.</p>
        <div className="usecase-grid">
          <Link className="usecase uc1" href="/shop?use=gaming"><b>Gaming</b><span>40ms low-latency modes for PUBG Mobile and COD Mobile. Hear footsteps first.</span></Link>
          <Link className="usecase uc2" href="/shop?use=calls"><b>Calls & Work</b><span>6 to 8 mic arrays that keep your voice clear in bazaars, buses and wind.</span></Link>
          <Link className="usecase uc3" href="/shop?use=sport"><b>Gym & Running</b><span>IPX5 to IPX7 sweat-proof fits that never fall out mid-set.</span></Link>
          <Link className="usecase uc4" href="/shop?use=anc"><b>Silence</b><span>Up to 55dB of ANC for flights, generators and open-plan offices.</span></Link>
        </div>
      </section>

      <section className="wrap">
        <div className="feature-band">
          <p className="eyebrow" style={{ color: "#2997ff" }}>Featured · AURA Buds Studio</p>
          <h2>Hear everything. Miss nothing.</h2>
          <p>LDAC hi-res at 990kbps, a personal hearing profile built in two minutes, and 49dB of quiet to protect the space between notes.</p>
          <div className="feature-stats">
            <div className="fstat"><b>990kbps</b><span>LDAC hi-res audio</span></div>
            <div className="fstat"><b>49dB</b><span>Adaptive ANC</span></div>
            <div className="fstat"><b>44 hrs</b><span>Total playtime</span></div>
            <div className="fstat"><b>{fmt(featured.price)}</b><span>or {fmt(Math.round(featured.price / 12))}/mo × 12</span></div>
          </div>
          <Link href={`/product/${featured.slug}`} className="btn btn-blue btn-lg">Explore Buds Studio</Link>
        </div>
      </section>

      <section className="section wrap">
        <h2>Loved across Pakistan</h2>
        <p className="sec-sub">4.7 average from 32,000+ verified reviews — including the honest four-star ones.</p>
        <div className="reviews-grid">
          {REVIEWS.slice(0, 3).map((r) => (
            <div className="review" key={r.name}>
              <Stars n={r.stars} size={15} />
              <p>“{r.text}”</p>
              <p className="who"><b>{r.name}</b> · {r.city} · Verified buyer, {r.product}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="why">
          <h2>Why not just buy from a marketplace?</h2>
          <div className="why-grid">
            <div className="why-item"><b>The copy problem is real</b><p>Marketplaces are full of look-alike buds with fake ANC and no warranty. Every AURA pair is sealed, serial-verifiable and covered for a full year in Pakistan.</p></div>
            <div className="why-item"><b>COD without the advance trap</b><p>Pay at your door. We never demand advance payment after you order, and we never change a price after checkout. That is a promise, in writing.</p></div>
            <div className="why-item"><b>Warranty you can actually claim</b><p>One WhatsApp message starts a claim. Most are verified on a short video call, with replacement or repair inside 5 to 7 working days.</p></div>
            <div className="why-item"><b>Honest specs, footnotes included</b><p>Battery and ANC numbers state their test conditions. Water damage is not covered and we say so upfront — like a store that plans to stay.</p></div>
          </div>
        </div>
      </section>

      <HomeExtras accessories={ACCESSORIES} />

      <section className="section wrap" style={{ paddingBottom: 20 }}>
        <h2>Questions, answered</h2>
        <p className="sec-sub">The things Pakistani buyers ask us most, before they buy.</p>
        <div className="faq">
          {FAQS.slice(0, 5).map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 22 }}><Link className="btn btn-ghost" href="/support">All FAQs & policies</Link></p>
      </section>
    </>
  );
}
