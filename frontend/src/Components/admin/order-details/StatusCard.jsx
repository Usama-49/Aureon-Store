import { BadgeCheck, PackageCheck } from "lucide-react";

export default function StatusCard({ paymentStatus, orderStatus }) {
  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all
     duration-300 hover:border-orange-500/70 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
    >
      <h2 className="mb-6 text-lg font-semibold text-white">Order Status</h2>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <BadgeCheck size={20} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">Payment Status</p>

            <span className="mt-1 inline-flex rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-white">
              {paymentStatus}
            </span>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <PackageCheck size={20} />
            </div>

            <div>
              <p className="text-sm text-zinc-400">Order Status</p>

              <span className="mt-1 inline-flex rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-white">
                {orderStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
