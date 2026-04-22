// Dynamically resolve a Lucide icon by name (from data files)
import * as LucideIcons from "lucide-react";

export function getIcon(name) {
  return LucideIcons[name] || LucideIcons.HelpCircle;
}

export function getColorMap(color) {
  const map = {
    sky: { bg: "bg-sky-400", bgLight: "bg-sky-50", border: "border-sky-100", text: "text-sky-600" },
    amber: { bg: "bg-amber-400", bgLight: "bg-amber-50", border: "border-amber-100", text: "text-amber-600" },
    violet: { bg: "bg-violet-400", bgLight: "bg-violet-50", border: "border-violet-100", text: "text-violet-600" },
    emerald: { bg: "bg-emerald-400", bgLight: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600" },
    rose: { bg: "bg-rose-400", bgLight: "bg-rose-50", border: "border-rose-100", text: "text-rose-600" },
    indigo: { bg: "bg-indigo-400", bgLight: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-600" },
    red: { bg: "bg-red-500", bgLight: "bg-red-50", border: "border-red-100", text: "text-red-600" },
    lime: { bg: "bg-lime-500", bgLight: "bg-lime-50", border: "border-lime-100", text: "text-lime-700" },
    teal: { bg: "bg-teal-400", bgLight: "bg-teal-50", border: "border-teal-100", text: "text-teal-600" },
    orange: { bg: "bg-orange-400", bgLight: "bg-orange-50", border: "border-orange-100", text: "text-orange-600" },
  };
  return map[color] || map.rose;
}
