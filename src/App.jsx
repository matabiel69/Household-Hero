import React, { useState, useEffect, useMemo } from "react";
import {
  Search, Heart, MessageSquarePlus, Sparkles, HelpCircle, ArrowLeft,
  Clock, Star, AlertTriangle, CheckCircle2, Circle, Hammer,
  ShoppingBag, PlayCircle, Phone, CalendarDays, Home as HomeIcon,
  MapPin, Shield, ChevronRight, Settings, ExternalLink, X,
} from "lucide-react";
import { CATEGORIES, DIFFICULTY_LABELS } from "./data/categories.js";
import { FIXES } from "./data/fixes.js";
import {
  MAINTENANCE_TASKS, tasksForMonth, getSeason,
  SEASON_LABELS, MONTH_NAMES,
} from "./data/maintenance.js";
import { LOCAL_PROS, PRO_AGGREGATORS, getToolLink } from "./data/pros.js";
import { getIcon, getColorMap } from "./utils.js";

// ═══════════════════════════════════════════════════════════════

const STORAGE_KEYS = {
  saved: "hh_saved",
  completed: "hh_completed",
  profile: "hh_profile",
  maintenanceLog: "hh_maint_log",
};

const loadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveJSON = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // quota exceeded or unavailable — silent
  }
};

// ═══════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [tab, setTab] = useState("home"); // home | fixes | maintenance | pros | profile
  const [view, setView] = useState({ name: "main" }); // sub-views per tab
  const [saved, setSaved] = useState(() => new Set(loadJSON(STORAGE_KEYS.saved, [])));
  const [completed, setCompleted] = useState(() => new Set(loadJSON(STORAGE_KEYS.completed, [])));
  const [maintenanceLog, setMaintenanceLog] = useState(() => loadJSON(STORAGE_KEYS.maintenanceLog, {}));
  const [profile, setProfile] = useState(() => loadJSON(STORAGE_KEYS.profile, {
    name: "",
    homeType: "", // 'own' | 'rent'
    homeStyle: "", // 'house' | 'apartment' | 'condo'
    yearBuilt: "",
    zip: "",
  }));

  // Persist state changes
  useEffect(() => saveJSON(STORAGE_KEYS.saved, [...saved]), [saved]);
  useEffect(() => saveJSON(STORAGE_KEYS.completed, [...completed]), [completed]);
  useEffect(() => saveJSON(STORAGE_KEYS.profile, profile), [profile]);
  useEffect(() => saveJSON(STORAGE_KEYS.maintenanceLog, maintenanceLog), [maintenanceLog]);

  const toggleSave = (id) => {
    const s = new Set(saved);
    s.has(id) ? s.delete(id) : s.add(id);
    setSaved(s);
  };

  const markComplete = (id) => {
    const c = new Set(completed);
    c.add(id);
    setCompleted(c);
  };

  const toggleMaintenanceDone = (taskId, monthIdx) => {
    const key = `${taskId}_${monthIdx}`;
    const log = { ...maintenanceLog };
    if (log[key]) delete log[key];
    else log[key] = new Date().toISOString();
    setMaintenanceLog(log);
  };

  const changeTab = (newTab) => {
    setTab(newTab);
    setView({ name: "main" });
  };

  return (
    <Shell>
      <div className="flex-1 overflow-hidden flex flex-col">
        {tab === "home" && (
          <HomeTab
            profile={profile}
            setView={setView}
            view={view}
            saved={saved}
            onToggleSave={toggleSave}
            setTab={changeTab}
          />
        )}
        {tab === "fixes" && (
          <FixesTab
            view={view}
            setView={setView}
            saved={saved}
            onToggleSave={toggleSave}
            onComplete={markComplete}
          />
        )}
        {tab === "maintenance" && (
          <MaintenanceTab
            view={view}
            setView={setView}
            profile={profile}
            log={maintenanceLog}
            onToggleDone={toggleMaintenanceDone}
          />
        )}
        {tab === "pros" && <ProsTab profile={profile} view={view} setView={setView} />}
        {tab === "profile" && <ProfileTab profile={profile} setProfile={setProfile} />}
      </div>
      <TabBar tab={tab} onChange={changeTab} />
    </Shell>
  );
}

