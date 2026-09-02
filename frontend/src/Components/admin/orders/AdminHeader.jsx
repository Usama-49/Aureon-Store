import { ClipboardList } from "lucide-react";

export default function AdminHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="bg-orange-500/15 p-3 rounded-xl border border-orange-500/20">
            <ClipboardList className="w-6 h-6 text-orange-500" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Orders Management
            </h1>

            <p className="text-zinc-400 mt-1">
              Monitor customer orders, payment status and deliveries.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

        <span className="text-sm text-zinc-300">
          Store Operational
        </span>
      </div>
    </div>
  );
}