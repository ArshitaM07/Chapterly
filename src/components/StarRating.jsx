import { useId } from "react";
import { Star } from "lucide-react";

export default function StarRating({ value, onChange }) {
  const name = useId();

  return (
    <fieldset className="mt-6 min-w-0">
      <legend className="text-gray-300">Rating</legend>
      <div className="mt-2 flex gap-2">
        {[1, 2, 3, 4, 5].map((stars) => (
          <label key={stars} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={stars}
              checked={value === stars}
              onChange={() => onChange(stars)}
              aria-label={`${stars} ${stars === 1 ? "star" : "stars"}`}
              className="peer sr-only"
            />
            <span className="flex h-11 w-11 items-center justify-center rounded-lg text-yellow-400 transition-colors hover:bg-white/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-purple-300 motion-reduce:transition-none">
              <Star
                size={30}
                fill={stars <= value ? "currentColor" : "none"}
                aria-hidden="true"
              />
            </span>
          </label>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-400" aria-live="polite">
        {value ? `${value} of 5 stars` : "Select a star to rate this book"}
      </p>
    </fieldset>
  );
}
