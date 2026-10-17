const DATABASE = "chapterly";
const STORE = "quoteVault";

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(new Error("This browser does not support the quote database."));
      return;
    }
    const request = indexedDB.open(DATABASE, 1);
    let blocked = false;
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => {
      if (blocked) {
        request.result.close();
        return;
      }
      request.result.onversionchange = () => request.result.close();
      resolve(request.result);
    };
    request.onerror = () => reject(request.error);
    request.onblocked = () => {
      blocked = true;
      reject(new Error("Close other Chapterly tabs and try again."));
    };
  });
}

async function transact(mode, operation) {
  const db = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, mode);
      const request = operation(transaction.objectStore(STORE));
      // A successful request is not yet a committed write. Wait for completion.
      transaction.oncomplete = () => resolve(request.result);
      transaction.onabort = () => reject(transaction.error || new Error("The database could not save this entry."));
      transaction.onerror = () => reject(transaction.error || new Error("The database is unavailable."));
    });
  } finally {
    db.close();
  }
}

export async function listVaultEntries() {
  const entries = await transact("readonly", (store) => store.getAll());
  return entries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveVaultEntry(draft, previous = null) {
  const bookName = draft.bookName.trim();
  const author = draft.author.trim();
  const quote = draft.quote.trim();
  const review = draft.review.trim();
  const rating = Number(draft.rating);
  if (!bookName || (!quote && !review)) {
    throw new Error("Enter a book name and at least one quote or review.");
  }
  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    throw new Error("Choose a whole-star rating between 1 and 5, or leave it unrated.");
  }
  const now = new Date().toISOString();
  const entry = {
    id: previous?.id || crypto.randomUUID(),
    bookName, author, quote, review, rating,
    createdAt: previous?.createdAt || now,
    updatedAt: now,
  };
  await transact("readwrite", (store) => previous ? store.put(entry) : store.add(entry));
  return entry;
}
