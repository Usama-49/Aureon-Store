import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "./../../Context/AuthContext";
import api from "../../services/api/api";

export default function Login() {
  const navigate = useNavigate();
  const { verifyUser } = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Changes
  function handleChange(e) {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Handle Form Submit
 // Handle Form Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    // 1. Authenticate & set cookie/token
    const res = await api.post("/auth/login", formData);

    if (res.data.success) {
      toast.success("Login successful");
      
      await verifyUser();
      
      // Hand off routing logic entirely to App.jsx
      navigate("/", { replace: true });
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    setError(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Login</h1>

        <p className="text-zinc-400 text-center mb-8">Enter your credentials to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-zinc-300 mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-zinc-300 mb-2">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 mt-2 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-200 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-6">
          Don't have an Account?{" "}
          <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-semibold">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}
