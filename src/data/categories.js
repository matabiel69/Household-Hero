// Category definitions
// To add a new category: add an object here. The icon string must be
// a valid lucide-react icon name. Color must exist in the Tailwind palette.

export const CATEGORIES = [
  { id: "plumbing", label: "Plumbing", icon: "Droplet", color: "sky", blurb: "Drains, toilets, faucets, leaks" },
  { id: "electrical", label: "Electrical", icon: "Zap", color: "amber", blurb: "Breakers, outlets, switches, bulbs" },
  { id: "appliances", label: "Appliances", icon: "Fan", color: "violet", blurb: "Dishwasher, washer, dryer, fridge" },
  { id: "maintenance", label: "Home Care", icon: "Home", color: "emerald", blurb: "Alarms, filters, walls, doors" },
  { id: "car", label: "Car", icon: "Car", color: "rose", blurb: "Tire, jumpstart, fluids, wipers" },
  { id: "tech", label: "Tech", icon: "Wifi", color: "indigo", blurb: "Wi-Fi, TV, smart devices" },
  { id: "safety", label: "Safety First", icon: "Shield", color: "red", blurb: "Gas, water, power emergencies" },
  { id: "yard", label: "Yard & Outside", icon: "Leaf", color: "lime", blurb: "Gutters, lawn, weather" },
];

export const DIFFICULTY_LABELS = {
  1: { label: "So Easy", color: "emerald", desc: "You've got this. Promise." },
  2: { label: "Easy", color: "teal", desc: "Takes a minute but totally doable." },
  3: { label: "Moderate", color: "amber", desc: "A little patience required." },
  4: { label: "Challenging", color: "orange", desc: "Plan ahead and take your time." },
  5: { label: "Call a Pro", color: "rose", desc: "Some things aren't worth the risk." },
};
