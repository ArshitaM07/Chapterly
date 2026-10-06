import { useState } from "react";
import books from "../data/books";

function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    "All",
    "Fantasy",
    "Fantasy Romance",
    "Dark Romance",
    "Romance",
    "Thriller",
    "Mystery",
    "Sci-Fi",
    "Self Growth"
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const addToLibrary = (book) => {
    const existingBooks =
      JSON.parse(localStorage.getItem("myLibrary")) || [];

    const alreadyExists = existingBooks.some(
      (item) => item.id === book.id
    );

    if (alreadyExists) {
      alert("Book already in your library!");
      return;
    }

    existingBooks.push(book);

    localStorage.setItem(
      "myLibrary",
      JSON.stringify(existingBooks)
    );

    alert(`${book.title} added to your library!`);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white p-8">

      <h1 className="text-6xl font-bold font-[Playfair_Display] mb-4">
        Explore Library
      </h1>

      <p className="text-gray-400 mb-10">
        Discover your next fictional obsession
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by book title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none mb-10"
      />

      {/* Genres */}
      <div className="flex flex-wrap gap-4 mb-10">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-5 py-3 rounded-full transition ${
              selectedGenre === genre
                ? "bg-purple-600"
                : "bg-white/5 hover:bg-purple-500/20"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Book count */}
      <p className="text-gray-400 mb-6">
        Showing {filteredBooks.length} book
        {filteredBooks.length !== 1 ? "s" : ""}
      </p>

      {/* No results */}
      {filteredBooks.length === 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-400">
            Book Not Found
          </h2>

          <p className="text-gray-300 mt-4">
            We couldn't find that title in Chapterly's library.
          </p>
        </div>
      )}

      {/* Book Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white/5 p-6 rounded-[30px] border border-white/10 hover:scale-105 transition"
          >

            <img
              src={book.image}
              alt={book.title}
              className="h-72 w-full object-cover rounded-2xl mb-6"
            />

            <h2 className="text-2xl font-bold">
              {book.title}
            </h2>

            <p className="text-gray-400 mt-2">
              {book.author}
            </p>

            <p className="text-purple-300 mt-2">
              {book.genre}
            </p>

            <p className="text-yellow-400 mt-2">
              ⭐ {book.rating}
            </p>

            <p className="text-gray-400 text-sm mt-3 line-clamp-3">
              {book.description}
            </p>

            <button
              onClick={() => addToLibrary(book)}
              className="mt-6 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl w-full transition"
            >
              Add To Library
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ExplorePage;