import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [status, setStatus] = useState(() => (token ? "verifying" : "error"));
  const [message, setMessage] = useState(() =>
    token ? "Verifying your Aureon account..." : "Invalid or missing verification token.",
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const verifyTokenOnBackend = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`,
        );
        setStatus("success");
        setMessage(response.data.message || "Email verified successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Verification failed. Token may be invalid or expired.",
        );
      }
    };

    verifyTokenOnBackend();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        {/* Brand Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Aureon <span className="text-orange-500">Store</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Account Verification</p>
        </div>

        {/* State Indicators */}
        <div className="py-4 space-y-4">
          {status === "verifying" && (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
              <p className="text-sm text-slate-300 animate-pulse">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl border border-emerald-500/20">
                ✓
              </div>
              <p className="text-sm font-medium text-emerald-400">{message}</p>
              <p className="text-xs text-slate-400">Redirecting you to login in 3 seconds...</p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto text-2xl border border-rose-500/20">
                ✕
              </div>
              <p className="text-sm font-medium text-rose-400">{message}</p>
            </div>
          )}
        </div>

        {/* Manual Actions */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <Link
            to="/login"
            className="inline-block w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition duration-200 shadow-md shadow-orange-500/10"
          >
            Go to Login
          </Link>

          <p className="text-xs text-slate-400/80 leading-relaxed px-2">
            Having trouble? You can try continuing with{" "}
            <span className="text-slate-300 font-medium">Google</span> on the login page for
            automatic account verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
