/**
 * Conceptual Webflow work preview PNGs (1448×1086).
 * Run: npm run generate:work-previews
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outBase = path.join(root, "src/assets/Works");

const W = 1448;
const H = 1086;
const FONT =
  "system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif";
const MONO = "ui-monospace, Cascadia Code, SF Mono, Consolas, monospace";

const DIAGRAM_TOP = 292;
const DIAGRAM_PAD = 72;
const PILL_Y = 812;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cjkWidth(label) {
  let w = 0;
  for (const ch of label) {
    w += ch.charCodeAt(0) > 127 ? 22 : 11;
  }
  return w;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

function baseDefs(accent) {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.75" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="40%" stop-color="#07070b"/>
      <stop offset="100%" stop-color="#050508"/>
    </linearGradient>
  </defs>`;
}

function diagramPanel() {
  return `<rect x="${DIAGRAM_PAD - 8}" y="${DIAGRAM_TOP - 16}" width="${W - 2 * DIAGRAM_PAD + 16}" height="500" rx="18" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
}

function header({ category, title, subtitle, accent }) {
  return `
  <line x1="${DIAGRAM_PAD}" y1="268" x2="${W - DIAGRAM_PAD}" y2="268" stroke="rgba(255,255,255,0.09)" stroke-width="1"/>
  <text x="${DIAGRAM_PAD}" y="108" fill="${accent}" font-family="${FONT}" font-size="17" font-weight="700" letter-spacing="0.18em">${esc(category)}</text>
  <text x="${DIAGRAM_PAD}" y="178" fill="#f8fafc" font-family="${FONT}" font-size="50" font-weight="700">${esc(title)}</text>
  <text x="${DIAGRAM_PAD}" y="232" fill="rgba(255,255,255,0.62)" font-family="${FONT}" font-size="25">${esc(subtitle)}</text>`;
}

function pill(x, y, label, accent, tw) {
  const w = tw ?? Math.max(cjkWidth(label) + 52, 116);
  return `
  <rect x="${x}" y="${y}" width="${w}" height="38" rx="19" fill="rgba(255,255,255,0.055)" stroke="${accent}" stroke-opacity="0.38" stroke-width="1.5"/>
  <text x="${x + w / 2}" y="${y + 25}" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="${FONT}" font-size="17" font-weight="600">${esc(label)}</text>`;
}

function pillsCentered(items, y, accent) {
  const widths = items.map((l) => Math.max(cjkWidth(l) + 52, 116));
  const gap = 18;
  const total = widths.reduce((s, w) => s + w, 0) + gap * (items.length - 1);
  let x = Math.round((W - total) / 2);
  return items
    .map((label, i) => {
      const svg = pill(x, y, label, accent, widths[i]);
      x += widths[i] + gap;
      return svg;
    })
    .join("");
}

function webflowPageBody(accent, sections, pills) {
  const bx = DIAGRAM_PAD + 16;
  const bw = W - 2 * bx;
  const barH = 44;
  const gap = 14;
  const startY = DIAGRAM_TOP + 24;
  const blocks = sections
    .map((label, i) => {
      const y = startY + i * (barH + gap);
      const strong = i === 1;
      const rgb = hexToRgb(accent);
      const fill = strong ? `rgba(${rgb},0.14)` : "rgba(255,255,255,0.04)";
      const sw = strong ? 2.25 : 1.5;
      return `
  <rect x="${bx}" y="${y}" width="${bw}" height="${barH}" rx="10" fill="${fill}" stroke="${accent}" stroke-opacity="${strong ? 0.55 : 0.28}" stroke-width="${sw}"/>
  <text x="${bx + 24}" y="${y + 28}" fill="#f8fafc" font-family="${FONT}" font-size="19" font-weight="600">${esc(label)}</text>`;
    })
    .join("");
  const browserY = DIAGRAM_TOP - 8;
  return `
  <rect x="${DIAGRAM_PAD}" y="${browserY}" width="${W - 2 * DIAGRAM_PAD}" height="468" rx="14" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
  <rect x="${DIAGRAM_PAD}" y="${browserY}" width="${W - 2 * DIAGRAM_PAD}" height="36" rx="14" fill="rgba(255,255,255,0.05)"/>
  <circle cx="${DIAGRAM_PAD + 28}" cy="${browserY + 18}" r="6" fill="#ef4444" opacity="0.85"/>
  <circle cx="${DIAGRAM_PAD + 52}" cy="${browserY + 18}" r="6" fill="#eab308" opacity="0.85"/>
  <circle cx="${DIAGRAM_PAD + 76}" cy="${browserY + 18}" r="6" fill="#22c55e" opacity="0.85"/>
  <text x="${W / 2}" y="${browserY + 24}" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-family="${MONO}" font-size="13">webflow.io · published</text>
  ${blocks}
  ${pillsCentered(pills, PILL_Y, accent)}`;
}

const PREVIEWS = {
  boomerangme: {
    accent: "#f97316",
    category: "WEBFLOW · SAAS",
    title: "Boomerangme",
    subtitle: "AI loyalty · wallet cards · ROI funnel",
    body: (a) =>
      webflowPageBody(a, ["Hero + Richie AI demo", "Persona value blocks", "Calculator · testimonials", "Blog · FAQ · integrations"], [
        "Webflow",
        "CMS",
        "Lead gen",
      ]),
  },
  aifluency: {
    accent: "#8b5cf6",
    category: "WEBFLOW · SAAS",
    title: "AI Fluency",
    subtitle: "Claude partner · workshops · ROI calc",
    body: (a) =>
      webflowPageBody(a, ["Partnership + quote wall", "Four service paths", "Consultant map", "Rubric · discovery CTA"], [
        "Editorial",
        "Forms",
        "SEO",
      ]),
  },
  oroswap: {
    accent: "#22d3ee",
    category: "WEBFLOW · SAAS",
    title: "OroSwap",
    subtitle: "AI DEX · ACL · ZIGChain",
    body: (a) =>
      webflowPageBody(a, ["Stats · conversational UI", "Swap assistant demos", "ACL · IBC features", "Roadmap · FAQ"], [
        "Dark UI",
        "Motion",
        "Testnet CTA",
      ]),
  },
  addyspot: {
    accent: "#10b981",
    category: "WEBFLOW · SAAS",
    title: "Addy Spot",
    subtitle: "Gig drivers · demand insights",
    body: (a) =>
      webflowPageBody(a, ["Income control hero", "Shift recommendation story", "Partner verticals", "Early access waitlist"], [
        "Mobile-first",
        "EU forms",
        "B2B band",
      ]),
  },
  futureplus: {
    accent: "#d4af37",
    category: "WEBFLOW · SAAS",
    title: "Future+",
    subtitle: "Advisory network · luxury editorial",
    body: (a) =>
      webflowPageBody(a, ["Founder · capital · institutions", "Alignment pillars", "Codes of Culture", "Testimonials · inquiry"], [
        "Premium type",
        "CMS",
        "Discreet CTA",
      ]),
  },
  peterjohns: {
    accent: "#3b82f6",
    category: "WEBFLOW · PROPERTY",
    title: "PETERJOHNS",
    subtitle: "Luxury homes · Barcelona",
    body: (a) =>
      webflowPageBody(a, ["Editorial hero", "Featured listings grid", "Private portfolio CTA", "Valuation · rentals"], [
        "Listings CMS",
        "ES market",
        "Leads",
      ]),
  },
  yorkmont: {
    accent: "#ec4899",
    category: "WEBFLOW · PROPERTY",
    title: "The Yorkmont",
    subtitle: "Wedding venue · Charlotte NC",
    body: (a) =>
      webflowPageBody(a, ["Cinematic hero video", "Space galleries", "Experience checklist", "Tour inquiry form"], [
        "Video",
        "Reviews",
        "Booking",
      ]),
  },
  "red-property": {
    accent: "#dc2626",
    category: "WEBFLOW · PROPERTY",
    title: "Real Estate Dealers",
    subtitle: "Lead gen · 13 markets · cases",
    body: (a) =>
      webflowPageBody(a, ["Guaranteed leads hero", "CRM · automation services", "Global presence map", "Case study wall"], [
        "Performance",
        "Blog",
        "Cookies",
      ]),
  },
  golfn: {
    accent: "#16a34a",
    category: "WEBFLOW · SAAS",
    title: "GolfN",
    subtitle: "Earn while you play · 40K courses",
    body: (a) =>
      webflowPageBody(a, ["Paid to play hero", "How it works · app UI", "Gamification · sweepstakes", "Membership · app link"], [
        "Mobile app",
        "Rewards",
        "GHIN",
      ]),
  },
  liberdynamics: {
    accent: "#1d4ed8",
    category: "WEBFLOW · SAAS",
    title: "LiberDynamics",
    subtitle: "GDPR · CCPA · AI governance",
    body: (a) =>
      webflowPageBody(a, ["Privacy trust hero", "Four service offerings", "EU · UK · US expertise", "Blog · contact form"], [
        "SMB focus",
        "Compliance",
        "Consulting",
      ]),
  },
};

const PROJECTS = [
  { category: "saas", folder: "boomerangme" },
  { category: "saas", folder: "aifluency" },
  { category: "saas", folder: "oroswap" },
  { category: "saas", folder: "addyspot" },
  { category: "saas", folder: "futureplus" },
  { category: "property", folder: "peterjohns" },
  { category: "property", folder: "yorkmont" },
  { category: "property", folder: "red-property" },
  { category: "saas", folder: "golfn" },
  { category: "saas", folder: "liberdynamics" },
];

function buildSvg(folder) {
  const spec = PREVIEWS[folder];
  if (!spec) throw new Error(`No preview spec for ${folder}`);
  const { accent, category, title, subtitle, body } = spec;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${baseDefs(accent)}
  <rect width="${W}" height="${H}" fill="#050508"/>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${header({ category, title, subtitle, accent })}
  ${diagramPanel()}
  ${body(accent)}
</svg>`;
}

async function writePreview({ category, folder }) {
  const dir = path.join(outBase, category, folder);
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, "preview.png");
  const svg = buildSvg(folder);
  await sharp(Buffer.from(svg), { density: 192 })
    .resize(W, H)
    .png({ quality: 96, compressionLevel: 8 })
    .toFile(outPath);
  console.log(`  ${category}/${folder}`);
}

console.log("Generating Webflow work previews…");
for (const p of PROJECTS) {
  await writePreview(p);
}
console.log("Done.");
