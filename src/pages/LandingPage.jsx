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
                top: `${(i * 37 + 13) % 100}%`,
                left: `${(i * 61 + 7) % 100}%`,
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
    </div>
  );
}

export default LandingPage;