// ═══════════════════════════════════════════════════════════════
// SHELL
// ═══════════════════════════════════════════════════════════════

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-start justify-center p-0 sm:p-4 font-sans">
      <div className="w-full max-w-md bg-stone-50 sm:rounded-[28px] overflow-hidden shadow-2xl flex flex-col min-h-screen sm:min-h-[90vh] relative">
        {children}
      </div>
    </div>
  );
}

function TabBar({ tab, onChange }) {
  const tabs = [
    { id: "home", icon: Sparkles, label: "Home" },
    { id: "fixes", icon: Hammer, label: "Fixes" },
    { id: "maintenance", icon: CalendarDays, label: "Calendar" },
    { id: "pros", icon: Phone, label: "Pros" },
    { id: "profile", icon: Settings, label: "You" },
  ];
  return (
    <div className="border-t-2 border-stone-100 bg-white flex-shrink-0">
      <div className="grid grid-cols-5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`py-3 flex flex-col items-center gap-1 transition ${
                active ? "text-rose-500" : "text-stone-400"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] font-bold ${active ? "" : "font-semibold"}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME TAB
// ═══════════════════════════════════════════════════════════════

function HomeTab({ profile, saved, onToggleSave, setTab }) {
  const currentMonth = new Date().getMonth();
  const season = getSeason(currentMonth);
  const thisMonthTasks = tasksForMonth(currentMonth, profile.homeType === "own" ? "owned" : profile.homeType === "rent" ? "rented" : "all").slice(0, 3);
  const seasonLabel = SEASON_LABELS[season];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <p className="text-rose-500 font-semibold text-xs tracking-widest uppercase">HouseHold Hero</p>
        </div>
        <h1 className="text-[30px] leading-[1.1] font-black text-stone-800">
          {profile.name ? `Hi, ${profile.name.split(" ")[0]}.` : "You've got this."}<br />
          <span className="text-rose-500">We've got you.</span>
        </h1>
        <p className="text-stone-500 mt-3 text-sm leading-relaxed">
          Simple step-by-step fixes for anything that breaks. {seasonLabel.icon} {seasonLabel.label} is a good time to check these off your list.
        </p>
      </div>

      {/* This month's maintenance preview */}
      {thisMonthTasks.length > 0 && (
        <div className="px-6 pb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">This {MONTH_NAMES[currentMonth]}</p>
            <button onClick={() => setTab("maintenance")} className="text-xs font-bold text-rose-500">See all →</button>
          </div>
          <div className="space-y-2">
            {thisMonthTasks.map((t) => (
              <div key={t.id} className="bg-white border-2 border-stone-100 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <CalendarDays className="w-4 h-4 text-rose-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-stone-800 truncate">{t.title}</p>
                  <p className="text-xs text-stone-500 truncate">{t.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick category grid */}
      <div className="px-6 pb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Browse fixes</p>
        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.map((c) => (
            <CategoryTile key={c.id} category={c} onClick={() => setTab("fixes")} />
          ))}
        </div>
      </div>

      {/* Popular */}
      <div className="px-6 pb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Popular right now</p>
        <div className="space-y-2.5">
          {FIXES.slice(0, 4).map((f) => (
            <FixCard key={f.id} fix={f} onClick={() => setTab("fixes")} isSaved={saved.has(f.id)} onToggleSave={() => onToggleSave(f.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FIXES TAB
// ═══════════════════════════════════════════════════════════════

function FixesTab({ view, setView, saved, onToggleSave, onComplete }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);

  const filteredFixes = useMemo(() => {
    let list = FIXES;
    if (category) list = list.filter((f) => f.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) => f.title.toLowerCase().includes(q) || f.tagline.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, category]);

  if (view.name === "fix") {
    const fix = FIXES.find((f) => f.id === view.id);
    return (
      <FixDetail
        fix={fix}
        onBack={() => setView({ name: "main" })}
        isSaved={saved.has(fix.id)}
        onToggleSave={() => onToggleSave(fix.id)}
        onComplete={() => onComplete(fix.id)}
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Hammer className="w-4 h-4 text-rose-400" />
          <p className="text-rose-500 font-semibold text-xs tracking-widest uppercase">Fix Library</p>
        </div>
        <h1 className="text-2xl font-black text-stone-800">What's broken?</h1>
      </div>

      <div className="px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fixes..."
            className="w-full bg-white border-2 border-stone-100 focus:border-rose-300 rounded-2xl pl-12 pr-4 py-3.5 outline-none text-stone-800 placeholder-stone-400 text-sm font-medium"
          />
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <CategoryChip label="All" active={category === null} onClick={() => setCategory(null)} />
          {CATEGORIES.map((c) => (
            <CategoryChip key={c.id} label={c.label} color={c.color} active={category === c.id} onClick={() => setCategory(c.id)} />
          ))}
        </div>
      </div>

      <div className="px-6 pb-20">
        {filteredFixes.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 text-sm">No fixes match that.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredFixes.map((f) => (
              <FixCard
                key={f.id}
                fix={f}
                onClick={() => setView({ name: "fix", id: f.id })}
                isSaved={saved.has(f.id)}
                onToggleSave={() => onToggleSave(f.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryChip({ label, color, active, onClick }) {
  const colorMap = color ? getColorMap(color) : null;
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap border-2 ${
        active
          ? colorMap
            ? `${colorMap.bg} text-white border-transparent`
            : "bg-rose-500 text-white border-transparent"
          : "bg-white border-stone-100 text-stone-600"
      }`}
    >
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// FIX DETAIL VIEW
// ═══════════════════════════════════════════════════════════════

function FixDetail({ fix, onBack, isSaved, onToggleSave, onComplete }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const cat = CATEGORIES.find((c) => c.id === fix.category);
  const diff = DIFFICULTY_LABELS[fix.difficulty];
  const colorMap = getColorMap(cat.color);
  const diffColor = getColorMap(diff.color);
  const isEmergency = fix.emergency;

  const toggleStep = (i) => {
    const s = new Set(completedSteps);
    s.has(i) ? s.delete(i) : s.add(i);
    setCompletedSteps(s);
    if (s.size === fix.steps.length) onComplete();
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className={`px-6 pt-6 pb-7 ${isEmergency ? "bg-rose-500" : colorMap.bgLight}`}>
        <div className="flex items-center justify-between mb-5">
          <button onClick={onBack} className={`flex items-center gap-1 text-sm font-semibold ${isEmergency ? "text-white" : "text-stone-600"}`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={onToggleSave} className="p-2">
            {isSaved ? <Heart className="w-5 h-5 text-rose-500" fill="currentColor" /> : <Heart className={`w-5 h-5 ${isEmergency ? "text-white" : "text-stone-400"}`} />}
          </button>
        </div>

        {isEmergency ? (
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-white" />
            <p className="text-white font-bold text-xs uppercase tracking-wider">Emergency — Read First</p>
          </div>
        ) : (
          <p className={`${colorMap.text} font-bold text-xs uppercase tracking-wider mb-2`}>{cat.label}</p>
        )}

        <h1 className={`text-[26px] leading-tight font-black mb-2 ${isEmergency ? "text-white" : "text-stone-800"}`}>{fix.title}</h1>
        <p className={`text-sm ${isEmergency ? "text-white/90" : "text-stone-600"}`}>{fix.tagline}</p>
      </div>

      {!isEmergency && (
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 gap-2.5">
            <StatCard icon={Clock} label="Time" value={fix.time} />
            <StatCard icon={Star} label="Difficulty" value={diff.label} colorText={diffColor.text} />
          </div>
        </div>
      )}

      {fix.safety.length > 0 && (
        <div className="px-6 pt-5">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <p className="font-bold text-amber-900 text-xs uppercase tracking-wider">Safety First</p>
            </div>
            <ul className="space-y-1.5">
              {fix.safety.map((s, i) => (
                <li key={i} className="text-amber-900 text-sm leading-relaxed">• {s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {fix.tools.length > 0 && (
        <div className="px-6 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Hammer className="w-4 h-4 text-stone-500" />
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">You'll need</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {fix.tools.map((t, i) => (
              <ToolChip key={i} tool={t} />
            ))}
          </div>
        </div>
      )}

      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4 text-stone-500" />
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Step by step</p>
          </div>
          <p className="text-xs font-bold text-stone-400">{completedSteps.size}/{fix.steps.length}</p>
        </div>
        <div className="space-y-2.5">
          {fix.steps.map((step, i) => {
            const done = completedSteps.has(i);
            return (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition flex items-start gap-3 ${
                  done ? "bg-emerald-50 border-emerald-200" : "bg-white border-stone-100 hover:border-rose-200"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${done ? "bg-emerald-500 text-white" : "bg-rose-100 text-rose-600"}`}>
                  {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <p className={`text-sm leading-relaxed ${done ? "text-stone-500 line-through" : "text-stone-700"}`}>{step}</p>
              </button>
            );
          })}
        </div>
      </div>

      {fix.whenToCallPro && (
        <div className="px-6 pt-6">
          <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-violet-600" />
              <p className="font-bold text-violet-900 text-xs uppercase tracking-wider">When to call a pro</p>
            </div>
            <p className="text-violet-900 text-sm leading-relaxed">{fix.whenToCallPro}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href="https://www.angi.com/" target="_blank" rel="noopener noreferrer" className="bg-violet-600 hover:bg-violet-700 transition text-white text-xs font-bold py-2 px-3 rounded-lg text-center">Find on Angi</a>
              <a href="https://www.thumbtack.com/" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-violet-200 hover:border-violet-400 transition text-violet-700 text-xs font-bold py-2 px-3 rounded-lg text-center">Find on Thumbtack</a>
            </div>
          </div>
        </div>
      )}

      {completedSteps.size === fix.steps.length && !isEmergency && fix.steps.length > 0 && (
        <div className="px-6 pt-6">
          <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-6 text-center">
            <Sparkles className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-black text-lg">You did it! 🎉</p>
            <p className="text-white/90 text-sm mt-1">Another thing off the list.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolChip({ tool }) {
  const link = tool.affiliateTag ? getToolLink(tool.affiliateTag) : null;
  const content = (
    <>
      <ShoppingBag className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
      <span className="text-xs font-semibold text-stone-700">{tool.name}</span>
      {link && <ExternalLink className="w-3 h-3 text-rose-400 flex-shrink-0" />}
    </>
  );
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-stone-100 hover:border-rose-300 transition rounded-xl px-3 py-2 flex items-center gap-2">
        {content}
      </a>
    );
  }
  return <div className="bg-white border-2 border-stone-100 rounded-xl px-3 py-2 flex items-center gap-2">{content}</div>;
}

function StatCard({ icon: Icon, label, value, colorText }) {
  return (
    <div className="bg-white border-2 border-stone-100 rounded-2xl p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 text-stone-400" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">{label}</p>
      </div>
      <p className={`font-black text-base ${colorText || "text-stone-800"}`}>{value}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAINTENANCE TAB (Calendar)
// ═══════════════════════════════════════════════════════════════

function MaintenanceTab({ profile, log, onToggleDone, setView, view }) {
  const [monthIdx, setMonthIdx] = useState(new Date().getMonth());
  const homeType = profile.homeType === "own" ? "owned" : profile.homeType === "rent" ? "rented" : "all";
  const tasks = tasksForMonth(monthIdx, homeType);
  const season = getSeason(monthIdx);
  const seasonInfo = SEASON_LABELS[season];

  const doneCount = tasks.filter((t) => log[`${t.id}_${monthIdx}`]).length;

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-6 pt-8 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="w-4 h-4 text-rose-400" />
          <p className="text-rose-500 font-semibold text-xs tracking-widest uppercase">Maintenance</p>
        </div>
        <h1 className="text-2xl font-black text-stone-800">Home, loved.</h1>
        <p className="text-stone-500 mt-1 text-sm">A little every month = a house that lasts.</p>
      </div>

      {/* Month picker */}
      <div className="px-6 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {MONTH_NAMES.map((m, i) => (
            <button
              key={m}
              onClick={() => setMonthIdx(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap border-2 ${
                monthIdx === i ? "bg-rose-500 text-white border-transparent" : "bg-white border-stone-100 text-stone-600"
              }`}
            >
              {m.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Season banner */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-to-br from-rose-100 to-amber-100 border-2 border-rose-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600">{seasonInfo.label} {seasonInfo.icon}</p>
            <p className="text-sm font-bold text-stone-800 mt-0.5">{MONTH_NAMES[monthIdx]} checklist</p>
          </div>
          <div className="text-right">
            <p className="font-black text-2xl text-rose-500">{doneCount}<span className="text-stone-400 text-base">/{tasks.length}</span></p>
            <p className="text-[10px] font-bold uppercase text-stone-500">done</p>
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="px-6">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-stone-500 text-sm">No tasks this month. Enjoy the break!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {tasks.map((task) => (
              <MaintenanceCard key={task.id} task={task} done={!!log[`${task.id}_${monthIdx}`]} onToggle={() => onToggleDone(task.id, monthIdx)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MaintenanceCard({ task, done, onToggle }) {
  const cat = CATEGORIES.find((c) => c.id === task.category);
  const colorMap = cat ? getColorMap(cat.color) : getColorMap("rose");

  return (
    <div className={`border-2 rounded-2xl p-4 transition ${done ? "bg-emerald-50 border-emerald-200" : "bg-white border-stone-100"}`}>
      <div className="flex items-start gap-3">
        <button onClick={onToggle} className="flex-shrink-0 mt-0.5">
          {done ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-500" strokeWidth={2} />
          ) : (
            <Circle className="w-6 h-6 text-stone-300" strokeWidth={2} />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className={`font-bold text-sm ${done ? "text-stone-500 line-through" : "text-stone-800"}`}>{task.title}</p>
            {task.impact === "high" && !done && (
              <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">Important</span>
            )}
          </div>
          <p className={`text-xs leading-relaxed ${done ? "text-stone-400" : "text-stone-500"}`}>{task.blurb}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`${colorMap.text} text-[10px] font-bold uppercase tracking-wider`}>{cat?.label || "General"}</span>
            <span className="text-stone-300 text-[10px]">•</span>
            <span className="text-stone-500 text-[10px] font-semibold capitalize">{task.frequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROS TAB
// ═══════════════════════════════════════════════════════════════

function ProsTab({ profile }) {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const pros = LOCAL_PROS.filter((p) => !categoryFilter || p.category === categoryFilter);

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-6 pt-8 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <Phone className="w-4 h-4 text-rose-400" />
          <p className="text-rose-500 font-semibold text-xs tracking-widest uppercase">Find a Pro</p>
        </div>
        <h1 className="text-2xl font-black text-stone-800">Some things need a pro.</h1>
        <p className="text-stone-500 mt-1 text-sm">
          {profile.zip ? `Near ${profile.zip}.` : "Add your ZIP code in your profile to see local pros."}
        </p>
      </div>

      <div className="px-6 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <CategoryChip label="All" active={categoryFilter === null} onClick={() => setCategoryFilter(null)} />
          {CATEGORIES.map((c) => (
            <CategoryChip key={c.id} label={c.label} color={c.color} active={categoryFilter === c.id} onClick={() => setCategoryFilter(c.id)} />
          ))}
        </div>
      </div>

      <div className="px-6">
        {pros.length === 0 ? (
          <div className="bg-white border-2 border-stone-100 rounded-2xl p-6 text-center">
            <MapPin className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-stone-700 font-bold text-sm">No local pros listed yet.</p>
            <p className="text-stone-500 text-xs mt-1">Try one of these national directories:</p>
          </div>
        ) : (
          <div className="space-y-2.5 mb-4">
            {pros.map((p) => <ProCard key={p.id} pro={p} />)}
          </div>
        )}

        <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 mt-6">National directories</p>
        <div className="space-y-2.5">
          {PRO_AGGREGATORS.map((a) => (
            <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" className="block bg-white border-2 border-stone-100 hover:border-rose-200 transition rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-stone-800 text-sm">{a.name}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{a.blurb}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400" />
              </div>
            </a>
          ))}
        </div>

        {/* List yourself CTA */}
        <div className="mt-6 bg-gradient-to-br from-violet-100 to-rose-100 border-2 border-violet-200 rounded-2xl p-4">
          <p className="text-violet-900 font-bold text-sm">Are you a pro?</p>
          <p className="text-violet-700 text-xs mt-1 mb-3">Get listed on HouseHold Hero and get customers from our growing community.</p>
          <a href="mailto:pros@householdhero.app?subject=Get listed as a pro" className="inline-block bg-violet-600 hover:bg-violet-700 transition text-white text-xs font-bold py-2 px-4 rounded-lg">
            Request a listing
          </a>
        </div>
      </div>
    </div>
  );
}

function ProCard({ pro }) {
  const cat = CATEGORIES.find((c) => c.id === pro.category);
  const colorMap = cat ? getColorMap(cat.color) : getColorMap("rose");
  return (
    <div className="bg-white border-2 border-stone-100 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${colorMap.bg} flex items-center justify-center flex-shrink-0`}>
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-stone-800 text-sm">{pro.name}</p>
            {pro.featured && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">Featured</span>}
          </div>
          <p className="text-stone-500 text-xs mt-0.5">{pro.blurb}</p>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
            <span className="text-xs font-bold text-stone-700">{pro.rating}</span>
            <span className="text-xs text-stone-400">({pro.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
      <a href={`tel:${pro.phone}`} className="mt-3 block bg-rose-500 hover:bg-rose-600 transition text-white text-xs font-bold py-2 rounded-lg text-center">
        Call {pro.phone}
      </a>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROFILE TAB
// ═══════════════════════════════════════════════════════════════

function ProfileTab({ profile, setProfile }) {
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="px-6 pt-8 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-rose-400" />
          <p className="text-rose-500 font-semibold text-xs tracking-widest uppercase">Your Profile</p>
        </div>
        <h1 className="text-2xl font-black text-stone-800">Make it yours.</h1>
        <p className="text-stone-500 mt-1 text-sm">Help us tailor tips for your home. All optional.</p>
      </div>

      <div className="px-6 space-y-4">
        <Field label="Your name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} placeholder="First name" />

        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">You...</p>
          <div className="grid grid-cols-2 gap-2">
            <ToggleBtn active={profile.homeType === "own"} onClick={() => setProfile({ ...profile, homeType: "own" })} label="Own my home" />
            <ToggleBtn active={profile.homeType === "rent"} onClick={() => setProfile({ ...profile, homeType: "rent" })} label="Rent" />
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">Home type</p>
          <div className="grid grid-cols-3 gap-2">
            <ToggleBtn active={profile.homeStyle === "house"} onClick={() => setProfile({ ...profile, homeStyle: "house" })} label="House" small />
            <ToggleBtn active={profile.homeStyle === "apartment"} onClick={() => setProfile({ ...profile, homeStyle: "apartment" })} label="Apt" small />
            <ToggleBtn active={profile.homeStyle === "condo"} onClick={() => setProfile({ ...profile, homeStyle: "condo" })} label="Condo" small />
          </div>
        </div>

        <Field label="Year built (approx)" value={profile.yearBuilt} onChange={(v) => setProfile({ ...profile, yearBuilt: v })} placeholder="e.g. 1995" />
        <Field label="ZIP code" value={profile.zip} onChange={(v) => setProfile({ ...profile, zip: v })} placeholder="For local pros" />

        <div className="pt-4 border-t-2 border-stone-100 mt-6">
          <p className="text-xs text-stone-500 leading-relaxed">
            <strong className="text-stone-700">Your data stays on this device.</strong> Nothing is uploaded until you sign up for an account.
          </p>
        </div>

        <div className="bg-stone-100 border-2 border-stone-200 rounded-2xl p-4 mt-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong className="text-stone-800">A note on safety:</strong> HouseHold Hero guides are for informational purposes only. Always use your judgment, follow local codes, and when in doubt, call a pro. We're not responsible for DIY outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full bg-white border-2 border-stone-100 focus:border-rose-300 rounded-xl px-4 py-3 outline-none text-stone-800 placeholder-stone-400 transition text-sm font-medium"
      />
    </label>
  );
}

function ToggleBtn({ active, onClick, label, small }) {
  return (
    <button
      onClick={onClick}
      className={`${small ? "py-2 text-xs" : "py-3 text-sm"} rounded-xl border-2 font-bold transition ${
        active ? "bg-rose-500 text-white border-transparent" : "bg-white border-stone-100 text-stone-600"
      }`}
    >
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// SHARED TILES
// ═══════════════════════════════════════════════════════════════

function CategoryTile({ category, onClick }) {
  const Icon = getIcon(category.icon);
  const colorMap = getColorMap(category.color);
  const count = FIXES.filter((f) => f.category === category.id).length;
  return (
    <button onClick={onClick} className={`${colorMap.bgLight} ${colorMap.border} border-2 rounded-2xl p-4 text-left hover:scale-[1.02] transition active:scale-[0.98]`}>
      <div className={`w-10 h-10 rounded-xl ${colorMap.bg} flex items-center justify-center mb-2`}>
        <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      <p className="font-bold text-stone-800 text-sm">{category.label}</p>
      <p className="text-stone-500 text-[11px] mt-0.5">{count} fix{count !== 1 && "es"}</p>
    </button>
  );
}

function FixCard({ fix, onClick, isSaved, onToggleSave }) {
  const cat = CATEGORIES.find((c) => c.id === fix.category);
  const diff = DIFFICULTY_LABELS[fix.difficulty];
  const colorMap = getColorMap(cat.color);
  const diffColor = getColorMap(diff.color);
  const Icon = getIcon(cat.icon);
  return (
    <div onClick={onClick} className="bg-white border-2 border-stone-100 hover:border-rose-200 transition rounded-2xl p-4 cursor-pointer active:scale-[0.99]">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${colorMap.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-stone-800 text-sm leading-tight">{fix.title}</p>
          <p className="text-stone-500 text-[11px] mt-0.5 truncate">{fix.tagline}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              <span className="text-[11px] text-stone-500 font-semibold">{fix.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className={`w-3 h-3 ${diffColor.text}`} fill="currentColor" />
              <span className={`text-[11px] font-bold ${diffColor.text}`}>{diff.label}</span>
            </div>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onToggleSave(); }} className="p-1">
          {isSaved ? <Heart className="w-4 h-4 text-rose-500" fill="currentColor" /> : <Heart className="w-4 h-4 text-stone-300" />}
        </button>
      </div>
    </div>
  );
}
