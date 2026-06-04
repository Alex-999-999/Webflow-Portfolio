import boomerangmePreview from "@/assets/Works/saas/boomerangme/preview.png?url";
import aifluencyPreview from "@/assets/Works/saas/aifluency/preview.png?url";
import oroswapPreview from "@/assets/Works/saas/oroswap/preview.png?url";
import addyspotPreview from "@/assets/Works/saas/addyspot/preview.png?url";
import futureplusPreview from "@/assets/Works/saas/futureplus/preview.png?url";
import golfnPreview from "@/assets/Works/saas/golfn/preview.png?url";
import liberdynamicsPreview from "@/assets/Works/saas/liberdynamics/preview.png?url";
import peterjohnsPreview from "@/assets/Works/property/peterjohns/preview.png?url";
import yorkmontPreview from "@/assets/Works/property/yorkmont/preview.png?url";
import redpropertyPreview from "@/assets/Works/property/red-property/preview.png?url";
export type WorkCategory = "saas" | "property";

const WORK_PREVIEW_BY_KEY: Record<string, string> = {
  "saas/boomerangme": boomerangmePreview,
  "saas/aifluency": aifluencyPreview,
  "saas/oroswap": oroswapPreview,
  "saas/addyspot": addyspotPreview,
  "saas/futureplus": futureplusPreview,
  "saas/golfn": golfnPreview,
  "saas/liberdynamics": liberdynamicsPreview,
  "property/peterjohns": peterjohnsPreview,
  "property/yorkmont": yorkmontPreview,
  "property/red-property": redpropertyPreview,
};

export const WORK_PREVIEW_ASPECT = "1448 / 1086";

/** @deprecated Use WORK_PREVIEW_ASPECT */
export const FULLSTACK_PREVIEW_ASPECT = WORK_PREVIEW_ASPECT;

export interface WorkService {
  category: WorkCategory;
  number: string;
  slug: string;
  title: string;
  employer?: string;
  description: string;
  pageDescription?: string;
  coreStack: readonly string[];
  infraStack: readonly string[];
  techHighlights: readonly string[];
  problemsSolved: readonly string[];
  image: string;
  imageAspect?: string;
  ctaUrl?: string;
  ctaLabel?: string;
}

function resolveWorkPreview(category: WorkCategory, assetFolder: string): string {
  const key = `${category}/${assetFolder}`;
  const fromFolder = WORK_PREVIEW_BY_KEY[key];
  if (fromFolder) return fromFolder;
  throw new Error(
    `Missing preview for "${key}". Add src/assets/Works/${category}/${assetFolder}/preview.png`,
  );
}

export function workProjectSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type WorkServiceInput = Omit<WorkService, "slug" | "image"> & {
  slug?: string;
  assetFolder: string;
};

function service(entry: WorkServiceInput): WorkService {
  const { assetFolder, category, ...rest } = entry;
  return {
    ...rest,
    category,
    image: resolveWorkPreview(category, assetFolder),
    slug: entry.slug ?? workProjectSlug(entry.title),
  };
}

