function GenreCard({ genre }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center hover:bg-purple-500/20 hover:scale-105 transition cursor-pointer">

      <h3 className="text-lg font-semibold">
        {genre}
      </h3>

    </div>
  );
}

export default GenreCard;