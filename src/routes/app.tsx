import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Globe2,
  Home,
  Minus,
  Plus,
  RotateCcw,
  SunMedium,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type City = {
  name: string;
  country: string;
  zone: string;
  offset: number;
  workStart: number;
  workEnd: number;
};

const CITIES: City[] = [
  { name: "Paris", country: "France", zone: "UTC+2", offset: 2, workStart: 9, workEnd: 18 },
  { name: "New York", country: "United States", zone: "UTC−4", offset: -4, workStart: 9, workEnd: 18 },
  { name: "Kyiv", country: "Ukraine", zone: "UTC+3", offset: 3, workStart: 9, workEnd: 18 },
  { name: "Chiang Mai", country: "Thailand", zone: "UTC+7", offset: 7, workStart: 9, workEnd: 18 },
  { name: "Abu Dhabi", country: "United Arab Emirates", zone: "UTC+4", offset: 4, workStart: 9, workEnd: 18 },
  { name: "Accra", country: "Ghana", zone: "UTC+0", offset: 0, workStart: 9, workEnd: 18 },
];

type View = "home" | "find" | "explore" | "reminders";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Try WhenItsTime — Time Zone Companion" },
      { name: "description", content: "Compare local times, working hours, and overlap windows with WhenItsTime." },
      { property: "og:title", content: "Try WhenItsTime" },
      { property: "og:description", content: "Find a better moment to connect across time zones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhenItsTimeApp,
});

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function cityMinutes(utcMinutes: number, city: City) {
  return ((utcMinutes + city.offset * 60) % 1440 + 1440) % 1440;
}

