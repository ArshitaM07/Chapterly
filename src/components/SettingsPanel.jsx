import { useState } from "react";
import { Download, SlidersHorizontal, Target, UserRound } from "lucide-react";
import { listVaultEntries } from "../data/quoteVault";

export default function SettingsPanel({ settings, onSave, libraryBooks, sessions }) {
  const [draft, setDraft] = useState(settings);
  const [message, setMessage] = useState("");
  const [exporting, setExporting] = useState(false);
  const changed = JSON.stringify(draft) !== JSON.stringify(settings);

  function update(key, value) {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setMessage("");
  }

  function save(event) {
    event.preventDefault();
    const next = { ...draft, name: draft.name.trim(), annualGoal: Number(draft.annualGoal), dailyMinutes: Number(draft.dailyMinutes) };
    if (!next.name) {
      setMessage("Please enter a reader name.");
      return;
    }
    if (onSave(next)) {
      setDraft(next);
      setMessage("Your settings are saved.");
    } else {
      setMessage("Your browser could not save these settings. Please check its storage permissions and try again.");
    }
  }

  async function exportData() {
    setExporting(true);
    setMessage("");
    try {
      const quoteVault = await listVaultEntries();
      const data = { version: 2, exportedAt: new Date().toISOString(), settings, library: libraryBooks, sessions, quoteVault };
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "chapterly-reading-data.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage("Your reading data and quote vault export is ready.");
    } catch {
      setMessage("Could not read your quote vault. Please retry; no incomplete backup was exported.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="chapterly-eyebrow">MAKE YOURSELF AT HOME</p>
        <h1 className="chapterly-title">Settings</h1>
        <p className="mt-3 text-gray-400">A reading space that feels a little more like you.</p>
      </header>
      <form onSubmit={save} className="space-y-6">
        <section className="chapterly-panel">
          <h2 className="chapterly-section-title"><UserRound aria-hidden="true" /> Reader profile</h2>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl font-bold text-purple-200">{draft.name.trim().slice(0, 2).toUpperCase() || "R"}</div>
            <div className="w-full max-w-md">
              <label htmlFor="reader-name" className="chapterly-label">Reader name</label>
              <input id="reader-name" className="chapterly-input" value={draft.name} required maxLength={40} onChange={(event) => update("name", event.target.value)} autoComplete="nickname" />
              <p className="mt-2 text-sm text-gray-400">Used to welcome you back to your library.</p>
            </div>
          </div>
        </section>
        <section className="chapterly-panel">
          <h2 className="chapterly-section-title"><Target aria-hidden="true" /> Your reading rhythm</h2>
          <p className="mt-2 text-sm text-gray-400">Small chapters add up. Set a pace that works for you.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="annual-goal" className="chapterly-label">Yearly book goal</label>
              <input id="annual-goal" type="number" min="1" max="365" step="1" required className="chapterly-input" value={draft.annualGoal} onChange={(event) => update("annualGoal", event.target.value)} />
              <p className="mt-2 text-sm text-gray-400">Books to finish this calendar year.</p>
            </div>
            <div>
              <label htmlFor="daily-goal" className="chapterly-label">Daily reading goal (minutes)</label>
              <input id="daily-goal" type="number" min="1" max="720" step="1" required className="chapterly-input" value={draft.dailyMinutes} onChange={(event) => update("dailyMinutes", event.target.value)} />
              <p className="mt-2 text-sm text-gray-400">Track your progress in Reading Stats.</p>
            </div>
          </div>
        </section>
        <section className="chapterly-panel">
          <h2 className="chapterly-section-title"><SlidersHorizontal aria-hidden="true" /> Make it comfortable</h2>
          <div className="mt-3 divide-y divide-white/10">
            {[
              ["showSamples", "Sample books", "Show a little shelf inspiration when your library is empty."],
              ["reduceMotion", "Reduce motion", "Keep animations and transitions still in your reading workspace."],
            ].map(([key, label, description]) => (
              <label key={key} className="flex cursor-pointer items-center justify-between gap-5 py-5">
                <span><span className="block font-medium">{label}</span><span className="mt-1 block text-sm text-gray-400">{description}</span></span>
                <input type="checkbox" role="switch" checked={draft[key]} onChange={(event) => update(key, event.target.checked)} aria-label={label} className="chapterly-switch" />
              </label>
            ))}
          </div>
        </section>
        <div className="flex flex-wrap items-center gap-4">
          <button className="chapterly-primary" type="submit" disabled={!changed}>Save changes</button>
          {changed && <button type="button" className="chapterly-secondary" onClick={() => { setDraft(settings); setMessage(""); }}>Discard changes</button>}
          <p role="status" className="text-sm text-purple-200">{message || (changed ? "You have unsaved changes." : "All changes saved.")}</p>
        </div>
      </form>
      <section className="chapterly-panel flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div><h2 className="text-xl font-semibold">Your stories, your data</h2><p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-400">Your preferences, library, reading log, quotes, and reviews are stored in this browser. Download a copy to keep them safe.</p></div>
        <button type="button" disabled={exporting} className="chapterly-secondary shrink-0" onClick={exportData}><Download size={18} aria-hidden="true" /> {exporting ? "Preparing export…" : "Export data"}</button>
      </section>
    </div>
  );
}
