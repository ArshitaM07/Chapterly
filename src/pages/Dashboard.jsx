import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import books from "../data/books";
import QuoteVault from "../components/QuoteVault";
import LibraryBookCover from "../components/LibraryBookCover";
import ReadingStats from "../components/ReadingStats";
import SettingsPanel from "../components/SettingsPanel";
import { loadSettings, loadSessions } from "../data/reading";

const sampleBooks = ["Fourth Wing", "The Hobbit", "The Night Circus", "Atomic Habits"]
  .map((title) => books.find((book) => book.title === title));

function Dashboard() {
  const [settings, setSettings] = useState(loadSettings);
  const [sessions, setSessions] = useState(loadSessions);

  function saveSettings(next) {
    try {
      localStorage.setItem("chapterlySettings", JSON.stringify(next));
      setSettings(next);
      return true;
    } catch {
      return false;
    }
  }

  function addSession(session) {
    try {
      const next = [session, ...sessions];
      localStorage.setItem("chapterlySessions", JSON.stringify(next));
      setSessions(next);
      return true;
    } catch {
      return false;
    }
  }

  // -----------------------------
  // LIBRARY
  // -----------------------------

  const [libraryBooks] = useState(() => {
    try {
      const savedBooks = JSON.parse(localStorage.getItem("myLibrary"));
      return Array.isArray(savedBooks) ? savedBooks : [];
    } catch {
      return [];
    }
  });
  const showingSamples = libraryBooks.length === 0 && settings.showSamples;
  const displayedBooks = showingSamples ? sampleBooks : libraryBooks;


  // -----------------------------
  // ACTIVE TAB
  // -----------------------------

  const [activeTab, setActiveTab] = useState("Library");


  // -----------------------------
  // SIDEBAR
  // -----------------------------

  const menuItems = [
    "Library",
    "Currently Reading",
    "AI Librarian",
    "Quote Vault",
    "Reading Stats",
    "Settings"
  ];


  return (
    <div className="chapterly-workspace min-h-screen bg-[#0B1020] text-white p-4 sm:p-8" data-reduce-motion={settings.reduceMotion}>

      <div className="grid lg:grid-cols-4 gap-8">


        {/* ========================================= */}
        {/* SIDEBAR */}
        {/* ========================================= */}

        <div className="h-fit bg-white/5 border border-white/10 rounded-[30px] p-5 xl:p-8">

          <h1 className="text-4xl xl:text-5xl font-bold mb-10">
            Chapterly
          </h1>

          <div className="space-y-5">

            {menuItems.map((item) => (

              <button
                type="button"
                key={item}
                onClick={() => setActiveTab(item)}
                aria-pressed={activeTab === item}
                className={`w-full text-left px-5 py-4 rounded-2xl cursor-pointer transition focus-visible:outline-2 focus-visible:outline-purple-300 ${
                  activeTab === item
                    ? "bg-purple-500/20 text-purple-300"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>


        {/* ========================================= */}
        {/* RIGHT SIDE */}
        {/* ========================================= */}

        <div className="min-w-0 lg:col-span-3">


          {/* ========================================= */}
          {/* LIBRARY */}
          {/* ========================================= */}

          {activeTab === "Library" && (

            <div>

              <p className="mb-3 break-words text-purple-200">Welcome back, {settings.name}.</p>
              <h1 className="text-4xl font-bold mb-8">
                Your Library
              </h1>

              {showingSamples && (
                <p className="mb-6 text-gray-400">
                  A little shelf inspiration. These sample books are placeholders;
                  add your own favorites to make this library yours.
                </p>
              )}

              <Link
                to="/explore"
                className="mb-8 inline-flex min-h-11 items-center rounded-xl bg-purple-600 px-5 py-3 font-medium transition hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
              >
                Explore books
              </Link>

              {displayedBooks.length === 0 && (
                <div className="chapterly-panel text-center">
                  <h2 className="text-xl font-semibold">Room for your next favorite</h2>
                  <p className="mt-3 text-gray-400">Add a book from Explore to start your personal library.</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {displayedBooks.map((book, index) => (
                  <article
                    key={book.id}
                    className="bg-white/5 p-6 rounded-[30px] border border-white/10"
                  >
                    <LibraryBookCover book={book} sample={showingSamples} index={index} />
                    {showingSamples && (
                      <span className="mt-4 inline-block rounded-full bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-200">
                        Sample book
                      </span>
                    )}
                    <h2 className="text-2xl font-bold mt-4">{book.title}</h2>
                    <p className="text-gray-400">{book.author}</p>
                    <p className="text-purple-300 mt-2">{book.genre}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">{book.description}</p>
                    <p className="flex items-center gap-2 text-yellow-400 mt-3">
                      <Star size={18} fill="currentColor" aria-hidden="true" />
                      <span>{book.rating} / 5 <span className="text-gray-400">catalog rating</span></span>
                    </p>
                  </article>
                ))}
              </div>

            </div>

          )}


          {/* ========================================= */}
          {/* CURRENTLY READING */}
          {/* ========================================= */}

          {activeTab === "Currently Reading" && (

            <div className="bg-white/5 rounded-[30px] p-8">

              <h1 className="text-4xl font-bold">
                Currently Reading
              </h1>

              <div className="mt-8 bg-black/20 rounded-2xl p-6">

                <h2 className="text-2xl font-bold">
                  Fourth Wing
                </h2>

                <p className="text-gray-400 mt-2">
                  Rebecca Yarros
                </p>

                <div className="mt-6">

                  <div className="flex justify-between mb-2">

                    <span className="text-gray-400">
                      Reading Progress
                    </span>

                    <span className="text-purple-300">
                      72%
                    </span>

                  </div>

                  <div className="w-full bg-white/10 rounded-full h-3">

                    <div
                      className="bg-purple-600 h-3 rounded-full"
                      style={{ width: "72%" }}
                    />

                  </div>

                </div>

              </div>

            </div>

          )}


          {/* ========================================= */}
          {/* AI LIBRARIAN */}
          {/* ========================================= */}

          {activeTab === "AI Librarian" && (

            <AILibrarian />

          )}


          {/* ========================================= */}
          {/* QUOTE VAULT */}
          {/* ========================================= */}

          {activeTab === "Quote Vault" && (

            <QuoteVault />

          )}


          {/* ========================================= */}
          {/* READING STATS */}
          {/* ========================================= */}

          {activeTab === "Reading Stats" && (
            <ReadingStats
              settings={settings}
              sessions={sessions}
              onAddSession={addSession}
              libraryBooks={libraryBooks}
              onEditGoals={() => setActiveTab("Settings")}
            />
          )}

          {activeTab === "Settings" && (
            <SettingsPanel
              settings={settings}
              onSave={saveSettings}
              libraryBooks={libraryBooks}
              sessions={sessions}
            />
          )}

        </div>

      </div>

    </div>
  );
}


/* ================================================= */
/* AI LIBRARIAN                                      */
/* ================================================= */

function AILibrarian() {

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text:
        "Hello! I'm your Chapterly AI Librarian 📚✨ Tell me what kind of book you're looking for!"
    }
  ]);

  const [input, setInput] = useState("");


  // ---------------------------------------------
  // SEND MESSAGE
  // ---------------------------------------------

  const sendMessage = () => {

    const question = input.trim();

    if (!question) {
      return;
    }


    // USER MESSAGE

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: question
    };


    // GET RECOMMENDATIONS

    const result = generateRecommendation(question);


    // BOT MESSAGE

    const botMessage = {
      id: Date.now() + 1,
      type: "bot",
      text: result.text,
      books: result.books
    };


    setMessages((previousMessages) => [

      ...previousMessages,

      userMessage,

      botMessage

    ]);


    setInput("");

  };


  // ---------------------------------------------
  // ENTER KEY
  // ---------------------------------------------

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {

      sendMessage();

    }

  };


  // ---------------------------------------------
  // QUICK QUESTION
  // ---------------------------------------------

  const askQuickQuestion = (question) => {

    setInput(question);

  };


  return (

    <div className="flex flex-col">


      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-4xl font-bold">
          🤖 AI Librarian
        </h1>

        <p className="text-gray-400 mt-2">
          Your personal Chapterly book recommendation assistant.
        </p>

      </div>


      {/* CHAT WINDOW */}

      <div className="bg-white/5 border border-white/10 rounded-[30px] p-6 min-h-[450px] max-h-[550px] overflow-y-auto">

        <div className="space-y-5">

          {messages.map((message) => (

            <div
              key={message.id}
              className={`flex ${
                message.type === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] rounded-3xl p-5 ${
                  message.type === "user"
                    ? "bg-purple-600"
                    : "bg-black/30 border border-white/10"
                }`}
              >

                <p className="leading-relaxed">
                  {message.text}
                </p>


                {/* BOOK RECOMMENDATIONS */}

                {message.books &&
                  message.books.length > 0 && (

                    <div className="mt-5 space-y-4">

                      {message.books.map((book) => (

                        <div
                          key={book.id}
                          className="bg-white/5 border border-white/10 rounded-2xl p-4"
                        >

                          <div className="flex gap-4">

                            <img
                              src={book.image}
                              alt={book.title}
                              className="w-20 h-28 object-cover rounded-xl"
                            />

                            <div>

                              <h3 className="text-lg font-bold">
                                {book.title}
                              </h3>

                              <p className="text-gray-400 text-sm">
                                by {book.author}
                              </p>

                              <p className="text-purple-300 text-sm mt-1">
                                {book.genre}
                              </p>

                              <p className="text-yellow-400 text-sm mt-1">
                                ⭐ {book.rating}
                              </p>

                              <p className="text-gray-500 text-xs mt-2">
                                Chapterly reference
                              </p>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* QUICK QUESTIONS */}

      <div className="flex flex-wrap gap-3 mt-4">

        <button
          onClick={() =>
            askQuickQuestion(
              "Recommend me a fantasy romance"
            )
          }
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20"
        >
          🐉 Fantasy Romance
        </button>


        <button
          onClick={() =>
            askQuickQuestion(
              "I loved Fourth Wing. What should I read next?"
            )
          }
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20"
        >
          📖 Like Fourth Wing
        </button>


        <button
          onClick={() =>
            askQuickQuestion(
              "Recommend me a thriller"
            )
          }
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20"
        >
          🔪 Thriller
        </button>


        <button
          onClick={() =>
            askQuickQuestion(
              "Recommend me a self growth book"
            )
          }
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20"
        >
          🌱 Self Growth
        </button>

      </div>


      {/* INPUT AREA */}

      <div className="flex gap-3 mt-4">

        <input
          type="text"
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask me for a book recommendation..."
          className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-purple-500"
        />


        <button
          type="button"
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 px-8 rounded-2xl font-semibold transition"
        >
          Ask
        </button>

      </div>

    </div>

  );
}


/* ================================================= */
/* RECOMMENDATION ENGINE                             */
/* ================================================= */

function generateRecommendation(input) {

  const query = input.toLowerCase();

  let matchedBooks = [];


  // ---------------------------------------------
  // FANTASY ROMANCE
  // ---------------------------------------------

  if (
    query.includes("fantasy romance") ||
    query.includes("dragon") ||
    query.includes("fae") ||
    query.includes("fantasy love")
  ) {

    matchedBooks = books.filter(
      (book) =>
        book.genre === "Fantasy Romance"
    );

  }


  // ---------------------------------------------
  // FANTASY
  // ---------------------------------------------

  else if (
    query.includes("fantasy") ||
    query.includes("magic") ||
    query.includes("magical")
  ) {

    matchedBooks = books.filter(
      (book) =>
        book.genre === "Fantasy"
    );

  }


  // ---------------------------------------------
  // DARK ROMANCE
  // ---------------------------------------------

  else if (
    query.includes("dark romance") ||
    query.includes("toxic romance") ||
    query.includes("possessive")
  ) {

    matchedBooks = books.filter(
      (book) =>
        book.genre === "Dark Romance"
    );

  }


  // ---------------------------------------------
  // ROMANCE
  // ---------------------------------------------

  else if (
    query.includes("romance") ||
    query.includes("love") ||
    query.includes("romantic")
  ) {

    matchedBooks = books.filter(
      (book) =>
        book.genre === "Romance" ||
        book.genre === "Dark Romance" ||
        book.genre === "Fantasy Romance"
    );

  }


  // ---------------------------------------------
  // THRILLER
  // ---------------------------------------------

  else if (
    query.includes("thriller") ||
    query.includes("suspense") ||
    query.includes("scary")
  ) {

    matchedBooks = books.filter(
      (book) =>
        book.genre === "Thriller"
    );

  }


  // ---------------------------------------------
  // MYSTERY
  // ---------------------------------------------

  else if (
    query.includes("mystery") ||
    query.includes("detective") ||
    query.includes("crime")
  ) {

    matchedBooks = books.filter(
      (book) =>
        book.genre === "Mystery"
    );

  }


  // ---------------------------------------------
  // SCI-FI
  // ---------------------------------------------

  else if (
    query.includes("sci-fi") ||
    query.includes("science fiction") ||
    query.includes("space") ||
    query.includes("astronaut")
  ) {

    matchedBooks = books.filter(
      (book) =>
        book.genre === "Sci-Fi"
    );

  }


  // ---------------------------------------------
  // SELF GROWTH
  // ---------------------------------------------

  else if (
    query.includes("self growth") ||
    query.includes("self improvement") ||
    query.includes("productivity") ||
    query.includes("habits") ||
    query.includes("motivation")
  ) {

    matchedBooks = books.filter(
      (book) =>
        book.genre === "Self Growth"
    );

  }


  // ---------------------------------------------
  // SPECIFIC BOOK
  // ---------------------------------------------

  else {

    const mentionedBook = books.find(
      (book) =>
        query.includes(
          book.title.toLowerCase()
        )
    );


    if (mentionedBook) {

      matchedBooks = books.filter(
        (book) =>
          book.genre === mentionedBook.genre &&
          book.id !== mentionedBook.id
      );

    }

  }


  // ---------------------------------------------
  // SORT BY RATING
  // ---------------------------------------------

  matchedBooks.sort(
    (a, b) =>
      b.rating - a.rating
  );


  // ---------------------------------------------
  // TOP 3
  // ---------------------------------------------

  matchedBooks =
    matchedBooks.slice(0, 3);


  // ---------------------------------------------
  // NO RESULTS
  // ---------------------------------------------

  if (matchedBooks.length === 0) {

    return {

      text:
        "I couldn't find an exact match in my current library. Try asking me for a fantasy, romance, thriller, mystery, sci-fi, or self-growth book! 📚",

      books: []

    };

  }


  // ---------------------------------------------
  // RESULTS
  // ---------------------------------------------

  return {

    text:
      "Absolutely! Based on your request, here are some books from the Chapterly library you might enjoy:",

    books: matchedBooks

  };

}


export default Dashboard;