export const WORK_SERVICES: WorkService[] = [
  service({
    category: "property",
    number: "01",
    assetFolder: "yorkmont",
    employer: "The Yorkmont",
    title: "Luxury Wedding Venue Marketing Site",
    description:
      "Charlotte wedding venue site — ballroom, vow gallery, outdoor ceremony, and courtyard spaces with tour booking, capacity facts, and review-driven trust blocks.",
    coreStack: ["Webflow", "Video hero", "Gallery layouts", "Form styling"],
    infraStack: ["Inquiry forms", "Date picker", "Review embeds", "Vendor policy CMS"],
    techHighlights: [
      "Space-by-space storytelling: Grand Ballroom, Vow Gallery, outdoor ceremony, courtyard",
      "Experience checklist: capacity, planning support, indoor/outdoor ceremony",
      "Tour-to-celebration journey strip and VIP inquiry form",
      "Recognition band with awards and multi-platform review scores",
    ],
    problemsSolved: [
      "Venues sell feeling, not square footage — cinematic copy and full-bleed media per space.",
      "Couples overwhelmed by planning — “we thought of every detail” framing with included offerings.",
      "Competing Charlotte venues — Gold Best Wedding Venue and review proof above the fold.",
      "Long sales cycle — tour CTA repeated with consultative form fields (budget, date, event type).",
    ],
    pageDescription: `The Yorkmont (theyorkmont.com) is a luxury wedding venue in Charlotte, NC, blending European-inspired grounds with modern ballroom elegance. The site moves couples from inspiration to booked tour with space galleries, offerings, and portfolio storytelling.

Each venue zone gets its own narrative block—Grand Ballroom, Vow Gallery, outdoor ceremony, and courtyard—so couples can imagine their day before they inquire.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://www.theyorkmont.com/",
    ctaLabel: "Visit The Yorkmont",
  }),
  service({
    category: "property",
    number: "02",
    assetFolder: "red-property",
    slug: "red-property",
    employer: "Real Estate Dealers",
    title: "Performance Marketing Agency — Global Real Estate",
    description:
      "Bilingual marketing site for developers and agencies — guaranteed lead gen, CRM automation, case studies across 13 countries, and blog authority.",
    coreStack: ["Webflow", "Case study system", "Video hero", "Conversion layout"],
    infraStack: ["CRM hooks", "Cookie center", "Blog CMS", "RU / EN locales"],
    techHighlights: [
      "Guaranteed lead generation and unit-economics positioning",
      "Service pillars: leads, CRM automation, sales quality control",
      "Global presence map with 13+ markets and deal metrics",
      "Case study grid with NDA-friendly results and ROI stats",
    ],
    problemsSolved: [
      "Agency needed to prove vertical focus — entire site speaks only real estate, not generic performance marketing.",
      "International clients scan for local proof — country tabs and deal counters upfront.",
      "Long case list risked clutter — card system with KPI snippets and NDA labels.",
      "Compliance for EU visitors — cookie preference center with granular categories.",
    ],
    pageDescription: `Real Estate Dealers (red-property.com) is an operational growth partner for developers and agencies worldwide, offering lead generation with contractual guarantees, CRM setup, and sales quality oversight.

The site is built for both Russian and English audiences—foregrounding measurable outcomes, deals per year, lead volume, and market-specific case studies so brokers can evaluate fit before booking a consultation.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://red-property.com/",
    ctaLabel: "Visit Real Estate Dealers",
  }),
  service({
    category: "saas",
    number: "03",
    assetFolder: "boomerangme",
    employer: "Boomerangme",
    title: "AI-Powered Digital Loyalty Marketing Site",
    description:
      "Marketing site for a wallet-based loyalty platform — Richie AI onboarding, agency white-label flows, ROI calculator, and conversion paths for 30,000+ local businesses.",
    coreStack: ["Webflow", "Custom interactions", "Responsive layout", "Brand system"],
    infraStack: ["CMS collections", "Form embeds", "Analytics", "SEO structure"],
    techHighlights: [
      "Long-form product storytelling with persona-specific value blocks",
      "Live-style revenue counter and social proof sections",
      "Interactive ROI calculator and demo request funnels",
      "Blog, FAQ, and integration request flows wired for marketing ops",
    ],
    problemsSolved: [
      "Complex B2B2C story needed one clear homepage — structured journeys for agencies, marketers, franchises, and owners.",
      "Product depth buried under feature lists — reframed around outcomes: retention, AOV, and wallet adoption.",
      "Multiple CTAs competing for attention — hierarchy tuned for demo vs. free-trial conversion.",
      "Trust gap for a young SaaS brand — testimonials, metrics, and partner logos surfaced early.",
    ],
    pageDescription: `Boomerangme (boomerangme.biz) is an AI-powered customer engagement platform for local businesses: digital wallet cards, automated push/SMS/email, and POS-friendly loyalty without a consumer app download.

The Webflow build focuses on explaining a dense product to three audiences at once — agencies reselling white-label, marketers running campaigns, and owners who need proof of ROI before they connect a Google Business Profile.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://www.boomerangme.biz/",
    ctaLabel: "Visit Boomerangme",
  }),
  service({
    category: "saas",
    number: "04",
    assetFolder: "aifluency",
    employer: "AI Fluency",
    title: "Enterprise AI Fluency Consulting Website",
    description:
      "Brand and marketing site for a Montana-based AI training firm — Claude partner positioning, workshop funnels, consultant map, and ROI calculator for enterprise buyers.",
    coreStack: ["Webflow", "Typography system", "Scroll interactions", "Component library"],
    infraStack: ["CMS for blog", "Calendly embeds", "Lead forms", "Partner logos"],
    techHighlights: [
      "Verified Claude partnership block with certification narrative",
      "Four-offer service grid: builds, workshops, coaching hub, HR rubric",
      "Interactive ROI calculator with conservative recovery modeling",
      "Consultant geography map and flagship program storytelling",
    ],
    problemsSolved: [
      "Category crowded with generic AI consultancies — differentiated through fluency rubric and founder-led delivery.",
      "Enterprise buyers needed proof, not hype — quote wall from Microsoft, McKinsey, Anthropic, and peers.",
      "Multiple offers caused navigation fatigue — tabbed paths with single primary CTA per segment.",
      "Montana roots had to feel premium, not provincial — editorial layout with global reach cues.",
    ],
    pageDescription: `AI Fluency (aifluency.ai) trains teams to use AI with confidence through workshops, assessments, implementation, and ongoing adoption support. The site sells founder accountability, measurable rubrics, and certified Claude consultants.

Design work balanced thought-leadership density with conversion: discovery calls, workshop requests, and free rubric downloads without drowning visitors in jargon.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://www.aifluency.ai/",
    ctaLabel: "Visit AI Fluency",
  }),
  service({
    category: "saas",
    number: "05",
    assetFolder: "oroswap",
    slug: "oroswap",
    employer: "OroSwap",
    title: "AI-Native DeFi Exchange Marketing Site",
    description:
      "Product marketing site for the first AI-powered DEX on ZIGChain — conversational swap demos, ACL liquidity story, roadmap timeline, and testnet launch CTAs.",
    coreStack: ["Webflow", "Motion design", "Dark UI", "3D accents"],
    infraStack: ["Lottie / video", "Wallet CTAs", "Docs links", "Community hubs"],
    techHighlights: [
      "Chat-style swap, multi-swap, and liquidity manager UI mockups",
      "Stats band for volume, swaps, and unique wallets",
      "Roadmap quarters with ecosystem and TGE milestones",
      "FAQ accordion covering ACL, multi-farms, and IBC interoperability",
    ],
    problemsSolved: [
      "DeFi mechanics are hard to parse quickly — productized into three assistant-led user stories.",
      "Technical credibility required without whitepaper tone — diagrams for ACL, routing, and IBC.",
      "Roadmap spanned multiple years — scrollable timeline aligned to investor and community readers.",
      "Testnet CTA buried under feature copy — repeated launch paths across hero and feature bands.",
    ],
    pageDescription: `OroSwap (oroswap.org) markets an AI-native RWA DEX on ZIGChain: adaptive concentrated liquidity, smart routing, and conversational commands for swaps and LP management.

The site’s job is to make advanced DeFi legible to Web2-curious users while still satisfying crypto-native readers who expect audit, token, and cross-chain detail.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://www.oroswap.org/",
    ctaLabel: "Visit OroSwap",
  }),
  service({
    category: "saas",
    number: "06",
    assetFolder: "addyspot",
    employer: "Addy Spot",
    title: "Gig Economy Driver Platform Landing Page",
    description:
      "EU-focused landing page for a food-delivery driver assistant — demand forecasting story, early-access signup, partner categories, and refreshment-spot community angle.",
    coreStack: ["Webflow", "Mobile-first layout", "Form UX", "Illustration slots"],
    infraStack: ["Waitlist forms", "Legal pages", "Partner intake", "Localization-ready"],
    techHighlights: [
      "Hero focused on time-and-income control for gig workers",
      "Benefit modules: demand, competition, weather, weekly shift tips",
      "Partner verticals: finance, groceries, insurance, telecom",
      "Early-access funnel with consent and thank-you states",
    ],
    problemsSolved: [
      "Drivers lose income on dead shifts — narrative centered on up to 15% monthly uplift.",
      "B2B partnerships needed space without overshadowing driver signup — split partner band below hero.",
      "Regulatory trust for EU users — impressum, privacy, and terms linked in footer patterns.",
      "Community pit-stop concept was abstract — visualized as urban refreshment infrastructure.",
    ],
    pageDescription: `Addy Spot (addyspot.eu) is a personal work assistant for food delivery drivers in Europe, helping them choose when and where to work based on demand, competition, and weather. The brand also builds refreshment spots and partner benefits for gig workers.

The page is conversion-first: early access capture for drivers while leaving room for B2B collaboration inbound.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://addyspot.eu/",
    ctaLabel: "Visit Addy Spot",
  }),
  service({
    category: "saas",
    number: "07",
    assetFolder: "futureplus",
    employer: "Future+",
    title: "Strategic Advisory & Network Platform Site",
    description:
      "Luxury-meets-innovation advisory brand site — founder narrative, Codes of Culture media platform, testimonial carousel, and discreet partnership inquiry flow.",
    coreStack: ["Webflow", "Editorial layout", "Premium typography", "Subtle animation"],
    infraStack: ["CMS stories", "Newsletter embed", "Event promos", "Privacy controls"],
    techHighlights: [
      "Three-audience positioning: founders, capital partners, institutions",
      "How-it-works pillars: alignment, partnerships, events, founder perspective",
      "Codes of Culture sub-brand marquee and editorial CTA",
      "Testimonials from luxury, gaming, blockchain, and enterprise leaders",
    ],
    problemsSolved: [
      "Network businesses sell trust, not SKUs — copy and layout emphasize discretion and curation.",
      "Multiple initiatives under one brand — Future+ core vs. Codes of Culture clearly separated.",
      "Global luxury audience expects polish — restrained motion and high-contrast editorial rhythm.",
      "Invitation-only positioning — soft-gated contact instead of aggressive lead forms.",
    ],
    pageDescription: `Future+ (futureplus.xyz) connects founders, capital, and institutions across luxury, culture, technology, and creative industries through strategic alignment—not transactional matchmaking.

The Webflow experience mirrors that positioning: spacious typography, selective social proof, and a media platform hook (Codes of Culture) for ongoing engagement.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://futureplus.xyz/",
    ctaLabel: "Visit Future+",
  }),
  service({
    category: "property",
    number: "08",
    assetFolder: "peterjohns",
    employer: "PETERJOHNS",
    title: "Luxury Real Estate Agency — Barcelona",
    description:
      "Spanish-language property marketing site for exclusive Barcelona homes — listing grids, valuation funnels, rental department story, and private portfolio positioning.",
    coreStack: ["Webflow", "Listing cards", "Map-ready layout", "Multilingual SEO"],
    infraStack: ["CMS listings", "Lead forms", "Legal pages", "Analytics"],
    techHighlights: [
      "Hero and editorial intro for high-end residential sales",
      "Featured property grid with ref numbers, specs, and pricing",
      "Off-market and valuation CTAs for private clients",
      "Rental department credibility section with multilingual agents",
    ],
    problemsSolved: [
      "Luxury buyers expect discretion — private inventory messaging without cluttering public listings.",
      "Many similar agencies in Barcelona — digital-first differentiation via marketing and private network story.",
      "Dual sales and rentals under one brand — clear sectioning so neither audience feels secondary.",
      "Lead capture needed to feel concierge, not generic — valuation and contact flows with soft tone.",
    ],
    pageDescription: `PETERJOHNS (peterjohns.com) specializes in marketing exclusive homes in Barcelona through digital channels and a private network, backed by 20 years of real estate and marketing experience.

The site showcases flagship listings while inviting off-market searches and complimentary property valuations—typical patterns for European boutique agencies moving beyond portal dependence.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://www.peterjohns.com/",
    ctaLabel: "Visit PETERJOHNS",
  }),
  service({
    category: "saas",
    number: "09",
    assetFolder: "golfn",
    slug: "golfn",
    employer: "GolfN",
    title: "Golf Rewards & Digital Caddie App Marketing Site",
    description:
      "Product marketing site for a gamified golf app — earn points while you play, 40K+ courses, pro endorsements, membership tiers, and app-download funnels.",
    coreStack: ["Webflow", "App UI mockups", "Scroll storytelling", "Conversion CTAs"],
    infraStack: ["Email capture", "FAQ CMS", "Blog links", "Membership pages"],
    techHighlights: [
      "Hero and comparison band for free premium caddie features",
      "How-it-works flow: account → round → earn → redeem",
      "Gamification modules: collectibles, prize wheel, sweepstakes, streaks",
      "Social proof from tour pros, ambassadors, and player testimonials",
    ],
    problemsSolved: [
      "Crowded golf app market — differentiated with earn-while-you-play rewards narrative.",
      "Feature-heavy product needed simple story — four-step journey before deep dives.",
      "Mobile app installs are the KPI — repeated “send me the app link” forms across page.",
      "Trust for a new category — PGA endorsements and 47K+ golfer social proof upfront.",
    ],
    pageDescription: `GolfN (golfnapp.com) is a digital caddie app that rewards players for golfing: GPS maps at 40,000+ courses, AI club recommendations, GHIN handicap sync, friends games, XP, badges, and redemptions for gear and experiences.

The Webflow site sells the lifestyle and gamification layer—making a complex product feel as easy as “create account, play, earn, redeem.”`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://www.golfnapp.com/",
    ctaLabel: "Visit GolfN",
  }),
  service({
    category: "saas",
    number: "10",
    assetFolder: "liberdynamics",
    employer: "LiberDynamics",
    title: "Data Privacy & Compliance Consulting Website",
    description:
      "B2B site for SMB privacy consulting — AI governance, GDPR, CCPA, and privacy operations with global expertise positioning and consultation booking.",
    coreStack: ["Webflow", "Service cards", "Trust layout", "Blog integration"],
    infraStack: ["Contact forms", "Consent fields", "Cookie banner", "Resource CMS"],
    techHighlights: [
      "Four-service grid: AI Governance, GDPR, Privacy Ops, CCPA",
      "Why-us band for practical, cost-effective SMB positioning",
      "Global compliance narrative for EU, U.K., and U.S. operators",
      "Blog highlights and partnership announcements",
    ],
    problemsSolved: [
      "Privacy consultancies sound abstract — service pages tied to concrete outcomes and laws.",
      "SMB buyers fear enterprise pricing — copy emphasizes practical, tailored programs.",
      "Multi-regulation confusion — clear regional expertise without overwhelming jargon.",
      "Lead quality — consultation CTA plus detailed contact form with consent checkbox.",
    ],
    pageDescription: `LiberDynamics (liberdynamics.com) helps small and medium businesses implement data privacy programs across AI governance, GDPR, CCPA, and day-to-day privacy operations.

The site balances credibility for regulated markets with approachable language—so operators understand why privacy is about trust, not checkbox compliance, before they book a call.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://www.liberdynamics.com/",
    ctaLabel: "Visit LiberDynamics",
  }),
];

export function getWorkServiceBySlug(slug: string): WorkService | undefined {
  return WORK_SERVICES.find((project) => project.slug === slug);
}

