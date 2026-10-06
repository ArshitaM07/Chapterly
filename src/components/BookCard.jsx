import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookCard({ title, genre, progress, image }) {

  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);

  return (
    <div
      className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl hover:scale-105 transition cursor-pointer relative"
    >

      <Heart
        size={24}
        onClick={(e) => {
          e.stopPropagation();
          setFavorite(!favorite);
        }}
        className={`absolute right-6 top-6 ${
          favorite
            ? "fill-red-500 text-red-500"
            : "text-white"
        }`}
      />

      <div onClick={() => navigate("/reader")}>

        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover rounded-2xl mb-6"
        />

        <h3 className="text-2xl font-bold">
          {title}
        </h3>

        <p className="text-gray-400 mt-2">
          {genre}
        </p>

        <div className="mt-6">

          <div className="flex justify-between mb-2">

            <span>Progress</span>

            <span>{progress}%</span>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

            <div
              style={{
                width: `${progress}%`
              }}
              className="h-full bg-purple-500"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookCard;