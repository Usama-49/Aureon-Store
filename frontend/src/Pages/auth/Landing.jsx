import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

export default function Landing() {
  const backendUrl = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").replace(
    /\/$/,
    "",
  );

  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-3">Welcome Back</h1>

        <p className="text-zinc-400 text-center mb-10">Shop smarter. Waste money responsibly.</p>

        <div className="flex flex-col gap-4">
          <Link to="/login">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-200 cursor-pointer">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="w-full border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-semibold py-3 rounded-xl transition duration-200 cursor-pointer">
              Create Account
            </button>
          </Link>

          {/* Divider */}
          <div className="relative my-1 flex items-center justify-center w-full">
            <div className="grow border-t border-zinc-700"></div>
            <span className="shrink mx-3 text-xs uppercase tracking-widest text-zinc-500 font-medium">
              or
            </span>
            <div className="grow border-t border-zinc-700"></div>
          </div>

          <div className="relative">
            <span className="absolute -top-2.5 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md border border-zinc-900 z-10 pointer-events-none">
              Recommended
            </span>

            <a
              href={`${backendUrl}/auth/google`}
              className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700/80 text-zinc-200 text-sm font-semibold rounded-xl border border-zinc-700 hover:border-orange-500/50 transition duration-200 flex items-center justify-center space-x-3 cursor-pointer group shadow-sm"
            >
              <Globe className="w-5 h-5 text-zinc-400 group-hover:text-orange-400 transition-colors shrink-0" />
              <span className="group-hover:text-white transition-colors">Continue with Google</span>
            </a>
          </div>
        </div>

        <p className="text-zinc-500 text-sm text-center mt-8">
          Your destination for premium collectibles and gear
        </p>
      </div>
    </div>
  );
}
