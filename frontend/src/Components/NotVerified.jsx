export default function NotVerified() {
  return (
    <section className="min-h-screen bg-zinc-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/40 bg-zinc-950 p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-amber-500">Account Not Verified!</h1>

        <p className="mt-4 text-justify text-zinc-400">
          Your account is currently unverified. Please verify your email address to unlock full
          access to the store.
        </p>

        <p className="mt-6 text-left text-sm font-medium text-zinc-300">
          Follow these steps to complete verification:
        </p>

        <ul className="mt-3 space-y-2.5 text-left text-sm text-zinc-400">
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-500 font-bold">•</span>
            <span>Check your inbox for a verification email sent by us.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-500 font-bold">•</span>
            <span>
              If you don't see it, be sure to check your <strong>Spam</strong> or{" "}
              <strong>Junk</strong> folder.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-500 font-bold">•</span>
            <span>
              Click the <strong>"Verify Email"</strong> link inside the email.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-amber-500 font-bold">•</span>
            <span>Return to Aureon Store and log in again to access your account.</span>
          </li>
        </ul>

        <div className="mt-8 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-400">
          Didn't receive the email or need help?
          <p className="text-orange-400 mt-1 hover:text-orange-300 font-semibold cursor-pointer">
            usamahere49@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
