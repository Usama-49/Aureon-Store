import { CalendarDays, Mail, ShieldCheck, User } from "lucide-react";


export default function UserHeader({ user }) {
  function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-orange-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/10">
          <User size={42} className="text-orange-500" />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">{user.username}</h1>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-zinc-300">
              <Mail size={18} className="text-orange-500" />

              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-300">
              <ShieldCheck size={18} className="text-orange-500" />

              <span className="capitalize">{user.role}</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-300">
              <CalendarDays size={18} className="text-orange-500" />

              <span>Joined {formatDate(user.createdAt)}</span>
            </div>
            {user.isBanned && 
            <span className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-sm font-semibold hover:bg-red-800/20  text-red-500 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Banned
            </span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
