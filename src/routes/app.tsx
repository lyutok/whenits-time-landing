import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import appIcon from "../assets/app-icon.png";

const APP_STORE_URL = "https://apps.apple.com/us/app/whenitstime/id6793032524";

type City = {
  name: string;
  zone: string;
};

const CITIES: City[] = [
  { name: "Amsterdam", zone: "Europe/Amsterdam" },
  { name: "Auckland", zone: "Pacific/Auckland" },
  { name: "Bangkok", zone: "Asia/Bangkok" },
  { name: "Berlin", zone: "Europe/Berlin" },
  { name: "Buenos Aires", zone: "America/Argentina/Buenos_Aires" },
  { name: "Cairo", zone: "Africa/Cairo" },
  { name: "Chicago", zone: "America/Chicago" },
  { name: "Delhi", zone: "Asia/Kolkata" },
  { name: "Denver", zone: "America/Denver" },
  { name: "Dubai", zone: "Asia/Dubai" },
  { name: "Helsinki", zone: "Europe/Helsinki" },
  { name: "Hong Kong", zone: "Asia/Hong_Kong" },
  { name: "Istanbul", zone: "Europe/Istanbul" },
  { name: "Jakarta", zone: "Asia/Jakarta" },
  { name: "Johannesburg", zone: "Africa/Johannesburg" },
  { name: "Kuala Lumpur", zone: "Asia/Kuala_Lumpur" },
  { name: "Kyiv", zone: "Europe/Kyiv" },
  { name: "Lagos", zone: "Africa/Lagos" },
  { name: "Lisbon", zone: "Europe/Lisbon" },
  { name: "London", zone: "Europe/London" },
  { name: "Los Angeles", zone: "America/Los_Angeles" },
  { name: "Madrid", zone: "Europe/Madrid" },
  { name: "Manila", zone: "Asia/Manila" },
  { name: "Mexico City", zone: "America/Mexico_City" },
  { name: "Nairobi", zone: "Africa/Nairobi" },
  { name: "New York", zone: "America/New_York" },
  { name: "Paris", zone: "Europe/Paris" },
  { name: "Riyadh", zone: "Asia/Riyadh" },
  { name: "Rome", zone: "Europe/Rome" },
  { name: "San Francisco", zone: "America/Los_Angeles" },
  { name: "São Paulo", zone: "America/Sao_Paulo" },
  { name: "Seoul", zone: "Asia/Seoul" },
  { name: "Shanghai", zone: "Asia/Shanghai" },
  { name: "Singapore", zone: "Asia/Singapore" },
  { name: "Sofia", zone: "Europe/Sofia" },
  { name: "Stockholm", zone: "Europe/Stockholm" },
  { name: "Sydney", zone: "Australia/Sydney" },
  { name: "Tel Aviv", zone: "Asia/Tel_Aviv" },
  { name: "Tbilisi", zone: "Asia/Tbilisi" },
  { name: "Tokyo", zone: "Asia/Tokyo" },
  { name: "Toronto", zone: "America/Toronto" },
  { name: "Vancouver", zone: "America/Vancouver" },
  { name: "Warsaw", zone: "Europe/Warsaw" },
];

type OverlapRange = { start: number; end: number };

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Free Web Preview — WhenItsTime" },
      {
        name: "description",
        content: "Compare local times and working-hour overlap across time zones.",
      },
      { property: "og:title", content: "Try WhenItsTime" },
      { property: "og:description", content: "Find a better moment to connect across time zones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TimeZoneComparison,
});

function getOffsetMinutes(zone: string, date: Date) {
  const timestamp = Math.floor(date.getTime() / 1000) * 1000;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date(timestamp));
  const part = (type: string) => Number(parts.find((item) => item.type === type)?.value);
  return (
    (Date.UTC(
      part("year"),
      part("month") - 1,
      part("day"),
      part("hour"),
      part("minute"),
      part("second"),
    ) -
      timestamp) /
    60_000
  );
}

