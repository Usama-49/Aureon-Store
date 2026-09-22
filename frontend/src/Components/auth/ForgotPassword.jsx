import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setError("");
    setEmail(e.target.value);
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/forgot-password", { email });
      if (res.data.success) {
        toast.success("Reset link sent to your email!");
        setIsSent(true);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">
        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-zinc-400 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {!isSent ? (
          /* Initial Request Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition duration-150"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          /* Confirmation State once sent */
          <div className="space-y-6 text-center">
            <div className="bg-orange-500/10 border border-orange-500/30 text-orange-300 px-4 py-4 rounded-2xl text-sm">
              We've sent password reset instructions to <br />
              <span className="font-semibold text-white">{email}</span>
            </div>

            <p className="text-xs text-zinc-500">
              Didn't receive the email? Check your spam folder or try re-sending.
            </p>

            <button
              onClick={() => setIsSent(false)}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-3 rounded-xl font-semibold border border-zinc-700 transition duration-200 cursor-pointer"
            >
              Resend Email
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-zinc-400 hover:text-orange-400 font-medium transition duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
