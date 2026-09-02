import {Link} from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-3">Welcome Back</h1>

        <p className="text-zinc-400 text-center mb-10">Shop smarter. Waste money responsibly.</p>

        <div className="flex flex-col gap-4">
          <Link to="/login">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-200 cursor-pointer">Login</button>
          </Link>

          <Link to="/signup">
            <button className="w-full border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-semibold py-3 rounded-xl transition duration-200 cursor-pointer">
              Create Account
            </button>
          </Link>
        </div>

        <p className="text-zinc-500 text-sm text-center mt-8">Tiny e-commerce apps eventually become portfolio projects. Nature is beautiful.</p>
      </div>
    </div>
  );
}