function formatTime(minutes: number) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const remainder = normalized % 60;
  return `${String(hours).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function formatDifference(minutes: number) {
  if (minutes === 0) return "Same time";
  const absolute = Math.abs(minutes);
  const hours = Math.floor(absolute / 60);
  const remainder = absolute % 60;
  const sign = minutes > 0 ? "+" : "−";
  return `${sign}${hours ? `${hours}h` : ""}${hours && remainder ? " " : ""}${remainder ? `${remainder}m` : ""}`;
}

function TimeZoneComparison() {
  const [cityA, setCityA] = useState(CITIES.find((city) => city.name === "Berlin")!);
  const [cityB, setCityB] = useState(CITIES.find((city) => city.name === "New York")!);
  const [workStart, setWorkStart] = useState(9);
  const [workEnd, setWorkEnd] = useState(17);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const offsetA = now ? getOffsetMinutes(cityA.zone, now) : 0;
  const offsetB = now ? getOffsetMinutes(cityB.zone, now) : 0;
  const difference = offsetB - offsetA;
  const utcMinutes = now ? now.getUTCHours() * 60 + now.getUTCMinutes() : 0;
  const workStartMinutes = workStart * 60;
  const workEndMinutes = workEnd * 60;

  const cells = Array.from({ length: 48 }, (_, index) => {
    const minutesA = index * 30;
    const minutesB = (((minutesA + difference) % 1440) + 1440) % 1440;
    const workingA = minutesA >= workStartMinutes && minutesA < workEndMinutes;
    const workingB = minutesB >= workStartMinutes && minutesB < workEndMinutes;
    return { minutesA, workingA, workingB };
  });

  const overlapRanges: OverlapRange[] = [];
  let currentRange: OverlapRange | null = null;
  cells.forEach(({ minutesA, workingA, workingB }) => {
    if (workingA && workingB) {
      if (!currentRange) {
        currentRange = { start: minutesA, end: minutesA + 30 };
        overlapRanges.push(currentRange);
      } else {
        currentRange.end = minutesA + 30;
      }
    } else {
      currentRange = null;
    }
  });

  const currentTimeA = now ? formatTime(utcMinutes + offsetA) : "—:—";
  const currentTimeB = now ? formatTime(utcMinutes + offsetB) : "—:—";

  return (
    <main className="ios-app-shell">
      <section className="ios-workspace">
        <header className="ios-topbar">
          <div>
            <Link to="/" className="ios-brand" aria-label="Back to WhenItsTime landing page">
              <img src={appIcon} alt="" />
              <span>WhenItsTime</span>
            </Link>
            <p className="ios-topbar-date">
              {now
                ? new Intl.DateTimeFormat("en", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }).format(now)
                : "Free web preview"}
            </p>
            <h1>
              Compare working hours
              <span>across time zones</span>
            </h1>
            <h2>Try a free WhenItsTime tool to see when two cities’ working hours overlap.</h2>
          </div>
          <Link className="ios-back-link" to="/">
            <ArrowLeft size={16} />
            Back to website
          </Link>
        </header>

        <div className="ios-view ios-compare-view">
          <p className="ios-preview-lead">
            Pick two places and see when your working hours overlap.
          </p>

          <section className="ios-compare-controls" aria-label="Comparison settings">
            <label>
              Place A
              <span className="ios-select-wrap">
                <select
                  value={cityA.name}
                  onChange={(event) =>
                    setCityA(CITIES.find((city) => city.name === event.target.value) ?? CITIES[0]!)
                  }
                >
                  {CITIES.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </span>
            </label>
            <label>
              Place B
              <span className="ios-select-wrap">
                <select
                  value={cityB.name}
                  onChange={(event) =>
                    setCityB(
                      CITIES.find((city) => city.name === event.target.value) ??
                        CITIES.find((city) => city.name === "New York")!,
                    )
                  }
                >
                  {CITIES.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </span>
            </label>
            <label>
              Work starts
              <input
                type="number"
                min="0"
                max="23"
                value={workStart}
                onChange={(event) =>
                  setWorkStart(Math.max(0, Math.min(23, Number(event.target.value))))
                }
              />
            </label>
            <label>
              Work ends
              <input
                type="number"
                min="1"
                max="24"
                value={workEnd}
                onChange={(event) =>
                  setWorkEnd(Math.max(1, Math.min(24, Number(event.target.value))))
                }
              />
            </label>
          </section>

          <section className="ios-time-panel ios-compare-times" aria-label="Current local times">
            <div className="ios-city-time">
              <span>{cityA.name}</span>
              <strong>{currentTimeA}</strong>
              <small>Local time</small>
            </div>
            <div className="ios-time-difference">{formatDifference(difference)}</div>
            <div className="ios-city-time">
              <span>{cityB.name}</span>
              <strong>{currentTimeB}</strong>
              <small>Local time</small>
            </div>
          </section>

          <section className="ios-overlap-panel ios-compare-timeline">
            <div
              className="ios-compare-bar"
              role="img"
              aria-label={`24-hour timeline in ${cityA.name} time. Green segments show shared working hours.`}
            >
              {cells.map(({ minutesA, workingA, workingB }, index) => {
                const minutesB = minutesA + difference;
                const status =
                  workingA && workingB
                    ? "Shared working hours"
                    : workingA
                      ? `${cityA.name} working hours`
                      : workingB
                        ? `${cityB.name} working hours`
                        : "Outside working hours";
                const intervalLabel = `${formatTime(minutesA)}–${formatTime(minutesA + 30)} ${cityA.name} / ${formatTime(minutesB)}–${formatTime(minutesB + 30)} ${cityB.name}`;

                return (
                  <i
                    key={minutesA}
                    className={
                      workingA && workingB
                        ? "overlap"
                        : workingA
                          ? "place-a"
                          : workingB
                            ? "place-b"
                            : ""
                    }
                    data-time={`${formatTime(minutesA)} ${cityA.name} · ${formatTime(minutesB)} ${cityB.name}`}
                    data-edge={index < 6 ? "start" : index >= 42 ? "end" : undefined}
                    title={`${intervalLabel} · ${status}`}
                  />
                );
              })}
            </div>
            <div className="ios-compare-scale" aria-hidden="true">
              <span>00</span>
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
            </div>
            <div className="ios-compare-legend" aria-label="Timeline legend">
              <span>
                <i className="place-a" />
                {cityA.name} working hours
              </span>
              <span>
                <i className="place-b" />
                {cityB.name} working hours
              </span>
              <span>
                <i className="overlap" />
                Shared hours
              </span>
            </div>
            <p className="ios-overlap-result" aria-live="polite">
              {overlapRanges.length
                ? `Overlap: ${overlapRanges.map(({ start, end }) => `${formatTime(start)}–${formatTime(end)} ${cityA.name} / ${formatTime(start + difference)}–${formatTime(end + difference)} ${cityB.name}`).join(", ")}`
                : "No overlap with these working hours."}
            </p>
            <p className="ios-compare-note">
              Each block is 30 minutes in {cityA.name}. Hover over a block to see the time in both
              places.
            </p>
          </section>
        </div>

        <section className="ios-download-cta" aria-labelledby="ios-download-title">
          <div>
            <h2 id="ios-download-title">Want more?</h2>
            <p>Explore the full app.</p>
          </div>
          <a className="ios-download-button" href={APP_STORE_URL} target="_blank" rel="noreferrer">
            <span className="ios-download-mark" aria-hidden="true">
              ●
            </span>
            <span>
              <small>Download on the</small>
              App Store
            </span>
          </a>
        </section>
      </section>
    </main>
  );
}
