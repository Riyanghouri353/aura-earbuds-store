// Draws a stylised earbud + case in the product colour, Apple-render style,
// using pure SVG so the store needs zero image assets and never breaks.
export default function BudVisual({ color = "#f2f2f4", caseColor = "#e9e9ec", size = 200, dark = false }) {
  const id = (color + caseColor).replace(/[^a-z0-9]/gi, "");
  return (
    <svg viewBox="0 0 300 220" width={size} height={size * 0.73} role="img" aria-label="Earbuds illustration">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={caseColor} />
        </linearGradient>
        <radialGradient id={`s${id}`} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="196" rx="105" ry="12" fill={dark ? "#000" : "#0b0b0f"} opacity={dark ? 0.45 : 0.1} />
      {/* case */}
      <rect x="78" y="96" width="144" height="92" rx="34" fill={`url(#g${id})`} stroke={dark ? "#ffffff22" : "#0b0b0f14"} />
      <rect x="78" y="96" width="144" height="92" rx="34" fill={`url(#s${id})`} />
      <rect x="78" y="126" width="144" height="3" fill={dark ? "#ffffff" : "#0b0b0f"} opacity="0.08" />
      <circle cx="150" cy="160" r="4" fill="#34c759" opacity="0.9" />
      {/* left bud */}
      <g transform="rotate(-14 105 78)">
        <rect x="97" y="62" width="15" height="52" rx="7.5" fill={color} stroke="#0b0b0f18" />
        <circle cx="98" cy="52" r="24" fill={`url(#g${id})`} stroke="#0b0b0f14" />
        <circle cx="98" cy="52" r="24" fill={`url(#s${id})`} />
        <circle cx="90" cy="46" r="6" fill={dark ? "#fff" : "#0b0b0f"} opacity="0.14" />
      </g>
      {/* right bud */}
      <g transform="rotate(14 195 78)">
        <rect x="188" y="62" width="15" height="52" rx="7.5" fill={color} stroke="#0b0b0f18" />
        <circle cx="202" cy="52" r="24" fill={`url(#g${id})`} stroke="#0b0b0f14" />
        <circle cx="202" cy="52" r="24" fill={`url(#s${id})`} />
        <circle cx="194" cy="46" r="6" fill={dark ? "#fff" : "#0b0b0f"} opacity="0.14" />
      </g>
    </svg>
  );
}
