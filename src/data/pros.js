// ═══════════════════════════════════════════════════════════════
// LOCAL PROS — Paid Directory (v1 has placeholder/demo data)
// ═══════════════════════════════════════════════════════════════
// When you're ready to monetize this, replace the demo entries with
// real pros who've paid for listings. Keep the structure.
//
// Categories match the fix categories so the app can auto-suggest
// the right pro when someone hits a "Call a Pro" screen.

export const LOCAL_PROS = [
  // ─── PLACEHOLDER ENTRIES (to be replaced with paid listings) ───
  {
    id: "demo-1",
    name: "Example Plumbing Co.",
    category: "plumbing",
    blurb: "24/7 emergency plumbing. Licensed & insured.",
    phone: "555-555-5555",
    rating: 4.9,
    reviewCount: 124,
    featured: true,
    zipCodes: [], // empty = all zip codes; for paid listings, scope to their service area
    paid: false, // false = demo/aggregator link, true = paid listing
  },
  {
    id: "demo-2",
    name: "Example Electric",
    category: "electrical",
    blurb: "Residential electrical services for 15+ years.",
    phone: "555-555-5555",
    rating: 4.8,
    reviewCount: 89,
    featured: true,
    zipCodes: [],
    paid: false,
  },
];

// Aggregator fallbacks — shown when no paid pros for a category/ZIP
export const PRO_AGGREGATORS = [
  {
    name: "Angi",
    url: "https://www.angi.com/",
    blurb: "Browse rated pros by category.",
  },
  {
    name: "Thumbtack",
    url: "https://www.thumbtack.com/",
    blurb: "Get quotes from multiple pros.",
  },
  {
    name: "HomeAdvisor",
    url: "https://www.homeadvisor.com/",
    blurb: "Screened & approved pros near you.",
  },
];

// ═══════════════════════════════════════════════════════════════
// AFFILIATE LINKS — Tool tags to purchase URLs
// ═══════════════════════════════════════════════════════════════
// When a tool in a fix has an `affiliateTag`, the app looks it up here
// and makes the tool chip clickable. Monetizes every fix read.
//
// TO GO LIVE: sign up for Amazon Associates (associates.amazon.com)
// and replace 'YOUR_AMAZON_TAG' with your actual tracking ID.
// Also apply for Home Depot + Lowe's affiliate programs via Impact.com.

export const AFFILIATE_TAG = "householdhero-20"; // your Amazon Associates ID

// Helper to build an Amazon search URL with your affiliate tag
export function amazonSearch(query) {
  const q = encodeURIComponent(query);
  return `https://www.amazon.com/s?k=${q}&tag=${AFFILIATE_TAG}`;
}

// Tool lookup — map the tag to a search query (or direct URL)
export const TOOL_LINKS = {
  "plunger": amazonSearch("toilet plunger flange"),
  "wrench": amazonSearch("adjustable wrench"),
  "screwdriver": amazonSearch("screwdriver set"),
  "toilet-flapper": amazonSearch("toilet flapper universal"),
  "voltage-tester": amazonSearch("non-contact voltage tester"),
  "wire-stripper": amazonSearch("wire stripper"),
  "allen-wrench": amazonSearch("hex key set"),
  "9v-battery": amazonSearch("9v battery smoke alarm"),
  "spackle": amazonSearch("drywall spackle"),
  "hvac-filter": amazonSearch("hvac air filter"),
  "wd40": amazonSearch("wd-40"),
  "caulk-gun": amazonSearch("caulk gun"),
  "silicone-caulk": amazonSearch("silicone bathroom caulk"),
  "caulk": amazonSearch("exterior caulk"),
  "utility-knife": amazonSearch("utility knife"),
  "jump-box": amazonSearch("portable car jump starter"),
  "wiper-blades": amazonSearch("windshield wiper blades"),
  "pressure-gauge": amazonSearch("tire pressure gauge"),
  "coolant": amazonSearch("car coolant premix"),
  "wifi-extender": amazonSearch("wifi extender mesh"),
  "smart-bulb": amazonSearch("smart bulb wifi"),
  "flashlight": amazonSearch("led flashlight"),
  "work-gloves": amazonSearch("work gloves"),
  "gutter-scoop": amazonSearch("gutter cleaning tool"),
  "weatherstripping": amazonSearch("door weatherstripping foam"),
  "door-sweep": amazonSearch("door sweep bottom"),
  "spigot-cover": amazonSearch("outdoor faucet cover"),
  "coil-brush": amazonSearch("refrigerator coil brush"),
  "safety-glasses": amazonSearch("safety glasses"),
};

export function getToolLink(affiliateTag) {
  return TOOL_LINKS[affiliateTag] || amazonSearch(affiliateTag.replace(/-/g, " "));
}
