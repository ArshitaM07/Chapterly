import { motion } from "framer-motion";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white overflow-hidden relative flex items-center justify-center px-6">

      {/* Background Glow */}

      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-purple-600 rounded-full blur-[140px] opacity-30"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-blue-500 rounded-full blur-[140px] opacity-20"></div>


      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8 }}
        className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-10 w-full max-w-md shadow-2xl"
      >

        {/* Logo */}

        <div className="flex justify-center mb-5">

          <BookOpen
            size={45}
            className="text-purple-400"
          />

        </div>

        <h1 className="text-5xl font-bold text-center font-[Playfair_Display]">
          Chapterly
        </h1>

        <p className="text-gray-400 text-center mt-4">
          Enter your reading universe
        </p>


        {/* Form */}

        <div className="mt-10 space-y-6">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400 transition"
          />


          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400 transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-4"
            >

              {showPassword
                ? <EyeOff size={20}/>
                : <Eye size={20}/>
              }

            </button>

          </div>


          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl text-lg font-semibold transition"
          >
            Login
          </button>


          <button
            className="w-full border border-white/10 hover:bg-white/5 py-4 rounded-2xl transition"
          >
            Continue with Google
          </button>

        </div>


        <p className="text-gray-500 text-center mt-8">

          New here?{" "}

          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300"
          >
            Create an account
          </Link>

        </p>

      </motion.div>

    </div>
  );
}

export default LoginPage;