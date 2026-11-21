import { Globe, ShieldCheck, Bug, Sparkles } from "lucide-react";
import { STORE_ADMIN_EMAIL, DEVELOPER_EMAIL, adminMailto, devMailto } from "../config/contact";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function NotVerified() {
  return (
    <section className="min-h-screen bg-zinc-900 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/40 bg-zinc-950 p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-orange-400">Account Not Verified!</h1>

        <p className="mt-4 text-justify text-zinc-400">
          Your account is currently unverified. Please verify your email address to unlock full
          access to the store.
        </p>

        {/* ─── Prominent Note & Instant Google Verification ───── */}
        <div className="mt-6 rounded-xl border border-orange-500/30 bg-zinc-900/80 p-4 text-left shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
            <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Note: Faster Verification</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
            Don&apos;t want to wait on a verification email? You can simply{" "}
            <strong className="text-white">Continue with Google</strong> for automatic verification.
          </p>

          <div className="relative mt-4">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2.5 right-3 z-10 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm"
            >
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

        {/* ─── Divider ────────────────────────────────────────── */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">or</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* ─── Manual Email Verification Steps ────────────────── */}
        <p className="text-left text-sm font-medium text-zinc-300">
          Follow these steps to verify via email:
        </p>

        <ol className="mt-3 space-y-2.5 text-left text-sm text-zinc-400">
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-500 font-bold">1.</span>
            <span>Check your inbox for a verification email sent by us.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-500 font-bold">2.</span>
            <span>
              If you don&apos;t see it, be sure to check your <strong>Spam</strong> or{" "}
              <strong>Junk</strong> folder.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-500 font-bold">3.</span>
            <span>
              Click the <strong>&quot;Verify Email&quot;</strong> link inside the email.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-500 font-bold">4.</span>
            <span>Return to Aureon Store and log in again to access your account.</span>
          </li>
        </ol>

        {/* ─── Primary: verification help from Store Admin ──────── */}
        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col items-center gap-2">
          <span className="text-sm text-zinc-400">Didn&apos;t receive the email or need help?</span>
          <a
            href={adminMailto("Email Verification Help")}
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-500 font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-xl transition-all duration-200 text-sm shadow-md"
          >
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span>{STORE_ADMIN_EMAIL}</span>
          </a>
        </div>

        {/* ─── Secondary: technical bug to Developer ─────────────── */}
        <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col items-center gap-1">
          <span className="text-xs text-zinc-500">
            Facing a technical issue? Report it to the developer at
          </span>
          <a
            href={devMailto("Bug Report – Verification Page")}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-400 font-medium text-xs transition-colors duration-200"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>{DEVELOPER_EMAIL}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