function formatTime(minutes: number) {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

function isWorking(minutes: number, city: City) {
  const hour = minutes / 60;
  return hour >= city.workStart && hour < city.workEnd;
}

function WhenItsTimeApp() {
  const [view, setView] = useState<View>("home");
  const [homeCity, setHomeCity] = useState(CITIES[0]);
  const [awayCity, setAwayCity] = useState(CITIES[1]);
  const [utcMinutes, setUtcMinutes] = useState(12 * 60 + 51);
  const [reminder, setReminder] = useState(false);

  const setNow = () => {
    const now = new Date();
    setUtcMinutes(now.getUTCHours() * 60 + now.getUTCMinutes());
  };

  useEffect(() => {
    setNow();
    const timer = window.setInterval(setNow, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const homeMinutes = cityMinutes(utcMinutes, homeCity);
  const awayMinutes = cityMinutes(utcMinutes, awayCity);
  const bothWorking = isWorking(homeMinutes, homeCity) && isWorking(awayMinutes, awayCity);
  const offset = awayCity.offset - homeCity.offset;

  const overlap = useMemo(() => {
    const start = Math.max(homeCity.workStart, awayCity.workStart - offset);
    const end = Math.min(homeCity.workEnd, awayCity.workEnd - offset);
    if (start >= end) return null;
    return { homeStart: start, homeEnd: end, awayStart: start + offset, awayEnd: end + offset };
  }, [homeCity, awayCity, offset]);

  const swap = () => {
    setHomeCity(awayCity);
    setAwayCity(homeCity);
  };

  return (
    <main className="ios-app-shell">
      <aside className="ios-sidebar">
        <Link to="/" className="ios-brand" aria-label="Back to WhenItsTime landing page">
          <span className="ios-brand-mark"><Clock3 size={24} /></span>
          <span>WhenItsTime</span>
        </Link>
        <nav aria-label="App sections">
          <AppNavButton active={view === "home"} icon={<Home />} label="Today" onClick={() => setView("home")} />
          <AppNavButton active={view === "find"} icon={<Clock3 />} label="Find Time" onClick={() => setView("find")} />
          <AppNavButton active={view === "explore"} icon={<Compass />} label="Explore" onClick={() => setView("explore")} />
          <AppNavButton active={view === "reminders"} icon={<Bell />} label="Reminders" onClick={() => setView("reminders")} />
        </nav>
        <p className="ios-sidebar-note">A calmer way to stay in sync.</p>
      </aside>

      <section className="ios-workspace">
        <header className="ios-topbar">
          <div>
            <p>{new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}</p>
            <h1>{view === "home" ? "Is now a good time?" : view === "find" ? "Find Time" : view === "explore" ? "Explore" : "Reminders"}</h1>
          </div>
          <button className="ios-now-button" type="button" onClick={setNow}><RotateCcw size={15} />Now</button>
        </header>

        <div className="ios-view" key={view}>
          {view === "home" && (
            <HomeView
              homeCity={homeCity}
              awayCity={awayCity}
              homeMinutes={homeMinutes}
              awayMinutes={awayMinutes}
              bothWorking={bothWorking}
              overlap={overlap}
              offset={offset}
              onSwap={swap}
              onFind={() => setView("find")}
              onNotify={() => { setReminder(true); setView("reminders"); }}
            />
          )}
          {view === "find" && (
            <FindView
              homeCity={homeCity}
              awayCity={awayCity}
              homeMinutes={homeMinutes}
              awayMinutes={awayMinutes}
              utcMinutes={utcMinutes}
              bothWorking={bothWorking}
              onChange={setUtcMinutes}
              onNow={setNow}
              onNotify={() => { setReminder(true); setView("reminders"); }}
            />
          )}
          {view === "explore" && (
            <ExploreView homeCity={homeCity} awayCity={awayCity} onHomeChange={setHomeCity} onAwayChange={setAwayCity} utcMinutes={utcMinutes} />
          )}
          {view === "reminders" && <RemindersView reminder={reminder} homeCity={homeCity} awayCity={awayCity} homeMinutes={homeMinutes} awayMinutes={awayMinutes} onToggle={() => setReminder((value) => !value)} />}
        </div>
      </section>

      <nav className="ios-tabbar" aria-label="App sections">
        <AppTab active={view === "home"} icon={<Home />} label="Today" onClick={() => setView("home")} />
        <AppTab active={view === "find"} icon={<Clock3 />} label="Find" onClick={() => setView("find")} />
        <AppTab active={view === "explore"} icon={<Compass />} label="Explore" onClick={() => setView("explore")} />
        <AppTab active={view === "reminders"} icon={<Bell />} label="Reminders" onClick={() => setView("reminders")} />
      </nav>
    </main>
  );
}

function AppNavButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button className={active ? "ios-nav-item active" : "ios-nav-item"} type="button" onClick={onClick}>{icon}<span>{label}</span></button>;
}

function AppTab({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button className={active ? "ios-tab active" : "ios-tab"} type="button" onClick={onClick}>{icon}<span>{label}</span></button>;
}

type Overlap = { homeStart: number; homeEnd: number; awayStart: number; awayEnd: number } | null;

function HomeView({ homeCity, awayCity, homeMinutes, awayMinutes, bothWorking, overlap, offset, onSwap, onFind, onNotify }: {
  homeCity: City; awayCity: City; homeMinutes: number; awayMinutes: number; bothWorking: boolean; overlap: Overlap; offset: number; onSwap: () => void; onFind: () => void; onNotify: () => void;
}) {
  return <div className="ios-home-grid">
    <section className="ios-time-panel">
      <div className="ios-city-time">
        <span>You · {homeCity.name}</span><strong>{formatTime(homeMinutes)}</strong><small>{isWorking(homeMinutes, homeCity) ? "Working hours" : "Outside working hours"}</small>
      </div>
      <button className="ios-swap" type="button" onClick={onSwap} aria-label="Swap locations"><RotateCcw size={20} /></button>
      <div className="ios-city-time">
        <span>{awayCity.name} · {offset >= 0 ? `+${offset}` : offset}h</span><strong>{formatTime(awayMinutes)}</strong><small>{isWorking(awayMinutes, awayCity) ? "Working hours" : "Outside working hours"}</small>
      </div>
    </section>
    <section className="ios-overlap-panel">
      <div className={bothWorking ? "ios-status-dot available" : "ios-status-dot"}><SunMedium /></div>
      <p className="ios-status-copy">{bothWorking ? "Both locations are within working hours." : `${isWorking(awayMinutes, awayCity) ? homeCity.name : awayCity.name} is outside working hours.`}</p>
      <div className="ios-divider" />
      <span className="ios-overlap-label">{overlap ? "Strong overlap" : "No shared working window"}</span>
      {overlap && <><strong>{pad(overlap.homeStart)}:00–{pad(overlap.homeEnd)}:00 · {homeCity.name}</strong><strong>{pad(overlap.awayStart)}:00–{pad(overlap.awayEnd)}:00 · {awayCity.name}</strong></>}
    </section>
    <div className="ios-home-actions">
      <button className="ios-primary-action" type="button" onClick={onFind}>Find Time</button>
      <button className="ios-secondary-action" type="button" onClick={onNotify}><Bell size={18} />Notify Me</button>
    </div>
    <section className="ios-dayline">
      <div><span>{awayCity.name} working hours</span><strong>{pad(awayCity.workStart)}:00 – {pad(awayCity.workEnd)}:00</strong></div>
      <div className="ios-dayline-track"><span style={{ left: `${(awayCity.workStart / 24) * 100}%`, width: `${((awayCity.workEnd - awayCity.workStart) / 24) * 100}%` }} /></div>
      <p>In {homeCity.name}, that’s {pad(awayCity.workStart - offset)}:00 – {pad(awayCity.workEnd - offset)}:00.</p>
    </section>
  </div>;
}

function FindView({ homeCity, awayCity, homeMinutes, awayMinutes, utcMinutes, bothWorking, onChange, onNow, onNotify }: {
  homeCity: City; awayCity: City; homeMinutes: number; awayMinutes: number; utcMinutes: number; bothWorking: boolean; onChange: (value: number) => void; onNow: () => void; onNotify: () => void;
}) {
  const nudge = (amount: number) => onChange((utcMinutes + amount + 1440) % 1440);
  return <div className="ios-find-view">
    <section className="ios-compare-strip">
      <div><span>{homeCity.name}</span><strong>{formatTime(homeMinutes)}</strong><small>Today</small></div>
      <Globe2 />
      <div><span>{awayCity.name}</span><strong>{formatTime(awayMinutes)}</strong><small>Today</small></div>
    </section>
    <p className={bothWorking ? "ios-find-status good" : "ios-find-status"}>{bothWorking ? "Both locations are within working hours." : "One or both locations are outside working hours."}</p>
    <section className="ios-time-dial" style={{ "--dial-turn": `${(homeMinutes / 1440) * 360}deg` } as React.CSSProperties}>
      <div className="ios-dial-hand" />
      <div className="ios-dial-center"><strong>{formatTime(homeMinutes)}</strong><span>{homeMinutes < 360 ? "Night" : homeMinutes < 720 ? "Morning" : homeMinutes < 1080 ? "Afternoon" : "Evening"}</span></div>
      <span className="at-0">0</span><span className="at-6">6</span><span className="at-12">12</span><span className="at-18">18</span>
    </section>
    <input className="ios-time-slider" type="range" min="0" max="1439" step="15" value={utcMinutes} onChange={(event) => onChange(Number(event.target.value))} aria-label="Choose time of day" />
    <div className="ios-stepper"><button type="button" onClick={() => nudge(-15)} aria-label="15 minutes earlier"><Minus /></button><button type="button" onClick={onNow}>Now</button><button type="button" onClick={() => nudge(15)} aria-label="15 minutes later"><Plus /></button></div>
    <button className="ios-primary-action ios-wide-action" type="button" onClick={onNotify}><Bell size={18} />Notify me at this time</button>
  </div>;
}

function ExploreView({ homeCity, awayCity, onHomeChange, onAwayChange, utcMinutes }: { homeCity: City; awayCity: City; onHomeChange: (city: City) => void; onAwayChange: (city: City) => void; utcMinutes: number }) {
  return <div className="ios-explore-view">
    <section className="ios-city-selectors">
      <label>My location<select value={homeCity.name} onChange={(e) => onHomeChange(CITIES.find((city) => city.name === e.target.value) ?? CITIES[0])}>{CITIES.map((city) => <option key={city.name}>{city.name}</option>)}</select><ChevronDown /></label>
      <label>Compare with<select value={awayCity.name} onChange={(e) => onAwayChange(CITIES.find((city) => city.name === e.target.value) ?? CITIES[1])}>{CITIES.filter((city) => city.name !== homeCity.name).map((city) => <option key={city.name}>{city.name}</option>)}</select><ChevronDown /></label>
    </section>
    <section className="ios-city-list">
      {CITIES.map((city) => { const minutes = cityMinutes(utcMinutes, city); return <button type="button" key={city.name} onClick={() => city.name !== homeCity.name && onAwayChange(city)} className={city.name === awayCity.name ? "selected" : ""}>
        <div><strong>{city.name}</strong><span>{city.country} · {city.zone}</span></div><div><strong>{formatTime(minutes)}</strong><span>{isWorking(minutes, city) ? "Available" : "Outside hours"}</span></div>
      </button>; })}
    </section>
  </div>;
}

function RemindersView({ reminder, homeCity, awayCity, homeMinutes, awayMinutes, onToggle }: { reminder: boolean; homeCity: City; awayCity: City; homeMinutes: number; awayMinutes: number; onToggle: () => void }) {
  return <div className="ios-reminders-view">
    <div className="ios-reminder-illustration"><Bell /><span /></div>
    <h2>{reminder ? "Your next moment is set." : "Remember the right moment."}</h2>
    <p>{reminder ? `We’ll remind you when it’s ${formatTime(homeMinutes)} in ${homeCity.name} and ${formatTime(awayMinutes)} in ${awayCity.name}.` : "Set a simple time check and leave the time-zone math to WhenItsTime."}</p>
    {reminder && <section className="ios-reminder-item"><span><Check /></span><div><strong>Time Check</strong><p>{formatTime(homeMinutes)} in {homeCity.name} → {formatTime(awayMinutes)} in {awayCity.name}</p><small>Next: Today · Repeat: Never</small></div></section>}
    <button className={reminder ? "ios-secondary-action ios-wide-action" : "ios-primary-action ios-wide-action"} type="button" onClick={onToggle}>{reminder ? "Remove reminder" : "Set reminder"}</button>
  </div>;
}