import { useEffect, useRef, useState } from "react";
import { BookmarkCheck, Pencil, Save, Search, ShieldCheck, Star } from "lucide-react";
import StarRating from "./StarRating";
import { listVaultEntries, saveVaultEntry } from "../data/quoteVault";

const emptyDraft = { bookName: "", author: "", rating: 0, quote: "", review: "" };

export default function QuoteVault() {
  const [draft, setDraft] = useState(emptyDraft);
  const [editing, setEditing] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reload, setReload] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [protection, setProtection] = useState("checking");
  const [requestingProtection, setRequestingProtection] = useState(false);
  const submitting = useRef(false);
  const titleInput = useRef(null);

  useEffect(() => {
    let active = true;
    listVaultEntries().then((saved) => {
      if (active) { setEntries(saved); setLoadError(""); }
    }).catch(() => {
      if (active) setLoadError("Your saved vault could not be opened. Check browser storage permissions, close other Chapterly tabs, and retry.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [reload]);

  useEffect(() => {
    let active = true;
    async function checkProtection() {
      try {
        const available = Boolean(navigator.storage?.persist && navigator.storage?.persisted);
        const status = available ? (await navigator.storage.persisted() ? "granted" : "available") : "unsupported";
        if (active) setProtection(status);
      } catch {
        if (active) setProtection("unsupported");
      }
    }
    checkProtection();
    return () => { active = false; };
  }, []);

  function update(key, value) {
    setDraft((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const entry = await saveVaultEntry(draft, editing);
      setEntries((current) => [entry, ...current.filter((item) => item.id !== entry.id)]);
      setDraft(emptyDraft);
      setEditing(null);
      setSearch("");
      setMessage(editing ? "Your saved entry has been updated." : "Your quote and review have been saved to this browser’s database.");
    } catch (cause) {
      setError(`${cause.message || "Could not save your entry."} Your text is still here; please try again.`);
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  }

  async function protectStorage() {
    setRequestingProtection(true);
    try {
      setProtection(await navigator.storage.persist() ? "granted" : "denied");
    } catch {
      setProtection("denied");
    } finally {
      setRequestingProtection(false);
    }
  }

  function edit(entry) {
    if (Object.values(draft).some(Boolean) && !window.confirm("Replace your unsaved draft with this saved entry?")) return;
    setDraft({ bookName: entry.bookName, author: entry.author, rating: entry.rating, quote: entry.quote, review: entry.review });
    setEditing(entry);
    setMessage("");
    setError("");
    titleInput.current?.focus();
  }

  const query = search.trim().toLowerCase();
  const filtered = entries.filter((entry) => [entry.bookName, entry.author, entry.quote, entry.review].some((text) => text.toLowerCase().includes(query)));

  return (
    <div className="space-y-6">
      <header>
        <p className="chapterly-eyebrow">KEEP THE WORDS THAT STAY</p>
        <h1 className="chapterly-title">Quote Vault</h1>
        <p className="mt-3 text-gray-400">Your favorite lines, honest reviews, and stories worth remembering.</p>
      </header>

      <section className="chapterly-panel flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl">
          <h2 className="chapterly-section-title"><ShieldCheck aria-hidden="true" /> Saved on this browser</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">Submitted entries stay after refreshes and browser restarts. Clearing this site’s data removes them. Export a backup from Settings.</p>
          <p role="status" className="mt-2 text-sm text-purple-200">
            {protection === "granted" && "Persistent storage protection is enabled."}
            {protection === "available" && "Enable protection to ask your browser to keep this data during automatic cleanup."}
            {protection === "denied" && "Your browser did not grant extra protection. Your entries are still saved; export a backup to keep a copy."}
            {protection === "unsupported" && "Extra storage protection is unavailable in this browser. You can still save and export your entries."}
          </p>
        </div>
        {protection !== "granted" && protection !== "unsupported" && (
          <button type="button" className="chapterly-secondary" onClick={protectStorage} disabled={requestingProtection || protection === "checking"}>
            {requestingProtection ? "Requesting protection…" : "Enable persistent storage"}
          </button>
        )}
      </section>

      <form onSubmit={submit} className="chapterly-panel space-y-5">
        <h2 className="text-xl font-semibold">{editing ? "Edit your saved entry" : "A thought worth keeping"}</h2>
        <fieldset disabled={saving} className="min-w-0 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="vault-book" className="chapterly-label">Book name</label>
              <input ref={titleInput} id="vault-book" required maxLength={200} value={draft.bookName} onChange={(event) => update("bookName", event.target.value)} placeholder="The book that stayed with you" className="chapterly-input" />
            </div>
            <div>
              <label htmlFor="vault-author" className="chapterly-label">Author (optional)</label>
              <input id="vault-author" maxLength={200} value={draft.author} onChange={(event) => update("author", event.target.value)} placeholder="Who wrote it?" className="chapterly-input" />
            </div>
          </div>
          <div>
            <StarRating value={draft.rating} onChange={(rating) => update("rating", rating)} />
            {draft.rating > 0 && <button type="button" className="mt-1 min-h-11 text-sm text-purple-200" onClick={() => update("rating", 0)}>Clear rating</button>}
          </div>
          <p id="vault-text-hint" className="text-sm text-gray-400">Add a quote, a review, or both. A star rating is optional.</p>
          <div>
            <label htmlFor="vault-quote" className="chapterly-label">Favorite quote</label>
            <textarea id="vault-quote" rows={4} maxLength={20000} aria-describedby="vault-text-hint" value={draft.quote} onChange={(event) => update("quote", event.target.value)} placeholder="The line you don’t want to forget…" className="chapterly-input resize-y" />
          </div>
          <div>
            <label htmlFor="vault-review" className="chapterly-label">Your review / notes</label>
            <textarea id="vault-review" rows={4} maxLength={20000} aria-describedby="vault-text-hint" value={draft.review} onChange={(event) => update("review", event.target.value)} placeholder="How did this story make you feel?" className="chapterly-input resize-y" />
          </div>
        </fieldset>
        {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={saving || loading || Boolean(loadError)} className="chapterly-primary"><Save size={18} aria-hidden="true" />{saving ? "Saving…" : editing ? "Save changes" : "Submit & save"}</button>
          {editing && <button type="button" disabled={saving} className="chapterly-secondary" onClick={() => { setEditing(null); setDraft(emptyDraft); setError(""); }}>Cancel edit</button>}
          <p role="status" className="text-sm text-purple-200">{message}</p>
        </div>
      </form>

      <section className="space-y-5" aria-labelledby="saved-vault-heading">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><h2 id="saved-vault-heading" className="chapterly-section-title"><BookmarkCheck aria-hidden="true" /> Your saved collection</h2><p className="mt-2 text-sm text-gray-400">{entries.length} {entries.length === 1 ? "entry" : "entries"} · Most recently saved first</p></div>
          <div className="relative w-full sm:w-72">
            <label htmlFor="vault-search" className="sr-only">Search saved quotes and reviews</label>
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-4 text-gray-400" />
            <input id="vault-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your vault" className="chapterly-input !pl-10" />
          </div>
        </div>
        {loading ? <p role="status" className="chapterly-panel text-gray-400">Opening your vault…</p> : loadError ? (
          <div className="chapterly-panel"><p role="alert" className="text-rose-300">{loadError}</p><button type="button" className="chapterly-secondary mt-4" onClick={() => { setLoading(true); setReload((value) => value + 1); }}>Retry opening vault</button></div>
        ) : filtered.length ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {filtered.map((entry) => (
              <article key={entry.id} className="chapterly-panel min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0"><h3 className="break-words text-xl font-semibold">{entry.bookName}</h3>{entry.author && <p className="mt-1 break-words text-sm text-gray-400">{entry.author}</p>}</div>
                  <button type="button" disabled={saving} onClick={() => edit(entry)} aria-label={`Edit entry for ${entry.bookName}`} className="chapterly-secondary !p-3"><Pencil size={18} aria-hidden="true" /></button>
                </div>
                {entry.rating > 0 && <div role="img" aria-label={`${entry.rating} of 5 stars`} className="mt-4 flex gap-1 text-yellow-400">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={18} fill={star <= entry.rating ? "currentColor" : "none"} aria-hidden="true" />)}</div>}
                {entry.quote && <blockquote className="mt-5 whitespace-pre-wrap break-words border-l-2 border-purple-400 pl-4 font-[Playfair_Display] text-lg leading-relaxed text-purple-100">{entry.quote}</blockquote>}
                {entry.review && <div className="mt-5"><h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Your review</h4><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-300">{entry.review}</p></div>}
                <p className="mt-6 text-xs text-gray-400">Saved <time dateTime={entry.updatedAt}>{new Date(entry.updatedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</time></p>
              </article>
            ))}
          </div>
        ) : <div className="chapterly-panel text-center text-gray-400">{query ? "No entries match your search. Try a book title, author, or a few words from your notes." : "Your collection starts with a single line. Submit your first quote or review above."}</div>}
      </section>
    </div>
  );
}
