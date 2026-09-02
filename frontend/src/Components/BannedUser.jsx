export default function BannedUser() {
  return (
    <section className="min-h-screen bg-zinc-900 flex items-center justify-center px-6">
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

        <p className="mt-6 text-center text-zinc-400">
          Contact the administrator at{" "}
          <p
            className="text-orange-400 mt-2 hover:text-orange-300 font-semibold"
          >
            usamahere49@gmail.com
          </p>
        </p>
      </div>
    </section>
  );
}
