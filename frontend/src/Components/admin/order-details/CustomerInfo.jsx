import { Mail, User } from "lucide-react";

export default function CustomerInfo({ userEmail }) {
  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-orange-500/70 
    hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
    >
      <h2 className="mb-6 text-lg font-semibold text-white">Customer Information</h2>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <User size={20} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">Customer</p>
            <p className="font-medium text-white">Registered User</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <Mail size={20} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">Email</p>
            <p className="break-all text-white">{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
