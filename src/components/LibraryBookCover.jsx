import { useState } from "react";
import { BookOpen } from "lucide-react";

const colors = [
  "from-purple-950 via-purple-800 to-indigo-950",
  "from-teal-950 via-teal-800 to-slate-950",
  "from-rose-950 via-rose-800 to-purple-950",
  "from-amber-950 via-amber-800 to-stone-950",
];

export default function LibraryBookCover({ book, sample, index }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!sample && book.image && !imageFailed) {
    return (
      <img
        src={book.image}
        alt={book.title}
        loading="lazy"
        onError={() => setImageFailed(true)}
        className="h-72 w-full object-cover rounded-2xl"
      />
    );
  }

  return (
    <div className={`relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-center ${colors[index % colors.length]}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-xl border border-white/20" />
      <BookOpen aria-hidden="true" className="mb-5 h-8 w-8 text-white/70" />
      <p className="font-[Playfair_Display] text-3xl font-bold">{book.title}</p>
      <p className="mt-4 text-sm tracking-wide text-white/80">{book.author}</p>
    </div>
  );
}
