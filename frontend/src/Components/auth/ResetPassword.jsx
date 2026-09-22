import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api/api";
import Loading from "../Loading";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Reset token is missing or invalid URL.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/reset-password", {
        email: formData.email,
        token: token,
        newPassword: formData.newPassword,
      });

      if (res.data.success || res.status === 200) {
        toast.success("Password reset successfully!");
        setIsSuccess(true);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to reset password. Link may be expired.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center space-y-4 px-6">
        <p className="text-zinc-300 font-medium text-lg tracking-wide animate-pulse">
          Updating Password...
        </p>
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-zinc-400 text-sm">
            Enter your email and create a new secure password.
          </p>
        </div>

        {!isSuccess ? (
          /* Reset Password Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition duration-150"
                required
              />
            </div>

            {/* New Password Input */}
            <div>
              <label className="block text-zinc-300 mb-2 font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition duration-150"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition duration-150"
                required
              />
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 mt-2 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        ) : (
          /* Success Screen View */
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-white">Password Changed!</h2>
            <p className="text-zinc-400 text-sm">
              Your password has been reset successfully. You can now log in with your new
              credentials.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-200 cursor-pointer"
            >
              Go to Login Page
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        {!isSuccess && (
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-zinc-400 hover:text-orange-400 font-medium transition duration-150"
            >
              Cancel and Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
