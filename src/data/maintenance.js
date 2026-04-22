// ═══════════════════════════════════════════════════════════════
// MAINTENANCE CALENDAR
// ═══════════════════════════════════════════════════════════════
// Organized by frequency. Each task has:
//   - id: unique
//   - title: what to do
//   - blurb: why it matters
//   - months: which months it applies to (0=Jan, 11=Dec). Empty = any.
//   - seasons: array of 'spring', 'summer', 'fall', 'winter'
//   - frequency: 'monthly', 'quarterly', 'biannual', 'annual', 'seasonal'
//   - category: links to fix category when possible
//   - linkedFixId: optional — if there's a related fix guide
//   - homeType: 'all', 'owned', 'rented' — when to show
// ═══════════════════════════════════════════════════════════════

export const MAINTENANCE_TASKS = [
  // ──── MONTHLY (show every month) ────
  {
    id: "m-hvac-filter",
    title: "Check HVAC Air Filter",
    blurb: "Peek at it monthly. Replace every 1-3 months depending on use and pets.",
    frequency: "monthly",
    category: "maintenance",
    linkedFixId: "replace-hvac-filter",
    homeType: "all",
    impact: "high",
  },
  {
    id: "m-smoke-alarm-test",
    title: "Test Smoke & CO Alarms",
    blurb: "Press the test button on each. Should chirp loudly. Takes 30 seconds.",
    frequency: "monthly",
    category: "safety",
    linkedFixId: "smoke-alarm-chirp",
    homeType: "all",
    impact: "high",
  },
  {
    id: "m-leak-check",
    title: "Quick Leak Scan",
    blurb: "Look under sinks, around toilets, behind washer. Catch small leaks early.",
    frequency: "monthly",
    category: "plumbing",
    homeType: "all",
    impact: "high",
  },
  {
    id: "m-disposal-clean",
    title: "Freshen Garbage Disposal",
    blurb: "Grind ice cubes + lemon peels. 10 seconds, eliminates odors.",
    frequency: "monthly",
    category: "appliances",
    homeType: "all",
    impact: "low",
  },
  {
    id: "m-fire-extinguisher",
    title: "Check Fire Extinguisher Gauge",
    blurb: "Needle should be in the green. Replace if in the red.",
    frequency: "monthly",
    category: "safety",
    homeType: "all",
    impact: "high",
  },

  // ──── QUARTERLY (every 3 months) ────
  {
    id: "q-water-softener",
    title: "Check Water Softener Salt",
    blurb: "Top up salt if low. Break up any salt bridges.",
    frequency: "quarterly",
    category: "plumbing",
    homeType: "owned",
    impact: "med",
  },
  {
    id: "q-exhaust-fans",
    title: "Clean Bathroom & Kitchen Exhaust Fans",
    blurb: "Dust clogs them fast. Unscrew the cover, vacuum out dust, wipe blades.",
    frequency: "quarterly",
    category: "maintenance",
    homeType: "all",
    impact: "med",
  },
  {
    id: "q-drain-flush",
    title: "Flush Drains with Hot Water",
    blurb: "Pour boiling water down each drain monthly to prevent gunk buildup.",
    frequency: "quarterly",
    category: "plumbing",
    linkedFixId: "clogged-drain",
    homeType: "all",
    impact: "med",
  },
  {
    id: "q-tire-pressure",
    title: "Check Tire Pressure (All 4)",
    blurb: "Properly inflated tires = safer + better gas mileage. Takes 10 min.",
    frequency: "quarterly",
    category: "car",
    linkedFixId: "check-tire-pressure",
    homeType: "all",
    impact: "med",
  },

  // ──── SPRING (March - May) ────
  {
    id: "s-hvac-spring-tune",
    title: "AC / HVAC Spring Tune-Up",
    blurb: "Before summer heat hits, get a pro to service it. $80-150 saves $1000s.",
    frequency: "seasonal",
    seasons: ["spring"],
    months: [2, 3],
    category: "maintenance",
    homeType: "owned",
    impact: "high",
  },
  {
    id: "s-gutters-spring",
    title: "Clean Gutters",
    blurb: "After winter debris. Check for damage while you're up there.",
    frequency: "seasonal",
    seasons: ["spring"],
    months: [3, 4],
    category: "yard",
    linkedFixId: "clean-gutters",
    homeType: "owned",
    impact: "high",
  },
  {
    id: "s-exterior-check",
    title: "Walk Around Your Home's Exterior",
    blurb: "Look for cracked caulk, peeling paint, loose shingles, foundation cracks. Winter is rough on houses.",
    frequency: "seasonal",
    seasons: ["spring"],
    months: [3, 4],
    category: "maintenance",
    homeType: "owned",
    impact: "high",
  },
  {
    id: "s-deck-inspect",
    title: "Inspect Deck & Outdoor Furniture",
    blurb: "Look for loose boards, popped nails, splinters. Hammer in or replace.",
    frequency: "seasonal",
    seasons: ["spring"],
    months: [3, 4],
    category: "yard",
    homeType: "owned",
    impact: "med",
  },
  {
    id: "s-windows-screens",
    title: "Install Screens & Clean Windows",
    blurb: "Out with storm windows, in with screens. Clean them while you're at it.",
    frequency: "seasonal",
    seasons: ["spring"],
    months: [3],
    category: "maintenance",
    homeType: "all",
    impact: "low",
  },
  {
    id: "s-lawn-start",
    title: "Start Lawn Care Routine",
    blurb: "First mow of the season. Check mower, sharpen blade, fill gas.",
    frequency: "seasonal",
    seasons: ["spring"],
    months: [3, 4],
    category: "yard",
    linkedFixId: "mow-lawn-basics",
    homeType: "owned",
    impact: "low",
  },

  // ──── SUMMER (June - August) ────
  {
    id: "su-ac-filter-often",
    title: "Change AC Filter Every Month",
    blurb: "Heavy AC use = filter gets dirty fast. Check monthly through summer.",
    frequency: "seasonal",
    seasons: ["summer"],
    months: [5, 6, 7],
    category: "maintenance",
    linkedFixId: "replace-hvac-filter",
    homeType: "all",
    impact: "high",
  },
  {
    id: "su-standing-water",
    title: "Empty Standing Water Weekly",
    blurb: "Flower pots, gutters, bird baths — mosquito breeding grounds. Just dump 'em.",
    frequency: "seasonal",
    seasons: ["summer"],
    months: [5, 6, 7, 8],
    category: "yard",
    homeType: "all",
    impact: "med",
  },
  {
    id: "su-grill-clean",
    title: "Deep Clean the Grill",
    blurb: "Scrub grates, clean out the bottom, check gas lines.",
    frequency: "seasonal",
    seasons: ["summer"],
    months: [5, 6],
    category: "yard",
    homeType: "all",
    impact: "low",
  },
  {
    id: "su-ceiling-fans",
    title: "Reverse Ceiling Fan Direction",
    blurb: "In summer, fans should spin counter-clockwise (blade leading edge DOWN). Pushes cool air down.",
    frequency: "seasonal",
    seasons: ["summer"],
    months: [5],
    category: "maintenance",
    homeType: "all",
    impact: "low",
  },

  // ──── FALL (September - November) ────
  {
    id: "f-furnace-tune",
    title: "Furnace Tune-Up",
    blurb: "Before winter heat use. A pro check = $80-150, prevents mid-winter breakdown.",
    frequency: "seasonal",
    seasons: ["fall"],
    months: [8, 9],
    category: "maintenance",
    homeType: "owned",
    impact: "high",
  },
  {
    id: "f-gutters-fall",
    title: "Clean Gutters Again",
    blurb: "After leaves fall. Do this before the first hard freeze.",
    frequency: "seasonal",
    seasons: ["fall"],
    months: [9, 10],
    category: "yard",
    linkedFixId: "clean-gutters",
    homeType: "owned",
    impact: "high",
  },
  {
    id: "f-winterize-hose",
    title: "Disconnect & Drain Outdoor Hoses",
    blurb: "Before first freeze. Prevents burst pipes in the walls.",
    frequency: "seasonal",
    seasons: ["fall"],
    months: [9, 10],
    category: "yard",
    linkedFixId: "winterize-hose",
    homeType: "all",
    impact: "high",
  },
  {
    id: "f-weatherstrip",
    title: "Check Weatherstripping on Doors & Windows",
    blurb: "Replace any that's cracked or missing. Saves 20%+ on heating.",
    frequency: "seasonal",
    seasons: ["fall"],
    months: [9, 10],
    category: "maintenance",
    linkedFixId: "weatherproof-window",
    homeType: "all",
    impact: "high",
  },
  {
    id: "f-fireplace-chimney",
    title: "Chimney & Fireplace Inspection",
    blurb: "If you use it, get it swept and inspected annually before first fire.",
    frequency: "seasonal",
    seasons: ["fall"],
    months: [9, 10],
    category: "safety",
    homeType: "owned",
    impact: "high",
  },
  {
    id: "f-ceiling-fans-reverse",
    title: "Reverse Ceiling Fan Direction",
    blurb: "In winter, fans should spin clockwise (blade leading edge UP). Pushes warm air down.",
    frequency: "seasonal",
    seasons: ["fall"],
    months: [9, 10],
    category: "maintenance",
    homeType: "all",
    impact: "low",
  },
  {
    id: "f-drain-water-heater",
    title: "Flush Water Heater",
    blurb: "Drain sediment from the tank. Extends life 3-5 years.",
    frequency: "annual",
    months: [9, 10],
    category: "plumbing",
    homeType: "owned",
    impact: "med",
  },

  // ──── WINTER (December - February) ────
  {
    id: "w-pipe-freeze-watch",
    title: "Prevent Frozen Pipes on Cold Nights",
    blurb: "When below 20°F: open cabinet doors under sinks, let faucets drip slowly.",
    frequency: "seasonal",
    seasons: ["winter"],
    months: [11, 0, 1],
    category: "plumbing",
    linkedFixId: "frozen-pipes",
    homeType: "all",
    impact: "high",
  },
  {
    id: "w-ice-dams",
    title: "Watch for Ice Dams on Roof",
    blurb: "Ridges of ice at roof edge = trapped melt water = leaks. Clear snow from roof edges.",
    frequency: "seasonal",
    seasons: ["winter"],
    months: [11, 0, 1],
    category: "yard",
    homeType: "owned",
    impact: "high",
  },
  {
    id: "w-thermostat-away",
    title: "Set Thermostat Before Leaving",
    blurb: "If going away in winter, set thermostat no lower than 55°F to prevent frozen pipes.",
    frequency: "seasonal",
    seasons: ["winter"],
    months: [11, 0, 1],
    category: "maintenance",
    homeType: "all",
    impact: "high",
  },

  // ──── ANNUAL (no specific month) ────
  {
    id: "a-dryer-vent",
    title: "Deep Clean Dryer Vent",
    blurb: "15,500 house fires per year from lint buildup. Clean the whole vent, not just the trap.",
    frequency: "annual",
    category: "appliances",
    linkedFixId: "dryer-not-heating",
    homeType: "all",
    impact: "high",
  },
  {
    id: "a-smoke-battery",
    title: "Replace Smoke & CO Alarm Batteries",
    blurb: "Even if they're not chirping. Daylight Saving time is an easy reminder.",
    frequency: "annual",
    months: [2, 10],
    category: "safety",
    homeType: "all",
    impact: "high",
  },
  {
    id: "a-termite-check",
    title: "Check for Termites & Wood Damage",
    blurb: "Look at baseboards, floor joists, deck. Tiny holes, sawdust, hollow-sounding wood = call a pro.",
    frequency: "annual",
    category: "maintenance",
    homeType: "owned",
    impact: "high",
  },
  {
    id: "a-garage-door",
    title: "Lubricate Garage Door Springs & Rollers",
    blurb: "White lithium grease on all moving parts. Quieter operation, longer life.",
    frequency: "annual",
    category: "maintenance",
    homeType: "owned",
    impact: "med",
  },
  {
    id: "a-roof-inspect",
    title: "Inspect Roof (Binoculars From Ground)",
    blurb: "Look for missing shingles, damaged flashing, sagging. Don't climb up unless you're a pro.",
    frequency: "annual",
    category: "yard",
    homeType: "owned",
    impact: "high",
  },
];

