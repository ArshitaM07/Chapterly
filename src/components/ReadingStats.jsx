import { useState } from "react";
import { BookOpen, Clock3, Flame, Plus, Target, X } from "lucide-react";
import { dateKey, readingSummary } from "../data/reading";

function readableDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ReadingStats({ settings, sessions, onAddSession, libraryBooks, onEditGoals }) {
  const [period, setPeriod] = useState(7);
  const [logging, setLogging] = useState(false);
  const [message, setMessage] = useState("");
  const today = dateKey();
  const summary = readingSummary(sessions, today, period);
  const maxMinutes = Math.max(settings.dailyMinutes, ...summary.activity.map((day) => day.minutes));
  const yearlyPercent = Math.min(100, Math.round(summary.finished / settings.annualGoal * 100));
  const dailyPercent = Math.min(100, Math.round(summary.todayMinutes / settings.dailyMinutes * 100));
  const genres = Object.entries(libraryBooks.reduce((counts, book) => {
    const genre = book.genre || "Uncategorized";
    counts[genre] = (counts[genre] || 0) + 1;
    return counts;
  }, {})).sort((a, b) => b[1] - a[1]);

  function logSession(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get("title").trim();
    const date = form.get("date");
    if (!title || date > today) {
      setMessage("Enter a book title and a date that is not in the future.");
      return;
    }
    const saved = onAddSession({ id: crypto.randomUUID(), title, date, minutes: Number(form.get("minutes")), pages: Number(form.get("pages")), finished: form.get("finished") === "on" });
    setMessage(saved ? "Reading session saved. Your stats are up to date." : "Your browser could not save this session. Please check its storage permissions and try again.");
    if (saved) setLogging(false);
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div><p className="chapterly-eyebrow">ONE CHAPTER AT A TIME</p><h1 className="chapterly-title">Reading Stats</h1><p className="mt-3 text-gray-400">Every page is a little progress. Here’s yours.</p></div>
        <button type="button" className="chapterly-primary" onClick={() => { setLogging(!logging); setMessage(""); }} aria-expanded={logging} aria-controls="reading-log-form">
          {logging ? <X size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}{logging ? "Close log" : "Log reading"}
        </button>
      </header>
      {logging && (
        <form id="reading-log-form" onSubmit={logSession} className="chapterly-panel space-y-5">
          <h2 className="text-xl font-semibold">A little time well spent</h2>
          <div><label htmlFor="log-title" className="chapterly-label">Book title</label><input id="log-title" name="title" list="library-titles" maxLength={160} required className="chapterly-input" placeholder="What did you read?" autoFocus /><datalist id="library-titles">{libraryBooks.map((book) => <option key={book.id} value={book.title} />)}</datalist></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><label htmlFor="log-date" className="chapterly-label">Reading date</label><input id="log-date" name="date" type="date" max={today} defaultValue={today} required className="chapterly-input" /></div>
            <div><label htmlFor="log-minutes" className="chapterly-label">Minutes read</label><input id="log-minutes" name="minutes" type="number" min="1" max="1440" step="1" defaultValue={settings.dailyMinutes} required className="chapterly-input" /></div>
            <div><label htmlFor="log-pages" className="chapterly-label">Pages read</label><input id="log-pages" name="pages" type="number" min="0" max="10000" step="1" defaultValue="0" required className="chapterly-input" /></div>
          </div>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-gray-300"><input name="finished" type="checkbox" className="h-5 w-5 accent-purple-500" /> I finished this book</label>
          <button className="chapterly-primary" type="submit">Save session</button>
        </form>
      )}
      {message && <p role="status" className="text-sm text-purple-200">{message}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-400">Your last {period} days</p>
        <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1" aria-label="Stats period" role="group">
          {[7, 30].map((days) => <button type="button" key={days} aria-pressed={period === days} onClick={() => setPeriod(days)} className={`min-h-11 rounded-lg px-4 text-sm transition-colors ${period === days ? "bg-purple-500/25 text-purple-200" : "text-gray-400 hover:text-white"}`}>{days} days</button>)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4 sm:gap-5">
        {[
          { label: "Reading time", value: summary.minutes, unit: "minutes", Icon: Clock3 },
          { label: "Pages turned", value: summary.pages, unit: "pages", Icon: BookOpen },
          { label: "Current streak", value: summary.streak, unit: summary.streak === 1 ? "day" : "days", Icon: Flame },
          { label: "Reading sessions", value: summary.recent.length, unit: "sessions", Icon: Target },
        ].map(({ label, value, unit, Icon }) => <section key={label} className="chapterly-panel !p-4 sm:!p-5"><Icon size={21} className="mb-5 text-purple-300" aria-hidden="true" /><h2 className="text-sm text-gray-400">{label}</h2><p className="mt-2 text-3xl font-semibold tabular-nums">{value.toLocaleString()}</p><p className="mt-1 text-xs text-gray-400">{unit}{label === "Current streak" ? " · all time" : ""}</p></section>)}
      </div>
      <section className="chapterly-panel">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">Your reading rhythm</h2><p className="mt-2 text-sm text-gray-400">Minutes read each day. A little counts, too.</p></div><span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-200">{summary.minutes} minutes total</span></div>
        <div className="mt-8 flex h-44 items-end gap-1.5 sm:gap-3" role="img" aria-label={`Daily reading activity for the last ${period} days. ${summary.minutes} minutes total. Expand daily details for values.`}>
          {summary.activity.map((day) => <div key={day.date} className="flex h-full min-w-0 flex-1 items-end" title={`${readableDate(day.date)}: ${day.minutes} minutes`}><div className={`w-full rounded-t-md ${day.minutes ? "bg-gradient-to-t from-purple-600 to-purple-300" : "bg-white/10"}`} style={{ height: day.minutes ? `${Math.max(3, day.minutes / maxMinutes * 100)}%` : "3px" }} /></div>)}
        </div>
        <div className="mt-3 flex justify-between text-xs text-gray-400"><span>{readableDate(summary.activity[0].date)}</span><span>Today</span></div>
        {!summary.recent.length && <p className="mt-5 text-sm text-gray-400">Your next chapter starts this chart. Log a reading session to see it grow.</p>}
        <details className="mt-5 text-sm"><summary className="cursor-pointer py-2 text-purple-200">Daily details</summary><div className="mt-2 max-h-60 overflow-auto"><table className="w-full text-left"><caption className="sr-only">Daily reading minutes</caption><thead className="text-gray-400"><tr><th scope="col" className="py-2">Date</th><th scope="col" className="text-right">Minutes</th></tr></thead><tbody>{summary.activity.map((day) => <tr key={day.date} className="border-t border-white/5"><td className="py-2">{readableDate(day.date)}</td><td className="text-right tabular-nums">{day.minutes}</td></tr>)}</tbody></table></div></details>
      </section>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="chapterly-panel bg-gradient-to-br from-purple-500/10 to-transparent">
          <div className="flex items-center justify-between gap-3"><h2 className="text-xl font-semibold">A promise to yourself</h2><Target aria-hidden="true" className="text-purple-300" /></div>
          <p className="mt-2 text-sm text-gray-400">Your {today.slice(0, 4)} reading goals</p>
          {[{ label: "Books finished this year", value: summary.finished, goal: settings.annualGoal, percent: yearlyPercent }, { label: "Minutes read today", value: summary.todayMinutes, goal: settings.dailyMinutes, percent: dailyPercent }].map((goal) => <div key={goal.label} className="mt-6"><div className="mb-3 flex flex-wrap justify-between gap-2 text-sm"><span className="text-gray-300">{goal.label}</span><span className="text-purple-200">{goal.value} / {goal.goal}</span></div><div role="progressbar" aria-label={goal.label} aria-valuemin={0} aria-valuemax={goal.goal} aria-valuenow={Math.min(goal.value, goal.goal)} className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-purple-400" style={{ width: `${goal.percent}%` }} /></div></div>)}
          <p className="mt-5 text-sm text-gray-400">{dailyPercent === 100 ? "Today’s goal is in the books. Nicely done." : "Find a quiet corner. Even a few pages make a difference."}</p>
          <button type="button" className="chapterly-secondary mt-5" onClick={onEditGoals}>Adjust your goals</button>
        </section>
        <section className="chapterly-panel">
          <h2 className="text-xl font-semibold">The worlds on your shelf</h2><p className="mt-2 text-sm text-gray-400">Genres in your saved library · {libraryBooks.length} books</p>
          {genres.length ? <div className="mt-6 space-y-5">{genres.map(([genre, count]) => <div key={genre}><div className="mb-2 flex justify-between gap-3 text-sm"><span>{genre}</span><span className="text-gray-400">{count} {count === 1 ? "book" : "books"}</span></div><div className="h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-teal-300/80" style={{ width: `${count / libraryBooks.length * 100}%` }} /></div></div>)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-6 text-sm leading-relaxed text-gray-400">Your shelf has room for new worlds. Add books from Explore to discover your genre mix. Sample books don’t count toward your stats.</div>}
        </section>
      </div>
      <section className="chapterly-panel">
        <h2 className="text-xl font-semibold">Recently between the pages</h2><p className="mt-2 text-sm text-gray-400">Your latest sessions from the selected period.</p>
        {summary.recent.length ? <ul className="mt-4 divide-y divide-white/10">{[...summary.recent].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((entry) => <li key={entry.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div className="min-w-0"><p className="break-words font-medium">{entry.title}</p><p className="mt-1 text-sm text-gray-400">{readableDate(entry.date)} · {entry.pages} pages{entry.finished ? " · Book finished" : ""}</p></div><span className="rounded-full bg-white/5 px-3 py-1 text-sm text-purple-200">{entry.minutes} min</span></li>)}</ul> : <p className="mt-6 text-sm text-gray-400">No sessions yet in this period. Your first one is worth celebrating.</p>}
      </section>
    </div>
  );
}
