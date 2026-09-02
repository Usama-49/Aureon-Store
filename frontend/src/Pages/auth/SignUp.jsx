import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Changes
  function handleChange(e) {
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Handle Form Submit
  async function handleSubmit(e) {
    setErrorMessage("");
    setSuccessMessage("");
    e.preventDefault();

    // Password Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Send Data To Backend
      const response = await api.post("/auth/register",formData);

      if(response.data.success){
      setSuccessMessage("Account created successfully");
      }
      // Redirect To Login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Create Account</h1>

        <p className="text-zinc-400 text-center mb-8">Join the store and begin your financially questionable journey</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-zinc-300 mb-2">Full Name</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-zinc-300 mb-2">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

         {/* Error Handling */}
          {errorMessage && <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm">❌ {errorMessage}</div>}
          {successMessage && <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-xl text-sm">✅ {successMessage}</div>}
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 mt-2 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-200 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-zinc-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 hover:text-orange-300 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