// Helper: get current season from month (0-11)
export function getSeason(monthIndex) {
  if ([2, 3, 4].includes(monthIndex)) return "spring";
  if ([5, 6, 7].includes(monthIndex)) return "summer";
  if ([8, 9, 10].includes(monthIndex)) return "fall";
  return "winter";
}

// Helper: filter tasks for a given month
export function tasksForMonth(monthIndex, homeType = "all") {
  const season = getSeason(monthIndex);
  return MAINTENANCE_TASKS.filter((task) => {
    // home type filter
    if (task.homeType !== "all" && homeType !== "all" && task.homeType !== homeType) return false;

    // monthly tasks show every month
    if (task.frequency === "monthly") return true;
    if (task.frequency === "quarterly" && [0, 3, 6, 9].includes(monthIndex)) return true;
    if (task.frequency === "biannual" && [3, 9].includes(monthIndex)) return true;
    if (task.months && task.months.includes(monthIndex)) return true;
    if (task.seasons && task.seasons.includes(season) && !task.months) return true;
    if (task.frequency === "annual" && !task.months) {
      // Show annual tasks in January by default (or wherever user marks them done)
      return monthIndex === 0;
    }
    return false;
  });
}

export const SEASON_LABELS = {
  spring: { label: "Spring", icon: "🌸", months: "Mar-May" },
  summer: { label: "Summer", icon: "☀️", months: "Jun-Aug" },
  fall: { label: "Fall", icon: "🍂", months: "Sep-Nov" },
  winter: { label: "Winter", icon: "❄️", months: "Dec-Feb" },
};

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
