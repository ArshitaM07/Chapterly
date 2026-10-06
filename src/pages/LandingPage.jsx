import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  Heart
} from "lucide-react";

function LandingPage() {
    const navigate = useNavigate();
     return (
        <div className="min-h-screen bg-[#0B1020] text-white overflow-hidden relative">

        {/* Floating Particles */}
        {[...Array(40)].map((_, i) => (
            <div
            key={i}
            className="absolute w-2 h-2 bg-purple-300 rounded-full opacity-60 animate-pulse"
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
            }}
            ></div>
        ))}

      {/* Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-600 rounded-full blur-[120px] opacity-30"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold font-[Playfair_Display]"
        >
          Chapterly
        </motion.h1>

        <div className="hidden md:flex gap-10 text-gray-300">

          <a href="#" className="hover:text-purple-300 transition">
            Features
          </a>

          <a href="#" className="hover:text-purple-300 transition">
            AI Librarian
          </a>

          <a href="#" className="hover:text-purple-300 transition">
            Quotes
          </a>

          <a href="#" className="hover:text-purple-300 transition">
            Community
          </a>

        </div>

        <button
  onClick={() => navigate("/login")}
  className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-full"
>
  Login
</button>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 h-[75vh] relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold leading-tight max-w-5xl font-[Playfair_Display]"
        >
          What are we
          <span className="text-purple-400"> reading </span>
          tonight?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-gray-300 max-w-2xl"
        >
          Track your stories, discover new worlds,
          and let AI guide your next obsession.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex gap-4"
        >
          <button
  onClick={() => navigate("/login")}
  className="bg-purple-600 hover:bg-purple-700 transition px-8 py-4 rounded-full text-lg"
>
   Start Reading
</button>

         <button
onClick={()=>navigate("/explore")}
className="border border-gray-500 hover:border-purple-400 transition px-8 py-4 rounded-full text-lg"
>
Explore Library
</button>
        </motion.div>

      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-20 relative z-10">

        {[
          {
            icon: <Sparkles />,
            title: "AI Librarian",
            desc: "Get intelligent recommendations tailored to your reading mood."
          },
          {
            icon: <Heart />,
            title: "Quote Vault",
            desc: "Save your favorite lines and revisit them beautifully."
          },
          {
            icon: <BookOpen />,
            title: "Reading Tracker",
            desc: "Track progress, favorites, and emotional damage."
          }
        ].map((card, index) => (

          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl"
          >
            <div className="text-purple-300 mb-4">
              {card.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              {card.title}
            </h3>

            <p className="text-gray-300">
              {card.desc}
            </p>
          </motion.div>

        ))}

      </section>

      {/* Dashboard Preview */}
      <section className="px-10 pb-24 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-[Playfair_Display]">
            Your Personal Reading Universe
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Beautifully organize your stories, moods, quotes, and obsessions.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl max-w-6xl mx-auto"
        >

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Sidebar */}
            <div className="bg-white/5 rounded-3xl p-6">

              <h3 className="text-2xl font-bold mb-8">
                Chapterly
              </h3>

              <div className="space-y-4 text-gray-300">

                <div className="bg-purple-500/20 text-purple-300 px-4 py-3 rounded-2xl">
                  Library
                </div>

                <div className="px-4 py-3">
                  AI Librarian
                </div>

                <div className="px-4 py-3">
                  Quote Vault
                </div>

                <div className="px-4 py-3">
                  Reading Stats
                </div>

              </div>

            </div>

            {/* Main Dashboard */}
            <div className="md:col-span-3 space-y-6">

              <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-8">

                <h2 className="text-4xl font-bold font-[Playfair_Display]">
                  Welcome back, Reader.
                </h2>

                <p className="mt-4 text-white/80 text-lg">
                  Your next fictional obsession is waiting.
                </p>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">

                  <h3 className="text-2xl font-semibold mb-4">
                    AI Recommendation
                  </h3>

                  <p className="text-gray-400">
                    “A slow-burn fantasy romance with emotional devastation.”
                  </p>

                </div>

                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">

                  <h3 className="text-2xl font-semibold mb-4">
                    Quote Vault
                  </h3>

                  <p className="italic text-gray-300">
                    “Perhaps we were friends first and lovers second.”
                  </p>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </section>
       {/* Dashboard Section */}
<section className="px-10 pb-32 relative z-10">

  <div className="mb-16">
    <h2 className="text-5xl font-bold font-[Playfair_Display]">
      Dashboard Preview
    </h2>

    <p className="text-gray-400 mt-4 text-lg">
      Your personal reading sanctuary.
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

    {/* Sidebar */}
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-6 h-fit">

      <h3 className="text-3xl font-bold font-[Playfair_Display] mb-10">
        Chapterly
      </h3>

      <div className="space-y-4">

        {[
          "Library",
          "Currently Reading",
          "AI Librarian",
          "Quote Vault",
          "Reading Stats",
          "Settings"
        ].map((item, index) => (

          <div
            key={index}
            className={`px-4 py-3 rounded-2xl transition cursor-pointer ${
              index === 1
                ? "bg-purple-500/20 text-purple-300"
                : "hover:bg-white/5 text-gray-300"
            }`}
          >
            {item}
          </div>

        ))}

      </div>

    </div>

    {/* Main Dashboard */}
    <div className="lg:col-span-3 space-y-8">

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-[30px] p-10">

        <h2 className="text-5xl font-bold font-[Playfair_Display]">
          Welcome back, Reader.
        </h2>

        <p className="mt-4 text-white/80 text-lg">
          You’re 72% through your current emotional damage.
        </p>

      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Current Book */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-6">

          <div className="h-52 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 mb-6"></div>

          <h3 className="text-3xl font-bold">
            Fourth Wing
          </h3>

          <p className="text-gray-400 mt-2">
            Fantasy Romance
          </p>

          <div className="mt-6">

            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>72%</span>
            </div>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

              <div className="w-[72%] h-full bg-purple-500 rounded-full"></div>

            </div>

          </div>

        </div>

        {/* AI Librarian */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-6">

          <h3 className="text-3xl font-bold mb-6">
            AI Librarian
          </h3>

          <div className="space-y-4">

            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-2xl">
              Recommend me a devastating slow-burn fantasy.
            </div>

            <div className="bg-white/5 p-4 rounded-2xl text-gray-300">
              Try <span className="text-purple-300">The Cruel Prince</span> if you want tension, betrayal, and obsession.
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Cards */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Reading Streak */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-6">

          <h3 className="text-2xl font-bold mb-4">
            Reading Streak
          </h3>

          <p className="text-6xl font-bold text-purple-300">
            18
          </p>

          <p className="text-gray-400 mt-2">
            days of reading
          </p>

        </div>

        {/* Quote Vault */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-6">

          <h3 className="text-2xl font-bold mb-4">
            Quote Vault
          </h3>

          <p className="italic text-gray-300 text-lg">
            “You were worth falling for.”
          </p>

        </div>

      </div>

    </div>

  </div>

</section>
    </div>
  );
}

export default LandingPage;