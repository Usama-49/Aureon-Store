import { Mail, ShieldAlert, Bug } from "lucide-react";
import { STORE_ADMIN_EMAIL, DEVELOPER_EMAIL, adminMailto, devMailto } from "../config/contact";

export default function BannedUser() {
  return (
    <section className="min-h-screen bg-zinc-900 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-red-900/60 bg-zinc-950 p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-red-500">Account Banned</h1>

        <p className="mt-4 text-justify text-zinc-400">
          Your account has been banned by an administrator and you cannot access the store at this
          time.
        </p>

        <p className="mt-6 text-justify text-zinc-400">
          If you believe this ban was issued by mistake, you can contact the administrator for a
          review. Please include:
        </p>

        <ul className="mt-4 space-y-2 text-left text-zinc-400 list-disc list-inside">
          <li>A screenshot showing the banned account message</li>
          <li>The email address associated with your account</li>
          <li>A brief explanation of why you believe the ban should be reviewed</li>
        </ul>

        {/* ─── Primary action: appeal to Store Admin ─────────────── */}
        <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-col items-center gap-2">
          <span className="text-sm text-zinc-400">Appeal to the store administrator at</span>
          <a
            href={adminMailto("Account Ban Review Request")}
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-500 font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-xl transition-all duration-200 text-sm shadow-md"
          >
            <ShieldAlert className="w-4 h-4 text-orange-500" />
            <span>{STORE_ADMIN_EMAIL}</span>
          </a>
        </div>

        {/* ─── Secondary: report a bug / technical issue to dev ──── */}
        <div className="mt-4 pt-4 border-t border-zinc-900 flex flex-col items-center gap-1">
          <span className="text-xs text-zinc-500">
            Facing a technical issue? Report it to the developer at
          </span>
          <a
            href={devMailto("Bug Report – Banned User Page")}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-400 font-medium text-xs transition-all duration-200"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>{DEVELOPER_EMAIL}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
